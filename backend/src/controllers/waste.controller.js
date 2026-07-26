// src/controllers/waste.controller.js

import { analyzeWaste } from "../services/ai.service.js";

export const predictWaste = async (req, res) => {
  try {
    // Check if an image was uploaded
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Please upload an image.",
      });
    }

    // Call the AI service
    const result = await analyzeWaste(req.file);

    // Send prediction to frontend
    return res.status(200).json({
      success: true,
      prediction: result,
    });

  } catch (error) {
    console.error("Prediction Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to analyze image.",
    });
  }
};