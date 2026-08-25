'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  Compass,
  Palette,
  Rocket,
  Handshake,
} from 'lucide-react';

const cards = [
  {
    icon: Compass,
    title: 'Strategy First',
    description:
      'Every project starts with research, planning, and a clear roadmap tailored to your business goals.',
  },
  {
    icon: Palette,
    title: 'Premium Design',
    description:
      'Modern, cinematic visuals designed to elevate your brand and leave a lasting impression.',
  },
  {
    icon: Rocket,
    title: 'Attention to Detail',
    description:
      'Every pixel, animation, and interaction is carefully refined to create a polished, premium experience.',
  },
  {
    icon: Handshake,
    title: 'Long-Term Partnership',
    description:
      "We're more than a service provider—we're your long-term digital partner.",
  },
];

/* ========================================= */
/* NATURAL CINEMATIC RAIN DATA */
/* ========================================= */

const rainDrops = Array.from(
  { length: 520 },
  (_, i) => {
    const orange = i % 67 === 0;
    const glow = i % 113 === 0;

    return {
      left: `${(i * 37.917 + (i % 9) * 3.7) % 108}%`,
      delay: -((i * 0.061) % 5.8),
      depth: (i * 29) % 100,

      duration:
        0.48 +
        ((i * 17) % 95) / 100,

      height:
        10 +
        ((i * 31) % 31),

      width:
        glow ? 2.2 : orange ? 1.5 : 0.7 + ((i * 7) % 5) / 10,

      opacity:
        glow
          ? 0.72
          : orange
            ? 0.46
            : 0.10 + ((i * 19) % 34) / 100,

      orange,
      glow,
    };
  }
);

