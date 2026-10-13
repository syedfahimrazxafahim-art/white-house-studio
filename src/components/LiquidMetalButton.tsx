import React, { useRef, useState, MouseEvent } from 'react';
import { useReducedMotion } from 'motion/react';

interface LiquidMetalButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  variant?: 'primary' | 'secondary';
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
}

export const LiquidMetalButton: React.FC<LiquidMetalButtonProps> = ({
  children,
  onClick,
  href,
  variant = 'primary',
  className = '',
  type = 'button',
  disabled = false,
}) => {
  const buttonRef = useRef<HTMLButtonElement | HTMLAnchorElement | null>(null);
  const [coords, setCoords] = useState<{ x: number; y: number }>({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const handleMouseMove = (e: MouseEvent<HTMLElement>) => {
    if (shouldReduceMotion || !buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setCoords({ x, y });
  };

  const isPrimary = variant === 'primary';

  const baseStyles =
    'relative group inline-flex items-center justify-center px-7 py-3.5 text-xs font-medium tracking-[0.16em] uppercase overflow-hidden transition-all duration-300 select-none whitespace-nowrap cursor-pointer rounded-none';

  const themeStyles = isPrimary
    ? 'bg-[#101010] text-[#F5F5F2] border border-[#27272A] hover:border-[#D4D4D8]/60 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.8)]'
    : 'bg-transparent text-[#F5F5F2] border border-[#3F3F46]/70 hover:border-[#F5F5F2]/80 hover:bg-[#141414]';

  const content = (
    <>
      {/* Liquid Metal chrome fluid layer */}
      {!shouldReduceMotion && (
        <span
          className="absolute inset-0 pointer-events-none transition-opacity duration-500 will-change-transform"
          style={{
            opacity: isHovered ? 1 : 0,
            background: isPrimary
              ? `radial-gradient(circle 90px at ${coords.x}% ${coords.y}%, rgba(255, 255, 255, 0.22), rgba(180, 180, 190, 0.08) 45%, transparent 75%)`
              : `radial-gradient(circle 80px at ${coords.x}% ${coords.y}%, rgba(255, 255, 255, 0.16), transparent 65%)`,
          }}
          aria-hidden="true"
        />
      )}

      {/* Liquid mercury edge sweep */}
      <span
        className="absolute inset-x-0 -top-px h-[1.5px] bg-gradient-to-r from-transparent via-[#E4E4E7]/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
        aria-hidden="true"
      />
      <span
        className="absolute inset-x-0 -bottom-px h-[1.5px] bg-gradient-to-r from-transparent via-[#A1A1AA]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
        aria-hidden="true"
      />

      {/* Button label */}
      <span className="relative z-10 flex items-center gap-2 text-inherit tracking-[0.18em]">
        {children}
      </span>
    </>
  );

  if (href) {
    return (
      <a
        ref={buttonRef as React.RefObject<HTMLAnchorElement>}
        href={href}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`${baseStyles} ${themeStyles} ${className}`}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      ref={buttonRef as React.RefObject<HTMLButtonElement>}
      type={type}
      disabled={disabled}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`${baseStyles} ${themeStyles} ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
    >
      {content}
    </button>
  );
};
