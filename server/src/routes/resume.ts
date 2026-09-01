import { Router } from "express";
import multer from "multer";
import path from "path";
import crypto from "crypto";
import fs from "fs";
import { PDFParse } from "pdf-parse";
import { db } from "../prisma/db.js";
import { analyzeResume } from "../services/ai.js";



const router = Router();

const storage = multer.diskStorage({
    destination: "uploads/resumes",
    filename: (req, file, cb) => {
        const uniqueName = `${crypto.randomUUID()}${path.extname(file.originalname)}`;
        cb(null, uniqueName);
    }
});

const upload = multer({
    storage,
    limits: {
        fileSize: 5 * 1024 * 1024
    },
    fileFilter: (req, file, cb) => {
        const allowedTypes = [
            "application/pdf",
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        ];

        if (allowedTypes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error("Only PDF and DOCX files are allowed"));
        }
    }
});

router.post("/upload", upload.single("resume"), async (req, res) => {
    try {
        const userId = Number(req.headers["x-user-id"]);

        if (!userId) {
            return res.status(400).json({
                message: "User ID is required"
            });
        }

        if (!req.file) {
            return res.status(400).json({
                message: "Resume file is required"
            });
        }
        let extractedText = null;

        if (req.file.mimetype === "application/pdf") {
            const fileBuffer = fs.readFileSync(req.file.path);
            const parser = new PDFParse({ data: fileBuffer });
            const pdfData = await parser.getText();
            extractedText = pdfData.text;
            await parser.destroy();
        }

        const profile = await db.orm.public.CandidateProfile
            .where({ userId })
            .first();

        if (!profile) {
            return res.status(404).json({
                message: "Candidate profile not found"
            });
        }

        const resumes = await db.orm.public.Resume
            .where({ candidateId: profile.id })
            .all();

        if (resumes.length >= 3) {
            return res.status(400).json({
                message: "Maximum 3 resumes allowed"
            });
        }

        const resume = await db.orm.public.Resume.create({
            candidateId: profile.id,
            fileName: req.file.originalname,
            fileUrl: `/uploads/resumes/${req.file.filename}`,
            fileType: req.file.mimetype,
            fileSize: req.file.size,
            extractedText,
            isActive: resumes.length === 0
        });

        res.status(201).json({
            message: "Resume uploaded successfully",
            resume: {
                id: resume.id,
                fileName: resume.fileName,
                fileUrl: resume.fileUrl,
                fileType: resume.fileType,
                fileSize: resume.fileSize,
                isActive: resume.isActive
            }
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to upload resume"
        });
    }
});

