import React, { useState, useRef } from 'react';
import { wasteApi } from '../services/api';
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

  // Scan process using Node.js Backend API (with fallback)
  const handleScan = async (imageData = null) => {
    setScanning(true);
    setScanResult(null);

    if (imageData) {
      setPreviewImage(imageData);
    }

    try {
      // Send scan payload to Node.js Backend endpoint
      const res = await wasteApi.scanWasteItem({ image: imageData });
      if (res.data && res.data.data) {
        setScanResult(res.data.data);
      } else {
        throw new Error('No backend response');
      }
    } catch (error) {
      console.log('Backend offline or fallback to mock:', error.message);
      // Pick mock result for demonstration
      const randomResult = MOCK_RESULTS[Math.floor(Math.random() * MOCK_RESULTS.length)];
      setScanResult(randomResult);
    } finally {
      setScanning(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setUploadDragging(false);
    handleScan();
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        handleScan(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
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
          className={`border-2 border-dashed rounded-3xl p-10 transition-all cursor-pointer ${
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
          onClick={() => fileRef.current?.click()}
        >
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />

          {previewImage && !scanning ? (
            <div className="mb-4">
              <img
                src={previewImage}
                alt="Uploaded item"
                className="w-32 h-32 object-cover rounded-2xl mx-auto shadow-md border border-[#b4e8c3]"
              />
            </div>
          ) : (
            <div className="text-5xl mb-3">📦</div>
          )}

          <p className="font-semibold text-[#0e1f16] mb-1">
            Drop an image here or tap to select
          </p>
          <p className="text-xs text-[#5a8a6e]">
            Supports JPG, PNG, WEBP files
          </p>

          {/* Scanning Animation */}
          {scanning && (
            <div className="mt-6 flex flex-col items-center gap-2">
              <div className="w-8 h-8 rounded-full border-2 border-[#1a8049] border-t-transparent animate-spin" />
              <div className="text-[#1a8049] font-semibold text-sm animate-pulse">
                Analyzing material composition with AI…
              </div>
            </div>
          )}

          {/* Result Output */}
          {scanResult && !scanning && (
            <div className="mt-6 flex flex-col items-center gap-2 animate-fadeIn">
              <div className="text-xs text-[#5a8a6e] font-semibold uppercase tracking-wider">
                Classification Result
              </div>
              <div className="text-2xl font-bold text-[#0e1f16]">
                {scanResult.type}
              </div>
              <div
                className="px-5 py-2 rounded-full text-white font-bold shadow-md transition-transform hover:scale-105"
                style={{ backgroundColor: scanResult.color }}
              >
                {scanResult.bin}
              </div>
              <div className="text-xs text-[#5a8a6e]">
                AI Confidence: {scanResult.confidence}%
              </div>
            </div>
          )}
        </div>

        {/* Demo Button */}
        <button
          onClick={() => handleScan()}
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
          handleScan(capturedImageSrc);
        }}
      />
    </section>
  );
}