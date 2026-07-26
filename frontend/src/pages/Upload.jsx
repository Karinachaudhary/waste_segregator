import React, { useState, useRef } from 'react';
import Camera from '../components/Camera';

const MOCK_RESULTS = [
  { type: 'PET Plastic Water Bottle', bin: 'Yellow Bin · Recyclable Plastic', color: '#1a8049', confidence: 99.4 },
  { type: 'Banana Peel & Organic Waste', bin: 'Green Bin · Organic Compost', color: '#27a05e', confidence: 98.6 },
  { type: 'Used Alkaline Battery', bin: 'Red Bin · Hazardous E-Waste', color: '#dc2626', confidence: 99.8 },
  { type: 'Cardboard Shipping Box', bin: 'Blue Bin · Paper & Cardboard', color: '#2563eb', confidence: 99.1 },
];

export default function Upload() {
  const fileRef = useRef(null);
  const [uploadDragging, setUploadDragging] = useState(false);
  const [scanning, setScanning] = useState(false);
  const [scanResult, setScanResult] = useState(null);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const [error, setError] = useState(null);

  // 1. Reset Handler (Clears screen for the next photo)
  const handleReset = () => {
    setScanResult(null);
    setScanning(false);
    setPreviewImage(null);
    setError(null);
    if (fileRef.current) {
      fileRef.current.value = "";
    }
  };

  // 2. Helper function to send Base64 payload to Node.js Backend
  const sendToBackend = async (base64Data, mimeType) => {
    try {
      const response = await fetch("http://localhost:5001/api/waste/scan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          imageBase64: base64Data,
          mimeType: mimeType,
        }),
      });

      const resData = await response.json();
      console.log("📥 Backend Response:", resData);

      if (resData.success && resData.data) {
        setScanResult(resData.data);
      } else {
        console.error("Backend error:", resData.error);
        setError(resData.error || "Failed to analyze image");
      }
    } catch (error) {
      console.error("Backend fetch failed:", error);
      setError("Server connection failed");
    } finally {
      setScanning(false);
    }
  };

  // 3. Scan and upload handler (Handles Camera, Files, and Drag-and-Drop)
  const handleFileSelected = async (fileOrBase64) => {
    if (!fileOrBase64) return;

    setScanning(true);
    setScanResult(null);
    setError(null);

    try {
      let base64Data = "";
      let mimeType = "image/jpeg";

      // CASE 1: Camera Data URL string
      if (typeof fileOrBase64 === "string") {
        setPreviewImage(fileOrBase64);
        if (fileOrBase64.startsWith("data:")) {
          mimeType = fileOrBase64.split(";")[0].split(":")[1] || "image/jpeg";
          base64Data = fileOrBase64.split(",")[1];
        } else {
          base64Data = fileOrBase64;
        }
        await sendToBackend(base64Data, mimeType);
      }
      // CASE 2: Image object
      else if (fileOrBase64.image || fileOrBase64.base64) {
        const imageStr = fileOrBase64.image || fileOrBase64.base64;
        setPreviewImage(imageStr);
        mimeType = fileOrBase64.mimeType || "image/jpeg";
        base64Data = imageStr.includes(",") ? imageStr.split(",")[1] : imageStr;
        await sendToBackend(base64Data, mimeType);
      }
      // CASE 3: Standard File / Blob object
      else if (fileOrBase64 instanceof Blob || fileOrBase64 instanceof File) {
        mimeType = fileOrBase64.type || "image/jpeg";
        
        // Generate preview URL
        const previewUrl = URL.createObjectURL(fileOrBase64);
        setPreviewImage(previewUrl);

        const reader = new FileReader();
        reader.readAsDataURL(fileOrBase64);

        reader.onload = async () => {
          base64Data = reader.result.split(",")[1];
          await sendToBackend(base64Data, mimeType);
        };
      } else {
        throw new Error("Unsupported image format received");
      }
    } catch (err) {
      console.error("Upload Error:", err);
      setError(err.message);
      setScanning(false);
    }
  };

  // 4. Drag and Drop handlers
  const handleDrop = (e) => {
    e.preventDefault();
    setUploadDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFileSelected(file);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) handleFileSelected(file);
  };

  // 5. Demo Item Scanner Fallback
  const handleDemoScan = () => {
    setScanning(true);
    setScanResult(null);
    setPreviewImage(null);
    setTimeout(() => {
      const randomDemo = MOCK_RESULTS[Math.floor(Math.random() * MOCK_RESULTS.length)];
      setScanResult(randomDemo);
      setScanning(false);
    }, 1500);
  };

  return (
    <section id="upload" className="py-20 px-6 bg-[#f0faf3]">
    <section id="upload" className="py-20 px-6 bg-[#f0faf3]">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="font-serif text-4xl font-bold text-[#0e1f16] mb-4">
          Try it right now
        </h2>
        <p className="text-[#3d6b50] mb-8">
          No sign-up needed. Open your camera or drop any waste item image for instant AI classification.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          <button
            onClick={() => setIsCameraOpen(true)}
            className="flex items-center gap-2 bg-[#1a8049] text-white font-bold px-7 py-3.5 rounded-full hover:bg-[#156639] transition-all hover:shadow-lg hover:shadow-[#1a8049]/25 active:scale-95 text-sm"
          >
            📷 Open Live Camera Scanner
          </button>
          <button
            onClick={() => fileRef.current?.click()}
            className="flex items-center gap-2 border border-[#b4e8c3] text-[#1a8049] font-semibold px-7 py-3.5 rounded-full hover:bg-[#d8f3e0] transition-all text-sm"
          >
            📁 Upload Image File
          </button>
        </div>

        {/* Dropzone Container */}
        <div
          className={`border-2 border-dashed rounded-3xl p-10 transition-all ${
            uploadDragging
              ? 'border-[#27a05e] bg-[#d8f3e0]'
              : 'border-[#b4e8c3] bg-white hover:border-[#48b978] hover:bg-[#f0faf3]'
          }`}
          onDragOver={(e) => {
            e.preventDefault();
            setUploadDragging(true);
          }}
          onDragLeave={() => setUploadDragging(false)}
          onDrop={handleDrop}
        >
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />

          {/* Image Preview */}
          {previewImage && !scanning && (
            <div className="mb-4">
              <img
                src={previewImage}
                alt="Uploaded item"
                className="w-36 h-36 object-cover rounded-2xl mx-auto shadow-md border border-[#b4e8c3]"
              />
            </div>
          )}

          {!previewImage && !scanning && !scanResult && (
            <>
              <div className="text-5xl mb-3">📦</div>
              <p className="font-semibold text-[#0e1f16] mb-1">
                Drop an image here or click buttons above to select
              </p>
              <p className="text-xs text-[#5a8a6e]">
                Supports JPG, PNG, WEBP files
              </p>
            </>
          )}

          {/* Scanning Animation */}
          {scanning && (
            <div className="py-6 flex flex-col items-center gap-3">
              <div className="w-10 h-10 rounded-full border-3 border-[#1a8049] border-t-transparent animate-spin" />
              <div className="text-[#1a8049] font-semibold text-sm animate-pulse">
                Analyzing material composition with AI…
              </div>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="mt-4 text-red-600 text-sm font-semibold bg-red-50 py-2 px-4 rounded-full inline-block">
              ⚠️ {error}
            </div>
          )}

          {/* Result Output Card */}
          {scanResult && !scanning && (
            <div className="mt-4 flex flex-col items-center gap-3 animate-fadeIn">
              <div className="text-xs text-[#5a8a6e] font-semibold uppercase tracking-wider">
                AI Classification Result
              </div>
              <div className="text-2xl font-bold text-[#0e1f16]">
                {scanResult.type}
              </div>
              <div
                className="px-6 py-2.5 rounded-full text-white font-bold text-base shadow-md transition-transform hover:scale-105"
                style={{ backgroundColor: scanResult.color || '#1a8049' }}
              >
                {scanResult.bin}
              </div>
              <div className="text-xs text-[#5a8a6e]">
                AI Confidence: {scanResult.confidence}%
              </div>

              {/* Reset / Scan Another Item Button */}
              <button
                onClick={handleReset}
                className="mt-4 bg-[#1a8049] text-white text-sm font-semibold px-6 py-2.5 rounded-full hover:bg-[#156639] transition-all hover:shadow-md active:scale-95 flex items-center gap-2"
              >
                🔄 Scan Another Item
              </button>
            </div>
          )}
        </div>

        {/* Demo Button */}
        <button
          onClick={handleDemoScan}
          className="mt-6 text-sm text-[#1a8049] hover:text-[#156639] font-semibold underline transition-colors"
        >
          Or scan a demo item →
        </button>
      </div>

      {/* Live Camera Modal */}
      <Camera
        isOpen={isCameraOpen}
        onClose={() => setIsCameraOpen(false)}
        onCaptureSuccess={(capturedImageSrc) => {
          handleFileSelected(capturedImageSrc);
        }}
      />
    </section>
  </section>
  );
}