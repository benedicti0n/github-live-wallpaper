import multer from "multer";
import { Router } from "express";
const router = Router();

import { saveWallpaper, fetchPreviewWallpapers, deleteWallpaper } from "../controllers/wallpaper.controller";

const storage = multer.memoryStorage(); // Store file in memory instead of disk
const upload = multer({ storage });

router.post('/saveWallpaper', upload.single('image'), saveWallpaper);
router.post('/fetchPreviewWallpapers', fetchPreviewWallpapers);
router.post('/deleteWallpaper', deleteWallpaper);

export default router;