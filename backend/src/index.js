import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import wasteRoutes from "./routes/waste.route.js";

dotenv.config();


const PORT = process.env.PORT || 5001;

const app = express();

// Increase JSON body limit to handle Base64 image data
app.use(express.json({ limit: "10mb" }));

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));

app.use("/api/waste", wasteRoutes);
// Middleware: Enable CORS for Vite frontend
app.use(cors({
  origin: "http://localhost:5173", // Frontend Vite URL
  credentials: true,
}));


// Health Check Route
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "EcoSnap Backend API is running!" });
});

// Waste AI Classification Endpoint
// Waste AI Classification Endpoint (With Diagnostics)
app.post("/api/waste/scan", async (req, res) => {
  console.log("\n-------------------------------------------");
  console.log("📸 Received Scan Request!");

  try {
    const { imageBase64, mimeType } = req.body || {};

    // Diagnostic Logs
    console.log("1. Has imageBase64?", Boolean(imageBase64), imageBase64 ? `(Length: ${imageBase64.length})` : "");
    console.log("2. Has mimeType?", mimeType);
    console.log("3. Has GEMINI_API_KEY?", Boolean(process.env.GEMINI_API_KEY));
    
console.log("Checking API Key on Startup:", Boolean(process.env.GEMINI_API_KEY));

    // Check if API Key is configured
    if (!process.env.GEMINI_API_KEY) {
      console.log("⚠️ WARNING: GEMINI_API_KEY is missing in your .env file! Falling back to mock data.");
    }

    // 1. Perform Real AI Analysis if API key & Image are provided
    if (imageBase64 && mimeType && process.env.GEMINI_API_KEY) {
      console.log("🚀 Sending photo to Gemini AI for analysis...");

      const apiKey = process.env.GEMINI_API_KEY;

      const prompt = `
        Analyze this waste item image for waste segregation.
        Respond ONLY with a raw valid JSON object (no markdown formatting, no code blocks) in this exact structure:
        {
          "type": "Specific item name",
          "bin": "Name of bin + Category",
          "color": "Hex color code (#1a8049 for green, #2563eb for blue, #dc2626 for red, #eab308 for yellow)",
          "confidence": number between 90.0 and 99.9
        }
      `;

      const aiResponse = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  { text: prompt },
                  { inline_data: { mime_type: mimeType, data: imageBase64 } },
                ],
              },
            ],
          }),
        }
      );

      if (!aiResponse.ok) {
        const errorText = await aiResponse.text();
        console.error("❌ Gemini API Call Failed:", aiResponse.status, errorText);
        return res.status(aiResponse.status).json({
          success: false,
          error: `Gemini API Error (${aiResponse.status}): ${errorText}`
        });
      }

      const aiData = await aiResponse.json();
      const rawText = aiData.candidates[0].content.parts[0].text;
      console.log("🤖 Raw Gemini Output:", rawText);

      const cleanedJson = rawText.replace(/```json/g, "").replace(/```/g, "").trim();
      const aiResult = JSON.parse(cleanedJson);

      console.log("✅ Analysis Complete! Identified as:", aiResult.type);

      return res.json({
        success: true,
        data: aiResult,
        timestamp: new Date().toISOString()
      });
    }

    // 2. Mock Fallback if no image or key
    console.log("ℹ️ Returning mock fallback response.");
    const mockResults = [
      { type: "PET Plastic Water Bottle", bin: "Yellow Bin · Recyclable Plastic", color: "#1a8049", confidence: 99.4 },
      { type: "Apple Core & Food Waste", bin: "Green Bin · Organic Compost", color: "#27a05e", confidence: 98.8 },
      { type: "Lithium Battery", bin: "Red Bin · Hazardous E-Waste", color: "#dc2626", confidence: 99.9 },
      { type: "Cardboard Box", bin: "Blue Bin · Paper & Cardboard", color: "#2563eb", confidence: 99.1 }
    ];

    const randomResult = mockResults[Math.floor(Math.random() * mockResults.length)];

    res.json({
      success: true,
      data: randomResult,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error("❌ Server Exception:", error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// User Stats Endpoint
app.get("/api/user/stats", (req, res) => {
  res.json({
    scansCount: 42,
    co2SavedKg: 12.8,
    streakDays: 5,
    unlockedBadges: ["First Scan", "Compost Master", "E-Waste Guardian"]
  });
});

app.listen(PORT, () => {
  console.log(`🚀 EcoSnap Node.js Backend running on http://localhost:${PORT}`);
});