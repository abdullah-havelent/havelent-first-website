'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

const PROCESS_STEPS = [
  {
    number: '01',
    title: 'Brand Discovery',
    description:
      'We understand your brand, target audience, goals, competitors, and existing social presence to build a strong foundation for your social media strategy.',
  },
  {
    number: '02',
    title: 'Strategy & Content Planning',
    description:
      'We create a focused social media strategy with content themes, creative direction, platform selection, and a consistent publishing schedule.',
  },
  {
    number: '03',
    title: 'Content & Community Management',
    description:
      'We create and publish engaging social media content while managing your accounts, audience interactions, comments, and messages across your platforms.',
  },
  {
    number: '04',
    title: 'Analytics & Optimization',
    description:
      'We monitor social media analytics, content performance, and audience engagement to refine your strategy and continuously improve your social presence.',
  },
];

export default function SocialMediaProcess() {
  const [lightsOn, setLightsOn] = useState(false);

  return (
    <section
      id="process"
      className="relative px-6 py-32"
    >

      {/* ================================================= */}
      {/* DESKTOP */}
      {/* ================================================= */}

              <div className="absolute right-6 top-8 z-50 md:right-10 md:top-10">
          <button
            type="button"
            onClick={() => setLightsOn((previous) => !previous)}
            className={`
              group
              flex
              items-center
              gap-3
              rounded-full
              border
              px-4
              py-2.5
              text-[10px]
              font-medium
              uppercase
              tracking-[0.22em]
              transition-all
              duration-300
              ${
                lightsOn
                  ? 'border-brand-orange/50 bg-brand-orange/[0.08] text-brand-orange shadow-[0_0_25px_rgba(249,115,22,0.12)]'
                  : 'border-white/10 bg-white/[0.025] text-white/40 hover:border-white/20 hover:text-white/70'
              }
            `}
            aria-label={lightsOn ? 'Turn lights off' : 'Turn lights on'}
          >
            <span
              className={`
                relative
                h-2
                w-2
                rounded-full
                transition-all
                duration-300
                ${
                  lightsOn
                    ? 'bg-brand-orange shadow-[0_0_10px_rgba(249,115,22,0.8)]'
                    : 'bg-white/20'
                }
              `}
            />

            <span>
              {lightsOn ? 'Lights On' : 'Lights Off'}
            </span>
          </button>
        </div>

      <div className="hidden md:block">

        {/* LIGHT ON / OFF BUTTON */}



        {/* DESKTOP SECTION CONTENT */}

        <motion.div
          initial={false}
          animate={{
            opacity: lightsOn ? 1 : 0.05,
            filter: lightsOn ? 'blur(0px)' : 'blur(4px)',
          }}
          transition={{
            duration: 0.35,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <div className="mx-auto max-w-7xl">

            {/* HEADER */}

            <div className="mb-16 max-w-3xl">
              <span className="text-sm uppercase tracking-[0.28em] text-brand-orange">
                Our Process
              </span>

              <h2 className="mt-4 font-display text-4xl font-semibold leading-tight text-white md:text-5xl lg:text-6xl">
                From Strategy to{' '}
                <span className="bg-gradient-to-r from-orange-400 to-brand-orange bg-clip-text text-transparent">
                  Social Growth.
                </span>
              </h2>

              <p className="mt-6 max-w-2xl text-base leading-7 text-white/50 md:text-lg">
                A clear, strategic social media management process designed to strengthen
                your online presence, engage your audience, and support consistent brand growth.
              </p>
            </div>

            {/* PROCESS GRID */}

            <div className="grid gap-4 md:grid-cols-2">
              {PROCESS_STEPS.map((step, index) => (
                <DesktopProcessCard
                  key={step.number}
                  step={step}
                  index={index}
                />
              ))}
            </div>

          </div>
        </motion.div>
      </div>


      {/* ================================================= */}
      {/* MOBILE — LIGHTS FADE WITH STATIC CARDS */}
      {/* ================================================= */}

      <motion.div
        className="md:hidden"
        initial={false}
        animate={{
          opacity: lightsOn ? 1 : 0.05,
          filter: lightsOn ? 'blur(0px)' : 'blur(4px)',
        }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      >

        <div className="mx-auto max-w-7xl">

          {/* HEADER */}

          <div className="mb-16 max-w-3xl">
            <span className="text-sm uppercase tracking-[0.28em] text-brand-orange">
              Our Process
            </span>

            <h2 className="mt-4 font-display text-4xl font-semibold leading-tight text-white">
              From Strategy to{' '}
              <span className="bg-gradient-to-r from-orange-400 to-brand-orange bg-clip-text text-transparent">
                Social Growth.
              </span>
            </h2>

            <p className="mt-6 max-w-2xl text-base leading-7 text-white/50">
              A clear, strategic social media management process designed to strengthen
            your online presence, engage your audience, and support consistent brand growth.
            </p>
          </div>

          {/* PROCESS GRID */}

          <div className="grid gap-4">
            {PROCESS_STEPS.map((step) => (
              <MobileProcessCard
                key={step.number}
                step={step}
              />
            ))}
          </div>

        </div>
      </motion.div>

    </section>
  );
}


/* ============================================================= */
/* DESKTOP PROCESS CARD                                           */
/* ============================================================= */

function DesktopProcessCard({
  step,
  index,
}: {
  step: (typeof PROCESS_STEPS)[number];
  index: number;
}) {
  return (
    <motion.article
      initial={{
        opacity: 0,
        y: 30,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
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
      className="
        group
        relative
        min-h-[330px]
        overflow-hidden
        rounded-[1.75rem]
        border
        border-white/10
        bg-[#0c0c0c]
        p-10
        md:hover:border-brand-orange/40
      "
    >

      {/* LIGHT SWEEP */}

      <div className="pointer-events-none absolute -left-full top-0 h-full w-1/2 skew-x-[-20deg] bg-gradient-to-r from-transparent via-white/[0.035] to-transparent transition-all duration-1000 group-hover:left-[120%]" />

      {/* TOP ROW */}

      <div className="relative flex items-start justify-between">
        <span className="font-display text-sm tracking-[0.2em] text-brand-orange">
          {step.number}
        </span>
      </div>

      {/* LARGE NUMBER */}

      <div className="pointer-events-none absolute right-8 top-16 select-none">
        <span className="font-display text-[8rem] font-semibold leading-none text-white/[0.025] transition-all duration-700 group-hover:text-brand-orange/[0.08]">
          {step.number}
        </span>
      </div>

      {/* CONTENT */}

      <div className="relative mt-20">
        <h3 className="max-w-md font-display text-3xl font-semibold leading-tight text-white transition-transform duration-500 group-hover:translate-x-1">
          {step.title}
        </h3>

        <div className="mt-5 h-px w-16 bg-gradient-to-r from-brand-orange to-transparent transition-all duration-500 group-hover:w-28" />

        <p className="mt-6 max-w-xl text-base leading-7 text-white/45 transition-colors duration-500 group-hover:text-white/65">
          {step.description}
        </p>
      </div>

      {/* BOTTOM ACCENT */}

      <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-gradient-to-r from-brand-orange to-transparent transition-all duration-700 group-hover:w-full" />

    </motion.article>
  );
}


/* ============================================================= */
/* MOBILE PROCESS CARD — NO ANIMATION AT ALL                     */
/* ============================================================= */

function MobileProcessCard({
  step,
}: {
  step: (typeof PROCESS_STEPS)[number];
}) {
  return (
    <article
      className="
        relative
        min-h-[330px]
        overflow-hidden
        rounded-[1.75rem]
        border
        border-white/10
        bg-[#0c0c0c]
        p-8
      "
    >

      {/* TOP ROW */}

      <div className="relative flex items-start justify-between">
        <span className="font-display text-sm tracking-[0.2em] text-brand-orange">
          {step.number}
        </span>
      </div>

      {/* LARGE NUMBER */}

      <div className="pointer-events-none absolute right-8 top-16 select-none">
        <span className="font-display text-[8rem] font-semibold leading-none text-white/[0.025]">
          {step.number}
        </span>
      </div>

      {/* CONTENT */}

      <div className="relative mt-20">
        <h3 className="max-w-md font-display text-2xl font-semibold leading-tight text-white">
          {step.title}
        </h3>

        <div className="mt-5 h-px w-16 bg-gradient-to-r from-brand-orange to-transparent" />

        <p className="mt-6 max-w-xl text-sm leading-7 text-white/45">
          {step.description}
        </p>
      </div>

      {/* BOTTOM ACCENT */}

      <div className="absolute bottom-0 left-0 h-[2px] w-full bg-gradient-to-r from-brand-orange to-transparent" />

    </article>
  );
}