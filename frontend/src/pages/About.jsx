import React from 'react';

const MISSION_STATS = [
  { val: '25%', txt: 'of recycling is contaminated globally' },
  { val: '91M', txt: 'tons of plastic generated yearly' },
  { val: '3s', txt: 'average EcoSnap scan time' },
  { val: '0', txt: 'photos stored without consent' },
];

export default function About() {
  return (
    <section id="about" className="py-24 px-6 bg-[#f0faf3]">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
        {/* Left Column: Text & Stats Grid */}
        <div>
          <div className="inline-flex items-center gap-2 bg-[#d8f3e0] text-[#1a8049] text-xs font-semibold px-3.5 py-1.5 rounded-full mb-6 border border-[#b4e8c3]">
            Our Mission
          </div>
          <h2 className="font-serif text-4xl lg:text-5xl font-bold text-[#0e1f16] leading-tight mb-6">
            Recycling confusion costs the planet
          </h2>
          <p className="text-[#3d6b50] leading-relaxed mb-4">
            An estimated 25% of materials placed in recycling bins are contaminated — meaning the entire load often ends up in landfill anyway. Wishful recycling is a real problem with a real cost.
          </p>
          <p className="text-[#3d6b50] leading-relaxed mb-8">
            EcoSnap was built on one conviction: people want to do the right thing, they just need frictionless, accurate guidance. We combine computer vision, materials science, and real-time local data to eliminate that friction.
          </p>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-4">
            {MISSION_STATS.map(item => (
              <div key={item.txt} className="bg-white rounded-xl p-4 border border-[#b4e8c3]/50 shadow-sm hover:shadow-md transition-shadow">
                <div className="text-2xl font-bold text-[#1a8049]">{item.val}</div>
                <div className="text-xs text-[#5a8a6e] mt-0.5 leading-snug">{item.txt}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Hero Image with Floating Badge */}
        <div className="relative">
          <img
            src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=700&h=600&fit=crop&auto=format"
            alt="Person sorting recyclables at a community recycling station"
            className="w-full h-[420px] object-cover rounded-3xl shadow-xl border border-[#b4e8c3]/40"
          />
          
          {/* Overlay Badge */}
          <div className="absolute bottom-6 left-6 right-6 bg-white/90 backdrop-blur-sm rounded-2xl p-4 border border-[#b4e8c3] shadow-lg">
            <div className="flex items-center gap-3">
              <div className="text-3xl">🌿</div>
              <div>
                <div className="font-semibold text-[#0e1f16] text-sm">Carbon-neutral infrastructure</div>
                <div className="text-xs text-[#5a8a6e]">EcoSnap's servers run on 100% renewable energy</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}