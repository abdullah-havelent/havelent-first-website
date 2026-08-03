'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-brand-dark px-6">

      {/* Background */}
      <div className="absolute inset-0 bg-brand-dark" />
      
     {/* bg glow */}
    <div
  className="
    pointer-events-none
    absolute
    left-1/2
    top-1/2
    -translate-x-1/2
    -translate-y-1/2
    z-0
    h-[420px]
    w-[420px]
    rounded-full
    bg-orange-500/95
    blur-[100px]
    animate-glow
  "
  style={{
    animationDuration: "3s",
    animationIterationCount: "infinite",
  }}
/>

      <motion.div
        initial={{ opacity: 0, y: 35 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="relative z-10 max-w-3xl text-center"
      >
        <h1 className="text-[140px] font-black leading-none text-gradient-orange">
          404
        </h1>

        <h2 className="mt-6 font-display text-5xl font-semibold leading-tight text-white">
          Every Great Journey
          <br />
          Needs the Right Direction.
        </h2>

        <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-white/60">
          The page you're looking for isn't here.
          <br />
          Let's get you back on track.
        </p>

        <Link
          href="/"
          className="
            mt-10
            inline-flex
            items-center
            gap-2
            rounded-xl
            bg-gradient-to-r
            from-brand-accent
            to-brand-orange
            px-7
            py-4
            font-semibold
            text-white
            transition-all
            duration-300
            hover:scale-105
            hover:shadow-[0_0_40px_rgba(249,115,22,0.45)]
          "
        >
          <ArrowLeft size={18} />
          Return Home
        </Link>
      </motion.div>
    </main>
  );
}