import React, { useState } from 'react';

const CATEGORIES = [
  {
    name: 'Recyclables',
    icon: '♻️',
    color: '#1a8049',
    bg: '#d8f3e0',
    items: ['PET Water Bottles', 'Aluminium Cans', 'Cardboard Shipping Boxes', 'Glass Jars & Bottles'],
  },
  {
    name: 'Compost & Organics',
    icon: '🌱',
    color: '#27a05e',
    bg: '#e8f5ed',
    items: ['Fruit & Veggie Trimmings', 'Coffee Grounds & Filters', 'Eggshells & Nut Shells', 'Garden Leaves & Plant Trimmings'],
  },
  {
    name: 'E-Waste',
    icon: '💻',
    color: '#2563eb',
    bg: '#dbeafe',
    items: ['Lithium-Ion Batteries', 'Old Smartphones & Tablets', 'Chargers & Cables', 'Circuit Boards & Peripherals'],
  },
  {
    name: 'Hazardous',
    icon: '⚠️',
    color: '#dc2626',
    bg: '#fee2e2',
    items: ['Paint Cans & Solvents', 'Motor Oil Containers', 'Fluorescent Bulbs', 'Household Cleaners'],
  },
  {
    name: 'Landfill Trash',
    icon: '🗑️',
    color: '#475569',
    bg: '#f1f5f9',
    items: ['Styrofoam Containers', 'Soiled Food Wrappers', 'Broken Ceramics', 'Used Tissues & Wipes'],
  },
  {
    name: 'Textiles',
    icon: '👕',
    color: '#9333ea',
    bg: '#f3e8ff',
    items: ['Old Apparel & Tops', 'Worn Shoes & Sneakers', 'Fabric Scraps & Rags', 'Towels & Bed Sheets'],
  },
];

export default function Categories() {
  const [activeCategory, setActiveCategory] = useState(0);

  return (
    <section id="categories" className="py-24 px-6 bg-[#0e1f16]">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-[#1a8049]/40 text-[#7fd4a0] text-xs font-semibold px-3.5 py-1.5 rounded-full mb-5">
            Waste Categories
          </div>
          <h2 className="font-serif text-4xl lg:text-5xl font-bold text-white mb-4">
            Every type, covered
          </h2>
          <p className="text-[#7fd4a0] max-w-lg mx-auto">
            EcoSnap classifies across six major waste streams with item-level precision.
          </p>
        </div>

        {/* Tab Buttons */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {CATEGORIES.map((cat, index) => (
            <button
              key={cat.name}
              onClick={() => setActiveCategory(index)}
              className={`flex items-center gap-2 text-sm font-semibold px-5 py-2.5 rounded-full transition-all ${
                activeCategory === index
                  ? 'text-white shadow-lg scale-105'
                  : 'bg-[#1a3d27] text-[#7fd4a0] hover:bg-[#1f5035]'
              }`}
              style={activeCategory === index ? { backgroundColor: cat.color } : {}}
            >
              <span>{cat.icon}</span>
              <span>{cat.name}</span>
            </button>
          ))}
        </div>

        {/* Active Category Card */}
        <div className="max-w-2xl mx-auto">
          <div
            className="rounded-3xl p-8 transition-all shadow-xl"
            style={{ backgroundColor: CATEGORIES[activeCategory].bg }}
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="text-5xl">{CATEGORIES[activeCategory].icon}</div>
              <div>
                <h3
                  className="font-serif text-2xl font-bold"
                  style={{ color: CATEGORIES[activeCategory].color }}
                >
                  {CATEGORIES[activeCategory].name}
                </h3>
                <p className="text-sm text-[#3d6b50]">
                  Common items AI identifies in this stream
                </p>
              </div>
            </div>

            {/* Items Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {CATEGORIES[activeCategory].items.map(item => (
                <div
                  key={item}
                  className="flex items-center gap-2.5 bg-white/80 backdrop-blur-sm rounded-xl px-4 py-3 shadow-sm hover:bg-white transition-all"
                >
                  <div
                    className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                    style={{ backgroundColor: CATEGORIES[activeCategory].color }}
                  />
                  <span className="text-sm font-medium text-[#0e1f16]">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
