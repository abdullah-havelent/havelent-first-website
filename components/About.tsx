'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import type { PointerEvent } from 'react';

const tiltFounderCard = (event: PointerEvent<HTMLAnchorElement>) => {
  if (
    event.pointerType !== 'mouse' ||
    !window.matchMedia(
      '(min-width: 768px) and (hover: hover) and (prefers-reduced-motion: no-preference)'
    ).matches
  ) {
    return;
  }

  const card = event.currentTarget;
  const rect = card.getBoundingClientRect();
  const x = (event.clientX - rect.left) / rect.width - 0.5;
  const y = (event.clientY - rect.top) / rect.height - 0.5;

  card.style.transition =
    'transform 90ms cubic-bezier(0.22, 1, 0.36, 1), border-color 300ms ease, background-color 300ms ease, box-shadow 300ms ease';
  card.style.transform =
    `perspective(900px) rotateX(${-y * 10}deg) rotateY(${x * 12}deg) translateY(-5px) scale3d(1.02, 1.02, 1.02)`;
};

const resetFounderCard = (card: HTMLAnchorElement) => {
  if (
    typeof window === 'undefined' ||
    !window.matchMedia(
      '(min-width: 768px) and (hover: hover) and (prefers-reduced-motion: no-preference)'
    ).matches
  ) {
    card.style.removeProperty('transition');
    card.style.removeProperty('transform');
    return;
  }

  card.style.transition =
    'transform 420ms cubic-bezier(0.22, 1, 0.36, 1), border-color 300ms ease, background-color 300ms ease, box-shadow 300ms ease';
  card.style.transform =
    'perspective(900px) rotateX(0deg) rotateY(0deg) translateY(0) scale3d(1, 1, 1)';
};

const PRINCIPLES = [
  {
    number: '01',
    title: 'Original by default.',
    text: 'Every project begins with a clear idea shaped around the brand, audience, and purpose.',
  },
  {
    number: '02',
    title: 'Quality with intention.',
    text: 'We give the work the thought, refinement, and attention it needs to feel complete.',
  },
  {
    number: '03',
    title: 'Clear at every step.',
    text: 'Straightforward communication keeps decisions, expectations, and progress easy to understand.',
  },
];

const STATS = [
  { value: '105+', label: 'Projects Delivered' },
  { value: '45+', label: 'Happy Clients' },
  { value: '101%', label: 'Custom Work' },
  { value: '20+', label: 'Industries Served Globally' },
];

