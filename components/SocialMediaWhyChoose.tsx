'use client';

import ServiceWhyChooseIntro from './ServiceWhyChooseIntro';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const BENEFITS = [
  {
    number: '01',
    title: 'Strategy Before Posting',
    description:
      'We begin with your brand, audience, goals, and market to build a social media strategy with a clear direction before content goes live.',
  },
  {
    number: '02',
    title: 'Content With Purpose',
    description:
      'Every post, reel, story, and creative is planned to communicate your brand clearly, capture attention, and support your wider marketing goals.',
  },
  {
    number: '03',
    title: 'Consistent Brand Presence',
    description:
      'We maintain a consistent visual style, tone, and publishing approach across your social channels so your brand remains recognizable and professional.',
  },
  {
    number: '04',
    title: 'Audience-Focused Engagement',
    description:
      'We focus on meaningful audience interaction through community management, timely responses, and content designed around what your audience cares about.',
  },
  {
    number: '05',
    title: 'Data-Driven Optimization',
    description:
      'We use social media analytics and performance insights to understand what is working and continuously refine your content and strategy.',
  },
  {
    number: '06',
    title: 'A Long-Term Social Partner',
    description:
      'We build lasting partnerships through consistent social media management, reliable execution, transparent insights, and strategies that evolve with your brand.',
  },
];

