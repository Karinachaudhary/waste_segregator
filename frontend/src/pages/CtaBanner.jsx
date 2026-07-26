import React from 'react';

export default function CtaBanner() {
  return (
    <section className="py-20 px-6 bg-[#0e3f24] relative overflow-hidden">
      {/* Background Radial Highlight */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 80% 80% at 50% 50%, #156639 0%, transparent 70%)',
        }}
      />

      <div className="relative max-w-3xl mx-auto text-center z-10">
        <h2 className="font-serif text-4xl lg:text-5xl font-bold text-white mb-4">
          Start sorting right, today
        </h2>
        <p className="text-[#7fd4a0] text-lg mb-8">
          Join 480,000+ people who sort smarter with EcoSnap. Free forever for individuals.
        </p>

        <div className="flex flex-wrap justify-center gap-3">
          <button className="bg-white text-[#0e3f24] font-bold px-8 py-3.5 rounded-full hover:bg-[#f0faf3] transition-all hover:shadow-xl active:scale-95 text-sm">
            Get Started Free →
          </button>
          <button className="border border-[#27a05e] text-[#7fd4a0] font-semibold px-8 py-3.5 rounded-full hover:bg-[#12502e] transition-all text-sm">
            Request Team Demo
          </button>
        </div>
      </div>
    </section>
  );
}