import { Router } from "express";
const router = Router();

import { saveWallpaper } from "../controllers/wallpaper.controller";
import multer from "multer";

const upload = multer({ dest: 'uploads/' });

router.post('/saveWallpaper', upload.single('image'), saveWallpaper);

export default router;