import express, { Request, Response, urlencoded } from "express";
import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";
import cors from 'cors'

import fetchGithubStats from "./routes/github.route"

dotenv.config();
const app = express();
const prisma = new PrismaClient();

app.use(cors({
    origin: "http://localhost:5173",
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));
app.use(express.json());
app.use(urlencoded({ extended: true }))

app.use('/api/v1/', fetchGithubStats)

// Sample route: Fetch GitHub stats for a user
app.get("/", (req: Request, res: Response) => {
    res.send("hello world")
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
