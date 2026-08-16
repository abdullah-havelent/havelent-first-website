'use client';

import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import React from 'react';
import { useRouter } from 'next/navigation';
import ServiceOutlineText from '@/components/ServiceOutlineText';

const headingWords = [
  { text: 'Every', color: 'white' },
  { text: 'Frame,', color: 'gradient' },
  { text: 'Tells a', color: 'white' },
  { text: ' Story.', color: 'gradient' },
];

export default function VideoEditingHero() {
  const router = useRouter();

  // =========================================================
  // PARALLAX
  // =========================================================

  const mx = useMotionValue(0);
  const my = useMotionValue(0);

  const sx = useSpring(mx, {
    damping: 40,
    stiffness: 120,
  });

  const sy = useSpring(my, {
    damping: 40,
    stiffness: 120,
  });

  const tx1 = useTransform(sx, (v) => `${v * 5}px`);
  const ty1 = useTransform(sy, (v) => `${v * 5}px`);

  const tx2 = useTransform(sx, (v) => `${v * -8}px`);
  const ty2 = useTransform(sy, (v) => `${v * -8}px`);

  const onMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();

    mx.set((e.clientX - rect.left) / rect.width - 0.5);
    my.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  return (
    <section
      id="video-editing-hero"
      onMouseMove={onMouseMove}
      className="
        relative
        flex
        min-h-[88vh]
        w-full
        flex-col
        items-center
        justify-start
        overflow-hidden
        bg-brand-dark
        px-6
        pt-32
        pb-8
      "
    >

      {/* =========================================================
          GIANT VIDEO EDITING OUTLINE
          ========================================================= */}

      <ServiceOutlineText text="VIDEO EDITING" />

      {/* =========================================================
          BACKGROUND GRID
          ========================================================= */}

      <div
        className="
          bg-grid
          pointer-events-none
          absolute
          inset-0
          z-0
          opacity-[0.08]
        "
      />

      {/* =========================================================
          LEFT ORANGE GLOW
          ========================================================= */}

      <motion.div
        style={{
          x: tx1,
          y: ty1,
        }}
        className="
          animate-float
          pointer-events-none
          absolute
          -left-32
          top-24
          z-0
          h-[420px]
          w-[420px]
          rounded-full
          bg-gradient-to-br
          from-brand-orange/30
          to-brand-red/10
          blur-[120px]
        "
      />

      {/* =========================================================
          RIGHT LOWER GLOW
          ========================================================= */}

      <motion.div
        style={{
          x: tx2,
          y: ty2,
        }}
        className="
          pointer-events-none
          absolute
          -right-40
          bottom-10
          z-0
          hidden
          h-[520px]
          w-[520px]
          rounded-full
          bg-gradient-to-br
          from-brand-accent/25
          to-brand-orange/10
          blur-[140px]
        "
      />

      {/* =========================================================
          LARGE TOP RIGHT ORANGE GLOW
          ========================================================= */}

      <motion.div
        style={{
          x: 0,
          y: 0,
        }}
        className="
          animate-float
          pointer-events-none
          absolute
          -right-[420px]
          -top-[180px]
          z-0
          h-[1200px]
          w-[1200px]
          rounded-full
          bg-gradient-to-br
          from-brand-orange/40
          via-brand-orange/20
          to-transparent
          blur-[260px]
        "
      />

      {/* =========================================================
          NOISE
          ========================================================= */}

      <div className="noise pointer-events-none absolute inset-0 z-[1]" />

      {/* =========================================================
          BOTTOM FADE
          ========================================================= */}

      <div
        className="
          pointer-events-none
          absolute
          bottom-0
          left-0
          z-[2]
          h-40
          w-full
          bg-gradient-to-b
          from-transparent
          via-black/30
          to-black
        "
      />

      {/* =========================================================
          HERO CONTENT
          ========================================================= */}

      <div
        className="
          relative
          z-10
          flex
          w-full
          flex-col
          items-center
          pt-20
        "
      >

        {/* =======================================================
            MAIN HEADING
            ======================================================= */}

        <h1
          className="
            font-display
            text-center
            text-[clamp(2.75rem,7vw,6.5rem)]
            font-semibold
            leading-[1.2]
            tracking-tight
          "
        >
          {headingWords.map((word, index) => (
            <span
              key={`${word.text}-${index}`}
              className="
                mr-3
                inline-block
                overflow-hidden
                align-bottom
              "
            >
              <motion.span
                initial={{
                  opacity: 0,
                  y: 40,
                  filter: 'blur(12px)',
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                  filter: 'blur(0px)',
                }}
                transition={{
                  duration: 0.8,
                  delay: 0.3 + index * 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className={`
                  inline-block
                  ${
                    word.color === 'gradient'
                      ? 'text-gradient-orange'
                      : 'text-white'
                  }
                `}
              >
                {word.text}
              </motion.span>
            </span>
          ))}
        </h1>

        {/* =======================================================
            SUBTITLE
            ======================================================= */}

        <motion.p
          initial={{
            opacity: 0,
            y: 24,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.8,
            delay: 0.7,
          }}
          className="
            mt-8
            max-w-xl
            text-center
            text-base
            leading-relaxed
            text-white/60
            sm:text-lg
          "
        >
          We transform raw footage into cinematic stories that capture
          attention, increase audience retention, and make your brand
          impossible to ignore.
        </motion.p>

        {/* =======================================================
            CTA BUTTONS
            ======================================================= */}

        <motion.div
          initial={{
            opacity: 0,
            y: 24,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.8,
            delay: 0.9,
          }}
          className="
            mt-10
            flex
            flex-col
            items-center
            gap-4
            sm:flex-row
          "
        >

          {/* Get a Free Quote */}

          <motion.button
            type="button"
            whileHover={{
              scale: 1.04,
            }}
            whileTap={{
              scale: 0.97,
            }}
            data-cursor="button"
            onClick={() => {
              router.push('/#contact');

              setTimeout(() => {
                document
                  .getElementById('contact')
                  ?.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start',
                  });
              }, 500);
            }}
            className="
              group
              relative
              inline-flex
              items-center
              gap-2
              overflow-hidden
              rounded-full
              bg-gradient-to-r
              from-brand-accent
              to-brand-orange
              px-7
              py-3.5
              text-sm
              font-semibold
              text-white
            "
            style={{
              boxShadow: '0 0 30px -6px rgba(249,115,22,0.55)',
            }}
          >
            <span className="relative z-10">
              Get a Free Quote
            </span>

            <motion.span
              className="relative z-10"
              initial={{
                x: 0,
              }}
              whileHover={{
                x: 4,
              }}
              transition={{
                duration: 0.3,
              }}
            >
              <ArrowRight size={16} />
            </motion.span>

            <span
              className="
                absolute
                inset-0
                bg-gradient-to-r
                from-brand-orange
                to-brand-red
                opacity-0
                transition-opacity
                duration-300
                group-hover:opacity-100
              "
            />
          </motion.button>

          {/* View Our Services */}

          <motion.button
            whileHover={{
              scale: 1.04,
            }}
            whileTap={{
              scale: 0.97,
            }}
            data-cursor="button"
            onClick={() => {
              document
                .getElementById('services')
                ?.scrollIntoView({
                  behavior: 'smooth',
                });
            }}
            className="
              rounded-full
              border
              border-white/20
              px-7
              py-3.5
              text-sm
              font-medium
              text-white/90
              transition-all
              duration-300
              hover:border-brand-orange
              hover:text-brand-orange
            "
          >
            View Our Services
          </motion.button>

        </motion.div>
      </div>
    </section>
  );
}