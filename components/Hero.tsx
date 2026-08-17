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
import RotatingTriangle from '@/components/RotatingTriangle';
import RotatingSquare from '@/components/RotatingSquare';


// ==========================================
// HERO HEADING
// ==========================================

const headingWords = [
  { text: 'Your', color: 'white' },
  { text: 'Vision,', color: 'gradient' },
  { text: 'Our', color: 'white' },
  { text: 'Responsibility.', color: 'gradient' },
];


// ==========================================
// HERO COMPONENT
// ==========================================

export default function Hero() {

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


  const onMouseMove = (
    e: React.MouseEvent
  ) => {

    const rect =
      e.currentTarget.getBoundingClientRect();

    mx.set(
      (e.clientX - rect.left) /
        rect.width -
        0.5
    );

    my.set(
      (e.clientY - rect.top) /
        rect.height -
        0.5
    );
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
        bg-[#ffefe8]
        px-6
        pb-20
        pt-32
      "
    >


      {/* ======================================
          ROTATING SHAPES
      ====================================== */}

      <RotatingSquare />

      <RotatingTriangle />


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
          pointer-events-none
          absolute
          right-0
          top-0
          h-[900px]
          w-[900px]
          translate-y-4
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
          mt-10
          flex
          flex-col
          items-center
          gap-4
          sm:flex-row
        "
      >


        {/* START A PROJECT */}

        <Link href="/#contact">

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
          className="
            rounded-full
            border
            border-black/20
            px-7
            py-3.5
            text-sm
            font-medium
            text-black/90
            transition-all
            duration-300
            hover:border-brand-orange
            hover:text-brand-orange
          "
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

              <span className="mx-1.5 text-brand-orange">
                ·
              </span>

              <span className="font-semibold text-black/70">
                You are one of them.
              </span>
            </p>

          </div>

        </motion.div>

      </div>


    </section>

  );
}