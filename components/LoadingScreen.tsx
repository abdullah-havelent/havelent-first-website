"use client";

import { motion } from "framer-motion";

type Props = {
  show: boolean;
};

export default function LoadingScreen({ show }: Props) {
  if (!show) return null;

  return (
    <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-[#050505]">
      <div className="absolute h-[300px] w-[300px] rounded-full bg-orange-500/20 blur-[120px]" />

      <motion.img
        src="/logos/logo.svg"
        alt="Havelent"
        draggable={false}
        loading="eager"
        fetchPriority="high"
        initial={{
          opacity: 1,
          scale: 0.82,
        }}
        animate={{
          opacity: 1,
          scale: 1,
        }}
        transition={{
          duration: 0.8,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="relative w-[220px] md:w-[360px] h-auto"
      />
    </div>
  );
}