router.get("/", async (req, res) => {
    try {
        const userId = Number(req.headers["x-user-id"]);

        if (!userId) {
            return res.status(400).json({
                message: "User ID is required"
            });
        }

        const profile = await db.orm.public.CandidateProfile
            .where({ userId })
            .first();

        if (!profile) {
            return res.status(404).json({
                message: "Candidate profile not found"
            });
        }

        const resumes = await db.orm.public.Resume
            .where({ candidateId: profile.id })
            .all();

        res.json({
            resumes
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to fetch resumes"
        });
    }
});
router.patch("/:id/activate", async (req, res) => {
    try {
        const userId = Number(req.headers["x-user-id"]);
        const resumeId = Number(req.params.id);

        if (!userId) {
            return res.status(400).json({
                message: "User ID is required"
            });
        }

        if (!resumeId) {
            return res.status(400).json({
                message: "Resume ID is required"
            });
        }

        const profile = await db.orm.public.CandidateProfile
            .where({ userId })
            .first();

        if (!profile) {
            return res.status(404).json({
                message: "Candidate profile not found"
            });
        }

        const resume = await db.orm.public.Resume
            .where({
                id: resumeId,
                candidateId: profile.id
            })
            .first();

        if (!resume) {
            return res.status(404).json({
                message: "Resume not found"
            });
        }

        const resumes = await db.orm.public.Resume
            .where({ candidateId: profile.id })
            .all();

        for (const candidateResume of resumes) {
            if (candidateResume.isActive) {
                await db.orm.public.Resume
                    .where({ id: candidateResume.id })
                    .update({
                        isActive: false
                    });
            }
        }

        const activatedResume = await db.orm.public.Resume
            .where({ id: resumeId })
            .update({
                isActive: true
            });

        res.json({
            message: "Resume activated successfully",
            resume: activatedResume
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to activate resume"
        });
    }
});
router.delete("/:id", async (req, res) => {
    try {
        const userId = Number(req.headers["x-user-id"]);
        const resumeId = Number(req.params.id);

        if (!userId) {
            return res.status(400).json({
                message: "User ID is required"
            });
        }

        if (!resumeId) {
            return res.status(400).json({
                message: "Resume ID is required"
            });
        }

        const profile = await db.orm.public.CandidateProfile
            .where({ userId })
            .first();

        if (!profile) {
            return res.status(404).json({
                message: "Candidate profile not found"
            });
        }

        const resume = await db.orm.public.Resume
            .where({
                id: resumeId,
                candidateId: profile.id
            })
            .first();

        if (!resume) {
            return res.status(404).json({
                message: "Resume not found"
            });
        }

        const wasActive = resume.isActive;

        await db.orm.public.Resume
            .where({ id: resumeId })
            .delete();

        const fileName = path.basename(resume.fileUrl);
        const filePath = path.join("uploads", "resumes", fileName);

        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }

        if (wasActive) {
            const remainingResumes = await db.orm.public.Resume
                .where({ candidateId: profile.id })
                .all();

            if (remainingResumes.length > 0) {
                await db.orm.public.Resume
                    .where({ id: remainingResumes[0].id })
                    .update({
                        isActive: true
                    });
            }
        }

        res.json({
            message: "Resume deleted successfully"
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to delete resume"
        });
    }
});
router.post("/:id/analyze", async (req, res) => {
    try {
        const userId = Number(req.headers["x-user-id"]);
        const resumeId = Number(req.params.id);
        const { jdText } = req.body;

        if (!userId) {
            return res.status(400).json({
                message: "User ID is required"
            });
        }

        if (!resumeId) {
            return res.status(400).json({
                message: "Resume ID is required"
            });
        }

        if (!jdText || typeof jdText !== "string") {
            return res.status(400).json({
                message: "Job description is required"
            });
        }

        const profile = await db.orm.public.CandidateProfile
            .where({ userId })
            .first();

        if (!profile) {
            return res.status(404).json({
                message: "Candidate profile not found"
            });
        }

        const resume = await db.orm.public.Resume
            .where({
                id: resumeId,
                candidateId: profile.id
            })
            .first();

        if (!resume) {
            return res.status(404).json({
                message: "Resume not found"
            });
        }

        if (!resume.extractedText) {
            return res.status(400).json({
                message: "Resume text has not been extracted"
            });
        }

        const analysis = await analyzeResume(
            resume.extractedText,
            jdText
        );

        const savedAnalysis = await db.orm.public.ResumeAnalysis.create({
            resumeId: resume.id,
            jdText,
            overallScore: analysis.overallScore,
            summary: analysis.summary,
            analysisJson: analysis
        });

        res.status(201).json({
            message: "Resume analyzed successfully",
            analysis: savedAnalysis
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to analyze resume"
        });
    }
});
router.get("/:id/analysis", async (req, res) => {
    try {
        const userId = Number(req.headers["x-user-id"]);
        const resumeId = Number(req.params.id);

        if (!userId) {
            return res.status(400).json({
                message: "User ID is required"
            });
        }

        if (!resumeId) {
            return res.status(400).json({
                message: "Resume ID is required"
            });
        }

        const profile = await db.orm.public.CandidateProfile
            .where({ userId })
            .first();

        if (!profile) {
            return res.status(404).json({
                message: "Candidate profile not found"
            });
        }

        const resume = await db.orm.public.Resume
            .where({
                id: resumeId,
                candidateId: profile.id
            })
            .first();

        if (!resume) {
            return res.status(404).json({
                message: "Resume not found"
            });
        }

        const analysis = await db.orm.public.ResumeAnalysis
            .where({ resumeId })
            .all();

        res.json({
            analyses: analysis
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to fetch resume analysis"
        });
    }
});
export default router;

