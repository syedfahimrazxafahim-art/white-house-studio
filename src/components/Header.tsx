import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { STUDIO_DETAILS } from '../data/photography';
import { LiquidMetalButton } from './LiquidMetalButton';

interface HeaderProps {
  onOpenBooking?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenBooking }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Portfolio', href: '#portfolio' },
    { label: 'About', href: '#about' },
    { label: 'Approach', href: '#approach' },
    { label: 'FAQ', href: '#faq' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-[#050505]/92 backdrop-blur-md border-b border-[#27272A]/60 py-3.5 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.8)]'
          : 'bg-gradient-to-b from-[#050505]/80 via-[#050505]/30 to-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10 flex items-center justify-between gap-8">
        {/* Zone 1: Provided White House studio logo asset */}
        <a
          href="#hero"
          className="flex items-center gap-3.5 group focus:outline-none"
          aria-label="White House studio - Home"
        >
          <img
            src={STUDIO_DETAILS.logoUrl}
            alt="White House studio logo"
            className="h-11 md:h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-[1.02]"
            referrerPolicy="no-referrer"
          />
        </a>

        {/* Zone 2: Navigation Links (single-line, clean typography) */}
        <nav
          className="hidden md:flex items-center gap-8 text-[13px] tracking-[0.16em] uppercase font-light text-[#D4D4D8]"
          aria-label="Main Navigation"
        >
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="relative py-1 whitespace-nowrap text-[#D4D4D8] hover:text-[#F5F5F2] transition-colors duration-200 group"
            >
              <span>{link.label}</span>
              <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#F5F5F2] transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>

        {/* Zone 3: Booking CTA & Mobile Toggle */}
        <div className="flex items-center gap-4">
          <div className="hidden sm:block">
            <LiquidMetalButton
              href="#contact"
              onClick={onOpenBooking}
              variant="secondary"
              className="!py-2.5 !px-5 !text-[11px]"
            >
              Reserve Date
            </LiquidMetalButton>
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-[#F5F5F2] hover:text-white transition-colors focus:outline-none"
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-x-0 top-full bg-[#0A0A0A] border-b border-[#27272A] px-6 py-8 shadow-2xl transition-all">
          <nav className="flex flex-col gap-6" aria-label="Mobile Navigation">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-base tracking-[0.18em] uppercase font-light text-[#D4D4D8] hover:text-[#F5F5F2] transition-colors"
              >
                {link.label}
              </a>
            ))}
            <div className="pt-4 border-t border-[#27272A]/60 flex flex-col gap-4">
              <LiquidMetalButton
                href="#contact"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenBooking?.();
                }}
                variant="primary"
                className="w-full justify-center !py-3"
              >
                Reserve Date
              </LiquidMetalButton>
              <div className="flex items-center justify-between text-xs text-[#8E8E93] pt-2">
                <span>{STUDIO_DETAILS.location}</span>
                <a
                  href={`tel:${STUDIO_DETAILS.phoneTel}`}
                  className="hover:text-[#F5F5F2] transition-colors"
                >
                  {STUDIO_DETAILS.phone}
                </a>
              </div>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
