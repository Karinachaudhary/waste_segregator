// src/services/wasteClassifier.js

import { wasteApi } from './api';

/**
 * Converts a browser File object to a Base64 string required by AI vision APIs
 */
const fileToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const base64String = reader.result.split(',')[1];
      resolve({
        base64: base64String,
        mimeType: file.type || 'image/jpeg'
      });
    };
    reader.onerror = (error) => reject(error);
  });
};

/**
 * Calls backend API to classify waste item securely
 * @param {File} imageFile 
 * @returns {Promise<{type: string, bin: string, color: string, confidence: number}>}
 */
export async function classifyWasteImage(imageFile) {
  const { base64, mimeType } = await fileToBase64(imageFile);

  const response = await wasteApi.scanWasteItem({
    imageBase64: base64,
    mimeType: mimeType,
  });

  if (response.data && response.data.success && response.data.data) {
    return response.data.data;
  } else {
    throw new Error(response.data?.error || "Failed to classify image.");
  }
}