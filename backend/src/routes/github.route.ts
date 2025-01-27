import { Router } from "express";
const router = Router()

import { fetchGithubStats } from "../controllers/fetchGithubStats.controller";

router.post('/fetchGithubStats', fetchGithubStats);

export default router