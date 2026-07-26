import React, { useState } from 'react';

const NAV_LINKS = ['How It Works', 'Features', 'Categories', 'About'];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#f8fdf9]/90 backdrop-blur-md border-b border-[#b4e8c3]/50">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-[#1a8049] flex items-center justify-center text-white text-sm font-bold">
            E
          </div>
          <span className="font-bold text-lg tracking-tight text-[#0e1f16]">
            EcoSnap
          </span>
        </a>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map(link => (
            <a
              key={link}
              href={`#${link.toLowerCase().replace(/\s+/g, '-')}`}
              className="text-sm font-medium text-[#3d6b50] hover:text-[#1a8049] transition-colors"
            >
              {link}
            </a>
          ))}
        </div>

        {/* Desktop Action Buttons */}
        <div className="hidden md:flex items-center gap-3">
          <button className="text-sm font-medium text-[#1a8049] hover:text-[#156639] transition-colors px-4 py-2">
            Sign In
          </button>
          <button className="text-sm font-semibold bg-[#1a8049] text-white px-5 py-2 rounded-full hover:bg-[#156639] transition-all hover:shadow-lg hover:shadow-[#1a8049]/20 active:scale-95">
            Get Started Free
          </button>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          className="md:hidden w-9 h-9 flex flex-col items-center justify-center gap-1.5 focus:outline-none"
          onClick={() => setMenuOpen(v => !v)}
          aria-label="Toggle Navigation Menu"
        >
          <span
            className={`block w-5 h-0.5 bg-[#1a8049] transition-all duration-300 ${
              menuOpen ? 'rotate-45 translate-y-2' : ''
            }`}
          />
          <span
            className={`block w-5 h-0.5 bg-[#1a8049] transition-all duration-300 ${
              menuOpen ? 'opacity-0' : ''
            }`}
          />
          <span
            className={`block w-5 h-0.5 bg-[#1a8049] transition-all duration-300 ${
              menuOpen ? '-rotate-45 -translate-y-2' : ''
            }`}
          />
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="md:hidden bg-[#f8fdf9] border-t border-[#b4e8c3]/50 px-6 py-4 flex flex-col gap-4">
          {NAV_LINKS.map(link => (
            <a
              key={link}
              href={`#${link.toLowerCase().replace(/\s+/g, '-')}`}
              className="text-sm font-medium text-[#3d6b50] hover:text-[#1a8049] transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              {link}
            </a>
          ))}
          <button className="text-sm font-semibold bg-[#1a8049] text-white px-5 py-2.5 rounded-full text-center hover:bg-[#156639] transition-colors">
            Get Started Free
          </button>
        </div>
      )}
    </nav>
  );
}