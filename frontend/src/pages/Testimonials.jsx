import React from 'react';

const TESTIMONIALS = [
  {
    quote: "EcoSnap completely removed the guesswork for our household. I now scan every packaging item before throwing it away!",
    name: "Sanita",
    role: "Eco-conscious Homeowner",
    avatar: "SJ",
    color: "#1a8049",
  },
  {
    quote: "We deployed EcoSnap across our campus food halls. Waste sorting contamination dropped by 42% in just two months.",
    name: "Karina",
    role: "Sustainability Director, TechUni",
    avatar: "DC",
    color: "#27a05e",
  },
  {
    quote: "The hyper-local municipal rules feature is incredible. What's recyclable in my town isn't in the next city over!",
    name: "Sneha",
    role: "Zero-Waste Advocate",
    avatar: "ER",
    color: "#2563eb",
  },
];

export default function Testimonials() {
  return (
    <section className="py-24 px-6 bg-[#f8fdf9]">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-[#d8f3e0] text-[#1a8049] text-xs font-semibold px-3.5 py-1.5 rounded-full mb-5 border border-[#b4e8c3]">
            From the Community
          </div>
          <h2 className="font-serif text-4xl font-bold text-[#0e1f16]">
            Real users, real impact
          </h2>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {TESTIMONIALS.map(t => (
            <div
              key={t.name}
              className="bg-white rounded-2xl p-7 border border-[#e8f5ed] hover:border-[#b4e8c3] hover:shadow-lg hover:shadow-[#0e1f16]/5 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="text-4xl text-[#b4e8c3] font-serif leading-none mb-3">"</div>
                <p className="text-[#0e1f16] text-sm leading-relaxed mb-6">
                  {t.quote}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0 shadow-sm"
                  style={{ backgroundColor: t.color }}
                >
                  {t.avatar}
                </div>
                <div>
                  <div className="font-semibold text-[#0e1f16] text-sm">{t.name}</div>
                  <div className="text-xs text-[#5a8a6e]">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}