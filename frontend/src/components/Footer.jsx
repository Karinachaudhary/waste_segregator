import React from 'react';

const SOCIAL_ICONS = ['𝕏', 'in', '📘'];

const FOOTER_COLUMNS = [
  {
    heading: 'Product',
    links: ['How It Works', 'AI Model', 'Accuracy Reports', 'Mobile App', 'API Access'],
  },
  {
    heading: 'Company',
    links: ['About Us', 'Blog', 'Press', 'Careers', 'Partners'],
  },
  {
    heading: 'Support',
    links: ['Help Center', 'Community', 'Feedback', 'Privacy Policy', 'Terms of Use'],
  },
];

export default function Footer() {
  return (
    <footer className="bg-[#072416] text-[#5a8a6e] py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-10 mb-12">
          {/* Brand & Socials Column */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-lg bg-[#1a8049] flex items-center justify-center text-white text-sm font-bold">
                E
              </div>
              <span className="font-bold text-white text-lg">EcoSnap</span>
            </div>
            <p className="text-sm leading-relaxed mb-4">
              AI-powered waste segregation for a cleaner planet. Making every disposal decision count.
            </p>
            <div className="flex gap-3">
              {SOCIAL_ICONS.map((icon, index) => (
                <button
                  key={index}
                  className="w-8 h-8 rounded-lg bg-[#0e3f24] flex items-center justify-center text-xs hover:bg-[#1a8049] hover:text-white transition-all focus:outline-none"
                  aria-label="Social Link"
                >
                  {icon}
                </button>
              ))}
            </div>
          </div>

          {/* Dynamic Link Columns */}
          {FOOTER_COLUMNS.map(col => (
            <div key={col.heading}>
              <h4 className="text-white font-semibold text-sm mb-4">
                {col.heading}
              </h4>
              <ul className="space-y-2.5">
                {col.links.map(link => (
                  <li key={link}>
                    <a
                      href={`#${link.toLowerCase().replace(/\s+/g, '-')}`}
                      className="text-sm hover:text-[#48b978] transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-[#0e3f24] pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
          <p>© 2026 EcoSnap Technologies Inc. All rights reserved.</p>
          <p className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#27a05e]" />
            All systems operational · 99.97% uptime
          </p>
        </div>
      </div>
    </footer>
  );
}