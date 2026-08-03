'use client';

import { motion } from 'framer-motion';

export default function RotatingTriangle() {
  return (
    <motion.div
  initial={{ rotate: 0, y: 0 }}
  animate={{
    rotate: 360,
    y: [-10, 10, -10],
  }}
  transition={{
    rotate: {
      duration: 35,
      repeat: Infinity,
      ease: "linear",
    },
    y: {
      duration: 6,
      repeat: Infinity,
      ease: "easeInOut",
    },
  }}
  className="pointer-events-none absolute right-0 top-12 translate-x-1/2 hidden lg:block z-0 opacity-20"
>
      <svg
        width="520"
        height="520"
        viewBox="0 0 320 320"
        fill="none"
      >
        <defs>
          <linearGradient
            id="triangleGradient"
            x1="0"
            y1="0"
            x2="320"
            y2="320"
          >
            <stop offset="0%" stopColor="#F97316" />
            <stop offset="100%" stopColor="#915D44" />
          </linearGradient>

          <filter id="glow">
            <feGaussianBlur stdDeviation="12" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <polygon
          points="160,20 30,280 290,280"
          stroke="url(#triangleGradient)"
          strokeWidth="2.5"
          fill="transparent"
          filter="url(#glow)"
          opacity="0.35"
        />
      </svg>
    </motion.div>
  );
}