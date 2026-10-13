import React from 'react';
import { motion, useReducedMotion } from 'motion/react';

interface FlipFadeTextProps {
  text: string;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
  delay?: number;
  stagger?: number;
}

export const FlipFadeText: React.FC<FlipFadeTextProps> = ({
  text,
  className = '',
  as = 'h1',
  delay = 0.1,
  stagger = 0.045,
}) => {
  const shouldReduceMotion = useReducedMotion();
  const words = text.split(' ');

  const containerVariants: import('motion/react').Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: stagger,
        delayChildren: delay,
      },
    },
  };

  const wordVariants: import('motion/react').Variants = {
    hidden: shouldReduceMotion
      ? { opacity: 0 }
      : {
          opacity: 0,
          y: 18,
          rotateX: -38,
          filter: 'blur(3px)',
        },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      filter: 'blur(0px)',
      transition: {
        duration: 0.9,
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
      },
    },
  };

  const Component = motion[as];

  return (
    <Component
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className={`inline-block ${className}`}
      style={{ perspective: 1000 }}
      aria-label={text}
    >
      {words.map((word, wordIndex) => (
        <span
          key={`${word}-${wordIndex}`}
          className="inline-block whitespace-nowrap mr-[0.28em] last:mr-0"
        >
          <motion.span
            variants={wordVariants}
            className="inline-block transform-gpu origin-bottom will-change-transform"
          >
            {word}
          </motion.span>
        </span>
      ))}
    </Component>
  );
};
