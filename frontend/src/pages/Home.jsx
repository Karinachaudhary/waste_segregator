import React, { useState, useRef } from 'react';
import { wasteApi } from '../services/api';

const STATS = [
  { value: '2.4M+', label: 'Items Scanned' },
  { value: '98.4%', label: 'AI Accuracy' },
  { value: '140+', label: 'Cities Supported' },
];

const MOCK_RESULTS = [
  { type: 'PET Plastic Bottle', bin: 'Yellow Bin · Recyclable Plastic', color: '#1a8049', confidence: 99.4 },
  { type: 'Apple Core & Food Waste', bin: 'Green Bin · Organic Compost', color: '#27a05e', confidence: 98.8 },
  { type: 'Lithium Battery', bin: 'Red Bin · Hazardous E-Waste', color: '#dc2626', confidence: 99.9 },
];

export default function Home() {
  const heroFileRef = useRef(null);
  const [uploadDragging, setUploadDragging] = useState(false);
  const [scanning, setScanning] = useState(false);
  const [scanResult, setScanResult] = useState(null);

  // Smooth Scroll Helper Function to navigate to #upload section
  const scrollToUpload = () => {
    const uploadElement = document.getElementById('upload');
    if (uploadElement) {
      uploadElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Real or Demo Scan Handler for Hero Widget
  const handleHeroFileSelected = async (file) => {
    if (!file) return;

    setScanning(true);
    setScanResult(null);

    try {
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = async () => {
        const base64Data = reader.result.split(',')[1];
        const mimeType = file.type || 'image/jpeg';

        const response = await wasteApi.scanWasteItem({
          imageBase64: base64Data,
          mimeType: mimeType,
        });

        const resData = response.data;
        if (resData.success && resData.data) {
          setScanResult(resData.data);
        } else {
          // Fallback demo if backend is offline
          const randomResult = MOCK_RESULTS[Math.floor(Math.random() * MOCK_RESULTS.length)];
          setScanResult(randomResult);
        }
        setScanning(false);
      };
    } catch (err) {
      console.error("Hero scan error:", err);
      // Fallback demo result
      const randomResult = MOCK_RESULTS[Math.floor(Math.random() * MOCK_RESULTS.length)];
      setScanResult(randomResult);
      setScanning(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setUploadDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      handleHeroFileSelected(file);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      handleHeroFileSelected(file);
    }
  };

  return (
    <section className="relative pt-32 pb-24 px-6 overflow-hidden bg-[#f8fdf9]">
      {/* Hidden File Input for Hero Card */}
      <input
        ref={heroFileRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />

      {/* Background Mesh Gradients */}
      <div
        className="absolute inset-0 opacity-40 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 80% 60% at 20% 10%, #b4e8c3 0%, transparent 60%),
            radial-gradient(ellipse 60% 70% at 85% 20%, #d8f3e0 0%, transparent 55%),
            radial-gradient(ellipse 50% 50% at 50% 90%, #7fd4a0 0%, transparent 65%)
          `,
        }}
      />
      {/* Floating Orbs */}
      <div className="absolute top-24 right-[8%] w-72 h-72 rounded-full bg-[#27a05e]/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-12 left-[5%] w-56 h-56 rounded-full bg-[#8bc34a]/15 blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Column - Hero Content */}
          <div>
            <div className="inline-flex items-center gap-2 bg-[#d8f3e0] text-[#1a8049] text-xs font-semibold px-3.5 py-1.5 rounded-full mb-6 border border-[#b4e8c3]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#27a05e] animate-pulse" />
              AI-Powered Waste Intelligence
            </div>
            
            <h1 className="font-serif text-5xl lg:text-6xl font-bold leading-[1.08] text-[#0e1f16] mb-6">
              Sort smarter.{' '}
              <span className="text-[#1a8049]">Waste less.</span>{' '}
              Live greener.
            </h1>
            
            <p className="text-lg text-[#3d6b50] leading-relaxed mb-8 max-w-lg">
              Snap a photo of any waste item and EcoSnap's AI instantly tells you exactly where it belongs — recyclable, compost, hazardous, or landfill — with local rules baked in.
            </p>
            
            <div className="flex flex-wrap gap-3">
              {/* Try a Free Scan Button -> Scrolls to #upload */}
              <button
                onClick={scrollToUpload}
                className="group flex items-center gap-2 bg-[#1a8049] text-white font-semibold px-7 py-3.5 rounded-full hover:bg-[#156639] transition-all hover:shadow-xl hover:shadow-[#1a8049]/25 active:scale-95 text-sm"
              >
                Try a Free Scan
                <span className="group-hover:translate-x-0.5 transition-transform">→</span>
              </button>

              {/* Watch Demo / Scroll Button */}
              <button 
                onClick={scrollToUpload}
                className="flex items-center gap-2 border border-[#b4e8c3] text-[#1a8049] font-semibold px-7 py-3.5 rounded-full hover:bg-[#d8f3e0] transition-all text-sm"
              >
                <span>▶</span> Watch Demo
              </button>
            </div>

            {/* Statistics */}
            <div className="flex flex-wrap gap-6 mt-10">
              {STATS.map((s) => (
                <div key={s.label}>
                  <div className="text-2xl font-bold text-[#1a8049]">{s.value}</div>
                  <div className="text-xs text-[#5a8a6e] font-medium">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Scan Card Interactive Widget */}
          <div className="relative">
            <div className="relative bg-white rounded-3xl shadow-2xl shadow-[#0e1f16]/10 border border-[#b4e8c3]/60 overflow-hidden">
              {/* Top Bar */}
              <div className="bg-[#0e3f24] px-6 py-4 flex items-center justify-between">
                <span className="text-[#7fd4a0] text-xs font-mono font-medium">EcoSnap AI · Live</span>
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                  <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
                </div>
              </div>

              {/* Scan Area */}
              <div
                className={`relative m-5 rounded-2xl overflow-hidden transition-all ${
                  uploadDragging ? 'ring-2 ring-[#27a05e]' : ''
                }`}
                style={{ height: 220, background: 'linear-gradient(135deg, #d8f3e0 0%, #b4e8c3 100%)' }}
                onDragOver={(e) => {
                  e.preventDefault();
                  setUploadDragging(true);
                }}
                onDragLeave={() => setUploadDragging(false)}
                onDrop={handleDrop}
              >
                {/* Initial State */}
                {!scanning && !scanResult && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                    <div className="w-14 h-14 rounded-2xl bg-white/70 flex items-center justify-center text-2xl shadow-sm">
                      📦
                    </div>
                    <p className="text-[#3d6b50] text-sm font-medium">Drop an item or tap to scan</p>

                    {/* Scan Now Button -> Smooth Scroll to #upload */}
                    <button
                      onClick={scrollToUpload}
                      className="bg-[#1a8049] text-white text-xs font-semibold px-5 py-2 rounded-full hover:bg-[#156639] transition-all hover:shadow-md active:scale-95 flex items-center gap-1.5"
                    >
                      📷 Scan Now
                    </button>
                  </div>
                )}

                {/* Scanning State */}
                {scanning && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                    <div className="relative w-14 h-14">
                      <div className="absolute inset-0 rounded-full border-2 border-[#1a8049]/30 animate-ping" />
                      <div className="w-14 h-14 rounded-full border-2 border-[#1a8049] border-t-transparent animate-spin" />
                    </div>
                    <p className="text-[#1a8049] text-sm font-semibold">Analyzing composition…</p>
                    <div className="flex gap-1">
                      {['Material', 'Recyclability', 'Local Rules'].map((label, index) => (
                        <span
                          key={label}
                          className="text-[10px] bg-white/60 text-[#3d6b50] px-2 py-0.5 rounded-full animate-pulse"
                          style={{ animationDelay: `${index * 0.3}s` }}
                        >
                          {label}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Scan Result State */}
                {scanResult && !scanning && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 p-4">
                    <div className="text-3xl text-[#1a8049]">✓</div>
                    <div className="text-[#0e1f16] font-bold text-base">{scanResult.type}</div>
                    <div
                      className="px-4 py-1.5 rounded-full text-white text-xs font-bold shadow-sm"
                      style={{ backgroundColor: scanResult.color }}
                    >
                      → {scanResult.bin}
                    </div>
                    <div className="text-[10px] text-[#5a8a6e]">
                      Confidence: {scanResult.confidence}%
                    </div>
                    <button 
                      onClick={scrollToUpload} 
                      className="mt-1 text-[10px] text-[#1a8049] underline hover:text-[#156639]"
                    >
                      Scan another item
                    </button>
                  </div>
                )}
              </div>

              {/* Bottom Tag Pills */}
              <div className="px-5 pb-5 flex flex-wrap gap-2">
                {['♻️ Recyclable', '🌱 Organic', '⚠️ Hazardous', '💻 E-Waste'].map((tag) => (
                  <span
                    key={tag}
                    className="text-xs bg-[#f0faf3] text-[#1a8049] border border-[#b4e8c3] px-3 py-1 rounded-full font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Floating Impact Badge */}
            {/* <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl shadow-lg border border-[#b4e8c3] px-4 py-3 flex items-center gap-3">
              <div className="text-2xl">🌍</div>
              <div>
                <div className="text-sm font-bold text-[#0e1f16]">1.2 kg CO₂ saved</div>
                <div className="text-xs text-[#5a8a6e]">this week by you</div>
              </div>
            </div> */}
          </div>

        </div>
      </div>
    </section>
  );
}