'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
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

export default function WhyHavelent() {
  return (
    <section
      id="our-work"
      className="relative overflow-hidden bg-[#0b0b0b] px-6 pt-8 pb-24"
    >

      {/* Background Image */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <Image
          src="/images/WHY BG.webp"
          alt=""
          fill
          priority={false}
          className="
            object-cover
            object-center
            opacity-[0.70]
            scale-110
            blur-[20px]
            brightness-105
            contrast-95
            saturate-100
            select-none
          "
        />
      </div>

      {/* Warm Dark Overlay */}
      <div className="pointer-events-none absolute inset-0 z-[1] bg-[#0b0b0b]/10" />

      <div className="relative z-10 max-w-7xl mx-auto -mt-1">

        <motion.div
          initial={{ opacity: 0, y: 40, filter: 'blur(10px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto"
        >
          <h2 className="font-display text-5xl md:text-6xl font-semibold text-white">
            Why Brands Choose<span className="text-gradient-orange"> Havelent</span>
          </h2>

          <p className="mt-8 text-lg leading-8 text-neutral-300">
            Helping business owners build brands they are proud of.
          </p>
        </motion.div>

        <div className="mt-10 mb-16 flex justify-center">
          <Link
            href="/our-work"
            className="group relative block w-full max-w-3xl"
          >

            {/* Glass Card */}
            <motion.div
              whileHover={{ y: -3 }}
              transition={{
                duration: 0.35,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="relative overflow-hidden rounded-[22px] border border-white/10 bg-white/[0.035] px-7 py-7 text-left backdrop-blur-xl transition-all duration-500 md:px-10 md:py-8 group-hover:border-white/20"
              style={{
                boxShadow:
                  'inset 0 1px 0 rgba(255,255,255,0.05), 0 20px 60px -35px rgba(0,0,0,0.9)',
              }}
            >

              {/* Subtle glass highlight */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/[0.045] via-transparent to-transparent" />

              {/* Orange ambient glow */}
              <div
                className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full opacity-0 blur-[80px] transition-opacity duration-700 group-hover:opacity-100"
                style={{
                  background:
                    'radial-gradient(circle, rgba(249,115,22,0.25), transparent 70%)',
                }}
              />

              {/* Content */}
              <div className="relative flex items-center justify-between gap-6">
                <div>
                  <span className="text-xs font-semibold uppercase tracking-[0.35em] text-brand-orange">
                    Our Work
                  </span>

                  <h3 className="mt-2 font-display text-2xl font-semibold text-white md:text-3xl">
                    Explore what we create.
                  </h3>

                  <p className="mt-2 text-sm text-white/45 md:text-base">
                    Discover the projects, stories, and experiences crafted by Havelent.
                  </p>
                </div>

                {/* Arrow */}
                <div
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-brand-orange/40 text-brand-orange transition-all duration-500 group-hover:border-brand-orange group-hover:bg-brand-orange group-hover:text-black"
                  style={{
                    boxShadow:
                      '0 0 20px -10px rgba(249,115,22,0.8)',
                  }}
                >
                  <span className="text-xl transition-transform duration-500 group-hover:translate-x-1">
                    →
                  </span>
                </div>
              </div>

              {/* Bottom glow line */}
              <div className="absolute bottom-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent transition-all duration-500 group-hover:via-brand-orange/40" />

            </motion.div>
          </Link>
        </div>

        <div className="mt-20 grid grid-cols-1 gap-8 md:grid-cols-2">

          {cards.map((card, index) => {
            const Icon = card.icon;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.15,
                }}
                className="group relative overflow-hidden rounded-[24px] border border-white/10 bg-white/[0.035] p-8 backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:border-brand-orange/50 md:p-10"
                style={{
                  boxShadow:
                    'inset 0 1px 0 rgba(255,255,255,0.04), 0 20px 60px -35px rgba(0,0,0,0.9)',
                }}
              >

                {/* Glass highlight */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/[0.04] via-transparent to-transparent opacity-70" />

                {/* Orange ambient glow */}
                <div
                  className="pointer-events-none absolute -bottom-20 right-0 h-48 w-48 rounded-full opacity-40 blur-[80px] transition-opacity duration-700 group-hover:opacity-80"
                  style={{
                    background:
                      'radial-gradient(circle, rgba(249,115,22,0.22), transparent 70%)',
                  }}
                />

                {/* Card content */}
                <div className="relative">

                  {/* Icon */}
                  <div className="mb-7 flex h-14 w-14 items-center justify-center rounded-2xl border border-brand-orange/30 bg-brand-orange/[0.06] transition-all duration-500 group-hover:scale-105 group-hover:border-brand-orange/60">
                    <Icon className="h-7 w-7 text-brand-orange" />
                  </div>

                  {/* Title */}
                  <h3 className="font-display text-2xl font-semibold text-white md:text-3xl">
                    {card.title}
                  </h3>

                  {/* Orange accent line */}
                  <div className="mt-4 h-px w-16 bg-brand-orange transition-all duration-500 group-hover:w-24" />

                  {/* Description */}
                  <p className="mt-6 max-w-xl leading-7 text-white/55 md:text-base">
                    {card.description}
                  </p>

                </div>

                {/* Bottom orange glow line */}
                <div className="absolute bottom-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent transition-all duration-500 group-hover:via-brand-orange/40" />

              </motion.div>
            );
          })}

        </div>

      </div>
    </section>
  );
}