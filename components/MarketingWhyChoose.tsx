'use client';

import ServiceWhyChooseIntro from './ServiceWhyChooseIntro';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const BENEFITS = [
  {
    number: '01',
    title: 'Strategy Before Advertising',
    description:
      'We begin with your business goals, target audience, market, and competitors to build a digital marketing strategy focused on meaningful business outcomes and long-term growth.',
  },
  {
    number: '02',
    title: 'Audience-Focused Targeting',
    description:
      'We use audience research and platform insights to reach relevant customers with targeted digital marketing campaigns built around interests, behavior, and buying intent.',
  },
  {
    number: '03',
    title: 'Creative That Converts',
    description:
      'Effective advertising needs more than targeting. We develop compelling creative concepts and messaging designed to capture attention, strengthen your brand, and encourage meaningful action.',
  },
  {
    number: '04',
    title: 'Continuous Campaign Optimization',
    description:
      'We continuously evaluate campaign performance and refine targeting, creative, placements, and budgets to improve advertising efficiency and maximize opportunities for growth.',
  },
  {
    number: '05',
    title: 'Data-Driven Marketing Decisions',
    description:
      'We use marketing analytics and performance data to understand what is working, identify opportunities, and make informed decisions that improve your digital marketing campaigns.',
  },
  {
    number: '06',
    title: 'A Long-Term Growth Partner',
    description:
      'We build lasting marketing partnerships through consistent execution, transparent performance insights, and strategies that evolve with your business and changing market opportunities.',
  },
];


/* ========================================================= */
/* CONTACT CTA                                                */
/* ========================================================= */

