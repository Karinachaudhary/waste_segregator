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