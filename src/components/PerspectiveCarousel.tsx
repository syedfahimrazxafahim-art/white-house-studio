import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ChevronLeft,
  ChevronRight,
  Maximize2,
  LayoutGrid,
  Sparkles,
} from 'lucide-react';
import { PhotoItem, PORTFOLIO_PHOTOS } from '../data/photography';
import { Lightbox } from './Lightbox';
import { LiquidMetalButton } from './LiquidMetalButton';

export const PerspectiveCarousel: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [viewMode, setViewMode] = useState<'carousel' | 'grid'>('carousel');
  const touchStartX = useRef<number | null>(null);

  const filteredPhotos = PORTFOLIO_PHOTOS.filter((photo) =>
    selectedCategory === 'all' ? true : photo.category === selectedCategory
  );

  // Keep activeIndex within bounds when filter changes
  useEffect(() => {
    setActiveIndex(0);
  }, [selectedCategory]);

  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + filteredPhotos.length) % filteredPhotos.length);
  }, [filteredPhotos.length]);

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % filteredPhotos.length);
  }, [filteredPhotos.length]);

  // Touch swipe support for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchEndX - touchStartX.current;
    if (Math.abs(diff) > 40) {
      if (diff > 0) handlePrev();
      else handleNext();
    }
    touchStartX.current = null;
  };

  const categories = [
    { id: 'all', label: 'All Works' },
    { id: 'ceremony', label: 'Ceremony' },
    { id: 'portraits', label: 'Portraits' },
    { id: 'atmosphere', label: 'Atmosphere' },
    { id: 'details', label: 'Details' },
  ];

  const activePhoto = filteredPhotos[activeIndex] || filteredPhotos[0];

  return (
    <section id="portfolio" className="relative py-24 md:py-32 bg-[#050505] overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-white/[0.015] rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12 border-b border-[#27272A]/50 pb-8">
          <div>
            <span className="text-xs uppercase tracking-[0.24em] text-[#D4D4D8] font-light block mb-3">
              Curated Portfolio
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#F5F5F2] font-normal tracking-tight">
              Selected Works & Wedding Stories
            </h2>
          </div>

          {/* View Mode Toggle & Category Filters */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-1 p-1 bg-[#101010] border border-[#27272A]">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3 py-1.5 text-xs tracking-[0.14em] uppercase transition-all duration-200 cursor-pointer ${
                    selectedCategory === cat.id
                      ? 'bg-[#1F1F23] text-[#F5F5F2] shadow-sm'
                      : 'text-[#8E8E93] hover:text-[#D4D4D8]'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Toggle Carousel vs Grid view */}
            <button
              onClick={() => setViewMode(viewMode === 'carousel' ? 'grid' : 'carousel')}
              className="p-2 text-[#D4D4D8] hover:text-white bg-[#101010] border border-[#27272A] hover:border-[#D4D4D8] transition-colors flex items-center gap-1.5 text-xs tracking-wider uppercase"
              aria-label={viewMode === 'carousel' ? 'Switch to grid view' : 'Switch to carousel view'}
            >
              {viewMode === 'carousel' ? (
                <>
                  <LayoutGrid size={15} />
                  <span className="hidden sm:inline">Grid</span>
                </>
              ) : (
                <>
                  <Sparkles size={15} />
                  <span className="hidden sm:inline">Perspective</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* VIEW MODE 1: 3D PERSPECTIVE CAROUSEL */}
        {viewMode === 'carousel' && (
          <div className="relative py-8 select-none">
            {/* 3D Perspective Stage */}
            <div
              className="relative h-[480px] sm:h-[560px] md:h-[620px] w-full flex items-center justify-center perspective-container overflow-visible"
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
            >
              {filteredPhotos.map((photo, index) => {
                const total = filteredPhotos.length;
                let offset = (index - activeIndex) % total;
                if (offset > total / 2) offset -= total;
                if (offset < -total / 2) offset += total;

                const isCenter = offset === 0;
                const isVisible = Math.abs(offset) <= 2;

                if (!isVisible) return null;

                // Restrained, luxury 3D perspective transformations
                const rotateY = offset * -28; // Negative angle on right gives angled book-leaf / editorial spread feeling
                const translateX = offset * 260; // Horizontal spacing
                const translateZ = -Math.abs(offset) * 160;
                const scale = 1 - Math.abs(offset) * 0.14;
                const opacity = 1 - Math.abs(offset) * 0.35;
                const zIndex = 30 - Math.abs(offset) * 10;

                return (
                  <motion.div
                    key={photo.id}
                    className="absolute w-[280px] sm:w-[360px] md:w-[440px] aspect-[3/4] cursor-pointer will-change-transform"
                    style={{
                      zIndex,
                      transformStyle: 'preserve-3d',
                    }}
                    animate={{
                      transform: `translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
                      opacity,
                    }}
                    transition={{
                      duration: 0.65,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    onClick={() => {
                      if (isCenter) {
                        setLightboxIndex(index);
                      } else {
                        setActiveIndex(index);
                      }
                    }}
                  >
                    <div className="relative w-full h-full bg-[#101010] border border-[#27272A]/80 shadow-[0_20px_50px_rgba(0,0,0,0.85)] overflow-hidden group">
                      <img
                        src={photo.url}
                        alt={photo.title}
                        className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                        loading={isCenter ? 'eager' : 'lazy'}
                        referrerPolicy="no-referrer"
                      />

                      {/* Subtle dark gradient scrim at bottom */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

                      {/* Photo details on hover / active */}
                      <div className="absolute bottom-0 inset-x-0 p-5 flex items-end justify-between">
                        <div>
                          <span className="text-[10px] tracking-[0.2em] uppercase text-[#D4D4D8]/80 block mb-1">
                            {photo.category}
                          </span>
                          <h3 className="text-lg font-serif text-[#F5F5F2] font-normal leading-tight">
                            {photo.title}
                          </h3>
                        </div>

                        {isCenter && (
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setLightboxIndex(index);
                            }}
                            className="p-2 bg-[#050505]/80 hover:bg-[#F5F5F2] text-[#F5F5F2] hover:text-[#050505] transition-colors border border-[#3F3F46]"
                            aria-label={`View ${photo.title} in fullscreen lightbox`}
                          >
                            <Maximize2 size={15} />
                          </button>
                        )}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Active Photograph Caption & Metadata Strip */}
            {activePhoto && (
              <div className="max-w-xl mx-auto text-center mt-6 px-4">
                <p className="text-xs text-[#8E8E93] leading-relaxed font-light">
                  {activePhoto.caption}
                </p>
              </div>
            )}

            {/* Carousel Controls */}
            <div className="flex items-center justify-center gap-6 mt-8">
              <button
                type="button"
                onClick={handlePrev}
                className="p-3 text-[#D4D4D8] hover:text-white bg-[#101010] border border-[#27272A] hover:border-[#D4D4D8] transition-all duration-200 cursor-pointer"
                aria-label="Previous photograph"
              >
                <ChevronLeft size={18} />
              </button>

              {/* Progress counter */}
              <div className="text-xs font-mono tracking-[0.16em] text-[#8E8E93] tabular-nums">
                <span className="text-[#F5F5F2]">{activeIndex + 1}</span>
                <span className="mx-2 text-[#3F3F46]">/</span>
                <span>{filteredPhotos.length}</span>
              </div>

              <button
                type="button"
                onClick={handleNext}
                className="p-3 text-[#D4D4D8] hover:text-white bg-[#101010] border border-[#27272A] hover:border-[#D4D4D8] transition-all duration-200 cursor-pointer"
                aria-label="Next photograph"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        )}

        {/* VIEW MODE 2: EDITORIAL MASONRY GRID (All 17 photos displayed cleanly) */}
        {viewMode === 'grid' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-4 animate-fade-in">
            {filteredPhotos.map((photo, idx) => (
              <div
                key={photo.id}
                onClick={() => setLightboxIndex(idx)}
                className="group relative bg-[#101010] border border-[#27272A]/70 overflow-hidden cursor-pointer transition-all duration-300 hover:border-[#D4D4D8]/50"
              >
                <div className="aspect-[4/5] overflow-hidden">
                  <img
                    src={photo.url}
                    alt={photo.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-5">
                  <div className="w-full flex items-end justify-between">
                    <div>
                      <span className="text-[10px] tracking-[0.2em] uppercase text-[#D4D4D8]/80 block">
                        {photo.category}
                      </span>
                      <h3 className="text-base font-serif text-[#F5F5F2] font-normal">
                        {photo.title}
                      </h3>
                    </div>
                    <span className="p-2 bg-[#050505]/80 text-[#F5F5F2] border border-[#27272A]">
                      <Maximize2 size={14} />
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Callout action to explore custom story */}
        <div className="mt-16 text-center border-t border-[#27272A]/40 pt-10">
          <p className="text-xs uppercase tracking-[0.2em] text-[#8E8E93] mb-4">
            Looking for tailored coverage for your wedding day?
          </p>
          <LiquidMetalButton href="#contact" variant="secondary">
            Request Date Availability
          </LiquidMetalButton>
        </div>
      </div>

      {/* Lightbox Modal */}
      <Lightbox
        photos={filteredPhotos}
        currentIndex={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onNavigate={(newIdx) => setLightboxIndex(newIdx)}
      />
    </section>
  );
};
