import multer from "multer";
import { Router } from "express";
const router = Router();

import { saveWallpaper } from "../controllers/wallpaper.controller";
import { fetchPreviewWallpapers } from "../controllers/wallpaper.controller";

const storage = multer.memoryStorage(); // Store file in memory instead of disk
const upload = multer({ storage });

router.post('/saveWallpaper', upload.single('image'), saveWallpaper);
router.post('/fetchPreviewWallpapers', fetchPreviewWallpapers);

export default router;