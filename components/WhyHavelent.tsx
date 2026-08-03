'use client';

import { motion } from 'framer-motion';
import Link from "next/link";
import Image from "next/image";
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
    <section className="relative overflow-hidden bg-[#0b0b0b] px-6 pt-8 pb-24">


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
    className="group flex flex-col items-center"
  >
    <div className="flex h-14 w-14 items-center justify-center rounded-full border border-orange-500 transition-all duration-500 group-hover:scale-110 group-hover:shadow-[0_0_30px_rgba(249,115,22,0.35)]">
      <div className="h-2.5 w-2.5 rounded-full bg-orange-500" />
    </div>

    <span className="mt-4 border-b border-orange-500 pb-1 text-xs font-semibold uppercase tracking-[0.45em] text-orange-500 transition-all duration-300 group-hover:tracking-[0.55em]">
      Our Work
    </span>
  </Link>
</div>

         <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-20">

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
  className="group relative overflow-hidden rounded-3xl border border-black/10 bg-white p-10 transition-all duration-500 hover:-translate-y-2 hover:border-orange-400 hover:shadow-[0_20px_60px_rgba(249,115,22,0.18)]"
>
  <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-500/10 transition-all duration-500 group-hover:scale-110 group-hover:rotate-6">
    <Icon className="h-7 w-7 text-orange-500" />
  </div>

  <h3 className="text-2xl font-semibold text-black">
    {card.title}
  </h3>

  <p className="mt-4 leading-7 text-neutral-600">
    {card.description}
  </p>
</motion.div>
       );
         })}
        </div>
      </div>
    </section>
  );
}