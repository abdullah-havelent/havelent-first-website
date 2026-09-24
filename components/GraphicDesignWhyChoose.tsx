'use client';

import ServiceWhyChooseIntro from './ServiceWhyChooseIntro';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const BENEFITS = [
  {
    number: '01',
    title: 'Strategy Before Design',
    description:
      'We begin with your brand, audience, and objectives to create visual solutions that communicate with purpose.',
  },
  {
    number: '02',
    title: 'Distinctive Creative Direction',
    description:
      'We develop a clear visual direction that gives your brand a recognizable presence instead of relying on generic design.',
  },
  {
    number: '03',
    title: 'Consistent Brand Identity',
    description:
      'Every visual element is designed to work together, creating a cohesive brand presence across digital and marketing platforms.',
  },
  {
    number: '04',
    title: 'Designed for Real Business',
    description:
      'From campaigns and social media to professional communications, every design is created with practical business use in mind.',
  },
  {
    number: '05',
    title: 'Detail-Driven Execution',
    description:
      'We refine typography, spacing, composition, color, and hierarchy to ensure every visual feels polished and intentional.',
  },
  {
    number: '06',
    title: 'A Long-Term Creative Partner',
    description:
      'We build lasting creative relationships with brands that value consistency, reliability, and high-quality visual communication.',
  },
];

function ContactCTA() {
  return (
    <div className="relative mt-12 overflow-hidden rounded-3xl border border-white/10 bg-white/[0.025] p-7 md:p-8">
      <div className="pointer-events-none absolute -right-20 -top-20 h-40 w-40 rounded-full bg-brand-orange/[0.08] blur-3xl" />

      <div className="relative">
        <span className="text-[10px] font-medium uppercase tracking-[0.28em] text-brand-orange">
          Start a Project
        </span>

        <h3 className="mt-4 max-w-xs font-display text-2xl font-semibold leading-tight text-white">
          Have a design project in mind?
        </h3>

        <p className="mt-4 max-w-sm text-sm leading-6 text-white/40">
          Let&apos;s create visuals that give your brand a stronger and more
          distinctive presence.
        </p>

        <button
          type="button"
          onClick={() => {
            document
              .getElementById('contact')
              ?.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
              });
          }}
          className="group mt-7 inline-flex items-center gap-3 rounded-full border border-brand-orange/30 bg-brand-orange/[0.08] px-5 py-3 text-xs font-medium uppercase tracking-[0.16em] text-brand-orange transition-colors duration-300 md:hover:border-brand-orange/60 md:hover:bg-brand-orange md:hover:text-white"
        >
          <span>Contact Us</span>

          <span className="transition-transform duration-300 md:group-hover:translate-x-1">
            →
          </span>
        </button>
      </div>
    </div>
  );
}

/* ========================================================= */
/* GRAPHIC DESIGN CONSOLE */
/* ========================================================= */

