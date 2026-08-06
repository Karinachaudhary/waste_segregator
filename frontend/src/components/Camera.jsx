import React, { useRef, useState } from 'react';
import Webcam from 'react-webcam';

const videoConstraints = {
  width: 1280,
  height: 720,
  facingMode: 'environment', // Use rear camera on mobile devices if available
};

export default function Camera({ isOpen, onClose, onCaptureSuccess }) {
  const webcamRef = useRef(null);
  const [capturedImage, setCapturedImage] = useState(null);
  const [cameraError, setCameraError] = useState(false);

  if (!isOpen) return null;

  const handleCapture = () => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      if (imageSrc) {
        setCapturedImage(imageSrc);
      }
    }
  };

  const handleRetake = () => {
    setCapturedImage(null);
  };

  const handleConfirmAndScan = () => {
    if (capturedImage && onCaptureSuccess) {
      onCaptureSuccess(capturedImage);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-fadeIn">
      <div className="relative w-full max-w-lg bg-[#0e1f16] border border-[#27a05e]/40 rounded-3xl overflow-hidden shadow-2xl">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#0e3f24] border-b border-[#27a05e]/30 text-white">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#27a05e] animate-pulse" />
            <span className="font-semibold text-sm">Live AI Camera Scanner</span>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#12502e] hover:bg-red-500/20 hover:text-red-400 text-gray-300 flex items-center justify-center transition-colors text-lg"
          >
            ✕
          </button>
        </div>

        {/* Viewport Area */}
        <div className="relative w-full h-90 bg-black flex items-center justify-center overflow-hidden">
          {cameraError ? (
            <div className="text-center px-6 text-red-300 flex flex-col items-center gap-2">
              <div className="text-4xl mb-1">📷⚠️</div>
              <p className="text-sm font-semibold">Camera Access Denied or Unavailable</p>
              <p className="text-xs text-gray-400">Please allow camera permissions in your browser to scan items.</p>
              <button
                onClick={() => setCameraError(false)}
                className="mt-2 text-xs bg-[#1a8049] text-white px-4 py-1.5 rounded-full hover:bg-[#156639] transition-colors"
              >
                🔄 Retry Camera Permission
              </button>
            </div>
          ) : capturedImage ? (
            // Captured Snapshot Preview
            <div className="relative w-full h-full">
              <img
                src={capturedImage}
                alt="Captured Waste Item"
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 left-3 bg-[#1a8049] text-white text-xs px-3 py-1 rounded-full font-semibold">
                Photo Captured ✓
              </div>
            </div>
          ) : (
            // Live Webcam View
            <div className="relative w-full h-full flex items-center justify-center">
              <Webcam
                audio={false}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                videoConstraints={videoConstraints}
                onUserMediaError={() => setCameraError(true)}
                className="w-full h-full object-cover"
              />

              {/* Target Framing Box */}
              <div className="absolute inset-8 border-2 border-dashed border-[#48b978]/70 rounded-2xl pointer-events-none flex flex-col justify-between p-4">
                <div className="flex justify-between">
                  <div className="w-4 h-4 border-t-2 border-l-2 border-[#48b978]" />
                  <div className="w-4 h-4 border-t-2 border-r-2 border-[#48b978]" />
                </div>
                <div className="text-center text-[11px] text-[#7fd4a0] font-mono bg-black/40 backdrop-blur-xs py-1 rounded-full mx-auto px-3">
                  Center waste item in frame
                </div>
                <div className="flex justify-between">
                  <div className="w-4 h-4 border-b-2 border-l-2 border-[#48b978]" />
                  <div className="w-4 h-4 border-b-2 border-r-2 border-[#48b978]" />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Controls Footer */}
        <div className="p-5 bg-[#0e1f16] flex items-center justify-center gap-3">
          {capturedImage ? (
            <>
              <button
                onClick={handleRetake}
                className="flex-1 py-3 px-5 rounded-full border border-[#27a05e] text-[#7fd4a0] hover:bg-[#12502e] font-semibold text-sm transition-colors"
              >
                🔄 Retake Photo
              </button>
              <button
                onClick={handleConfirmAndScan}
                className="flex-1 py-3 px-5 rounded-full bg-[#1a8049] hover:bg-[#156639] text-white font-bold text-sm transition-all shadow-lg hover:shadow-[#1a8049]/30 active:scale-95"
              >
                ⚡ Analyze Item Now
              </button>
            </>
          ) : (
            <button
              onClick={handleCapture}
              disabled={cameraError}
              className="flex items-center gap-2 bg-[#1a8049] hover:bg-[#156639] disabled:opacity-50 text-white font-bold px-8 py-3.5 rounded-full transition-all shadow-xl hover:shadow-[#1a8049]/30 active:scale-95 text-sm"
            >
              <span className="w-3 h-3 rounded-full bg-white animate-ping" />
              Capture Photo
            </button>
          )}
        </div>
      </div>
    </div>
  );
}