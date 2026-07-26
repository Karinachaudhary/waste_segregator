// src/services/wasteClassifier.js

/**
 * Converts a browser File object to a Base64 string required by AI vision APIs
 */
const fileToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      // Remove data URL prefix (e.g. "data:image/jpeg;base64,")
      const base64String = reader.result.split(',')[1];
      resolve({
        base64: base64String,
        mimeType: file.type
      });
    };
    reader.onerror = (error) => reject(error);
  });
};

/**
 * Calls Google Gemini Vision API to classify waste item
 * @param {File} imageFile 
 * @returns {Promise<{type: string, bin: string, color: string, confidence: number}>}
 */
export async function classifyWasteImage(imageFile) {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

  if (!apiKey) {
    throw new Error("Missing VITE_GEMINI_API_KEY in environment variables.");
  }

  // 1. Convert image file to base64 format
  const { base64, mimeType } = await fileToBase64(imageFile);

  // 2. Define structured system prompt for the AI
  const prompt = `
    Analyze this waste item image for waste segregation.
    Respond ONLY with a raw valid JSON object (no markdown formatting, no code blocks) in this exact structure:
    {
      "type": "Specific item name (e.g., PET Plastic Water Bottle)",
      "bin": "Name of bin + Category (e.g., Yellow Bin · Recyclable Plastic)",
      "color": "Hex color for bin badge (e.g., #1a8049 for green, #2563eb for blue, #dc2626 for red, #eab308 for yellow)",
      "confidence": number between 90.0 and 99.9
    }
  `;

  // 3. Make POST request to Gemini 1.5 Flash Endpoint
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      contents: [
        {
          parts: [
            { text: prompt },
            {
              inline_data: {
                mime_type: mimeType,
                data: base64,
              },
            },
          ],
        },
      ],
    }),
  });

  if (!response.ok) {
    throw new Error(`API Error: ${response.statusText}`);
  }

  const data = await response.json();
  
  // 4. Extract text response and parse as JSON
  const rawText = data.candidates[0].content.parts[0].text;
  
  // Clean up code block markdown if present
  const cleanedJsonString = rawText.replace(/```json/g, '').replace(/```/g, '').trim();

  return JSON.parse(cleanedJsonString);
}