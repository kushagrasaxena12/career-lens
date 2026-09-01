import { Router } from "express";
import bcrypt from "bcrypt";
import { db } from "../prisma/db.js";

const router = Router();

router.post("/signup", async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;

        if (!firstName || !lastName || !email || !password) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }

        const existingUser = await db.orm.public.User
            .where({ email })
            .first();

        if (existingUser) {
            return res.status(409).json({
                message: "Email already registered"
            });
        }

        const passwordHash = await bcrypt.hash(password, 10);

        const user = await db.orm.public.User.create({
            email,
            passwordHash
        });

        const profile = await db.orm.public.CandidateProfile.create({
            userId: user.id,
            firstName,
            lastName
        });

        res.status(201).json({
            message: "Candidate registered successfully",
            user: {
                id: user.id,
                email: user.email
            },
            profile: {
                id: profile.id,
                firstName: profile.firstName,
                lastName: profile.lastName
            }
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Internal server error"
        });
    }
});

export default router;