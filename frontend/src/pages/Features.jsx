import React from 'react';

const FEATURES = [
  {
    icon: '📍',
    tag: 'Location Aware',
    title: 'Hyper-Local Rules',
    desc: 'Recycling rules differ by city. EcoSnap automatically applies your municipality’s exact sorting regulations.',
  },
  {
    icon: '⚡',
    tag: 'Sub-Second',
    title: 'Offline-First AI Model',
    desc: 'Runs lightweight computer vision on-device so you get instant results even with poor cellar or basement reception.',
  },
  {
    icon: '📊',
    tag: 'Analytics',
    title: 'Impact & CO₂ Tracker',
    desc: 'Log your waste habits, earn sustainability badges, and track your household’s carbon offset over time.',
  },
  {
    icon: '🏢',
    tag: 'Enterprise',
    title: 'Commercial Facilities',
    desc: 'Deploy EcoSnap kiosks or mobile SDKs in offices, universities, and stadiums to reduce waste contamination.',
  },
  {
    icon: '📱',
    tag: 'Mobile & Web',
    title: 'Cross-Platform SDK',
    desc: 'Seamless experience across iOS, Android, and web with zero app download required for quick web scans.',
  },
  {
    icon: '🌱',
    tag: 'Education',
    title: 'Prep & Cleaning Tips',
    desc: 'Learn whether to rinse, remove caps, or flatten items before throwing them into your local recycling bins.',
  },
];

export default function Features() {
  return (
    <section id="features" className="py-24 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-16 max-w-xl">
          <div className="inline-flex items-center gap-2 bg-[#d8f3e0] text-[#1a8049] text-xs font-semibold px-3.5 py-1.5 rounded-full mb-5 border border-[#b4e8c3]">
            Platform Features
          </div>
          <h2 className="font-serif text-4xl lg:text-5xl font-bold text-[#0e1f16] leading-tight">
            Built for real-world messy waste
          </h2>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {FEATURES.map(f => (
            <div
              key={f.title}
              className="group bg-white rounded-2xl p-7 border border-[#e8f5ed] hover:border-[#b4e8c3] hover:shadow-lg hover:shadow-[#0e1f16]/5 transition-all hover:-translate-y-0.5"
            >
              <div className="flex items-start justify-between mb-5">
                <div className="w-11 h-11 rounded-xl bg-[#f0faf3] flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                  {f.icon}
                </div>
                <span className="text-[10px] font-bold text-[#1a8049] bg-[#d8f3e0] px-2.5 py-1 rounded-full border border-[#b4e8c3]">
                  {f.tag}
                </span>
              </div>
              <h3 className="font-semibold text-[#0e1f16] text-lg mb-2">
                {f.title}
              </h3>
              <p className="text-sm text-[#5a8a6e] leading-relaxed">
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}