export default function About() {
  return (
    <section
      id="about"
      className="relative overflow-hidden bg-black px-6 pb-[clamp(11rem,18vw,20rem)] pt-24 text-white sm:pt-32"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-16 hidden h-80 w-80 -translate-x-1/2 rounded-full bg-brand-orange/[0.07] blur-[140px] md:block"
      />

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-[1.18fr_0.82fr] lg:items-end lg:gap-20">
          <motion.div data-about-motion="true"
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-center gap-4">
              <span className="h-px w-10 bg-brand-orange" />
              <span className="text-xs font-medium uppercase tracking-[0.28em] text-brand-orange">
                About Havelent
              </span>
            </div>

            <h2 className="mt-8 max-w-4xl font-display text-[clamp(3rem,6.4vw,6.7rem)] font-semibold leading-[0.95] tracking-[-0.035em]">
              Built on clarity.
              <br />
              <span className="text-gradient-orange">Designed with intention.</span>
            </h2>
          </motion.div>

          <motion.div data-about-motion="true"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-70px' }}
            transition={{ duration: 0.7, delay: 0.12 }}
            className="lg:pb-2"
          >
            <p className="text-lg leading-8 text-white/65">
              Havelent brings creative thinking and careful execution together to help
              businesses communicate with more confidence.
            </p>
            <p className="mt-5 text-base leading-7 text-white/45">
              We keep the process direct, the ideas purposeful, and the final work aligned
              with what your brand actually needs.
            </p>

            <Link
              href="/founder"
              data-founder-card="true"
              onPointerMove={tiltFounderCard}
              onPointerLeave={(event) => resetFounderCard(event.currentTarget)}
              onPointerCancel={(event) => resetFounderCard(event.currentTarget)}
              onBlur={(event) => resetFounderCard(event.currentTarget)}
              className="group relative mt-8 flex w-full max-w-md items-center justify-between overflow-hidden rounded-[18px] border border-white/10 bg-white/[0.035] px-6 py-5 pr-20 font-display text-lg font-semibold text-white transition-[border-color,background-color,box-shadow] duration-300 md:hover:border-brand-orange/45 md:hover:bg-[#1a100a] md:will-change-transform md:hover:shadow-[0_22px_55px_rgba(249,115,22,0.16)] sm:text-xl lg:text-2xl"
            >
              <span className="absolute inset-y-0 left-0 w-px bg-gradient-to-b from-brand-orange to-brand-red opacity-70" />
              <span className="transition-colors duration-300 md:group-hover:text-brand-orange">
                Meet the Founder
              </span>
              <span className="absolute right-5 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-xl border border-brand-orange/30 bg-brand-orange/[0.08] text-brand-orange transition-transform duration-300 md:group-hover:translate-x-1">
                <ArrowRight size={19} strokeWidth={1.8} />
              </span>
            </Link>
          </motion.div>
        </div>

        <div className="mt-20 grid grid-cols-2 gap-x-8 gap-y-10 md:mt-28 lg:grid-cols-4 lg:gap-12">
          {STATS.map((stat, index) => (
            <motion.div data-about-motion="true"
              key={stat.label}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: 0.08 * index }}
            >
              <strong className="font-display text-4xl font-semibold leading-none text-gradient-orange sm:text-5xl">
                {stat.value}
              </strong>
              <p className="mt-3 text-xs font-medium uppercase tracking-[0.14em] text-white/45 sm:text-sm">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 border-y border-white/10 sm:mt-20">
          <div className="grid md:grid-cols-3">
            {PRINCIPLES.map((principle, index) => (
              <motion.article data-about-motion="true"
                key={principle.number}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.65, delay: index * 0.1 }}
                className={`group relative py-9 md:px-8 md:py-12 ${
                  index < PRINCIPLES.length - 1 ? 'border-b border-white/10 md:border-b-0 md:border-r' : ''
                }`}
              >
                <span className="text-xs font-medium tracking-[0.18em] text-brand-orange/65">
                  {principle.number}
                </span>
                <h3 className="mt-8 font-display text-2xl font-semibold transition-colors duration-300 md:group-hover:text-brand-orange">
                  {principle.title}
                </h3>
                <p className="mt-4 max-w-sm text-sm leading-7 text-white/45">
                  {principle.text}
                </p>
              </motion.article>
            ))}
          </div>
        </div>
      </div>

      <div
        aria-hidden="true"
        className="about-word absolute bottom-[-0.08em] left-1/2 z-[2] -translate-x-1/2 select-none whitespace-nowrap font-black uppercase"
      >
        {'HAVELENT'.split('').map((letter, index) => (
          <span key={`${letter}-${index}`} className="about-word-letter">
            {letter}
          </span>
        ))}
      </div>

      <style jsx>{`
        .about-word {
          font-family: Arial Black, Arial, Helvetica, sans-serif;
          font-size: clamp(5rem, 16vw, 17rem);
          line-height: 0.78;
          letter-spacing: -0.035em;
        }

        .about-word-letter {
          display: inline-block;
          padding-inline: 0.025em;
          margin-inline: -0.025em;
          color: transparent;
          -webkit-text-fill-color: transparent;
          -webkit-text-stroke: 1.5px rgba(249, 115, 22, 0.58);
          transition:
            -webkit-text-fill-color 0.45s ease,
            -webkit-text-stroke 0.45s ease,
            transform 0.45s ease;
        }

        @media (hover: hover) and (pointer: fine) {
          .about-word {
            pointer-events: auto;
          }

          .about-word-letter:hover {
            background: linear-gradient(135deg, #9a3412 0%, #c2410c 38%, #f97316 100%);
            background-clip: text;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            -webkit-text-stroke: 1.5px #c2410c;
            transform: translateY(-0.025em);
          }
        }

        @media (max-width: 767px) {
          :global(#about *),
          :global(#about *::before),
          :global(#about *::after) {
            animation: none !important;
            transition: none !important;
          }

          :global(#about [data-about-motion="true"]) {
            opacity: 1 !important;
            transform: none !important;
            filter: none !important;
          }

          :global(#about [data-founder-card="true"]) {
            animation: none !important;
            transition: none !important;
            transform: none !important;
            filter: none !important;
            backdrop-filter: none !important;
            -webkit-backdrop-filter: none !important;
            perspective: none !important;
            will-change: auto !important;
            -webkit-font-smoothing: antialiased;
            text-rendering: optimizeLegibility;
          }

          :global(#about [data-founder-card="true"] *) {
            animation: none !important;
            transition: none !important;
            filter: none !important;
            -webkit-font-smoothing: antialiased;
            text-rendering: optimizeLegibility;
          }

          .about-word {
            bottom: -0.05em;
            font-size: 16vw;
            line-height: 0.8;
          }

          .about-word-letter {
            -webkit-text-stroke-width: 1px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .about-word-letter {
            transition: none;
          }
        }
      `}</style>
    </section>
  );
}