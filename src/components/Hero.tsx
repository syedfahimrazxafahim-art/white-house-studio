import React, { useState } from 'react';
import { motion } from 'motion/react';
import { STUDIO_DETAILS } from '../data/photography';
import { WaveGridCanvas } from './WaveGridCanvas';
import { FlipFadeText } from './FlipFadeText';
import { LiquidMetalButton } from './LiquidMetalButton';
import { ArrowDown, Camera } from 'lucide-react';

export const Hero: React.FC = () => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <section
      id="hero"
      className="relative w-full min-h-[100svh] flex flex-col justify-between overflow-hidden bg-[#050505]"
    >
      {/* LAYER 1: BASE PHOTOGRAPH (Original provided hero background) */}
      <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
        <img
          src={STUDIO_DETAILS.heroBackgroundUrl}
          alt="White House studio luxury wedding portrait in New York"
          className={`w-full h-full object-cover object-[center_28%] transition-opacity duration-1000 transform-gpu scale-[1.01] ${
            imageLoaded ? 'opacity-90' : 'opacity-0'
          }`}
          onLoad={() => setImageLoaded(true)}
          referrerPolicy="no-referrer"
          fetchPriority="high"
        />
        {/* Fallback elegant dark slate backdrop before load */}
        {!imageLoaded && (
          <div className="absolute inset-0 bg-[#0A0A0A] flex items-center justify-center">
            <span className="text-xs uppercase tracking-[0.2em] text-[#8E8E93]/60 flex items-center gap-2">
              <Camera size={14} /> White House studio
            </span>
          </div>
        )}
      </div>

      {/* LAYER 2: SUBTLE WAVE GRID BACKGROUND ANIMATION OVER THE PHOTOGRAPH */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        <WaveGridCanvas opacity={0.28} />
      </div>

      {/* LAYER 3: RESTRAINED CONTRAST GRADIENT OVERLAY (Guarantees WCAG text contrast without obscuring faces) */}
      <div
        className="absolute inset-0 z-20 pointer-events-none bg-gradient-to-t from-[#050505] via-[#050505]/45 to-[#050505]/75 md:bg-gradient-to-r md:from-[#050505]/85 md:via-[#050505]/35 md:to-transparent"
        aria-hidden="true"
      />
      {/* Top vignette for header contrast */}
      <div
        className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[#050505]/80 to-transparent z-20 pointer-events-none"
        aria-hidden="true"
      />

      {/* Empty spacer to balance top padding with header */}
      <div className="h-24 md:h-32" />

      {/* LAYER 4: CONTENT LAYER */}
      <div className="relative z-30 max-w-7xl mx-auto px-6 md:px-12 w-full py-12 md:py-20 flex flex-col justify-end">
        <div className="max-w-2xl">
          {/* Location & Studio Kicker (Unboxed clean text) */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="flex items-center gap-3 text-xs tracking-[0.24em] uppercase text-[#D4D4D8] mb-4 font-light"
          >
            <span>{STUDIO_DETAILS.location}</span>
            <span aria-hidden="true" className="text-[#8E8E93]/50">·</span>
            <span>Editorial Wedding Photography</span>
          </motion.div>

          {/* Main Headline with Flip Fade Animation */}
          <div className="mb-6">
            <FlipFadeText
              text="Your Story, Beautifully Remembered."
              as="h1"
              delay={0.25}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif text-[#F5F5F2] leading-[1.08] tracking-tight text-balance"
            />
          </div>

          {/* Supporting Copy */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-sm md:text-base text-[#D4D4D8] font-light leading-relaxed max-w-lg mb-9"
          >
            Wedding photography capturing the moments, emotions, and details that
            make your story yours.
          </motion.p>

          {/* CTA Buttons with Liquid Metal interaction */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-wrap items-center gap-4"
          >
            <LiquidMetalButton href="#portfolio" variant="primary">
              Explore the Portfolio
            </LiquidMetalButton>
            <LiquidMetalButton href="#contact" variant="secondary">
              Get in Touch
            </LiquidMetalButton>
          </motion.div>
        </div>
      </div>

      {/* Bottom status/scroll cue */}
      <div className="relative z-30 max-w-7xl mx-auto px-6 md:px-12 w-full pb-8 flex items-center justify-between text-[11px] tracking-[0.2em] uppercase text-[#8E8E93]">
        <div className="hidden sm:flex items-center gap-4">
          <span>White House studio</span>
          <span aria-hidden="true">·</span>
          <span>Fine-Art & Editorial</span>
        </div>

        <a
          href="#portfolio"
          className="flex items-center gap-2 hover:text-[#F5F5F2] transition-colors ml-auto group"
          aria-label="Scroll down to portfolio"
        >
          <span>Scroll to explore</span>
          <ArrowDown size={13} className="transition-transform duration-300 group-hover:translate-y-1" />
        </a>
      </div>
    </section>
  );
};
