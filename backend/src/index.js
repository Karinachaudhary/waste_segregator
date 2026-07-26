import dotenv from "dotenv";

dotenv.config();

// console.log("PORT:", process.env.PORT);
// console.log("API KEY:", process.env.GEMINI_API_KEY);

import express from "express";
import cors from "cors";
import wasteRoutes from "./routes/waste.route.js";



const PORT = process.env.PORT
const app = express();

app.use(express.json());


app.use(cors({
    origin:"http://localhost:5173",
    credentials:true,
}));

app.use("/api/waste", wasteRoutes);

app.listen(PORT,()=>{
    console.log(`Server is running on http://localhost:${PORT}`);

})