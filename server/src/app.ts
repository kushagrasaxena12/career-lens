import express from "express";
import cors from "cors";
import { db } from "./prisma/db.js";
import authRoutes from "./routes/auth.js";
import resumeRoutes from "./routes/resume.js";
import { testGemini } from "./services/ai.js";
import path from "path";

const app = express();
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));
app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/resumes", resumeRoutes);


app.get("/", (req, res) => {
    res.json({ message: "CareerLens API is running" });
});

app.get("/users", async (req, res) => {
    try {
        const users = await db.orm.public.User.all();
        res.json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to fetch users" });
    }
});
app.get("/test-gemini", async (req, res) => {
    try {
        const result = await testGemini();

        res.json({
            message: result
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Gemini test failed"
        });
    }
});
app.listen(5000, () => {
    console.log("CareerLens server running on port 5000");
});