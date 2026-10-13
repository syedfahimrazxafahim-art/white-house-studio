import React from 'react';
import { STUDIO_DETAILS } from '../data/photography';
import { ArrowUp, Instagram, Facebook, Mail, Phone } from 'lucide-react';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#050505] text-[#D4D4D8] border-t border-[#27272A]/70 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 pb-12 border-b border-[#27272A]/50">
          {/* Logo & Base */}
          <div className="flex items-center gap-4">
            <img
              src={STUDIO_DETAILS.logoUrl}
              alt="White House studio logo"
              className="h-10 w-auto object-contain"
              referrerPolicy="no-referrer"
            />
            <div className="border-l border-[#27272A] pl-4">
              <span className="text-xs uppercase tracking-[0.2em] text-[#8E8E93] block">
                {STUDIO_DETAILS.location}
              </span>
              <span className="text-[11px] text-[#A1A1AA] tracking-wider">
                Wedding Photography
              </span>
            </div>
          </div>

          {/* Direct verified links */}
          <div className="flex flex-wrap items-center gap-6 text-xs tracking-wider uppercase">
            <a
              href={`mailto:${STUDIO_DETAILS.email}`}
              className="flex items-center gap-2 hover:text-white transition-colors"
            >
              <Mail size={13} />
              <span>{STUDIO_DETAILS.email}</span>
            </a>
            <a
              href={`tel:${STUDIO_DETAILS.phoneTel}`}
              className="flex items-center gap-2 hover:text-white transition-colors"
            >
              <Phone size={13} />
              <span>{STUDIO_DETAILS.phone}</span>
            </a>
            <a
              href={STUDIO_DETAILS.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:text-white transition-colors"
            >
              <Instagram size={13} />
              <span>Instagram</span>
            </a>
            <a
              href={STUDIO_DETAILS.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:text-white transition-colors"
            >
              <Facebook size={13} />
              <span>Facebook</span>
            </a>
          </div>

          {/* Back to top button */}
          <button
            type="button"
            onClick={scrollToTop}
            className="p-2.5 bg-[#101010] border border-[#27272A] hover:border-[#D4D4D8] text-[#D4D4D8] hover:text-white transition-colors focus:outline-none"
            aria-label="Scroll back to top of page"
          >
            <ArrowUp size={16} />
          </button>
        </div>

        {/* Bottom copyright row */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#8E8E93]">
          <p>© {currentYear} {STUDIO_DETAILS.name}. All rights reserved.</p>
          <div className="flex items-center gap-6 text-[11px] tracking-wider uppercase">
            <span>New York</span>
            <span aria-hidden="true">·</span>
            <span>Editorial & Fine Art</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
