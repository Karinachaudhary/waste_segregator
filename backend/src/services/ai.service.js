import dotenv from "dotenv";

dotenv.config();

import { GoogleGenAI } from "@google/genai";

// console.log(process.env.GEMINI_API_KEY);

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export const analyzeWaste = async (file) => {
  // Convert image buffer to Base64
  const base64Image = file.buffer.toString("base64");

  const prompt = `
You are an AI Waste Segregation Assistant.

Analyze the uploaded image and respond ONLY in valid JSON.

Format:
{
  "category": "",
  "confidence": "",
  "recyclable": true,
  "disposal": ""
}

Possible categories:
- Plastic
- Paper
- Glass
- Metal
- Organic
- E-Waste
- Other
`;

const response = await ai.models.generateContent({
  model: "gemini-3.5-flash",
  contents: [
    {
      text: prompt,
    },
    {
      inlineData: {
        mimeType: file.mimetype,
        data: base64Image,
      },
    },
  ],
});
  

  // Remove markdown code fences if Gemini adds them
  const text = response.text
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();

  return JSON.parse(text);
};