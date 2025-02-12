import { Router } from "express";
const router = Router()

import { fetchConnectedPlatformsDetails } from "../controllers/user.controller";

router.post('/fetchConnectedPlatformsDetails', fetchConnectedPlatformsDetails);

export default router