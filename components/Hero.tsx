'use client';

import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from 'framer-motion';

import {
  ArrowRight,
  Sparkles,
} from 'lucide-react';

import Link from 'next/link';
import React from 'react';

import Marquee from '@/components/Marquee';

import { useTheme } from '@/components/ThemeProvider';

// ==========================================
// HERO HEADING
// ==========================================

const headingWords = [
  { text: 'Your', color: 'white' },
  { text: 'Vision,', color: 'gradient' },
  { text: 'Our', color: 'white' },
  { text: 'Responsibility.', color: 'gradient' },
  { text: 'Digital Agency.', color: 'white' },
];

// ==========================================
// HERO COMPONENT
// ==========================================

export default function Hero() {

  const { theme } = useTheme();

  // ==========================================
  // PARALLAX
  // ==========================================

  const mx =
    useMotionValue(0);

  const my =
    useMotionValue(0);

  const sx =
    useSpring(mx, {
      damping: 40,
      stiffness: 120,
    });

  const sy =
    useSpring(my, {
      damping: 40,
      stiffness: 120,
    });

  const tx1 =
    useTransform(
      sx,
      (v) => `${v * 5}px`
    );

  const ty1 =
    useTransform(
      sy,
      (v) => `${v * 5}px`
    );

  const tx2 =
    useTransform(
      sx,
      (v) => `${v * -8}px`
    );

  const ty2 =
    useTransform(
      sy,
      (v) => `${v * -8}px`
    );

  const onMouseMove = (e: React.MouseEvent) => {
    if (!window.matchMedia('(min-width: 1024px) and (hover: hover) and (pointer: fine)').matches) return;

    const section = e.currentTarget as HTMLElement;
    const rect = section.getBoundingClientRect();
    const normalizedX = (e.clientX - rect.left) / rect.width - 0.5;
    const normalizedY = (e.clientY - rect.top) / rect.height - 0.5;
    const distance = Math.sqrt(normalizedX ** 2 + normalizedY ** 2);
    const proximity = Math.max(0, Math.min(1, 1 - distance / 0.62));

    mx.set(normalizedX);
    my.set(normalizedY);
    section.style.setProperty('--hero-orbit-x', normalizedX * 36 + 'px');
    section.style.setProperty('--hero-orbit-y', normalizedY * 28 + 'px');
    section.style.setProperty('--hero-orbit-brightness', String(1 + proximity * 0.38));
    section.style.setProperty('--hero-orbit-opacity', String(0.78 + proximity * 0.18));
  };
  // ==========================================
  // CLICK TO REVEAL
  // ==========================================

  const [
    clickCount,
    setClickCount,
  ] = React.useState(0);

  const [
    revealed,
    setRevealed,
  ] = React.useState(false);

  const handleReveal = () => {
    setRevealed(true);

    setClickCount(
      (prev) => prev + 1
    );
  };

  // ==========================================
  // RETURN
  // ==========================================

  return (

    <section
      id="home"
      onMouseMove={onMouseMove}
      className="
        relative
        flex
        w-full
        flex-col
        items-center
        justify-start
        bg-[#fdccae] md:bg-[#fdccae]
        px-6
        pb-20
        pt-36
      "
    >

      {/* ======================================
          ROTATING SHAPES
      ====================================== */}

<div
  aria-hidden="true"
  className={`hero-orbit pointer-events-none absolute left-1/2 top-[48%] z-[1] -translate-x-1/2 -translate-y-1/2 ${
    theme === 'charcoal'
      ? 'hero-orbit-dark'
      : 'hero-orbit-light'
  }`}
>
  <div className="hero-orbit-ring hero-orbit-ring-one" />
  <div className="hero-orbit-ring hero-orbit-ring-two" />
  <div className="hero-orbit-ring hero-orbit-ring-three" />

  <div className="hero-orbit-core" />
  <div className="hero-orbit-glow" />

  <span className="hero-orbit-dot hero-orbit-dot-one" />
  <span className="hero-orbit-dot hero-orbit-dot-two" />
</div>

      {/* ======================================
          BACKGROUND GRID
      ====================================== */}

      <div
        className="
          bg-grid
          pointer-events-none
          absolute
          inset-0
          opacity-[0.08]
        "
      />

      {/* ======================================
          LEFT ORANGE GLOW
      ====================================== */}

      <motion.div
        style={{
          x: tx1,
          y: ty1,
        }}
        animate={{
          opacity: [0.18, 0.38, 0.18],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="
          hidden
          md:block
          animate-float
          pointer-events-none
          absolute
          -left-32
          top-24
          h-[420px]
          w-[420px]
          rounded-full
          bg-gradient-to-br
          from-brand-orange/30
          to-brand-red/10
          blur-[120px]
        "
      />

      {/* ======================================
          RIGHT ORANGE GLOW
      ====================================== */}

      <motion.div
        style={{
          x: tx2,
          y: ty2,
        }}
        animate={{
          opacity: [0.55, 1, 0.55],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="
          hidden
          md:block
          pointer-events-none
          absolute
          right-0
          top-0
          h-[900px]
          w-[900px]
          translate-y-10
          animate-glowa
          bg-gradient-to-bl
          from-orange-500/100
          via-orange-500/70
          to-transparent
          blur-[220px]
        "
      />

      <div className="noise" />

      {/* ======================================
          CINEMATIC ORANGE LIGHTNING STORM
          
          TEMPORARILY DISABLED FOR
          PERFORMANCE TESTING.
          
          NOTHING INSIDE THIS BLOCK HAS
          BEEN DELETED.
      ====================================== */}

      {/*
      <div
        className="
          pointer-events-none
          absolute
          inset-0
          z-[2]
          overflow-hidden
        "
      >
        <div className="storm-clouds">
          <div className="storm-cloud cloud-one" />
          <div className="storm-cloud cloud-two" />
          <div className="storm-cloud cloud-three" />
          <div className="storm-cloud cloud-four" />
        </div>

        <div className="storm-screen-flash" />

        <svg
          className="storm-bolt bolt-one"
          viewBox="0 0 500 900"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <filter
              id="orangeGlowOne"
              x="-100%"
              y="-100%"
              width="300%"
              height="300%"
            >
              <feGaussianBlur
                in="SourceGraphic"
                stdDeviation="7"
                result="blur"
              />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          <g filter="url(#orangeGlowOne)">
            <path
              d="
                M300 0
                L270 72
                L286 118
                L240 165
                L260 210
                L215 270
                L235 310
                L188 365
                L205 408
                L160 470
                L180 510
                L138 575
                L151 620
                L108 690
                L120 735
                L82 810
                L96 875
              "
              stroke="#F97316"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            <path d="M270 72 L220 45 L185 52 L150 28" stroke="#F97316" strokeWidth="1.4" />
            <path d="M286 118 L335 95 L375 110 L410 82" stroke="#F97316" strokeWidth="1.3" />
            <path d="M240 165 L195 142 L155 153 L120 130" stroke="#F97316" strokeWidth="1.5" />
            <path d="M260 210 L310 188 L350 205 L390 180" stroke="#F97316" strokeWidth="1.4" />
            <path d="M215 270 L170 248 L125 263 L88 242" stroke="#F97316" strokeWidth="1.5" />
            <path d="M235 310 L280 290 L320 304 L360 282" stroke="#F97316" strokeWidth="1.3" />
            <path d="M188 365 L145 340 L105 355 L68 330" stroke="#F97316" strokeWidth="1.6" />
            <path d="M205 408 L250 386 L292 402 L330 380" stroke="#F97316" strokeWidth="1.3" />
            <path d="M160 470 L120 448 L80 460 L45 440" stroke="#F97316" strokeWidth="1.4" />
            <path d="M180 510 L225 488 L265 500 L305 480" stroke="#F97316" strokeWidth="1.2" />
            <path d="M138 575 L98 552 L62 566 L28 545" stroke="#F97316" strokeWidth="1.3" />
            <path d="M108 690 L70 668 L40 680 L10 660" stroke="#F97316" strokeWidth="1.2" />
          </g>
        </svg>

        <svg
          className="storm-bolt bolt-two"
          viewBox="0 0 500 900"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <filter
              id="orangeGlowTwo"
              x="-100%"
              y="-100%"
              width="300%"
              height="300%"
            >
              <feGaussianBlur
                in="SourceGraphic"
                stdDeviation="8"
                result="blur"
              />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          <g filter="url(#orangeGlowTwo)">
            <path
              d="
                M420 0
                L390 60
                L405 105
                L360 150
                L378 195
                L330 245
                L350 290
                L300 345
                L320 390
                L270 445
                L285 490
                L238 545
                L250 600
                L205 655
                L218 710
                L175 770
                L188 830
              "
              stroke="#FF7A1A"
              strokeWidth="3.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            <path d="M390 60 L345 35 L310 48 L275 20" stroke="#FF7A1A" strokeWidth="1.5" />
            <path d="M405 105 L450 85 L480 98" stroke="#FF7A1A" strokeWidth="1.3" />
            <path d="M360 150 L315 128 L275 145 L235 122" stroke="#FF7A1A" strokeWidth="1.4" />
            <path d="M378 195 L425 174 L460 188" stroke="#FF7A1A" strokeWidth="1.4" />
            <path d="M330 245 L285 222 L245 238 L205 216" stroke="#FF7A1A" strokeWidth="1.5" />
            <path d="M350 290 L395 270 L430 285" stroke="#FF7A1A" strokeWidth="1.2" />
            <path d="M300 345 L255 320 L215 338 L175 315" stroke="#FF7A1A" strokeWidth="1.5" />
            <path d="M320 390 L365 370 L405 385" stroke="#FF7A1A" strokeWidth="1.3" />
            <path d="M270 445 L225 425 L185 440 L145 420" stroke="#FF7A1A" strokeWidth="1.4" />
            <path d="M238 545 L195 525 L160 540 L125 520" stroke="#FF7A1A" strokeWidth="1.3" />
            <path d="M205 655 L165 635 L130 650 L95 630" stroke="#FF7A1A" strokeWidth="1.3" />
          </g>
        </svg>

        <svg
          className="storm-bolt bolt-three"
          viewBox="0 0 500 900"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <filter
              id="orangeGlowThree"
              x="-100%"
              y="-100%"
              width="300%"
              height="300%"
            >
              <feGaussianBlur
                in="SourceGraphic"
                stdDeviation="6"
                result="blur"
              />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          <g filter="url(#orangeGlowThree)">
            <path
              d="
                M150 0
                L175 75
                L145 125
                L180 180
                L140 235
                L170 290
                L125 345
                L155 405
                L110 465
                L135 520
                L92 580
                L115 640
                L72 700
                L90 760
                L55 830
              "
              stroke="#EA580C"
              strokeWidth="2.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            <path d="M175 75 L215 50 L250 62" stroke="#EA580C" strokeWidth="1.2" />
            <path d="M145 125 L105 100 L70 112" stroke="#EA580C" strokeWidth="1.3" />
            <path d="M180 180 L225 160 L260 175" stroke="#EA580C" strokeWidth="1.2" />
            <path d="M140 235 L95 215 L60 230" stroke="#EA580C" strokeWidth="1.4" />
            <path d="M170 290 L215 268 L250 285" stroke="#EA580C" strokeWidth="1.3" />
            <path d="M125 345 L80 325 L45 340" stroke="#EA580C" strokeWidth="1.4" />
            <path d="M155 405 L200 385 L235 400" stroke="#EA580C" strokeWidth="1.2" />
            <path d="M110 465 L68 445 L35 460" stroke="#EA580C" strokeWidth="1.3" />
            <path d="M92 580 L50 560 L20 575" stroke="#EA580C" strokeWidth="1.2" />
          </g>
        </svg>

        <div className="storm-orange-glow" />
      </div>
      */}

      {/* ======================================
          CLICK TO REVEAL
      ====================================== */}

      <motion.button
        initial={{
          opacity: 0,
          y: 20,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.7,
          ease: [
            0.22,
            1,
            0.36,
            1,
          ],
        }}
        whileHover={{
          scale: 1.04,
          y: -2,
        }}
        onClick={handleReveal}
        onMouseLeave={() =>
          setRevealed(false)
        }
        data-cursor="button"
        className={`
          group
          relative
          mb-8
          inline-flex
          min-w-[190px]
          items-center
          justify-center
          gap-2
          rounded-full
          border
          px-5
          py-2
          text-sm
          font-medium
          transition-all
          duration-300
          ${
            revealed
              ? 'border-white/10 bg-black text-white'
              : 'border-white/15 bg-white text-brand-dark'
          }
        `}
      >

        {revealed ? (

          <span className="text-gradient-orange">
            {clickCount === 1
              ? 'Welcome'
              : 'Welcome Again'}
          </span>

        ) : (

          <>

            <Sparkles
              size={14}
              className="text-brand-orange"
            />

            <span>
              Click to Reveal
            </span>

            <span
              className="
                ml-1
                h-1.5
                w-1.5
                rounded-full
                bg-brand-orange
              "
            />

          </>

        )}

      </motion.button>

      {/* ======================================
          HEADING
      ====================================== */}

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

        {headingWords.map(
          (word, i) => (

            <span
              key={i}
              className="
                mr-3
                inline-block
                overflow-visible
                align-bottom
              "
            >

              <motion.span
                initial={{
                  opacity: 0,
                  y: 0,
                  filter: 'blur(3px)',
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                  filter: 'blur(0px)',
                }}
                transition={{
                  duration: 0.45,
                  delay:
                    0.3 + i * 0.1,
                  ease: [
                    0.22,
                    1,
                    0.36,
                    1,
                  ],
                }}
                className="
                  inline-block
                "
              >

                <span
                  className={
                    word.color === 'gradient'
                      ? 'text-gradient-orange'
                      : theme === 'charcoal'
                        ? 'text-white'
                        : 'text-[#000000]'
                  }
                >
                  {word.text}
                </span>

              </motion.span>

            </span>

          )
        )}

      </h1>


<motion.p
  initial={{
    opacity: 0,
    y: 18,
    filter: 'blur(4px)',
  }}
  animate={{
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
  }}
  transition={{
    duration: 0.7,
    delay: 0.8,
    ease: [0.22, 1, 0.36, 1],
  }}
  className="
    mt-6
    max-w-2xl
    text-center
    text-base
    leading-7
    sm:text-lg
  "
  style={{
    color:
      theme === 'charcoal'
        ? 'rgba(255, 255, 255, 0.70)'
        : 'rgba(0, 0, 0, 0.65)',
  }}
>
  Havelent is a creative digital agency offering thoughtful digital agency
  services that help modern brands turn ideas into impactful visuals,
  engaging content, and meaningful digital experiences.
</motion.p>


      {/* ======================================
          CTA
      ====================================== */}

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
          mt-20
          flex
          flex-col
          items-center
          gap-4
          sm:flex-row
        "
      >

        {/* START A PROJECT */}

        <Link href="#contact">

          <motion.button
            whileHover={{
              scale: 1.04,
            }}
            whileTap={{
              scale: 0.97,
            }}
            data-cursor="button"
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
              boxShadow:
                '0 0 30px -6px rgba(249,115,22,0.55)',
            }}
          >

            <span className="relative z-10">
              Start a Project
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
              <ArrowRight
                size={16}
              />
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

        </Link>

        {/* VIEW SERVICES */}

        <motion.button
          whileHover={{
            scale: 1.04,
          }}
          whileTap={{
            scale: 0.97,
          }}
          onClick={() => {

            document
              .getElementById(
                'services'
              )
              ?.scrollIntoView({
                behavior:
                  'smooth',
              });

          }}
          data-cursor="button"
          className={`
            rounded-full
            border
            px-7
            py-3.5
            text-sm
            font-medium
            transition-all
            duration-300
            hover:border-brand-orange
            hover:text-brand-orange
            ${
              theme === 'charcoal'
                ? 'border-white/30 text-white'
                : 'border-black/20 text-black/90'
            }
          `}
        >
          View Our Services
        </motion.button>

      </motion.div>

      {/* ======================================
          MARQUEE + LIVE ACTIVITY
      ====================================== */}

      <div className="mt-14 w-full">

        <motion.div
          initial={{
            opacity: 0,
            y: 30,
            scale: 0.98,
            filter: 'blur(8px)',
          }}
          animate={{
            opacity: 1,
            y: 0,
            scale: 1,
            filter: 'blur(0px)',
          }}
          transition={{
            duration: 0.9,
            delay: 1.2,
            ease: [
              0.22,
              1,
              0.36,
              1,
            ],
          }}
        >

          <Marquee />

        </motion.div>

        {/* ==================================
            LIVE ACTIVITY COUNTER
        ================================== */}

        <motion.div
          initial={{
            opacity: 0,
            y: 10,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.7,
            delay: 1.7,
            ease: [
              0.22,
              1,
              0.36,
              1,
            ],
          }}
          className="
            mt-7
            flex
            w-full
            justify-center
          "
        >

          <div
            className="
              flex
              items-center
              justify-center
              gap-2
              text-center
            "
          >

            <p
              className="
                whitespace-nowrap
                text-[10px]
                font-medium
                leading-none
                text-black/55
                sm:text-xs
                lg:text-base
              "
            >

              <span className="text-brand-orange">
                People are exploring Havelent
              </span>

              <span className="mx-.5 text-brand-orange">
                ·
              </span>

              <span
                className={
                  theme === 'charcoal'
                    ? 'font-semibold text-white'
                    : 'font-semibold text-black/70'
                }
              >
                You are one of them.
              </span>

            </p>

          </div>

        </motion.div>

      </div>

      {/* ======================================
          LIGHTNING ANIMATION STYLES
      ====================================== */}

      <style jsx>{`

        /* ======================================
           CINEMATIC ORANGE LIGHTNING STORM
           ====================================== */

        .storm-bolt {
          position: absolute;
          width: 48%;
          height: 105%;
          overflow: visible;
          opacity: 0;
          filter:
            drop-shadow(0 0 4px rgba(249, 115, 22, 0.42))
            drop-shadow(0 0 14px rgba(249, 115, 22, 0.16));
        }

        .bolt-one {
          right: 4%;
          top: -5%;
          animation: stormStrikeOne 8s infinite;
        }

        .bolt-two {
          right: 30%;
          top: -8%;
          transform: scale(0.9);
          animation: stormStrikeTwo 10s infinite;
        }

        .bolt-three {
          left: 3%;
          top: -8%;
          transform: scale(0.75);
          animation: stormStrikeThree 12s infinite;
        }

        /* ======================================
           SOFT CLOUD / STORM ATMOSPHERE
           ====================================== */

        .storm-clouds {
          position: absolute;
          inset: -18%;
          opacity: 0;
          filter: blur(58px);
          animation: cloudsAppear 8s infinite;
        }

        .storm-cloud {
          position: absolute;
          border-radius: 999px;
          background:
            radial-gradient(
              circle,
              rgba(82, 48, 28, 0.16),
              rgba(38, 23, 15, 0.07),
              transparent 72%
            );
        }

        .cloud-one {
          width: 620px;
          height: 270px;
          left: -110px;
          top: 4%;
        }

        .cloud-two {
          width: 700px;
          height: 300px;
          right: -170px;
          top: 10%;
        }

        .cloud-three {
          width: 680px;
          height: 290px;
          left: 18%;
          top: 34%;
        }

        .cloud-four {
          width: 520px;
          height: 260px;
          right: 8%;
          bottom: 4%;
        }

        /* ======================================
           VERY SUBTLE SCREEN FLASH
           ====================================== */

        .storm-screen-flash {
          position: absolute;
          inset: 0;
          background:
            radial-gradient(
              circle at 55% 34%,
              rgba(249, 115, 22, 0.10),
              transparent 58%
            );
          opacity: 0;
          animation: stormFlash 8s infinite;
        }

        /* ======================================
           SOFT ORANGE ATMOSPHERIC LIGHT
           ====================================== */

        .storm-orange-glow {
          position: absolute;
          width: 430px;
          height: 430px;
          right: 7%;
          top: 18%;
          border-radius: 50%;
          background:
            radial-gradient(
              circle,
              rgba(249, 115, 22, 0.09),
              transparent 70%
            );
          filter: blur(105px);
          opacity: 0;
          animation: orangeStormGlow 8s infinite;
        }

        /* ======================================
           STRIKE 1 — STRONG / CENTRAL
           ====================================== */

        @keyframes stormStrikeOne {
          0%,
          18%,
          100% {
            opacity: 0;
          }

          20.0% {
            opacity: 0.30;
          }

          20.08% {
            opacity: 0;
          }

          20.28% {
            opacity: 0.16;
          }

          20.38% {
            opacity: 0;
          }

          20.62% {
            opacity: 0.42;
          }

          21.10% {
            opacity: 0.10;
          }

          21.45% {
            opacity: 0;
          }
        }

        /* ======================================
           STRIKE 2 — RIGHT / MEDIUM
           ====================================== */

        @keyframes stormStrikeTwo {
          0%,
          42%,
          100% {
            opacity: 0;
          }

          43.0% {
            opacity: 0.18;
          }

          43.12% {
            opacity: 0;
          }

          43.38% {
            opacity: 0.32;
          }

          43.75% {
            opacity: 0.07;
          }

          44.25% {
            opacity: 0;
          }
        }

        /* ======================================
           STRIKE 3 — LEFT / DISTANT
           ====================================== */

        @keyframes stormStrikeThree {
          0%,
          66%,
          100% {
            opacity: 0;
          }

          67.0% {
            opacity: 0.10;
          }

          67.14% {
            opacity: 0;
          }

          67.42% {
            opacity: 0.20;
          }

          68.0% {
            opacity: 0.04;
          }

          68.55% {
            opacity: 0;
          }
        }

        /* ======================================
           CLOUDS — ONLY DURING STORM ACTIVITY
           ====================================== */

        @keyframes cloudsAppear {
          0%,
          17%,
          100% {
            opacity: 0;
            transform: scale(0.97) translate3d(0, 8px, 0);
          }

          19.5% {
            opacity: 0.25;
            transform: scale(1) translate3d(0, 0, 0);
          }

          20.8% {
            opacity: 0.11;
          }

          22.8% {
            opacity: 0.22;
          }

          25% {
            opacity: 0;
            transform: scale(1.035) translate3d(0, -7px, 0);
          }
        }

        /* ======================================
           SCREEN LIGHT — LOW OPACITY
           ====================================== */

        @keyframes stormFlash {
          0%,
          19%,
          100% {
            opacity: 0;
          }

          20.02% {
            opacity: 0.022;
          }

          20.10% {
            opacity: 0;
          }

          20.62% {
            opacity: 0.038;
          }

          20.95% {
            opacity: 0;
          }
        }

        /* ======================================
           ORANGE LIGHT SPILL
           ====================================== */

        @keyframes orangeStormGlow {
          0%,
          18%,
          100% {
            opacity: 0;
            transform: scale(0.84);
          }

          20% {
            opacity: 0.16;
            transform: scale(1);
          }

          21.2% {
            opacity: 0.05;
          }

          23% {
            opacity: 0;
            transform: scale(1.10);
          }
        }



/* ==========================================
   PREMIUM ORBITAL BACKGROUND
========================================== */

.hero-orbit {
  width: min(72vw, 920px);
  height: min(72vw, 920px);
  max-width: 920px;
  max-height: 920px;
  opacity: 0.85;
  transform-style: preserve-3d;
  z-index: 1;
  perspective: 1200px;
}

/* ------------------------------------------
   RINGS
------------------------------------------ */

.hero-orbit-ring {
  position: absolute;
  inset: 50%;
  border-radius: 50%;
  transform-origin: center;
  border: 1.5px solid rgba(194, 65, 12, 0.32);
  will-change: transform, opacity;
}

/* Main horizontal ring */

.hero-orbit-ring-one {
  width: 100%;
  height: 46%;
  transform: translate(-50%, -50%) rotate(-18deg);
  box-shadow:
    0 0 30px rgba(249, 115, 22, 0.08),
    inset 0 0 30px rgba(249, 115, 22, 0.04);
  animation: heroOrbitOne 19s cubic-bezier(0.45, 0.05, 0.55, 0.95) infinite;
}

/* Diagonal ring */

.hero-orbit-ring-two {
  width: 76%;
  height: 76%;
  transform: translate(-50%, -50%) rotate(32deg);
  border-color: rgba(234, 88, 12, 0.20);
  box-shadow:
    0 0 45px rgba(249, 115, 22, 0.06);
  animation: heroOrbitTwo 27s cubic-bezier(0.37, 0, 0.63, 1) infinite;
}

/* Thin inner ring */

.hero-orbit-ring-three {
  width: 52%;
  height: 52%;
  transform: translate(-50%, -50%) rotate(-12deg);
  border-color: rgba(255, 179, 107, 0.24);
  animation: heroOrbitThree 11s cubic-bezier(0.65, 0, 0.35, 1) infinite;
}

/* ------------------------------------------
   CENTER
------------------------------------------ */

.hero-orbit-core {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 7px;
  height: 7px;
  border-radius: 50%;
  transform: translate(-50%, -50%);
  background: #f97316;
  box-shadow:
    0 0 12px rgba(249, 115, 22, 0.65),
    0 0 35px rgba(249, 115, 22, 0.22);
  animation: heroOrbitCore 4.8s ease-in-out infinite;
}

/* ------------------------------------------
   CENTRAL ATMOSPHERIC GLOW
------------------------------------------ */

.hero-orbit-glow {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 42%;
  height: 42%;
  transform: translate(-50%, -50%);
  border-radius: 50%;
  background: radial-gradient(
    circle,
    rgba(249, 115, 22, 0.11) 0%,
    rgba(249, 115, 22, 0.045) 32%,
    transparent 72%
  );
  filter: blur(30px);
  animation: heroOrbitGlow 7.5s cubic-bezier(0.45, 0.05, 0.55, 0.95) infinite;
  will-change: transform, opacity;
}

/* ------------------------------------------
   ORBITING DOTS
------------------------------------------ */

.hero-orbit-dot {
  position: absolute;
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: #f97316;
  box-shadow:
    0 0 10px rgba(249, 115, 22, 0.7),
    0 0 22px rgba(249, 115, 22, 0.25);
  will-change: transform, opacity;
}

.hero-orbit-dot-one {
  left: 12%;
  top: 38%;
  animation: heroDotOne 12s cubic-bezier(0.45, 0.05, 0.55, 0.95) infinite;
}

.hero-orbit-dot-two {
  right: 15%;
  bottom: 31%;
  width: 4px;
  height: 4px;
  opacity: 0.7;
  animation: heroDotTwo 15s cubic-bezier(0.45, 0.05, 0.55, 0.95) infinite;
}

/* ------------------------------------------
   DARK THEME
------------------------------------------ */

.hero-orbit-dark .hero-orbit-ring-one {
  border-color: rgba(249, 115, 22, 0.48);
}

.hero-orbit-dark .hero-orbit-ring-two {
  border-color: rgba(255, 122, 26, 0.36);
}

.hero-orbit-dark .hero-orbit-ring-three {
  border-color: rgba(255, 179, 107, 0.38);
}

.hero-orbit-dark .hero-orbit-glow {
  background: radial-gradient(
    circle,
    rgba(249, 115, 22, 0.13) 0%,
    rgba(249, 115, 22, 0.045) 35%,
    transparent 72%
  );
}

/* ------------------------------------------
   LIGHT THEME
------------------------------------------ */

.hero-orbit-light .hero-orbit-ring-one {
  border-color: rgba(154, 52, 18, 0.38);
}

.hero-orbit-light .hero-orbit-ring-two {
  border-color: rgba(124, 45, 18, 0.28);
}

.hero-orbit-light .hero-orbit-ring-three {
  border-color: rgba(67, 20, 7, 0.25);
}

.hero-orbit-light .hero-orbit-glow {
  background: radial-gradient(
    circle,
    rgba(194, 65, 12, 0.10) 0%,
    rgba(194, 65, 12, 0.035) 35%,
    transparent 72%
  );
}

.hero-orbit-light .hero-orbit-core,
.hero-orbit-light .hero-orbit-dot {
  background: #c2410c;
}

/* ------------------------------------------
   PREMIUM RING 1
   SLOW 3D BREATH + TILT
------------------------------------------ */

@keyframes heroOrbitOne {
  0% {
    transform:
      translate(-50%, -50%)
      rotate(-18deg)
      rotateX(0deg)
      rotateY(0deg)
      scale(1);
    opacity: 0.72;
  }

  18% {
    transform:
      translate(-50%, -50%)
      rotate(-11deg)
      rotateX(3deg)
      rotateY(-4deg)
      scale(1.012);
    opacity: 0.88;
  }

  37% {
    transform:
      translate(-50%, -50%)
      rotate(-2deg)
      rotateX(-2deg)
      rotateY(5deg)
      scale(1.025);
    opacity: 0.78;
  }

  54% {
    transform:
      translate(-50%, -50%)
      rotate(7deg)
      rotateX(4deg)
      rotateY(-2deg)
      scale(1.008);
    opacity: 0.94;
  }

  72% {
    transform:
      translate(-50%, -50%)
      rotate(-1deg)
      rotateX(-3deg)
      rotateY(3deg)
      scale(0.99);
    opacity: 0.76;
  }

  88% {
    transform:
      translate(-50%, -50%)
      rotate(-12deg)
      rotateX(2deg)
      rotateY(-3deg)
      scale(1.015);
    opacity: 0.86;
  }

  100% {
    transform:
      translate(-50%, -50%)
      rotate(-18deg)
      rotateX(0deg)
      rotateY(0deg)
      scale(1);
    opacity: 0.72;
  }
}

/* ------------------------------------------
   PREMIUM RING 2
   INDEPENDENT ELLIPTICAL DRIFT
------------------------------------------ */

@keyframes heroOrbitTwo {
  0% {
    transform:
      translate(-50%, -50%)
      rotate(32deg)
      scale(0.98, 1);
    opacity: 0.48;
  }

  20% {
    transform:
      translate(-50%, -50%)
      rotate(43deg)
      scale(1.015, 0.985);
    opacity: 0.68;
  }

  42% {
    transform:
      translate(-50%, -50%)
      rotate(56deg)
      scale(1.025, 0.975);
    opacity: 0.54;
  }

  63% {
    transform:
      translate(-50%, -50%)
      rotate(46deg)
      scale(0.985, 1.015);
    opacity: 0.72;
  }

  81% {
    transform:
      translate(-50%, -50%)
      rotate(37deg)
      scale(1.01, 0.99);
    opacity: 0.50;
  }

  100% {
    transform:
      translate(-50%, -50%)
      rotate(32deg)
      scale(0.98, 1);
    opacity: 0.48;
  }
}

/* ------------------------------------------
   PREMIUM RING 3
   ORGANIC INNER PULSE
------------------------------------------ */

@keyframes heroOrbitThree {
  0%,
  100% {
    transform:
      translate(-50%, -50%)
      rotate(-12deg)
      scale(0.94, 1);
    opacity: 0.48;
  }

  24% {
    transform:
      translate(-50%, -50%)
      rotate(-4deg)
      scale(1.015, 0.985);
    opacity: 0.78;
  }

  48% {
    transform:
      translate(-50%, -50%)
      rotate(9deg)
      scale(1.045, 0.96);
    opacity: 0.96;
  }

  67% {
    transform:
      translate(-50%, -50%)
      rotate(3deg)
      scale(1.015, 1);
    opacity: 0.68;
  }

  84% {
    transform:
      translate(-50%, -50%)
      rotate(-7deg)
      scale(0.97, 1.025);
    opacity: 0.84;
  }
}

/* ------------------------------------------
   CENTRAL GLOW
------------------------------------------ */

@keyframes heroOrbitGlow {
  0% {
    transform:
      translate(-50%, -50%)
      scale(0.82)
      translate3d(-8px, 4px, 0);
    opacity: 0.42;
  }

  22% {
    transform:
      translate(-50%, -50%)
      scale(0.98)
      translate3d(4px, -6px, 0);
    opacity: 0.68;
  }

  47% {
    transform:
      translate(-50%, -50%)
      scale(1.12)
      translate3d(9px, 2px, 0);
    opacity: 0.92;
  }

  68% {
    transform:
      translate(-50%, -50%)
      scale(1.02)
      translate3d(-5px, 8px, 0);
    opacity: 0.62;
  }

  84% {
    transform:
      translate(-50%, -50%)
      scale(0.91)
      translate3d(-9px, -3px, 0);
    opacity: 0.48;
  }

  100% {
    transform:
      translate(-50%, -50%)
      scale(0.82)
      translate3d(-8px, 4px, 0);
    opacity: 0.42;
  }
}

/* ------------------------------------------
   CORE PULSE
------------------------------------------ */

@keyframes heroOrbitCore {
  0%,
  100% {
    transform: translate(-50%, -50%) scale(0.82);
    opacity: 0.72;
  }

  35% {
    transform: translate(-50%, -50%) scale(1);
    opacity: 0.9;
  }

  58% {
    transform: translate(-50%, -50%) scale(1.22);
    opacity: 1;
  }

  78% {
    transform: translate(-50%, -50%) scale(0.94);
    opacity: 0.82;
  }
}

/* ------------------------------------------
   ORBITING DOT 1
   CURVED FLOAT
------------------------------------------ */

@keyframes heroDotOne {
  0%,
  100% {
    transform: translate3d(0, 0, 0) scale(0.9);
    opacity: 0.58;
  }

  20% {
    transform: translate3d(11px, -8px, 0) scale(1);
    opacity: 0.82;
  }

  42% {
    transform: translate3d(24px, 2px, 0) scale(1.08);
    opacity: 1;
  }

  63% {
    transform: translate3d(13px, 15px, 0) scale(0.94);
    opacity: 0.7;
  }

  82% {
    transform: translate3d(-5px, 8px, 0) scale(0.86);
    opacity: 0.52;
  }
}

/* ------------------------------------------
   ORBITING DOT 2
   COUNTER-MOTION
------------------------------------------ */

@keyframes heroDotTwo {
  0%,
  100% {
    transform: translate3d(0, 0, 0) scale(0.82);
    opacity: 0.38;
  }

  26% {
    transform: translate3d(-12px, 6px, 0) scale(1);
    opacity: 0.68;
  }

  51% {
    transform: translate3d(-22px, -8px, 0) scale(1.12);
    opacity: 0.9;
  }

  73% {
    transform: translate3d(-8px, -17px, 0) scale(0.96);
    opacity: 0.62;
  }

  88% {
    transform: translate3d(5px, -7px, 0) scale(0.86);
    opacity: 0.44;
  }
}

/* DESKTOP INTERACTIVE ORBITAL PARALLAX */
@media (min-width: 1024px) and (hover: hover) and (pointer: fine) {
  .hero-orbit {
    margin-left: var(--hero-orbit-x, 0px);
    margin-top: var(--hero-orbit-y, 0px);
    filter: brightness(var(--hero-orbit-brightness, 1));
    opacity: var(--hero-orbit-opacity, 0.78);
    transition: margin 420ms cubic-bezier(0.22, 1, 0.36, 1), filter 320ms ease, opacity 320ms ease;
  }
  .hero-orbit-ring-one { animation: heroOrbitClockwise 26s linear infinite; }
  .hero-orbit-ring-two { animation: heroOrbitCounterClockwise 32s linear infinite; }
  .hero-orbit-ring-three { animation: heroOrbitInnerClockwise 21s linear infinite; }
  .hero-orbit-glow { animation-duration: 20s; }
  .hero-orbit-core { animation-duration: 18s; }
  .hero-orbit-dot-one, .hero-orbit-dot-two { left:50%; right:auto; top:50%; bottom:auto; }
  .hero-orbit-dot-one { animation: heroDotOrbitClockwise 22s linear infinite; }
  .hero-orbit-dot-two { animation: heroDotOrbitCounterClockwise 28s linear infinite; }
}
@keyframes heroOrbitClockwise {
  0% { transform:translate(-50%,-50%) rotate(-18deg) scale(1); opacity:.72; }
  50% { transform:translate(-50%,-50%) rotate(162deg) scale(1.025); opacity:.94; }
  100% { transform:translate(-50%,-50%) rotate(342deg) scale(1); opacity:.72; }
}
@keyframes heroOrbitCounterClockwise {
  0% { transform:translate(-50%,-50%) rotate(32deg) scale(.98,1); opacity:.5; }
  50% { transform:translate(-50%,-50%) rotate(-148deg) scale(1.02,.98); opacity:.74; }
  100% { transform:translate(-50%,-50%) rotate(-328deg) scale(.98,1); opacity:.5; }
}
@keyframes heroOrbitInnerClockwise {
  0% { transform:translate(-50%,-50%) rotate(-12deg) scale(.96,1); opacity:.5; }
  50% { transform:translate(-50%,-50%) rotate(168deg) scale(1.03,.97); opacity:.9; }
  100% { transform:translate(-50%,-50%) rotate(348deg) scale(.96,1); opacity:.5; }
}
@keyframes heroDotOrbitClockwise {
  from { transform:translate(-50%,-50%) rotate(0deg) translateX(min(34vw,390px)); opacity:.58; }
  50% { opacity:1; }
  to { transform:translate(-50%,-50%) rotate(360deg) translateX(min(34vw,390px)); opacity:.58; }
}
@keyframes heroDotOrbitCounterClockwise {
  from { transform:translate(-50%,-50%) rotate(0deg) translateX(min(25vw,290px)); opacity:.42; }
  50% { opacity:.9; }
  to { transform:translate(-50%,-50%) rotate(-360deg) translateX(min(25vw,290px)); opacity:.42; }
}
@media (min-width:768px) and (max-width:1023px) {
  .hero-orbit-ring,.hero-orbit-core,.hero-orbit-glow,.hero-orbit-dot { animation:none !important; }
}
@media (prefers-reduced-motion:reduce) {
  .hero-orbit { margin-left:0 !important; margin-top:0 !important; transition:none !important; }
  .hero-orbit-ring,.hero-orbit-core,.hero-orbit-glow,.hero-orbit-dot { animation:none !important; }
}
/* ------------------------------------------
   MOBILE
------------------------------------------ */

@media (max-width: 767px) {
  .hero-orbit {
    display: none;
  }
}




      `}</style>

    </section>

  );
}
