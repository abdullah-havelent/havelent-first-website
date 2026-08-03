'use client';

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import React from 'react';

const headingWords = [
  { text: "Build", color: "white" },
  { text: "Your", color: "gradient" },
  { text: "Social", color: "white" },
  { text: "Presence.", color: "gradient" },
];

export default function Hero() {
  // Parallax for background circles
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { damping: 40, stiffness: 120 });
  const sy = useSpring(my, { damping: 40, stiffness: 120 });
  const tx1 = useTransform(sx, (v) => `${v * 5}px`);
  const ty1 = useTransform(sy, (v) => `${v * 5}px`);
  const tx2 = useTransform(sx, (v) => `${v * -8}px`);
  const ty2 = useTransform(sy, (v) => `${v * -8}px`);

  const onMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - rect.left) / rect.width - 0.5);
    my.set((e.clientY - rect.top) / rect.height - 0.5);
  };


  return (
    <section
      id="home"
      onMouseMove={onMouseMove}
      className="relative flex min-h-[88vh] w-full flex-col items-center justify-start overflow-hidden px-6 pt-32 pb-8"
    >
      {/* Background grid */}
      <div className="bg-grid pointer-events-none absolute inset-0 opacity-[0.08]" />

      {/* Floating orange circles */}
      <motion.div
        style={{ x: tx1, y: ty1 }}
        className="animate-float pointer-events-none absolute -left-32 top-24 h-[420px] w-[420px] rounded-full bg-gradient-to-br from-brand-orange/30 to-brand-red/10 blur-[120px]"
      />
      <motion.div
        style={{ x: tx2, y: ty2 }}
        className="hidden animate-float pointer-events-none absolute -right-40 bottom-10 h-[520px] w-[520px] rounded-full bg-gradient-to-br from-brand-accent/25 to-brand-orange/10 blur-[140px]"
      />
      <motion.div
  style={{ x: 0, y: 0 }}
  className="animate-float pointer-events-none absolute -right-[420px] -top-[180px] h-[1200px] w-[1200px] rounded-full bg-gradient-to-br from-brand-orange/40 via-brand-orange/20 to-transparent blur-[260px]"
/>

      <div className="noise" />
      <div className="pointer-events-none absolute bottom-0 left-0 h-40 w-full bg-gradient-to-b from-transparent via-black/30 to-black" />

      {/* Badge */}
      <motion.button
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
  whileHover={{ scale: 1.04, y: -2 }}
  data-cursor="button"
  className={`group relative mb-8 inline-flex items-center gap-2 rounded-full border min-w-[190px] justify-center px-5 py-2 text-sm font-medium transition-all duration-300 ${
    'border-white/15 bg-white text-brand-dark'
  }`}
>
  <>
  <Sparkles size={14} className="text-brand-orange" />
  <span className="font-medium">📱 Social Media Management</span>
  <span className="ml-1 h-1.5 w-1.5 rounded-full bg-brand-orange" />
</>
</motion.button>

      {/* Heading */}
      <h1 className="font-display text-center text-[clamp(2.75rem,7vw,6.5rem)] font-semibold leading-[1.2] tracking-tight">
        {headingWords.map((word, i) => (
          <span key={i} className="mr-3 inline-block overflow-hidden align-bottom">
            <motion.span
              initial={{ opacity: 0, y: 40, filter: 'blur(12px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{
                duration: 0.8,
                delay: 0.3 + i * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
              className={`inline-block ${
                word.color === 'gradient' ? 'text-gradient-orange' : 'text-white'
              }`}
            >
              {word.text}
            </motion.span>
          </span>
        ))}
      </h1>

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 + headingWords.length * 0.1 }}
        className="mt-8 max-w-xl text-center text-base leading-relaxed text-white/60 sm:text-lg"
      >
        We help brands grow through strategic content, consistent posting,
community engagement, and data-driven social media management.
      </motion.p>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.9 }}
        className="mt-10 flex flex-col items-center gap-4 sm:flex-row"
      >
        <motion.button
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          data-cursor="button"
          className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-brand-accent to-brand-orange px-7 py-3.5 text-sm font-semibold text-white"
          style={{ boxShadow: '0 0 30px -6px rgba(249,115,22,0.55)' }}
        >
          <span className="relative z-10">Get a Free Quote</span>
          <motion.span
            className="relative z-10"
            initial={{ x: 0 }}
            whileHover={{ x: 4 }}
            transition={{ duration: 0.3 }}
          >
            <ArrowRight size={16} />
          </motion.span>
          <span className="absolute inset-0 bg-gradient-to-r from-brand-orange to-brand-red opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        </motion.button>

        <motion.button
  whileHover={{ scale: 1.04 }}
  whileTap={{ scale: 0.97 }}
  data-cursor="button"
  onClick={() => {
    document
      .getElementById("services")
      ?.scrollIntoView({ behavior: "smooth" });
  }}
  className="rounded-full border border-white/20 px-7 py-3.5 text-sm font-medium text-white/90 transition-all duration-300 hover:border-brand-orange hover:text-brand-orange"
>
  View Our Services
</motion.button>
      </motion.div>
    </section>
  );
}
