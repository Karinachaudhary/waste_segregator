import express from "express";
import {predictWaste} from "../controllers/waste.controller.js"
import { upload } from "../middleware/upload.middleware.js";

const router = express.Router();

router.post("/predictwaste", upload.single("image"),predictWaste);

export default router;