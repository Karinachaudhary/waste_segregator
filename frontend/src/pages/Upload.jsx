import React, { useState, useRef } from 'react';

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

  // Simulated AI scan process
  const simulateScan = () => {
    setScanning(true);
    setScanResult(null);

    setTimeout(() => {
      setScanning(false);
      const randomResult = MOCK_RESULTS[Math.floor(Math.random() * MOCK_RESULTS.length)];
      setScanResult(randomResult);
    }, 1800);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setUploadDragging(false);
    simulateScan();
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      simulateScan();
    }
  };

  return (
    <section className="py-20 px-6 bg-[#f0faf3]">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="font-serif text-4xl font-bold text-[#0e1f16] mb-4">
          Try it right now
        </h2>
        <p className="text-[#3d6b50] mb-8">
          No sign-up needed. Drop any waste item image and get an instant classification.
        </p>

        {/* Dropzone Container */}
        <div
          className={`border-2 border-dashed rounded-3xl p-12 transition-all cursor-pointer ${
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

          <div className="text-5xl mb-4">📷</div>
          <p className="font-semibold text-[#0e1f16] mb-1">Drop a photo here</p>
          <p className="text-sm text-[#5a8a6e]">
            or click to browse · JPG, PNG, WEBP supported
          </p>

          {/* Scanning Animation */}
          {scanning && (
            <div className="mt-6 flex flex-col items-center gap-2">
              <div className="w-8 h-8 rounded-full border-2 border-[#1a8049] border-t-transparent animate-spin" />
              <div className="text-[#1a8049] font-semibold animate-pulse">
                Analyzing material & composition…
              </div>
            </div>
          )}

          {/* Result Output */}
          {scanResult && !scanning && (
            <div className="mt-6 flex flex-col items-center gap-2 animate-fadeIn">
              <div className="text-xs text-[#5a8a6e] font-semibold uppercase tracking-wider">
                Detected Item
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
              <div className="text-sm text-[#5a8a6e]">
                AI Confidence: {scanResult.confidence}%
              </div>
            </div>
          )}
        </div>

        {/* Demo Button */}
        <button
          onClick={simulateScan}
          className="mt-6 bg-[#1a8049] text-white font-semibold px-8 py-3.5 rounded-full hover:bg-[#156639] transition-all hover:shadow-lg hover:shadow-[#1a8049]/25 active:scale-95 text-sm"
        >
          Or scan a demo item →
        </button>
      </div>
    </section>
  );
}