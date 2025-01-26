import express, { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";

dotenv.config();
const app = express();
const prisma = new PrismaClient();

app.use(express.json());

// Sample route: Fetch GitHub stats for a user
app.get("/", (req: Request, res: Response) => {
    res.send("hello world")
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
