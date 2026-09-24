'use client';

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import type React from 'react';
import ServiceOutlineText from '@/components/ServiceOutlineText';

const headingWords = [
  { text: 'Web Design', color: 'white' },
  { text: '& Development', color: 'gradient' },
];

export default function WebDevelopmentHero() {
  const router = useRouter();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { damping: 40, stiffness: 120 });
  const sy = useSpring(my, { damping: 40, stiffness: 120 });
  const tx = useTransform(sx, (value) => `${value * 10}px`);
  const ty = useTransform(sy, (value) => `${value * 10}px`);

  function handleMouseMove(event: React.MouseEvent<HTMLElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    mx.set((event.clientX - rect.left) / rect.width - 0.5);
    my.set((event.clientY - rect.top) / rect.height - 0.5);
  }

  function goToContact() {
    router.push('#contact');

    setTimeout(() => {
      document.getElementById('contact')?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }, 500);
  }

  return (
    <section
      id="home"
      onMouseMove={handleMouseMove}
      className="relative flex min-h-[88vh] w-full flex-col items-center justify-start overflow-hidden px-6 pb-8 pt-32"
    >
      <ServiceOutlineText text="WEB DEVELOPMENT" scaleX={0.72} />

      <div className="bg-grid pointer-events-none absolute inset-0 opacity-[0.08]" />
      <motion.div
        style={{ x: tx, y: ty }}
        className="pointer-events-none absolute -left-32 top-24 h-[420px] w-[420px] rounded-full bg-gradient-to-br from-brand-orange/30 to-brand-red/10 blur-[120px]"
      />
      <motion.div
        style={{ x: tx, y: ty }}
        className="pointer-events-none absolute -right-[420px] -top-[180px] h-[1200px] w-[1200px] rounded-full bg-gradient-to-br from-brand-orange/40 via-brand-orange/20 to-transparent blur-[260px]"
      />
      <div className="noise" />
      <div className="pointer-events-none absolute bottom-0 left-0 h-40 w-full bg-gradient-to-b from-transparent via-black/30 to-black" />

      <h1 className="relative z-10 mt-20 max-w-6xl text-center font-display text-[clamp(2.75rem,7vw,6.5rem)] font-semibold leading-[1.1] tracking-tight">
        {headingWords.map((word, index) => (
          <span key={word.text} className="mr-3 inline-block overflow-hidden align-bottom">
            <motion.span
              initial={{ opacity: 0, y: 40, filter: 'blur(12px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{
                duration: 0.8,
                delay: 0.3 + index * 0.12,
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

      <motion.p
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.62 }}
        className="relative z-10 mt-8 max-w-2xl text-center text-base leading-relaxed text-white/60 sm:text-lg"
      >
        Modern, fast, responsive websites built to strengthen your digital presence
        and turn visitors into meaningful opportunities.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.78 }}
        className="relative z-10 mt-10 flex flex-col items-center gap-4 sm:flex-row"
      >
        <motion.button
          type="button"
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          data-cursor="button"
          onClick={goToContact}
          className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-brand-accent to-brand-orange px-7 py-3.5 text-sm font-semibold text-white"
          style={{ boxShadow: '0 0 30px -6px rgba(249,115,22,0.55)' }}
        >
          <span className="relative z-10">Get a Free Quote</span>
          <motion.span
            className="relative z-10"
            whileHover={{ x: 4 }}
            transition={{ duration: 0.3 }}
          >
            <ArrowRight size={16} />
          </motion.span>
          <span className="absolute inset-0 bg-gradient-to-r from-brand-orange to-brand-red opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        </motion.button>

        <motion.button
          type="button"
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          data-cursor="button"
          onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
          className="rounded-full border border-white/20 px-7 py-3.5 text-sm font-medium text-white/90 transition-all duration-300 hover:border-brand-orange hover:text-brand-orange"
        >
          View Our Services
        </motion.button>
      </motion.div>
    </section>
  );
}