function GraphicDesignConsole() {
  const consoleRef = useRef<HTMLDivElement>(null);

  const isInView = useInView(consoleRef, {
    once: true,
    amount: 0.35,
  });

  return (
    <div
      ref={consoleRef}
      className="relative mt-12 h-[380px] overflow-hidden rounded-[2rem] border border-white/[0.08] bg-[#070707]"
    >
      {/* ================= BACKGROUND ================= */}

      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 1.2 }}
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_48%,rgba(249,115,22,0.10),transparent_52%)]"
      />

      <div
        className="pointer-events-none absolute inset-0 opacity-[0.045]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.2) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.2) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      {/* ================= TOP HEADER ================= */}

      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={
          isInView
            ? { opacity: 1, y: 0 }
            : { opacity: 0, y: -10 }
        }
        transition={{ duration: 0.7, delay: 0.2 }}
        className="absolute left-6 top-6 z-30"
      >
        <span className="text-[8px] uppercase tracking-[0.4em] text-brand-orange/80">
          BRAND DNA SYSTEM
        </span>

        <p className="mt-2 text-[10px] text-white/25">
          Visual identity construction
        </p>
      </motion.div>

      {/* SYSTEM STATUS */}

      <motion.div
        initial={{ opacity: 0, x: 10 }}
        animate={
          isInView
            ? { opacity: 1, x: 0 }
            : { opacity: 0, x: 10 }
        }
        transition={{ duration: 0.7, delay: 0.35 }}
        className="absolute right-6 top-6 z-30 flex items-center gap-2"
      >
        <motion.span
          animate={
            isInView
              ? {
                  opacity: [0.3, 1, 0.3],
                }
              : { opacity: 0 }
          }
          transition={{
            duration: 1.8,
            repeat: Infinity,
          }}
          className="h-1.5 w-1.5 rounded-full bg-brand-orange shadow-[0_0_12px_rgba(249,115,22,.9)]"
        />

        <span className="font-mono text-[7px] uppercase tracking-[0.25em] text-white/25">
          SYSTEM ACTIVE
        </span>
      </motion.div>

      {/* ================= LEFT METRICS ================= */}

      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={
          isInView
            ? { opacity: 1, x: 0 }
            : { opacity: 0, x: -20 }
        }
        transition={{ duration: 0.8, delay: 0.6 }}
        className="absolute bottom-9 left-6 z-20 hidden w-[105px] md:block"
      >
        <span className="text-[7px] uppercase tracking-[0.3em] text-white/20">
          DESIGN METRICS
        </span>

        <div className="mt-4 space-y-4">

          {/* TYPE */}
          <div>
            <div className="flex justify-between text-[7px] text-white/35">
              <span>TYPE</span>
              <span>92%</span>
            </div>

            <div className="mt-1 h-[2px] bg-white/[0.06]">
              <motion.div
                initial={{ width: "0%" }}
                animate={
                  isInView
                    ? { width: "92%" }
                    : { width: "0%" }
                }
                transition={{
                  duration: 1.4,
                  delay: 0.8,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="h-full bg-brand-orange"
              />
            </div>
          </div>

          {/* FORM */}
          <div>
            <div className="flex justify-between text-[7px] text-white/35">
              <span>FORM</span>
              <span>86%</span>
            </div>

            <div className="mt-1 h-[2px] bg-white/[0.06]">
              <motion.div
                initial={{ width: "0%" }}
                animate={
                  isInView
                    ? { width: "86%" }
                    : { width: "0%" }
                }
                transition={{
                  duration: 1.4,
                  delay: 1,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="h-full bg-brand-orange/70"
              />
            </div>
          </div>

          {/* COLOR */}
          <div>
            <div className="flex justify-between text-[7px] text-white/35">
              <span>COLOR</span>
              <span>78%</span>
            </div>

            <div className="mt-1 h-[2px] bg-white/[0.06]">
              <motion.div
                initial={{ width: "0%" }}
                animate={
                  isInView
                    ? { width: "78%" }
                    : { width: "0%" }
                }
                transition={{
                  duration: 1.4,
                  delay: 1.2,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="h-full bg-brand-orange/50"
              />
            </div>
          </div>

        </div>
      </motion.div>

      {/* ================= RIGHT TOKENS ================= */}

      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={
          isInView
            ? { opacity: 1, x: 0 }
            : { opacity: 0, x: 20 }
        }
        transition={{ duration: 0.8, delay: 0.7 }}
        className="absolute bottom-9 right-6 z-20 hidden md:block"
      >
        <span className="block text-right text-[7px] uppercase tracking-[0.3em] text-white/20">
          DESIGN TOKENS
        </span>

        <div className="mt-4 flex gap-2">

          {/* TYPE */}
          <motion.div
            animate={
              isInView
                ? { y: [0, -5, 0] }
                : { y: 0 }
            }
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="flex h-8 w-8 items-center justify-center border border-white/[0.08] bg-white/[0.025]"
          >
            <span className="font-display text-sm text-white/60">
              A
            </span>
          </motion.div>

          {/* COLOR */}
          <motion.div
            animate={
              isInView
                ? { y: [0, -5, 0] }
                : { y: 0 }
            }
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: 0.3,
              ease: "easeInOut",
            }}
            className="flex h-8 w-8 items-center justify-center border border-brand-orange/20 bg-brand-orange/[0.05]"
          >
            <span className="h-3 w-3 rounded-full bg-brand-orange shadow-[0_0_10px_rgba(249,115,22,.5)]" />
          </motion.div>

          {/* FORM */}
          <motion.div
            animate={
              isInView
                ? { y: [0, -5, 0] }
                : { y: 0 }
            }
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: 0.6,
              ease: "easeInOut",
            }}
            className="flex h-8 w-8 items-center justify-center border border-white/[0.08]"
          >
            <span className="h-3 w-3 rotate-45 border border-white/50" />
          </motion.div>

        </div>
      </motion.div>

      {/* ================= CENTRAL BOARD ================= */}

      <motion.div
        initial={{
          opacity: 0,
          scale: 0.92,
        }}
        animate={
          isInView
            ? {
                opacity: 1,
                scale: 1,
              }
            : {
                opacity: 0,
                scale: 0.92,
              }
        }
        transition={{
          duration: 1,
          delay: 0.35,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="absolute left-1/2 top-1/2 h-[245px] w-[260px] -translate-x-1/2 -translate-y-1/2"
      >

        {/* Outer Frame */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={
            isInView
              ? { opacity: 1, scale: 1 }
              : { opacity: 0, scale: 0.8 }
          }
          transition={{
            duration: 1.2,
            delay: 0.5,
          }}
          className="absolute inset-0 border border-white/[0.08]"
        />

        {/* Corner Markers */}
        <motion.span
          initial={{ width: 0, height: 0 }}
          animate={
            isInView
              ? { width: 14, height: 14 }
              : { width: 0, height: 0 }
          }
          transition={{ duration: 0.8, delay: 0.9 }}
          className="absolute -left-1 -top-1 border-l border-t border-brand-orange"
        />

        <motion.span
          initial={{ width: 0, height: 0 }}
          animate={
            isInView
              ? { width: 14, height: 14 }
              : { width: 0, height: 0 }
          }
          transition={{ duration: 0.8, delay: 1 }}
          className="absolute -right-1 -top-1 border-r border-t border-brand-orange"
        />

        <motion.span
          initial={{ width: 0, height: 0 }}
          animate={
            isInView
              ? { width: 14, height: 14 }
              : { width: 0, height: 0 }
          }
          transition={{ duration: 0.8, delay: 1.1 }}
          className="absolute -bottom-1 -left-1 border-b border-l border-brand-orange"
        />

        <motion.span
          initial={{ width: 0, height: 0 }}
          animate={
            isInView
              ? { width: 14, height: 14 }
              : { width: 0, height: 0 }
          }
          transition={{ duration: 0.8, delay: 1.2 }}
          className="absolute -bottom-1 -right-1 border-b border-r border-brand-orange"
        />

        {/* Crosshair */}
        <div className="absolute left-1/2 top-0 h-full w-px bg-white/[0.045]" />

        <div className="absolute left-0 top-1/2 h-px w-full bg-white/[0.045]" />

        {/* ================= GIANT H ================= */}

        <motion.div
          initial={{
            opacity: 0,
            scale: 0.7,
          }}
          animate={
            isInView
              ? {
                  opacity: [0, 0.8, 0.5],
                  scale: [0.7, 1.05, 1],
                }
              : {
                  opacity: 0,
                  scale: 0.7,
                }
          }
          transition={{
            duration: 1.5,
            delay: 0.8,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-display text-[155px] font-semibold leading-none tracking-[-0.12em] text-white/[0.035]"
        >
          H
        </motion.div>

        {/* ================= MAIN MARK ================= */}

        <motion.div
          initial={{
            opacity: 0,
            scale: 0.4,
            rotate: -90,
          }}
          animate={
            isInView
              ? {
                  opacity: 1,
                  scale: [0.4, 1.08, 1],
                  rotate: [0, 12, 0],
                }
              : {
                  opacity: 0,
                  scale: 0.4,
                  rotate: -90,
                }
          }
          transition={{
            duration: 1.8,
            delay: 1,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="absolute left-1/2 top-1/2 h-[105px] w-[105px] -translate-x-1/2 -translate-y-1/2"
        >

          {/* Square */}
          <div className="absolute inset-0 rounded-[28%] border border-brand-orange/70 shadow-[0_0_35px_rgba(249,115,22,.08)]" />

          {/* Inner Circle */}
          <div className="absolute left-1/2 top-1/2 h-[55px] w-[55px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/25" />

          {/* Center Dot */}
          <motion.div
            animate={
              isInView
                ? {
                    scale: [1, 1.7, 1],
                    opacity: [0.5, 1, 0.5],
                  }
                : {
                    scale: 1,
                    opacity: 0,
                  }
            }
            transition={{
              duration: 2.2,
              repeat: Infinity,
            }}
            className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-orange shadow-[0_0_18px_rgba(249,115,22,.9)]"
          />

          {/* Top Node */}
          <span className="absolute left-1/2 top-0 h-2 w-2 -translate-x-1/2 rounded-full bg-brand-orange" />

          {/* Bottom Node */}
          <span className="absolute bottom-0 left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-white/70" />

        </motion.div>

        {/* ================= SCAN BEAM ================= */}

        <motion.div
          initial={{ opacity: 0 }}
          animate={
            isInView
              ? {
                  y: [-100, 100, -100],
                  opacity: [0, 0.8, 0],
                }
              : {
                  y: -100,
                  opacity: 0,
                }
          }
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1.5,
          }}
          className="absolute left-0 hidden h-px w-full bg-gradient-to-r from-transparent via-brand-orange to-transparent shadow-[0_0_15px_rgba(249,115,22,.8)] md:block"
        />

        {/* ================= FLOATING NODES ================= */}

        <motion.span
          initial={{ opacity: 0 }}
          animate={
            isInView
              ? {
                  opacity: [0.2, 1, 0.2],
                  x: [0, 20, 0],
                  y: [0, -10, 0],
                }
              : {
                  opacity: 0,
                }
          }
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1.4,
          }}
          className="absolute left-7 top-12 h-2 w-2 rounded-full border border-brand-orange bg-brand-orange/20"
        />

        <motion.span
          initial={{ opacity: 0 }}
          animate={
            isInView
              ? {
                  opacity: [0.2, 0.8, 0.2],
                  x: [0, -15, 0],
                  y: [0, 10, 0],
                }
              : {
                  opacity: 0,
                }
          }
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1.7,
          }}
          className="absolute bottom-12 right-8 h-2 w-2 rounded-full border border-white/40"
        />

        {/* ================= MEASUREMENTS ================= */}

        <div className="absolute left-3 top-3 font-mono text-[6px] text-white/20">
          X: 01
        </div>

        <div className="absolute right-3 top-3 font-mono text-[6px] text-white/20">
          Y: 02
        </div>

        <div className="absolute bottom-3 left-3 font-mono text-[6px] text-white/20">
          GRID: 03
        </div>

        <div className="absolute bottom-3 right-3 font-mono text-[6px] text-white/20">
          FORM: 04
        </div>
      </motion.div>

      {/* ================= FLOATING ALIGN CURSOR ================= */}

      <motion.div
        initial={{ opacity: 0 }}
        animate={
          isInView
            ? {
                opacity: [0, 1, 0.4, 1],
                x: [0, 70, 25, 90, 0],
                y: [0, -25, 20, -5, 0],
              }
            : {
                opacity: 0,
                x: 0,
                y: 0,
              }
        }
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1.8,
        }}
        className="pointer-events-none absolute left-[30%] top-[42%] hidden md:block"
      >
        <div className="h-3 w-3 border-l border-t border-brand-orange" />

        <span className="ml-2 mt-1 block text-[6px] uppercase tracking-[0.2em] text-brand-orange/60">
          ALIGN
        </span>
      </motion.div>

      {/* ================= MOBILE LABEL ================= */}

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={
          isInView
            ? { opacity: 1, y: 0 }
            : { opacity: 0, y: 8 }
        }
        transition={{ duration: 0.7, delay: 1.3 }}
        className="absolute bottom-8 left-1/2 z-20 -translate-x-1/2 whitespace-nowrap md:hidden"
      >
        <span className="font-mono text-[7px] uppercase tracking-[0.3em] text-white/25">
          BRAND • TYPE • FORM • SYSTEM
        </span>
      </motion.div>

      {/* ================= FOOTER ================= */}

      <div className="absolute bottom-2 left-1/2 -translate-x-1/2">
        <span className="font-mono text-[6px] uppercase tracking-[0.35em] text-white/15">
          CONCEPT → STRUCTURE → IDENTITY
        </span>
      </div>
    </div>
  );
}



