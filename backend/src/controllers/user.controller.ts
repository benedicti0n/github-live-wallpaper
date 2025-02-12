import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const fetchConnectedPlatformsDetails = async (req: Request, res: Response) => {
    const { userId } = req.body;

    try {
        const userPlatforms = await prisma.user.findUnique({
            where: { id: userId },
            select: {
                platformsConnectedTo: true
            }
        });

        if (!userPlatforms) {
            res.status(404).json({ error: "User not found" });
            return
        }

        res.status(200).json(userPlatforms.platformsConnectedTo);
        return
    } catch (error) {
        res.status(500).json({ error: "An error occurred while fetching platforms" });
    }
}