function ContactCTA() {
  return (
    <div className="relative mt-12 overflow-hidden rounded-3xl border border-white/10 bg-white/[0.025] p-7 md:p-8">
      <div className="pointer-events-none absolute -right-20 -top-20 h-40 w-40 rounded-full bg-brand-orange/[0.08] blur-3xl" />

      <div className="relative">
        <span className="text-[10px] font-medium uppercase tracking-[0.28em] text-brand-orange">
          Grow Your Presence
        </span>

        <h3 className="mt-4 max-w-xs font-display text-2xl font-semibold leading-tight text-white">
          Ready to strengthen your social presence?
        </h3>

        <p className="mt-4 max-w-sm text-sm leading-6 text-white/40">
          Let&apos;s build a social media strategy that gives your brand a
          stronger presence and keeps your audience engaged.
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
/* SOCIAL MEDIA CONSOLE */
/* ========================================================= */

function SocialMediaConsole() {
  return (
    <div className="relative mt-10 w-full overflow-hidden rounded-[28px] border border-white/10 bg-[#080808] p-5 md:p-7">

      {/* Ambient Glow */}
      <motion.div
        className="pointer-events-none absolute -left-20 top-10 h-48 w-48 rounded-full bg-orange-500/10 blur-[100px]"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2 }}
      />

      <motion.div
        className="pointer-events-none absolute -right-20 bottom-0 h-48 w-48 rounded-full bg-orange-500/5 blur-[100px]"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, delay: 0.2 }}
      />

      {/* Top Bar */}
      <motion.div
        className="relative flex items-center justify-between border-b border-white/10 pb-5"
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div>
          <p className="text-[10px] font-medium uppercase tracking-[0.28em] text-white/35">
            Social Presence
          </p>

          <h3 className="mt-1 text-lg font-medium tracking-tight text-white">
            Built to Be Remembered
          </h3>
        </div>

        <div className="flex items-center gap-2 rounded-full border border-white/10 px-3 py-1.5">
          <motion.span
            className="h-1.5 w-1.5 rounded-full bg-orange-500"
            animate={{
              opacity: [0.35, 1, 0.35],
              scale: [0.85, 1.15, 0.85],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          <span className="text-[9px] uppercase tracking-[0.2em] text-white/50">
            Active
          </span>
        </div>
      </motion.div>

      {/* Main Architecture */}
      <div className="relative mt-7">

        {/* Center Brand */}
        <motion.div
          className="relative mx-auto flex h-28 w-28 items-center justify-center rounded-full border border-orange-500/30 bg-white/[0.025]"
          initial={{ opacity: 0, scale: 0.75 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.7,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          {/* Outer Pulse */}
          <motion.div
            className="absolute inset-0 rounded-full border border-orange-500/20"
            animate={{
              scale: [1, 1.12, 1],
              opacity: [0.35, 0, 0.35],
            }}
            transition={{
              duration: 2.8,
              repeat: Infinity,
              ease: "easeOut",
            }}
          />

          {/* Inner Ring */}
          <motion.div
            className="absolute inset-3 rounded-full border border-white/10"
            animate={{ rotate: 360 }}
            transition={{
              duration: 18,
              repeat: Infinity,
              ease: "linear",
            }}
          />

          {/* Brand */}
          <motion.div
            className="relative flex h-14 w-14 items-center justify-center rounded-full bg-white text-xl font-semibold text-black shadow-[0_0_35px_rgba(249,115,22,0.12)]"
            animate={{
              boxShadow: [
                "0 0 25px rgba(249,115,22,0.08)",
                "0 0 45px rgba(249,115,22,0.18)",
                "0 0 25px rgba(249,115,22,0.08)",
              ],
            }}
            transition={{
              duration: 2.8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            H
          </motion.div>
        </motion.div>

        {/* Connecting Line */}
        <motion.div
          className="mx-auto h-10 w-px origin-top bg-gradient-to-b from-orange-500/40 to-white/10"
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.25 }}
        />

        {/* Strategy Flow */}
        <div className="grid grid-cols-3 gap-2 md:gap-4">

          {/* Brand */}
          <motion.div
            className="group rounded-2xl border border-white/10 bg-white/[0.025] p-4 transition-colors duration-300 hover:border-orange-500/30 hover:bg-white/[0.04]"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.35 }}
            whileHover={{
              y: -5,
              transition: { duration: 0.25 },
            }}
          >
            <div className="mb-5 flex items-center justify-between">
              <span className="text-[9px] uppercase tracking-[0.22em] text-white/30">
                01
              </span>

              <motion.span
                className="h-1.5 w-1.5 rounded-full bg-white/30"
                whileHover={{
                  scale: 1.6,
                  backgroundColor: "#f97316",
                }}
              />
            </div>

            <h4 className="text-sm font-medium text-white">
              Brand
            </h4>

            <p className="mt-1 text-[10px] leading-relaxed text-white/35">
              Identity & Positioning
            </p>
          </motion.div>

          {/* Content */}
          <motion.div
            className="group rounded-2xl border border-white/10 bg-white/[0.025] p-4 transition-colors duration-300 hover:border-orange-500/30 hover:bg-white/[0.04]"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.48 }}
            whileHover={{
              y: -5,
              transition: { duration: 0.25 },
            }}
          >
            <div className="mb-5 flex items-center justify-between">
              <span className="text-[9px] uppercase tracking-[0.22em] text-white/30">
                02
              </span>

              <motion.span
                className="h-1.5 w-1.5 rounded-full bg-white/30"
                whileHover={{
                  scale: 1.6,
                  backgroundColor: "#f97316",
                }}
              />
            </div>

            <h4 className="text-sm font-medium text-white">
              Content
            </h4>

            <p className="mt-1 text-[10px] leading-relaxed text-white/35">
              Stories & Creative
            </p>
          </motion.div>

          {/* Community */}
          <motion.div
            className="group rounded-2xl border border-white/10 bg-white/[0.025] p-4 transition-colors duration-300 hover:border-orange-500/30 hover:bg-white/[0.04]"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.61 }}
            whileHover={{
              y: -5,
              transition: { duration: 0.25 },
            }}
          >
            <div className="mb-5 flex items-center justify-between">
              <span className="text-[9px] uppercase tracking-[0.22em] text-white/30">
                03
              </span>

              <motion.span
                className="h-1.5 w-1.5 rounded-full bg-white/30"
                whileHover={{
                  scale: 1.6,
                  backgroundColor: "#f97316",
                }}
              />
            </div>

            <h4 className="text-sm font-medium text-white">
              Community
            </h4>

            <p className="mt-1 text-[10px] leading-relaxed text-white/35">
              Engagement & Trust
            </p>
          </motion.div>
        </div>
      </div>

      {/* Bottom Statement */}
      <motion.div
        className="relative mt-6 flex flex-col gap-3 border-t border-white/10 pt-5 sm:flex-row sm:items-center sm:justify-between"
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.7 }}
      >
        <p className="max-w-[280px] text-[10px] leading-relaxed text-white/35">
          Every interaction works together to build a stronger,
          more recognizable digital presence.
        </p>

        <div className="flex items-center gap-2 text-[9px] uppercase tracking-[0.2em] text-white/30">
          <span>Strategy</span>

          <motion.span
            className="text-orange-500"
            animate={{ x: [0, 3, 0] }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            →
          </motion.span>

          <span>Presence</span>

          <motion.span
            className="text-orange-500"
            animate={{ x: [0, 3, 0] }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.2,
            }}
          >
            →
          </motion.span>

          <span>Trust</span>
        </div>
      </motion.div>
    </div>
  );
}


export default function SocialMediaWhyChoose() {
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
            <ServiceWhyChooseIntro title="Social With" accent="Purpose." description="A consistent social presence helps your brand connect with its audience through thoughtful content, engagement, and clear direction." related={[{"href":"/services/graphic-design","label":"Graphic Design services"},{"href":"/services/video-editing","label":"Video Editing services"}]} />
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