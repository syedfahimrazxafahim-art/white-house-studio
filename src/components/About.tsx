import React from 'react';
import { STUDIO_DETAILS } from '../data/photography';
import { LiquidMetalButton } from './LiquidMetalButton';

export const About: React.FC = () => {
  // Use one of the supplied photographs to anchor the About section
  const aboutImage =
    'https://res.cloudinary.com/fzobzdco/image/upload/v1791852802/655279626_17881343232490459_3690439187809232487_n.jpg';

  return (
    <section id="about" className="relative py-24 md:py-32 bg-[#0A0A0A] border-t border-[#27272A]/40">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Image Anchor */}
          <div className="lg:col-span-5 order-2 lg:order-1">
            <div className="relative group">
              <div className="aspect-[3/4] overflow-hidden bg-[#101010] border border-[#27272A]/70 shadow-2xl">
                <img
                  src={aboutImage}
                  alt="White House studio fine art wedding bride portrait"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Minimalist image metadata label */}
              <div className="mt-4 flex items-center justify-between text-xs tracking-[0.2em] uppercase text-[#8E8E93]">
                <span>{STUDIO_DETAILS.location}</span>
                <span aria-hidden="true">·</span>
                <span>White House studio</span>
              </div>
            </div>
          </div>

          {/* Right Column: Editorial Typography */}
          <div className="lg:col-span-7 order-1 lg:order-2">
            <span className="text-xs uppercase tracking-[0.24em] text-[#D4D4D8] font-light block mb-4">
              Our Vision
            </span>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#F5F5F2] font-normal tracking-tight leading-[1.12] mb-8 text-balance">
              Photography That Feels Like You.
            </h2>

            <div className="space-y-6 text-sm md:text-base text-[#D4D4D8] font-light leading-relaxed max-w-xl">
              <p>
                Every wedding holds moments that deserve to be remembered. White House
                studio focuses on capturing the emotion, atmosphere, and meaningful
                details that make each celebration unique.
              </p>
              <p className="text-[#A1A1AA]">
                Based in New York, we approach wedding days with an observant eye and
                a calm presence. Rather than choreographing forced poses, we create
                space for sincere connection to unfold naturally—yielding portraits
                imbued with understated luxury and timeless depth.
              </p>
            </div>

            {/* Direct Studio Pillars */}
            <div className="grid grid-cols-2 gap-6 my-10 pt-8 border-t border-[#27272A]/50">
              <div>
                <span className="text-xs font-serif text-[#F5F5F2] block mb-1">
                  Editorial Eye
                </span>
                <p className="text-xs text-[#8E8E93] leading-relaxed">
                  Refined composition with natural, directional light.
                </p>
              </div>
              <div>
                <span className="text-xs font-serif text-[#F5F5F2] block mb-1">
                  Documentary Heart
                </span>
                <p className="text-xs text-[#8E8E93] leading-relaxed">
                  Quiet observation honoring authentic human connection.
                </p>
              </div>
            </div>

            <div>
              <LiquidMetalButton href="#approach" variant="secondary">
                Explore Our Approach
              </LiquidMetalButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