export default function GraphicDesignWhyChoose() {
  return (
    <section className="relative overflow-hidden px-6 py-28 md:py-36">

      {/* Ambient Background */}
      <div className="pointer-events-none absolute -left-40 top-1/3 h-[500px] w-[500px] rounded-full bg-brand-orange/[0.06] blur-[160px]" />

      <div className="mx-auto max-w-7xl">

        {/* Section Label */}
        <div className="mb-20 flex items-center gap-4">
          <span className="h-px w-10 bg-brand-orange" />

          <span className="text-xs font-medium uppercase tracking-[0.3em] text-brand-orange">
            Why Choose Havelent
          </span>
        </div>

        {/* Main Grid */}
        <div className="grid gap-16 lg:grid-cols-[0.8fr_1.5fr] lg:gap-24">

          {/* LEFT SIDE */}
          <div className="relative">
            <ServiceWhyChooseIntro title="Design With" accent="Purpose." description="Strong graphic design makes your brand easier to recognise, communicates clearly, and gives your business a consistent visual identity." related={[{"href":"/services/web-development","label":"Web Development services"},{"href":"/services/social-media-management","label":"Social Media Management"}]} />
          </div>

          {/* RIGHT SIDE — DESKTOP */}
          <div className="hidden border-t border-white/10 md:block">

            {BENEFITS.map((benefit, index) => (
              <motion.article
                key={benefit.number}
                initial={{
                  opacity: 0,
                  x: 35,
                }}
                whileInView={{
                  opacity: 1,
                  x: 0,
                }}
                viewport={{
                  once: true,
                  amount: 0.2,
                }}
                transition={{
                  duration: 0.7,
                  delay: index * 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="group relative border-b border-white/10 py-9 md:py-11"
              >

                {/* Orange Vertical Accent */}
                <div className="absolute left-0 top-0 h-full w-px origin-top scale-y-0 bg-brand-orange transition-transform duration-500 group-hover:scale-y-100" />

                <div className="relative flex gap-6 pl-5 md:gap-10 md:pl-8">

                  {/* Number */}
                  <div className="relative w-10 shrink-0">
                    <span className="font-display text-xs tracking-[0.2em] text-brand-orange/70">
                      {benefit.number}
                    </span>

                    <span className="pointer-events-none absolute -left-2 -top-8 select-none font-display text-7xl font-semibold leading-none text-white/[0.025] transition-all duration-500 group-hover:text-brand-orange/[0.06]">
                      {benefit.number}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="flex-1">

                    <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between md:gap-10">

                      <h3 className="max-w-sm font-display text-2xl font-semibold leading-tight text-white transition-transform duration-500 group-hover:translate-x-1 md:text-3xl">
                        {benefit.title}
                      </h3>

                      <span className="hidden shrink-0 pt-2 text-xs uppercase tracking-[0.2em] text-white/20 transition-colors duration-500 group-hover:text-brand-orange/70 md:block">
                        0{index + 1}
                      </span>

                    </div>

                    <p className="mt-5 max-w-2xl text-sm leading-7 text-white/40 transition-colors duration-500 group-hover:text-white/60 md:text-base">
                      {benefit.description}
                    </p>

                    {/* Progress Line */}
                    <div className="mt-7 h-px w-12 overflow-hidden bg-white/10 transition-all duration-500 group-hover:w-24">
                      <div className="h-full w-full origin-left scale-x-0 bg-brand-orange transition-transform duration-500 group-hover:scale-x-100" />
                    </div>

                  </div>
                </div>
              </motion.article>
            ))}

          </div>

          {/* RIGHT SIDE — MOBILE STATIC */}
          <div className="border-t border-white/10 md:hidden">

            {BENEFITS.map((benefit) => (
              <article
                key={benefit.number}
                className="relative border-b border-white/10 py-9"
              >

                <div className="flex gap-6 pl-2">

                  {/* Number */}
                  <div className="relative w-10 shrink-0">

                    <span className="font-display text-xs tracking-[0.2em] text-brand-orange/70">
                      {benefit.number}
                    </span>

                    <span className="pointer-events-none absolute -left-2 -top-8 select-none font-display text-7xl font-semibold leading-none text-white/[0.025]">
                      {benefit.number}
                    </span>

                  </div>

                  {/* Content */}
                  <div className="flex-1">

                    <h3 className="max-w-sm font-display text-2xl font-semibold leading-tight text-white">
                      {benefit.title}
                    </h3>

                    <p className="mt-5 max-w-2xl text-sm leading-7 text-white/40">
                      {benefit.description}
                    </p>

                    <div className="mt-7 h-px w-12 bg-white/10" />

                  </div>
                </div>

              </article>
            ))}

          </div>

        </div>

        {/* MOBILE CONTACT — ALWAYS LAST */}
        <div className="mt-12 md:hidden">
          <ContactCTA />
        </div>

      </div>
    </section>
  );
}