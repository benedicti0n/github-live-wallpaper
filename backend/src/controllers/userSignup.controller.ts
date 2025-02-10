import { Request, Response } from "express";
import prisma from "../utils/prisma";

export const userSignup = async (req: Request, res: Response) => {
    const { clerkUserId } = req.body;
    console.log("data received in backend");

    try {
        // Check if the user already exists
        const existingUser = await prisma.user.findUnique({
            where: { id: clerkUserId },
        });

        if (existingUser) {
            console.log("User already exists");
            res.status(409).json({ error: 'User already exists' });
            return
        }

        // Save clerkUserId to your database 
        const newUser = await prisma.user.create({
            data: { id: clerkUserId },
        });

        console.log("user saved");

        res.status(201).json(newUser);
    } catch (error) {
        console.error('Error saving Clerk ID:', error);
        res.status(500).json({ error: 'Failed to save user' });
    }
}