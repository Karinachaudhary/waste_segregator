// src/controllers/waste.controller.js

import { analyzeWaste } from "../services/ai.service.js";

export const scanWaste = async (req, res) => {
  try {
    const { imageBase64, mimeType } = req.body || {};
    const file = req.file;

    if (!file && !imageBase64) {
      return res.status(400).json({
        success: false,
        error: "Please provide an image (either as a file upload or Base64 string).",
      });
    }

    const result = await analyzeWaste({
      imageBase64,
      mimeType,
      file,
    });

    return res.status(200).json({
      success: true,
      data: result,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("❌ Prediction Error:", error);

    return res.status(500).json({
      success: false,
      error: "Failed to analyze image.",
    });
  }
};

export const predictWaste = scanWaste;