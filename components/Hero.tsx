'use client';

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import AnimatedCards from '@/components/AnimatedCards';
import Link from "next/link";
import React from 'react';
import Marquee from "@/components/Marquee";
import RotatingTriangle from "@/components/RotatingTriangle";
import RotatingSquare from "@/components/RotatingSquare";



const headingWords = [
  { text: 'Your', color: 'white' },
  { text: 'Vision,', color: 'gradient' },
  { text: 'Our', color: 'white' },
  { text: 'Responsibility.', color: 'gradient' },
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

const [clickCount, setClickCount] = React.useState(0);
const [revealed, setRevealed] = React.useState(false);

const handleReveal = () => {
  setRevealed(true);
  setClickCount((prev) => prev + 1);
};

  return (
    <section
  id="home"
  onMouseMove={onMouseMove}
      className="bg-[#ffefe8] relative flex w-full flex-col items-center justify-start px-6 pt-32 pb-20"
    >

    <RotatingSquare />

       <RotatingTriangle />


      {/* Background grid */}
      <div className="bg-grid pointer-events-none absolute inset-0 opacity-[0.08]" />

      {/* Floating orange circles */}
      <motion.div
        style={{ x: tx1, y: ty1 }}
        className="animate-float pointer-events-none absolute -left-32 top-24 h-[420px] w-[420px] rounded-full bg-gradient-to-br from-brand-orange/30 to-brand-red/10 blur-[120px]"
      />
   <motion.div
  style={{ x: tx2, y: ty2 }}
  className="pointer-events-none absolute right-0 top-0 h-[900px] w-[900px] translate-x-1/2 bg-gradient-to-bl from-orange-500/100 via-orange-500/70 to-transparent blur-[220px] animate-glow"
/>


      <div className="noise" />
      
      

      {/* Badge */}
      <motion.button
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
  whileHover={{ scale: 1.04, y: -2 }}
  onClick={handleReveal}
  onMouseLeave={() => setRevealed(false)}
  data-cursor="button"
  className={`group relative mb-8 inline-flex items-center gap-2 rounded-full border min-w-[190px] justify-center px-5 py-2 text-sm font-medium transition-all duration-300 ${
    revealed
      ? 'border-white/10 bg-black text-white'
      : 'border-white/15 bg-white text-brand-dark'
  }`}
>
  {revealed ? (
    <span
      className="text-gradient-orange"
    >
      {clickCount === 1 ? 'Welcome' : 'Welcome Again'}
    </span>
  ) : (
    <>
      <Sparkles size={14} className="text-brand-orange" />
      <span>Click to Reveal</span>
      <span className="ml-1 h-1.5 w-1.5 rounded-full bg-brand-orange" />
    </>
  )}
</motion.button>

      {/* Heading */}
      <h1 className="font-display text-center text-[clamp(2.75rem,7vw,6.5rem)] font-semibold leading-[1.2] tracking-tight">
        {headingWords.map((word, i) => (
          <span key={i} className="mr-3 inline-block overflow-visible align-bottom">
            <motion.span
              initial={{
  opacity: 0,
  y: 0,
  filter: "blur(3px)",
}}
              animate={{
  opacity: 1,
  y: 0,
  filter: "blur(0px)",
}}
              transition={{
                duration: 0.45,
                delay: 0.3 + i * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
              className={`inline-block ${
                word.color === 'gradient' ? 'text-gradient-orange' : 'text-[#000000]'
              }`}
            >
              {word.text}
            </motion.span>
          </span>
        ))}
      </h1>

      {/* Subtitle */}
      {/* 
      <motion.p
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 + headingWords.length * 0.1 }}
        className="mt-8 max-w-xl text-center text-base leading-relaxed text-white/60 sm:text-lg"
      >
        We craft cinematic digital experiences, brand systems, and interactive
        products for visionary brands that refuse to blend in.
      </motion.p>
 */}
      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.9 }}
        className="mt-10 flex flex-col items-center gap-4 sm:flex-row"
      >
       <Link href="/#contact">
  <motion.button
    whileHover={{ scale: 1.04 }}
    whileTap={{ scale: 0.97 }}
    data-cursor="button"
    className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-brand-accent to-brand-orange px-7 py-3.5 text-sm font-semibold text-white"
    style={{ boxShadow: '0 0 30px -6px rgba(249,115,22,0.55)' }}
  >
    <span className="relative z-10">Start a Project</span>

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
</Link>

        <motion.button
  whileHover={{ scale: 1.04 }}
  whileTap={{ scale: 0.97 }}
  onClick={() => {
    document.getElementById("services")?.scrollIntoView({
      behavior: "smooth",
    });
  }}
  data-cursor="button"
  className="rounded-full border border-[#00000]/20 px-7 py-3.5 text-sm font-medium text-[#000000]/90 transition-all duration-300 hover:border-brand-orange hover:text-brand-orange"
>
  View Our Services
</motion.button>
      </motion.div>
      <div className="mt-14 w-full">
  <motion.div
  initial={{
    opacity: 0,
    y: 30,
    scale: 0.98,
    filter: "blur(8px)",
  }}
  animate={{
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
  }}
  transition={{
    duration: 0.9,
    delay: 1.2,
    ease: [0.22, 1, 0.36, 1],
  }}
>
  <Marquee />
</motion.div>

</div>
</section>
  );
}

