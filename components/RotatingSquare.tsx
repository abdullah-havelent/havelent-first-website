'use client';

import { motion } from 'framer-motion';

export default function RotatingSquare() {
  return (
    <motion.div
      initial={{ rotate: 0, y: 0 }}
      animate={{
        rotate: -360,
        y: [10, -10, 10],
      }}
      transition={{
        rotate: {
          duration: 40,
          repeat: Infinity,
          ease: "linear",
        },
        y: {
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
        },
      }}
      className="pointer-events-none absolute left-0 top-40 -translate-x-1/2 hidden lg:block z-0 opacity-20 overflow-hidden"
    >
      <svg
        width="440"
        height="440"
        viewBox="0 0 500 500"
        fill="none"
      >
        <defs>
          <linearGradient
            id="squareGradient"
            x1="0"
            y1="0"
            x2="500"
            y2="500"
          >
            <stop offset="0%" stopColor="#915D44" />
            <stop offset="100%" stopColor="#F97316" />
          </linearGradient>

          <filter id="squareGlow">
            <feGaussianBlur stdDeviation="12" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <rect
          x="60"
          y="60"
          width="400"
          height="400"
          rx="28"
          stroke="url(#squareGradient)"
          strokeWidth="2.5"
          fill="transparent"
          filter="url(#squareGlow)"
          opacity="0.35"
        />
      </svg>
    </motion.div>
  );
}