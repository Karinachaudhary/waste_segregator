import React from 'react';

const STEPS = [
  {
    num: '01',
    icon: '📸',
    title: 'Snap a Photo',
    desc: 'Point your camera at any waste item. Our AI instantly analyzes material, texture, and packaging indicators.',
  },
  {
    num: '02',
    icon: '⚡',
    title: 'Instant AI Analysis',
    desc: 'EcoSnap matches your item against local municipal waste rules and city recycling guidelines in real-time.',
  },
  {
    num: '03',
    icon: '♻️',
    title: 'Dispose Correctly',
    desc: 'Get clear instructions on which bin to use, prep steps (like rinsing or capping), and nearby drop-off hubs.',
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 px-6 bg-[#0e3f24] relative overflow-hidden">
      {/* Background Dot Pattern */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle at center, #27a05e 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />

      <div className="relative max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-[#1a8049] text-[#7fd4a0] text-xs font-semibold px-3.5 py-1.5 rounded-full mb-5">
            Simple Process
          </div>
          <h2 className="font-serif text-4xl lg:text-5xl font-bold text-white mb-4">
            Three steps to zero confusion
          </h2>
          <p className="text-[#7fd4a0] text-lg max-w-xl mx-auto">
            From snap to sorted in under three seconds. No recycling expertise required.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-10">
          {STEPS.map((step, index) => (
            <div key={step.num} className="relative">
              {/* Connector line between cards on desktop */}
              {index < STEPS.length - 1 && (
                <div className="hidden md:block absolute top-10 left-[60%] w-full h-px border-t-2 border-dashed border-[#27a05e]/40 z-0 pointer-events-none" />
              )}
              
              {/* Step Card */}
              <div className="relative z-10 bg-[#12502e] rounded-2xl p-8 border border-[#27a05e]/30 hover:border-[#48b978]/50 transition-all hover:-translate-y-1 group">
                <div className="text-[#48b978]/60 font-mono text-xs font-bold mb-4">
                  {step.num}
                </div>
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">
                  {step.icon}
                </div>
                <h3 className="font-semibold text-white text-xl mb-3">
                  {step.title}
                </h3>
                <p className="text-[#7fd4a0] text-sm leading-relaxed">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
