"use client";

import { AnimatePresence, motion } from "framer-motion";

type Props = {
  show: boolean;
};

export default function LoadingScreen({ show }: Props) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7 }}
          className="fixed inset-0 z-[99999] flex items-center justify-center bg-[#050505]"
        >
          {/* Ambient Glow */}
          <div className="absolute h-[550px] w-[550px] rounded-full bg-orange-500/20 blur-[170px]" />

          {/* Logo */}
          <motion.img
            src="/logos/logo.svg"
            alt="Havelent"
            draggable={false}
            className="relative w-[360px] h-auto select-none"
            initial={{
              opacity: 0,
              scale: 0.92,
              y: 8,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              scale: 1.04,
            }}
            transition={{
              duration: 0.85,
              ease: [0.22, 1, 0.36, 1],
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}