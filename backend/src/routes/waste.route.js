import express from "express";
import { scanWaste, predictWaste } from "../controllers/waste.controller.js";
import { upload } from "../middleware/upload.middleware.js";

const router = express.Router();

// Primary endpoint used by frontend (Base64 JSON or optional file upload)
router.post("/scan", upload.single("image"), scanWaste);

// Backward compatible endpoint for file uploads
router.post("/predictwaste", upload.single("image"), predictWaste);

export default router;