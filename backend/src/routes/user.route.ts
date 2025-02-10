import { Router } from "express";
const router = Router()

import { userSignup } from "../controllers/userSignup.controller";

router.post('/userSignup', userSignup);

export default router