function ContactCTA() {
  return (
    <div className="relative mt-12 overflow-hidden rounded-3xl border border-white/10 bg-white/[0.025] p-7 md:p-8">

      {/* Ambient Glow */}
      <div className="pointer-events-none absolute -right-20 -top-20 h-40 w-40 rounded-full bg-brand-orange/[0.08] blur-3xl" />

      <div className="relative">

        <span className="text-[10px] font-medium uppercase tracking-[0.28em] text-brand-orange">
          Start a Campaign
        </span>

        <h3 className="mt-4 max-w-xs font-display text-2xl font-semibold leading-tight text-white">
          Ready to grow your digital presence?
        </h3>

        <p className="mt-4 max-w-sm text-sm leading-6 text-white/40">
          Let&apos;s build a strategic digital marketing campaign designed to
          reach the right audience and drive meaningful results.
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
/* DIGITAL MARKETING CONSOLE                                  */
/* ========================================================= */

function DigitalMarketingConsole() {
  const consoleRef = useRef<HTMLDivElement>(null);

  const isInView = useInView(consoleRef, {
    once: true,
    amount: 0.3,
  });

  return (
    <div
      ref={consoleRef}
      className="relative mt-12 h-[390px] overflow-hidden rounded-[2rem] border border-white/[0.08] bg-[#080808]"
    >
      {/* ================================================= */}
      {/* BACKGROUND ATMOSPHERE */}
      {/* ================================================= */}

      <motion.div
        animate={{
          x: ['-8%', '8%', '-8%'],
          y: ['-4%', '5%', '-4%'],
          scale: [1, 1.08, 1],
          opacity: [0.18, 0.28, 0.18],
        }}
        transition={{
          duration: 14,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="pointer-events-none absolute left-[35%] top-[20%] h-[260px] w-[260px] rounded-full bg-brand-orange/[0.07] blur-[110px]"
      />

      <motion.div
        animate={{
          x: ['10%', '-8%', '10%'],
          opacity: [0.05, 0.1, 0.05],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="pointer-events-none absolute right-[10%] top-[10%] h-[180px] w-[180px] rounded-full bg-white/[0.025] blur-[100px]"
      />

      {/* ================================================= */}
      {/* VERY SUBTLE LIGHT SWEEP */}
      {/* ================================================= */}

      <motion.div
        initial={{ x: '-120%', opacity: 0 }}
        animate={
          isInView
            ? {
                x: '120%',
                opacity: [0, 0.12, 0],
              }
            : {
                x: '-120%',
                opacity: 0,
              }
        }
        transition={{
          duration: 8,
          delay: 1.2,
          repeat: Infinity,
          repeatDelay: 3,
          ease: 'easeInOut',
        }}
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-[22%] -skew-x-[18deg] bg-gradient-to-r from-transparent via-brand-orange/[0.08] to-transparent blur-[18px]"
      />

      {/* ================================================= */}
      {/* HEADER */}
      {/* ================================================= */}

      <motion.div
        initial={{
          opacity: 0,
          y: -8,
        }}
        animate={
          isInView
            ? {
                opacity: 1,
                y: 0,
              }
            : {
                opacity: 0,
                y: -8,
              }
        }
        transition={{
          duration: 0.8,
          delay: 0.15,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="absolute left-7 top-7 z-30 md:left-9 md:top-8"
      >
        <span className="text-[8px] uppercase tracking-[0.4em] text-brand-orange/75">
          DIGITAL MARKETING
        </span>
      </motion.div>

      {/* ================================================= */}
      {/* LIVE INDICATOR */}
      {/* ================================================= */}

      <motion.div
        initial={{
          opacity: 0,
          x: 8,
        }}
        animate={
          isInView
            ? {
                opacity: 1,
                x: 0,
              }
            : {
                opacity: 0,
                x: 8,
              }
        }
        transition={{
          duration: 0.8,
          delay: 0.35,
        }}
        className="absolute right-7 top-7 z-30 md:right-9 md:top-8"
      >
        <div className="flex items-center gap-2">
          <motion.span
            animate={{
              opacity: [0.35, 0.8, 0.35],
              boxShadow: [
                '0 0 4px rgba(249,115,22,.2)',
                '0 0 10px rgba(249,115,22,.7)',
                '0 0 4px rgba(249,115,22,.2)',
              ],
            }}
            transition={{
              duration: 2.8,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="h-1.5 w-1.5 rounded-full bg-brand-orange"
          />

          <span className="font-mono text-[6px] uppercase tracking-[0.3em] text-white/20">
            LIVE CAMPAIGN
          </span>
        </div>
      </motion.div>

      {/* ================================================= */}
      {/* MAIN CONTENT */}
      {/* ================================================= */}

      <div className="absolute left-7 right-7 top-1/2 z-20 -translate-y-1/2 md:left-10 md:right-10">
        <div className="text-center">
          {/* Small heading */}

          <motion.span
            initial={{
              opacity: 0,
              y: 8,
            }}
            animate={
              isInView
                ? {
                    opacity: 1,
                    y: 0,
                  }
                : {
                    opacity: 0,
                    y: 8,
                  }
            }
            transition={{
              duration: 0.8,
              delay: 0.45,
            }}
            className="block font-mono text-[7px] uppercase tracking-[0.35em] text-white/20"
          >
            ATTENTION IS THE NEW CURRENCY
          </motion.span>

          {/* Headline */}

          <h3 className="mt-5 font-display text-[38px] font-semibold leading-[0.95] tracking-[-0.045em] text-white md:text-[58px]">
            <motion.span
              initial={{
                opacity: 0,
                y: 16,
              }}
              animate={
                isInView
                  ? {
                      opacity: 1,
                      y: 0,
                    }
                  : {
                      opacity: 0,
                      y: 16,
                    }
              }
              transition={{
                duration: 0.9,
                delay: 0.6,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="inline-block"
            >
              Be seen.
            </motion.span>{' '}

            <motion.span
              initial={{
                opacity: 0,
                y: 16,
              }}
              animate={
                isInView
                  ? {
                      opacity: 1,
                      y: 0,
                    }
                  : {
                      opacity: 0,
                      y: 16,
                    }
              }
              transition={{
                duration: 0.9,
                delay: 0.75,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="relative inline-block text-brand-orange"
            >
              <motion.span
                animate={{
                  textShadow: [
                    '0 0 0px rgba(249,115,22,0)',
                    '0 0 18px rgba(249,115,22,.18)',
                    '0 0 0px rgba(249,115,22,0)',
                  ],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              >
                Be remembered.
              </motion.span>
            </motion.span>
          </h3>

          {/* Description */}

          <motion.p
            initial={{
              opacity: 0,
              y: 8,
            }}
            animate={
              isInView
                ? {
                    opacity: 1,
                    y: 0,
                  }
                : {
                    opacity: 0,
                    y: 8,
                  }
            }
            transition={{
              duration: 0.8,
              delay: 1,
            }}
            className="mx-auto mt-5 max-w-[380px] text-[10px] leading-5 text-white/30 md:text-xs md:leading-6"
          >
            Strategic digital marketing that puts your brand in front of the
            right people at the right moment.
          </motion.p>
        </div>
      </div>

      {/* ================================================= */}
      {/* SIGNAL LINE */}
      {/* ================================================= */}

      <div className="pointer-events-none absolute left-[8%] right-[8%] top-1/2 z-10 h-px -translate-y-1/2 bg-white/[0.05]" />

      {/* ================================================= */}
      {/* SOFT TRAVELLING LIGHT */}
      {/* ================================================= */}

      <motion.div
        initial={{
          left: '8%',
          opacity: 0,
        }}
        animate={
          isInView
            ? {
                left: ['8%', '92%'],
                opacity: [0, 0.7, 0.7, 0],
              }
            : {
                left: '8%',
                opacity: 0,
              }
        }
        transition={{
          duration: 5.5,
          delay: 1.3,
          repeat: Infinity,
          repeatDelay: 1.5,
          ease: 'easeInOut',
        }}
        className="pointer-events-none absolute top-1/2 z-10 h-px w-24 -translate-y-1/2 bg-gradient-to-r from-transparent via-brand-orange/70 to-transparent blur-[1px]"
      />

      {/* ================================================= */}
      {/* CENTER ACCENT */}
      {/* ================================================= */}

      <motion.div
        initial={{
          scale: 0,
          opacity: 0,
        }}
        animate={
          isInView
            ? {
                scale: [0, 1, 1],
                opacity: [0, 1, 0.45],
              }
            : {
                scale: 0,
                opacity: 0,
              }
        }
        transition={{
          duration: 1,
          delay: 1.1,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="absolute left-1/2 top-1/2 z-10 h-1 w-1 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-orange shadow-[0_0_12px_rgba(249,115,22,.7)]"
      />

      {/* ================================================= */}
      {/* BOTTOM */}
      {/* ================================================= */}

      <div className="absolute bottom-7 left-7 right-7 z-30 flex items-center justify-between md:left-9 md:right-9">
        <motion.span
          initial={{
            opacity: 0,
          }}
          animate={
            isInView
              ? {
                  opacity: 0.18,
                }
              : {
                  opacity: 0,
                }
          }
          transition={{
            duration: 1,
            delay: 1.2,
          }}
          className="font-mono text-[6px] uppercase tracking-[0.3em] text-white"
        >
          STRATEGY • CREATIVE • PERFORMANCE
        </motion.span>

        <motion.span
          initial={{
            opacity: 0,
          }}
          animate={
            isInView
              ? {
                  opacity: [0.2, 0.4, 0.2],
                }
              : {
                  opacity: 0,
                }
          }
          transition={{
            duration: 3.5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="font-mono text-[6px] uppercase tracking-[0.3em] text-brand-orange/40"
        >
          HAVELENT
        </motion.span>
      </div>
    </div>
  );
}

/* ========================================================= */
/* DIGITAL MARKETING WHY CHOOSE                              */
/* ========================================================= */

export default function MarketingWhyChoose() {
  return (
    <section className="relative overflow-hidden px-6 py-28 md:py-36">

      {/* Ambient Background */}

      <div className="pointer-events-none absolute -left-40 top-1/3 h-[500px] w-[500px] rounded-full bg-brand-orange/[0.06] blur-[160px]" />


      <div className="mx-auto max-w-7xl">

        {/* ================================================= */}
        {/* SECTION LABEL */}
        {/* ================================================= */}

        <div className="mb-20 flex items-center gap-4">

          <span className="h-px w-10 bg-brand-orange" />

          <span className="text-xs font-medium uppercase tracking-[0.3em] text-brand-orange">
            Why Choose Havelent
          </span>

        </div>


        {/* ================================================= */}
        {/* MAIN GRID */}
        {/* ================================================= */}

        <div className="grid gap-16 lg:grid-cols-[0.8fr_1.5fr] lg:gap-24">


          {/* ================================================= */}
          {/* LEFT SIDE */}
          {/* ================================================= */}

          <div className="relative">

            <ServiceWhyChooseIntro title="Marketing With" accent="Direction." description="A focused marketing strategy connects your business with the right audience and turns campaign data into clearer decisions." related={[{"href":"/services/video-editing","label":"Video Editing services"},{"href":"/services/web-development","label":"Web Development services"}]} />

          </div>


          {/* ================================================= */}
          {/* RIGHT SIDE — DESKTOP */}
          {/* ================================================= */}

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


          {/* ================================================= */}
          {/* RIGHT SIDE — MOBILE STATIC */}
          {/* ================================================= */}

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


        {/* ================================================= */}
        {/* MOBILE CONTACT — ALWAYS LAST */}
        {/* ================================================= */}

        <div className="mt-12 md:hidden">
          <ContactCTA />
        </div>

      </div>

    </section>
  );
}