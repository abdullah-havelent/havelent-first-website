'use client';

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const [hovering, setHovering] = useState<'none' | 'button' | 'card'>('none');
  const [visible, setVisible] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);

  const cx = useSpring(x, {
  stiffness: 450,
  damping: 35,
  mass: 0.15,
});

const cy = useSpring(y, {
  stiffness: 450,
  damping: 35,
  mass: 0.15,
});

  useEffect(() => {
    const isFinePointer =
      typeof window !== 'undefined' &&
      window.matchMedia('(hover: hover) and (pointer: fine)').matches &&
      window.innerWidth >= 1024;
    if (!isFinePointer) return;

    setVisible(true);

    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);

      const target = e.target as HTMLElement;
      if (!target) return;
      if (target.closest('[data-cursor="card"]')) {
        setHovering('card');
      } else if (
        target.closest('a, button, [data-cursor="button"], input, textarea')
      ) {
        setHovering('button');
      } else {
        setHovering('none');
      }
    };

    window.addEventListener('mousemove', move);
    return () => window.removeEventListener('mousemove', move);
  }, [x, y]);

  if (!visible) return null;

  const size = hovering === 'button' ? 56 : hovering === 'card' ? 80 : 18;
  const glow =
    hovering === 'card'
      ? '0 0 60px 12px rgba(249,115,22,0.35)'
      : '0 0 24px 4px rgba(249,115,22,0.45)';

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[9999] hidden lg:block"
      style={{ x: cx, y: cy }}
    >
      <motion.div
        className="-translate-x-1/2 -translate-y-1/2 rounded-full"
        animate={{
          width: size,
          height: size,
          backgroundColor:
            hovering === 'none'
              ? 'rgba(249,115,22,0.9)'
              : 'rgba(249,115,22,0.12)',
          border:
            hovering === 'none'
              ? '0px solid rgba(255,255,255,0)'
              : '1.5px solid rgba(249,115,22,0.9)',
          boxShadow: glow,
        }}
        transition={{ type: 'spring', damping: 22, stiffness: 300 }}
      />
    </motion.div>
  );
}
