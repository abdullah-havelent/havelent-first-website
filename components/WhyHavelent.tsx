'use client';

import { motion, useSpring } from 'framer-motion';
import { useEffect, useState, type PointerEvent } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { projects as portfolioProjects } from './OurWork';
import {
  Compass,
  Palette,
  Rocket,
  Handshake,
} from 'lucide-react';

const portfolioLoopImages = portfolioProjects.flatMap((project) =>
  project.images.map((src) => ({
    src,
    title: project.title,
    category: project.category,
  }))
);

const metricoolLoopImages = Array.from({ length: 7 }, (_, index) => ({
  src: `/metricool/${index + 1}.webp`,
  title: `Metricool Analytics ${index + 1}`,
}));

const cards = [
  {
    icon: Compass,
    title: 'Strategy First',
    description:
      'Every project starts with research, strategy, and a clear roadmap aligned with your brand goals and audience.',
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
  const cardRotateX = useSpring(0, { stiffness: 180, damping: 24 });
  const cardRotateY = useSpring(0, { stiffness: 180, damping: 24 });
  const resetWorkTilt = () => {
    cardRotateX.set(0);
    cardRotateY.set(0);
  };
  const tiltWorkCard = (event: PointerEvent<HTMLAnchorElement>) => {
    if (event.pointerType !== 'mouse' || !window.matchMedia('(min-width: 768px) and (hover: hover) and (prefers-reduced-motion: no-preference)').matches) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const pointerX = ((event.clientX - rect.left) / rect.width) * 100;
    const pointerY = ((event.clientY - rect.top) / rect.height) * 100;

    event.currentTarget.style.setProperty('--work-spot-x', `${pointerX}%`);
    event.currentTarget.style.setProperty('--work-spot-y', `${pointerY}%`);
    cardRotateX.set(-((event.clientY - rect.top) / rect.height - 0.5) * 10);
    cardRotateY.set(((event.clientX - rect.left) / rect.width - 0.5) * 10);
  };
  const [isMobile, setIsMobile] = useState(
    () =>
      typeof window !== 'undefined' &&
      window.innerWidth < 768
  );

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

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
          animate={
            isMobile
              ? undefined
              : {
                  x: [0, 55, -25, 0],
                  y: [0, -20, 30, 0],
                  opacity: [0.16, 0.24, 0.18, 0.16],
                  scale: [1, 1.08, 0.97, 1],
                }
          }
          transition={
            isMobile
              ? undefined
              : {
                  duration: 20,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }
          }
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
          animate={
            isMobile
              ? undefined
              : {
                  x: [0, -45, 25, 0],
                  y: [0, 35, -15, 0],
                  opacity: [0.11, 0.19, 0.13, 0.11],
                  scale: [1, 1.06, 0.98, 1],
                }
          }
          transition={
            isMobile
              ? undefined
              : {
                  duration: 24,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }
          }
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
          initial={
            isMobile
              ? false
              : {
                  opacity: 0,
                }
          }
          whileInView={
            isMobile
              ? undefined
              : {
                  opacity: 1,
                }
          }
          transition={
            isMobile
              ? undefined
              : {
                  duration: 0.35,
                }
          }
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
  We help modern brands build stronger digital identities through strategic
  creative solutions, thoughtful execution, and consistent attention to detail.
</p>

        </motion.div>

        {/* Mobile timeline */}
        <div className="relative mt-16 space-y-10 border-l border-brand-orange/25 pl-8 md:hidden">
          {cards.map((card, index) => {
            const Icon = card.icon;
            return (
              <article key={card.title} className="relative pb-2">
                <span className="absolute -left-[37px] top-1 h-[9px] w-[9px] rounded-full bg-brand-orange shadow-[0_0_14px_rgba(249,115,22,0.7)]" />
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full border border-brand-orange/35 bg-brand-orange/[0.08]">
                    <Icon className="h-5 w-5 text-brand-orange" />
                  </div>
                  <span className="font-display text-xs tracking-[0.2em] text-brand-orange/65">0{index + 1}</span>
                </div>
                <h3 className="why-card-heading font-display text-2xl font-semibold">{card.title}</h3>
                <p className="why-card-description mt-3 leading-7">{card.description}</p>
              </article>
            );
          })}
        </div>
        <div className="md:flex md:flex-col">
        {/* ========================================= */}
        {/* OUR WORK CARD */}
        {/* ========================================= */}

        <div
          className="
            mb-16
            mt-10
            flex
            justify-center
            md:order-2
            md:mb-0
            md:mt-12
          "
        >
          <Link
            href="/our-work"
            onPointerMove={tiltWorkCard}
            onPointerLeave={(event) => {
              resetWorkTilt();
              event.currentTarget.style.setProperty('--work-spot-x', '82%');
              event.currentTarget.style.setProperty('--work-spot-y', '48%');
            }}
            onPointerCancel={(event) => {
              resetWorkTilt();
              event.currentTarget.style.setProperty('--work-spot-x', '82%');
              event.currentTarget.style.setProperty('--work-spot-y', '48%');
            }}
            onBlur={resetWorkTilt}
            className="
              why-work-link
              group
              relative
              block
              w-full
              max-w-5xl
            "
          >
            <motion.div
              whileHover={
                isMobile
                  ? undefined
                  : {
                      y: -4,
                    }
              }
              transition={
                isMobile
                  ? undefined
                  : {
                      duration: 0.35,
                      ease: [0.22, 1, 0.36, 1],
                    }
              }
              className="
                why-card
                relative
                min-h-[220px]
                overflow-hidden
                rounded-[28px]
                px-8
                py-10
                text-left
                md:backdrop-blur-xl
                transition-colors
                duration-500
                sm:min-h-[240px]
                sm:px-12
                sm:py-12
                md:min-h-[260px]
                md:px-16
                md:py-14
              "
              style={{
                rotateX: isMobile ? 0 : cardRotateX,
                rotateY: isMobile ? 0 : cardRotateY,
                transformPerspective: isMobile ? undefined : 1200,
                boxShadow:
                  'inset 0 1px 0 rgba(255,255,255,0.06), 0 30px 90px -35px rgba(0,0,0,0.95)',
              }}
            >

              {/* Main card glass highlight */}
              <div
                className="
                  why-glass-highlight
                  pointer-events-none
                  absolute
                  inset-0
                "
              />

              <div aria-hidden="true" className="why-work-spotlight pointer-events-none absolute inset-0 hidden md:block" />

              <div aria-hidden="true" className="why-work-collage pointer-events-none absolute inset-y-0 right-0 hidden w-[48%] grid-cols-3 gap-px overflow-hidden opacity-[0.10] transition-opacity duration-700 md:grid md:group-hover:opacity-[0.16]">
                {portfolioLoopImages.slice(0, 3).map((item) => (
                  <div key={`cta-collage-${item.src}`} className="relative overflow-hidden">
                    <Image src={item.src} alt="" fill sizes="16vw" className="object-cover grayscale" />
                  </div>
                ))}
                <div className="absolute inset-0 bg-gradient-to-r from-[#111111] via-[#1c120d]/75 to-[#2b160d]/25" />
              </div>

              <div aria-hidden="true" className="why-work-reflection pointer-events-none absolute left-[8%] right-[8%] top-0 h-px" />

              {/* Main orange ambient glow */}
              <div
                className="
                  pointer-events-none
                  absolute
                  -right-24
                  -top-24
                  h-72
                  w-72
                  rounded-full
                  opacity-30
                  blur-[100px]
                  transition-all
                  duration-700
                  group-hover:scale-110
                  group-hover:opacity-50
                "
                style={{
                  background:
                    'radial-gradient(circle, rgba(249,115,22,0.32), transparent 70%)',
                }}
              />

              {/* Second subtle glow */}
              <div
                className="
                  pointer-events-none
                  absolute
                  -bottom-32
                  -left-20
                  h-64
                  w-64
                  rounded-full
                  bg-orange-500/[0.08]
                  blur-[100px]
                "
              />

              {/* Content */}
              <div
                className="
                  relative
                  flex
                  h-full
                  items-center
                  justify-between
                  gap-8
                "
              >

                <div className="max-w-3xl">

                  <span
                    className="
                      text-xs
                      font-semibold
                      uppercase
                      tracking-[0.4em]
                      text-brand-orange
                      sm:text-sm
                    "
                  >
                    Our Work
                  </span>

                  <h3
                    className="
                      mt-3
                      font-display
                      text-3xl
                      font-semibold
                      leading-tight
                      why-card-heading
                      sm:text-4xl
                      md:text-5xl
                    "
                  >
                    Explore Our{' '}
                    <span className="text-gradient-orange">Creative Work</span>
                  </h3>

                  <p
                    className="
                      mt-4
                      max-w-2xl
                      text-sm
                      leading-7
                      why-card-description
                      sm:text-base
                      md:text-lg
                    "
                  >
                     Discover the creative work, digital experiences, and brand solutions crafted
                    by Havelent for modern businesses and brands.
                  </p>

                </div>

                {/* Arrow */}
                <div
                  className="
                    flex
                    h-12
                    w-12
                    shrink-0
                    items-center
                    justify-center
                    rounded-full
                    border
                    border-brand-orange/70
                    bg-brand-orange
                    text-white
                    shadow-[0_14px_38px_-15px_rgba(249,115,22,0.95)]
                    transition-all
                    duration-500
                    group-hover:scale-110
                    group-hover:border-[#ff9a4a]
                    group-hover:bg-[#ff8a32]
                    group-hover:text-white
                    group-hover:shadow-[0_18px_46px_-12px_rgba(249,115,22,1)]
                    sm:h-14
                    sm:w-14
                  "
                  style={{
                    boxShadow:
                      '0 0 30px -10px rgba(249,115,22,0.8)',
                  }}
                >
                  <span
                    className="
                      text-xl
                      transition-transform
                      duration-500
                      group-hover:translate-x-1
                      sm:text-2xl
                    "
                  >
                    →
                  </span>
                </div>

              </div>

              {/* Bottom orange accent */}
              <div
                className="
                  why-work-light-line
                  absolute
                  bottom-0
                  left-10
                  right-10
                  h-px
                  bg-gradient-to-r
                  from-transparent
                  via-brand-orange/30
                  to-transparent
                  transition-all
                  duration-500
                  group-hover:via-brand-orange/70
                "
              />

            </motion.div>
          </Link>
        </div>

        {/* ========================================= */}
        {/* PORTFOLIO MOTION WALL - DESKTOP */}
        {/* ========================================= */}
        <div className="relative left-1/2 mt-20 hidden md:order-1 h-[clamp(560px,72vh,820px)] w-[calc(100vw-2rem)] max-w-[1720px] -translate-x-1/2 overflow-hidden rounded-[clamp(1.5rem,2vw,2.5rem)] border border-white/[0.09] bg-[#070707] p-3 shadow-[0_40px_120px_-45px_rgba(0,0,0,0.98)] md:grid md:grid-cols-[minmax(0,1fr)_clamp(220px,22vw,360px)] md:gap-3 lg:p-5 lg:gap-5 xl:p-6 xl:gap-6">
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_50%,rgba(249,115,22,0.12),transparent_34%),radial-gradient(circle_at_90%_15%,rgba(249,115,22,0.08),transparent_28%)]" />

          <div className="relative flex min-w-0 items-center overflow-hidden rounded-[1.4rem] border border-white/[0.07] bg-white/[0.025] [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
            <div className="portfolio-loop-horizontal flex w-max gap-3 px-2 lg:gap-5">
              {[...portfolioLoopImages, ...portfolioLoopImages].map((item, index) => (
                <div key={`horizontal-${index}-${item.src}`} className="group relative h-[clamp(390px,56vh,620px)] w-[clamp(285px,27vw,470px)] shrink-0 overflow-hidden rounded-[clamp(1rem,1.4vw,1.5rem)] border border-white/10 bg-[#101010]">
                  <Image src={item.src} alt={item.title} fill sizes="(min-width: 1440px) 470px, (min-width: 768px) 27vw, 285px" className="object-cover transition-transform duration-700 group-hover:scale-[1.035]" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <span className="text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-brand-orange">{item.category}</span>
                    <p className="mt-1 font-display text-xl font-semibold text-white">{item.title}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative overflow-hidden rounded-[1.4rem] border border-white/[0.07] bg-white/[0.025] [mask-image:linear-gradient(to_bottom,transparent,black_8%,black_92%,transparent)]">
            <div className="portfolio-loop-vertical flex flex-col gap-3 py-2 lg:hidden">
              {[...portfolioLoopImages, ...portfolioLoopImages].map((item, index) => (
                <div key={`vertical-${index}-${item.src}`} className="group relative mx-1 h-[clamp(165px,22vh,250px)] shrink-0 overflow-hidden rounded-[clamp(0.8rem,1vw,1.15rem)] border border-white/10 bg-[#101010]">
                  <Image src={item.src} alt="" fill sizes="22vw" className="object-cover transition-transform duration-700 group-hover:scale-[1.04]" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent" />
                  <p className="absolute bottom-3 left-3 right-3 truncate text-xs font-semibold text-white/90">{item.title}</p>
                </div>
              ))}
            </div>

            <div className="portfolio-loop-vertical hidden flex-col gap-5 py-2 lg:flex">
              {[...metricoolLoopImages, ...metricoolLoopImages].map((item, index) => (
                <div key={`metricool-vertical-${index}-${item.src}`} className="group relative mx-2 h-[clamp(165px,22vh,250px)] shrink-0 overflow-hidden rounded-[clamp(0.8rem,1vw,1.15rem)] border border-white/10 bg-[#101010]">
                  <Image src={item.src} alt={item.title} fill sizes="(min-width: 1440px) 360px, 22vw" className="object-cover transition-transform duration-700 group-hover:scale-[1.04]" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent" />
                  <p className="absolute bottom-3 left-3 right-3 truncate text-xs font-semibold text-white/90">{item.title}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

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

        @property --work-spot-x {
          syntax: '<percentage>';
          inherits: true;
          initial-value: 82%;
        }

        @property --work-spot-y {
          syntax: '<percentage>';
          inherits: true;
          initial-value: 48%;
        }

        .why-work-link {
          --work-spot-x: 82%;
          --work-spot-y: 48%;
          transition:
            --work-spot-x 140ms cubic-bezier(0.22, 1, 0.36, 1),
            --work-spot-y 140ms cubic-bezier(0.22, 1, 0.36, 1);
        }

        .why-card {
          background: linear-gradient(125deg, #111111 0%, #1c120d 45%, #2b160d 100%);
          border: 1px solid rgba(255,255,255,0.10);
        }

        .why-card:hover {
          border-color: rgba(249,115,22,0.55);
          box-shadow: inset 0 1px 0 rgba(255,255,255,0.10), 0 34px 100px -32px rgba(249,115,22,0.28) !important;
        }

        .why-work-spotlight {
          z-index: 1;
          background: radial-gradient(
            440px circle at var(--work-spot-x, 82%) var(--work-spot-y, 48%),
            rgba(249,115,22,0.22),
            rgba(249,115,22,0.07) 32%,
            transparent 68%
          );
        }

        .why-work-collage {
          z-index: 0;
          mask-image: linear-gradient(to right, transparent, black 28%, black);
        }

        .why-work-reflection {
          z-index: 3;
          background: linear-gradient(to right, transparent, rgba(255,255,255,0.32), transparent);
        }

        .why-work-light-line {
          overflow: hidden;
        }

        .why-work-light-line::after {
          content: '';
          position: absolute;
          inset: 0;
          width: 34%;
          background: linear-gradient(to right, transparent, #ff9a4a, transparent);
          animation: workCardLight 3.8s ease-in-out infinite;
        }

        @keyframes workCardLight {
          from { transform: translateX(-120%); }
          to { transform: translateX(390%); }
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


        @keyframes portfolioLoopHorizontal {
          from { transform: translate3d(0, 0, 0); }
          to { transform: translate3d(calc(-50% - 0.5rem), 0, 0); }
        }

        @keyframes portfolioLoopVertical {
          from { transform: translate3d(0, 0, 0); }
          to { transform: translate3d(0, calc(-50% - 0.5rem), 0); }
        }

        .portfolio-loop-horizontal {
          animation: portfolioLoopHorizontal 62s linear infinite;
          will-change: transform;
        }

        .portfolio-loop-vertical {
          animation: portfolioLoopVertical 74s linear infinite;
          will-change: transform;
        }

        .portfolio-loop-horizontal:hover,
        .portfolio-loop-vertical:hover {
          animation-play-state: paused;
        }

        @media (prefers-reduced-motion: reduce) {
          .portfolio-loop-horizontal,
          .portfolio-loop-vertical {
            animation-play-state: paused;
          }
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

        @media (max-width: 767px) {
          .why-havelent-section .why-card,
          .why-havelent-section .why-card *,
          .why-havelent-section .why-heading,
          .why-havelent-section .why-description {
            transition: none !important;
            animation: none !important;
          }

          .why-havelent-section .why-card {
            transform: none !important;
            filter: none !important;
            backdrop-filter: none !important;
            -webkit-backdrop-filter: none !important;
          }

          .why-havelent-section .why-card-heading,
          .why-havelent-section .why-card-description {
            filter: none !important;
            -webkit-font-smoothing: antialiased;
            text-rendering: optimizeLegibility;
          }

          .why-havelent-section .why-card:hover {
            transform: none !important;
          }
        }

      `}</style>

    </section>
  );
}