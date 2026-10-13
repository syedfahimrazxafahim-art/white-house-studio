import React, { useEffect, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';
import { PhotoItem } from '../data/photography';

interface LightboxProps {
  photos: PhotoItem[];
  currentIndex: number | null;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export const Lightbox: React.FC<LightboxProps> = ({
  photos,
  currentIndex,
  onClose,
  onNavigate,
}) => {
  const currentPhoto = currentIndex !== null ? photos[currentIndex] : null;

  const handlePrev = useCallback(() => {
    if (currentIndex === null) return;
    const nextIdx = (currentIndex - 1 + photos.length) % photos.length;
    onNavigate(nextIdx);
  }, [currentIndex, photos.length, onNavigate]);

  const handleNext = useCallback(() => {
    if (currentIndex === null) return;
    const nextIdx = (currentIndex + 1) % photos.length;
    onNavigate(nextIdx);
  }, [currentIndex, photos.length, onNavigate]);

  useEffect(() => {
    if (currentIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [currentIndex, onClose, handlePrev, handleNext]);

  if (!currentPhoto || currentIndex === null) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Photography viewer"
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#050505]/96 backdrop-blur-xl animate-fade-in"
    >
      {/* Top Bar with Info & Close button */}
      <div className="absolute top-0 inset-x-0 p-6 md:p-8 flex items-center justify-between z-20 bg-gradient-to-b from-[#050505]/80 to-transparent">
        <div className="flex items-center gap-3 text-xs tracking-[0.2em] uppercase text-[#D4D4D8]">
          <span className="font-serif italic text-sm text-[#F5F5F2]">{currentPhoto.title}</span>
          <span aria-hidden="true" className="text-[#8E8E93]/60">·</span>
          <span className="text-[#8E8E93] capitalize">{currentPhoto.category}</span>
          <span aria-hidden="true" className="text-[#8E8E93]/60">·</span>
          <span className="text-[#8E8E93] font-mono tabular-nums">
            {currentIndex + 1} / {photos.length}
          </span>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="p-2.5 text-[#D4D4D8] hover:text-white transition-colors bg-[#141414] border border-[#27272A] hover:border-[#D4D4D8] rounded-none focus:outline-none"
          aria-label="Close fullscreen lightbox (Escape)"
        >
          <X size={20} />
        </button>
      </div>

      {/* Main Image Viewport */}
      <div className="relative max-w-6xl max-h-[82vh] w-full px-4 sm:px-16 flex items-center justify-center">
        <img
          src={currentPhoto.url}
          alt={currentPhoto.title}
          className="max-h-[78vh] max-w-full object-contain shadow-2xl transition-all duration-300 select-none"
          referrerPolicy="no-referrer"
        />

        {/* Previous Button */}
        <button
          type="button"
          onClick={handlePrev}
          className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 p-3 text-[#D4D4D8] hover:text-white bg-[#101010]/80 hover:bg-[#181818] border border-[#27272A] transition-colors focus:outline-none"
          aria-label="Previous photograph"
        >
          <ChevronLeft size={22} />
        </button>

        {/* Next Button */}
        <button
          type="button"
          onClick={handleNext}
          className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 p-3 text-[#D4D4D8] hover:text-white bg-[#101010]/80 hover:bg-[#181818] border border-[#27272A] transition-colors focus:outline-none"
          aria-label="Next photograph"
        >
          <ChevronRight size={22} />
        </button>
      </div>

      {/* Bottom Caption Bar */}
      <div className="absolute bottom-0 inset-x-0 p-6 md:p-8 bg-gradient-to-t from-[#050505] to-transparent text-center z-20">
        <p className="text-sm text-[#D4D4D8] max-w-2xl mx-auto font-light leading-relaxed">
          {currentPhoto.caption}
        </p>
      </div>
    </div>
  );
};
