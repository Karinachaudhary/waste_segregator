import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import wasteRoutes from "./routes/waste.route.js";

dotenv.config();


const PORT = process.env.PORT || 5001;

const app = express();

// Increase JSON body limit to handle Base64 image data
app.use(express.json({ limit: "10mb" }));

const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:3000",
  process.env.CLIENT_URL
].filter(Boolean);

app.use(cors({
  origin: process.env.NODE_ENV === "production" && !process.env.CLIENT_URL ? true : allowedOrigins,
  credentials: true,
}));

app.use("/api/waste", wasteRoutes);


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