export default function WhyHavelent() {
  return (
    <section
      id="our-work"
      className="
        why-havelent-section
        relative
        overflow-hidden
        px-6
        pt-28
        pb-24
      "
    >

      {/* ========================================= */}
      {/* PREMIUM CINEMATIC RAIN BACKGROUND */}
      {/* ========================================= */}

      <div
        className="
          pointer-events-none
          absolute
          inset-0
          z-0
          overflow-hidden
        "
      >

        {/* Theme-aware base */}
        <div
          className="
            why-base-background
            absolute
            inset-0
          "
        />

        {/* Soft wet-night atmosphere */}
        <div
          className="
            why-atmosphere
            absolute
            inset-0
          "
        />

        {/* Subtle moving warm haze */}
        <motion.div
          animate={{
            x: [0, 55, -25, 0],
            y: [0, -20, 30, 0],
            opacity: [0.16, 0.24, 0.18, 0.16],
            scale: [1, 1.08, 0.97, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="
            absolute
            -left-48
            top-12
            h-[560px]
            w-[560px]
            rounded-full
            bg-orange-500/[0.12]
            blur-[170px]
          "
        />

        <motion.div
          animate={{
            x: [0, -45, 25, 0],
            y: [0, 35, -15, 0],
            opacity: [0.11, 0.19, 0.13, 0.11],
            scale: [1, 1.06, 0.98, 1],
          }}
          transition={{
            duration: 24,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="
            absolute
            -right-52
            top-0
            h-[600px]
            w-[600px]
            rounded-full
            bg-orange-600/[0.10]
            blur-[190px]
          "
        />

        {/* ========================================= */}
        {/* MAIN RAIN FIELD */}
        {/* TEMPORARILY DISABLED FOR PERFORMANCE TEST */}
        {/* ========================================= */}

        {/*
        <div
          className="
            absolute
            -inset-[20%]
            overflow-hidden
          "
        >
          {rainDrops.map((drop, index) => {
            const far = drop.depth < 42;
            const near = drop.depth > 78;

            return (
              <span
                key={index}
                className="absolute top-0 block will-change-transform"
                style={{
                  left: drop.left,
                  width: `${drop.width}px`,
                  height: `${drop.height}px`,
                  opacity:
                    far
                      ? drop.opacity * 0.55
                      : near
                        ? Math.min(drop.opacity * 1.18, 0.62)
                        : drop.opacity,

                  background: drop.orange
                    ? 'linear-gradient(to bottom, transparent 0%, rgba(249,115,22,0.08) 12%, rgba(249,115,22,0.82) 52%, rgba(249,115,22,0.10) 92%, transparent 100%)'
                    : 'linear-gradient(to bottom, transparent 0%, rgba(255,255,255,0.12) 8%, rgba(220,226,232,0.58) 50%, rgba(255,255,255,0.08) 92%, transparent 100%)',

                  borderRadius: '999px',

                  filter:
                    far
                      ? 'blur(0.7px)'
                      : near
                        ? 'blur(0.15px)'
                        : 'blur(0.35px)',

                  boxShadow: drop.glow
                    ? `
                        0 0 4px rgba(249,115,22,0.65),
                        0 0 12px rgba(249,115,22,0.38)
                      `
                    : drop.orange
                      ? '0 0 5px rgba(249,115,22,0.20)'
                      : '0 0 2px rgba(255,255,255,0.10)',

                  transform: 'rotate(14deg)',
                  animationName: 'havelentRain',
                  animationDuration: `${drop.duration}s`,
                  animationDelay: `${drop.delay}s`,
                  animationTimingFunction: 'linear',
                  animationIterationCount: 'infinite',
                }}
              />
            );
          })}
        </div>
        */}

        {/* ========================================= */}
        {/* RAIN MIST / FINE DROPS */}
        {/* TEMPORARILY DISABLED FOR PERFORMANCE TEST */}
        {/* ========================================= */}

        {/*
        <div className="absolute inset-0 overflow-hidden">
          {Array.from({ length: 180 }, (_, i) => (
            <span
              key={`mist-${i}`}
              className="
                absolute
                block
                h-[1px]
                w-[1px]
                rounded-full
                bg-white
                will-change-transform
              "
              style={{
                left: `${(i * 53.71) % 105}%`,
                top: `${(i * 31.43) % 105}%`,
                opacity: 0.08 + ((i * 11) % 18) / 100,
                animationName: 'havelentMist',
                animationDuration: `${0.8 + ((i * 13) % 100) / 100}s`,
                animationDelay: `${-((i * 0.043) % 3.8)}s`,
                animationTimingFunction: 'linear',
                animationIterationCount: 'infinite',
              }}
            />
          ))}
        </div>
        */}

        {/* ========================================= */}
        {/* RARE ORANGE DROPS */}
        {/* TEMPORARILY DISABLED FOR PERFORMANCE TEST */}
        {/* ========================================= */}

        {/*
        <div className="absolute inset-0 overflow-hidden">
          {Array.from({ length: 18 }, (_, i) => (
            <span
              key={`orange-${i}`}
              className="
                absolute
                top-0
                block
                rounded-full
                bg-orange-400
                will-change-transform
              "
              style={{
                left: `${(i * 61.37) % 100}%`,
                width: i % 6 === 0 ? '2px' : '1px',
                height: i % 6 === 0 ? '24px' : '16px',
                opacity: i % 6 === 0 ? 0.48 : 0.22,
                filter: 'blur(0.25px)',
                boxShadow:
                  i % 6 === 0
                    ? '0 0 10px rgba(249,115,22,0.45)'
                    : '0 0 5px rgba(249,115,22,0.20)',
                transform: 'rotate(14deg)',
                animationName: 'havelentOrangeRain',
                animationDuration: `${0.75 + (i % 5) * 0.16}s`,
                animationDelay: `${-((i * 0.37) % 3.4)}s`,
                animationTimingFunction: 'linear',
                animationIterationCount: 'infinite',
              }}
            />
          ))}
        </div>
        */}

        {/* Very subtle diagonal rain haze */}
        <div
          className="
            absolute
            -left-[20%]
            top-[18%]
            h-[45%]
            w-[140%]
            rotate-[14deg]
            bg-gradient-to-b
            from-transparent
            via-white/[0.018]
            to-transparent
            blur-[14px]
          "
        />

        {/* Subtle grain */}
        <div
          className="
            why-grain
            absolute
            inset-0
            opacity-[0.018]
            mix-blend-screen
            bg-[radial-gradient(circle_at_20%_20%,white_0.5px,transparent_0.5px)]
            [background-size:5px_5px]
          "
        />

      </div>

      {/* ========================================= */}
      {/* CONTENT */}
      {/* ========================================= */}

      <div
        className="
          relative
          z-10
          mx-auto
          -mt-1
          max-w-7xl
        "
      >

        {/* ========================================= */}
        {/* HEADING */}
        {/* ========================================= */}

        <motion.div
          initial={{
            opacity: 0,
          }}
          whileInView={{
            opacity: 1,
          }}
          transition={{
            duration: 0.35,
          }}
          viewport={{
            once: true,
          }}
          className="
            mx-auto
            max-w-3xl
            text-center
          "
        >

          <h2
            className="
              font-display
              text-5xl
              font-semibold
              why-heading
              md:text-6xl
            "
          >
            Why Brands Choose
            <span
              className="
                text-gradient-orange
              "
            >
              {' '}
              Havelent
            </span>
          </h2>

          <p
            className="
              mt-8
              text-lg
              leading-8
              why-description
            "
          >
            Helping business owners build brands
            they are proud of.
          </p>

        </motion.div>

        {/* ========================================= */}
        {/* OUR WORK CARD */}
        {/* ========================================= */}

        <div
          className="
            mb-16
            mt-10
            flex
            justify-center
          "
        >

          <Link
            href="/our-work"
            className="
              group
              relative
              block
              w-full
              max-w-3xl
            "
          >

            <motion.div
              whileHover={{
                y: -3,
              }}
              transition={{
                duration: 0.35,
                ease: [
                  0.22,
                  1,
                  0.36,
                  1,
                ],
              }}
              className="
                why-card
                relative
                overflow-hidden
                rounded-[22px]
                px-7
                py-7
                text-left
                backdrop-blur-xl
                transition-all
                duration-500
                md:px-10
                md:py-8
              "
              style={{
                boxShadow:
                  'inset 0 1px 0 rgba(255,255,255,0.05), 0 20px 60px -35px rgba(0,0,0,0.9)',
              }}
            >

              {/* Subtle glass highlight */}
              <div
                className="
                  why-glass-highlight
                  pointer-events-none
                  absolute
                  inset-0
                "
              />

              {/* Orange ambient glow */}
              <div
                className="
                  pointer-events-none
                  absolute
                  -right-20
                  -top-20
                  h-48
                  w-48
                  rounded-full
                  opacity-0
                  blur-[80px]
                  transition-opacity
                  duration-700
                  group-hover:opacity-100
                "
                style={{
                  background:
                    'radial-gradient(circle, rgba(249,115,22,0.25), transparent 70%)',
                }}
              />

              {/* Content */}
              <div
                className="
                  relative
                  flex
                  items-center
                  justify-between
                  gap-6
                "
              >

                <div>

                  <span
                    className="
                      text-xs
                      font-semibold
                      uppercase
                      tracking-[0.35em]
                      text-brand-orange
                    "
                  >
                    Our Work
                  </span>

                  <h3
                    className="
                      mt-2
                      font-display
                      text-2xl
                      font-semibold
                      why-card-heading
                      md:text-3xl
                    "
                  >
                    Explore what we create.
                  </h3>

                  <p
                    className="
                      mt-2
                      text-sm
                      why-card-description
                      md:text-base
                    "
                  >
                    Discover the projects, stories,
                    and experiences crafted by Havelent.
                  </p>

                </div>

                {/* Arrow */}
                <div
                  className="
                    flex
                    h-11
                    w-11
                    shrink-0
                    items-center
                    justify-center
                    rounded-full
                    border
                    border-brand-orange/40
                    text-brand-orange
                    transition-all
                    duration-500
                    group-hover:border-brand-orange
                    group-hover:bg-brand-orange
                    group-hover:text-black
                  "
                  style={{
                    boxShadow:
                      '0 0 20px -10px rgba(249,115,22,0.8)',
                  }}
                >

                  <span
                    className="
                      text-xl
                      transition-transform
                      duration-500
                      group-hover:translate-x-1
                    "
                  >
                    →
                  </span>

                </div>

              </div>

              {/* Bottom glow line */}
              <div
                className="
                  why-bottom-line
                  absolute
                  bottom-0
                  left-8
                  right-8
                  h-px
                  transition-all
                  duration-500
                  group-hover:bg-brand-orange/40
                "
              />

            </motion.div>

          </Link>

        </div>

        {/* ========================================= */}
        {/* FEATURE CARDS */}
        {/* ========================================= */}

        <div
          className="
            mt-20
            grid
            grid-cols-1
            gap-8
            md:grid-cols-2
          "
        >

          {cards.map(
            (card, index) => {

              const Icon =
                card.icon;

              return (
                <motion.div
                  key={index}
                  initial={{
                    opacity: 0,
                    y: 40,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  viewport={{
                    once: true,
                  }}
                  transition={{
                    duration: 0.6,
                    delay:
                      index * 0.15,
                  }}
                  className="
                    why-card
                    group
                    relative
                    overflow-hidden
                    rounded-[24px]
                    p-8
                    backdrop-blur-xl
                    transition-all
                    duration-500
                    hover:-translate-y-2
                    md:p-10
                  "
                  style={{
                    boxShadow:
                      'inset 0 1px 0 rgba(255,255,255,0.04), 0 20px 60px -35px rgba(0,0,0,0.9)',
                  }}
                >

                  {/* Glass highlight */}
                  <div
                    className="
                      why-glass-highlight
                      pointer-events-none
                      absolute
                      inset-0
                    "
                  />

                  {/* Orange ambient glow */}
                  <div
                    className="
                      pointer-events-none
                      absolute
                      -bottom-20
                      right-0
                      h-48
                      w-48
                      rounded-full
                      opacity-40
                      blur-[80px]
                      transition-opacity
                      duration-700
                      group-hover:opacity-80
                    "
                    style={{
                      background:
                        'radial-gradient(circle, rgba(249,115,22,0.22), transparent 70%)',
                    }}
                  />

                  {/* Card content */}
                  <div
                    className="
                      relative
                    "
                  >

                    {/* Icon */}
                    <div
                      className="
                        mb-7
                        flex
                        h-14
                        w-14
                        items-center
                        justify-center
                        rounded-2xl
                        border
                        border-brand-orange/30
                        bg-brand-orange/[0.06]
                        transition-all
                        duration-500
                        group-hover:scale-105
                        group-hover:border-brand-orange/60
                      "
                    >
                      <Icon
                        className="
                          h-7
                          w-7
                          text-brand-orange
                        "
                      />
                    </div>

                    {/* Title */}
                    <h3
                      className="
                        font-display
                        text-2xl
                        font-semibold
                        why-card-heading
                        md:text-3xl
                      "
                    >
                      {card.title}
                    </h3>

                    {/* Orange accent line */}
                    <div
                      className="
                        mt-4
                        h-px
                        w-16
                        bg-brand-orange
                        transition-all
                        duration-500
                        group-hover:w-24
                      "
                    />

                    {/* Description */}
                    <p
                      className="
                        mt-6
                        max-w-xl
                        leading-7
                        why-card-description
                        md:text-base
                      "
                    >
                      {card.description}
                    </p>

                  </div>

                  {/* Bottom orange glow line */}
                  <div
                    className="
                      why-bottom-line
                      absolute
                      bottom-0
                      left-8
                      right-8
                      h-px
                      transition-all
                      duration-500
                      group-hover:bg-brand-orange/40
                    "
                  />

                </motion.div>
              );
            }
          )}

        </div>

      </div>

      {/* ========================================= */}
      {/* THEME STYLES */}
      {/* ========================================= */}

      <style jsx>{`

        /*
         * DARK THEME
         * Existing premium dark appearance
         */
        .why-havelent-section {
          background: #0b0b0b;
          color: #ffffff;

          --why-text: #ffffff;
          --why-description: #d4d4d4;
          --why-card-heading: #ffffff;
          --why-card-description: rgba(255,255,255,0.55);

          --why-card-bg: rgba(255,255,255,0.035);
          --why-card-border: rgba(255,255,255,0.10);

          --why-highlight:
            linear-gradient(
              to bottom right,
              rgba(255,255,255,0.045),
              transparent,
              transparent
            );

          --why-bottom-line:
            linear-gradient(
              to right,
              transparent,
              rgba(255,255,255,0.10),
              transparent
            );

          --why-atmosphere:
            radial-gradient(
              circle at 15% 35%,
              rgba(249,115,22,0.10),
              transparent 32%
            ),
            radial-gradient(
              circle at 85% 20%,
              rgba(234,88,12,0.07),
              transparent 32%
            ),
            radial-gradient(
              circle at 50% 100%,
              rgba(249,115,22,0.05),
              transparent 38%
            );
        }

        /*
         * WARM CHARCOAL THEME
         * ThemeProvider adds "charcoal" to html
         */
        :global(html.charcoal) .why-havelent-section {
          background: #171513;
          color: #f5f1eb;

          --why-text: #f5f1eb;
          --why-description: #d8d0c8;
          --why-card-heading: #f7f2eb;
          --why-card-description: rgba(245,241,235,0.62);

          --why-card-bg: rgba(255,248,240,0.055);
          --why-card-border: rgba(255,235,215,0.13);

          --why-highlight:
            linear-gradient(
              to bottom right,
              rgba(255,245,230,0.055),
              transparent,
              transparent
            );

          --why-bottom-line:
            linear-gradient(
              to right,
              transparent,
              rgba(255,235,215,0.13),
              transparent
            );

          --why-atmosphere:
            radial-gradient(
              circle at 15% 35%,
              rgba(249,115,22,0.13),
              transparent 32%
            ),
            radial-gradient(
              circle at 85% 20%,
              rgba(234,88,12,0.09),
              transparent 32%
            ),
            radial-gradient(
              circle at 50% 100%,
              rgba(249,115,22,0.07),
              transparent 38%
            );
        }

        .why-base-background {
          background: inherit;
        }

        .why-atmosphere {
          background: var(--why-atmosphere);
        }

        .why-heading {
          color: var(--why-text);
        }

        .why-description {
          color: var(--why-description);
        }

        .why-card {
          background: var(--why-card-bg);
          border: 1px solid var(--why-card-border);
        }

        .why-card:hover {
          border-color: rgba(249,115,22,0.5);
        }

        .why-glass-highlight {
          background: var(--why-highlight);
        }

        .why-card-heading {
          color: var(--why-card-heading);
        }

        .why-card-description {
          color: var(--why-card-description);
        }

        .why-bottom-line {
          background: var(--why-bottom-line);
        }

        :global(html.charcoal) .why-grain {
          mix-blend-mode: soft-light;
        }

        @keyframes havelentRain {
          0% {
            transform: translate3d(0, -22vh, 0) rotate(14deg);
          }

          100% {
            transform: translate3d(-105px, 128vh, 0) rotate(14deg);
          }
        }

        @keyframes havelentMist {
          0% {
            transform: translate3d(0, -15px, 0);
            opacity: 0;
          }

          10% {
            opacity: 0.18;
          }

          90% {
            opacity: 0.18;
          }

          100% {
            transform: translate3d(-70px, 112vh, 0);
            opacity: 0;
          }
        }

        @keyframes havelentOrangeRain {
          0% {
            transform: translate3d(0, -25vh, 0) rotate(14deg);
          }

          100% {
            transform: translate3d(-115px, 130vh, 0) rotate(14deg);
          }
        }

      `}</style>

    </section>
  );
}