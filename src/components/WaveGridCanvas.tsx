import React, { useEffect, useRef } from 'react';

interface WaveGridCanvasProps {
  className?: string;
  opacity?: number;
}

export const WaveGridCanvas: React.FC<WaveGridCanvasProps> = ({
  className = '',
  opacity = 0.28,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const checkReducedMotion = () =>
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const handleResize = () => {
      if (!canvas) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.offsetWidth;
      height = canvas.offsetHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    // Wave grid parameters: subtle, calm, luxury editorial motion
    let t = 0;
    const rows = 26;
    const cols = 36;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      const isReduced = checkReducedMotion();
      if (!isReduced) {
        t += 0.006; // Slow, deliberate, calm rhythm
      }

      // Draw horizontal undulating wave lines
      for (let r = 0; r < rows; r++) {
        // Perspective depth distribution: more clustered near the horizon, wider near bottom
        const normalizedY = r / (rows - 1);
        const depth = Math.pow(normalizedY, 1.8);
        const baseY = height * 0.25 + depth * (height * 0.75);

        ctx.beginPath();
        // Line styling: subtle metallic silver with perspective fading
        const lineAlpha = (0.05 + depth * 0.22) * (1 - Math.abs(normalizedY - 0.5) * 0.4);
        ctx.strokeStyle = `rgba(228, 228, 231, ${lineAlpha * opacity * 2.2})`;
        ctx.lineWidth = 0.75 + depth * 0.5;

        for (let c = 0; c < cols; c++) {
          const x = (c / (cols - 1)) * width;
          // Organic undulating wave calculation
          const wave1 = Math.sin(c * 0.22 + t + r * 0.18) * (8 * depth);
          const wave2 = Math.cos(c * 0.12 - t * 0.7 + r * 0.25) * (5 * depth);
          const wave3 = Math.sin(t * 0.5 + (c + r) * 0.08) * 3;
          const y = baseY + wave1 + wave2 + wave3;

          if (c === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        ctx.stroke();
      }

      // Draw subtle connecting perspective longitudinal lines
      const colStep = 2; // Step to keep grid light and non-cluttered
      for (let c = 0; c < cols; c += colStep) {
        const normalizedX = c / (cols - 1);
        ctx.beginPath();
        ctx.strokeStyle = `rgba(212, 212, 216, ${0.06 * opacity * 2.2})`;
        ctx.lineWidth = 0.6;

        for (let r = 0; r < rows; r++) {
          const normalizedY = r / (rows - 1);
          const depth = Math.pow(normalizedY, 1.8);
          const baseY = height * 0.25 + depth * (height * 0.75);

          const x = (normalizedX - 0.5) * (width * (0.6 + depth * 0.6)) + width * 0.5;
          const wave1 = Math.sin(c * 0.22 + t + r * 0.18) * (8 * depth);
          const wave2 = Math.cos(c * 0.12 - t * 0.7 + r * 0.25) * (5 * depth);
          const y = baseY + wave1 + wave2;

          if (r === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        ctx.stroke();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [opacity]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 pointer-events-none w-full h-full mix-blend-screen ${className}`}
      aria-hidden="true"
    />
  );
};
