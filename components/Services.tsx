'use client';

import { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import AnimatedCards from "./AnimatedCards";

type Service = {
  id: string;
  title: string;
  subtitle: string;
  tag: string;
  image: string;
};

const SERVICES: Service[] = [
  {
    id: 'brand',
    title: 'Brand Identity',
    subtitle: 'Cinematic brand systems engineered for distinction and longevity.',
    tag: 'Design · Strategy',
    image:
      'https://images.pexels.com/photos/34577/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1200',
  },
  {
    id: 'web',
    title: 'Web Experiences',
    subtitle: 'Awwwards-grade interfaces with motion at the core.',
    tag: 'Web · Motion',
    image:
      'https://images.pexels.com/photos/270408/pexels-photo-270408.jpeg?auto=compress&cs=tinysrgb&w=1200',
  },
  {
    id: 'product',
    title: 'Product Design',
    subtitle: 'End-to-end product craft from zero to launch and beyond.',
    tag: 'Product · UX',
    image:
      'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=1200',
  },
];

function ServiceCard({ service, index }: { service: Service; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  const [light, setLight] = useState({ x: 50, y: 50 });

  const onMove = (e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    setLight({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
      className="snap-center shrink-0"
    >
      <motion.div
        ref={ref}
        data-cursor="card"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onMouseMove={onMove}
        animate={{ y: hovered ? -12 : 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="group relative h-[460px] w-[88vw] max-w-[380px] overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.04] to-white/[0.01] sm:w-full"
        style={{
          boxShadow: hovered
            ? '0 30px 80px -20px rgba(249,115,22,0.45), inset 0 1px 0 rgba(255,255,255,0.08)'
            : '0 10px 40px -12px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.04)',
        }}
      >
        {/* Dynamic light reflection */}
        <div
          className="pointer-events-none absolute inset-0 z-20 transition-opacity duration-500"
          style={{
            opacity: hovered ? 1 : 0,
            background: `radial-gradient(420px circle at ${light.x}% ${light.y}%, rgba(255,106,0,0.18), transparent 60%)`,
          }}
        />

        {/* Border glow on hover */}
        <div
          className="pointer-events-none absolute inset-0 z-30 rounded-3xl transition-opacity duration-500"
          style={{
            opacity: hovered ? 1 : 0,
            boxShadow: 'inset 0 0 0 1.5px rgba(249,115,22,0.85)',
          }}
        />

        {/* Image */}
        <motion.div
          className="absolute inset-0 z-0 overflow-hidden"
          animate={{ scale: hovered ? 1.08 : 1 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
        >
          <img
            src={service.image}
            alt={service.title}
            className="h-full w-full object-cover"
            style={{
              filter: hovered
                ? 'brightness(0.35)'
               : 'brightness(1)',
              transition: 'filter 600ms ease-in-out',
            }}
          />
          <div
         className={`absolute inset-0 bg-black transition-opacity duration-500 ${
           hovered ? "opacity-40" : "opacity-0"
        }`}
/>
        </motion.div>

        {/* Content */}
        <div className="relative z-10 flex h-full flex-col justify-between p-7">
          <div className="flex items-start justify-between">
            <span className="rounded-full border border-white/15 bg-black/30 px-3 py-1 text-[11px] font-medium uppercase tracking-wider text-white/70 backdrop-blur">
              {service.tag}
            </span>
            <span className="font-display text-sm text-white/40">
              0{index + 1}
            </span>
          </div>

          <div>
            <motion.h3
              animate={{ y: hovered ? -6 : 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="font-display text-3xl font-semibold text-white"
            >
              {service.title}
            </motion.h3>

            <p className="mt-3 max-w-[280px] text-sm leading-relaxed text-white/70">
  {service.subtitle}
</p>

<button
  data-cursor="button"
  className="group/btn mt-5 inline-flex items-center gap-2 text-sm font-medium text-brand-orange"
>
  View More
  <ArrowRight
    size={15}
    className="transition-transform duration-300 group-hover/btn:translate-x-1"
  />
</button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Services() {
  return (
    <section
  id="services"
  className="relative overflow-hidden px-6 py-24 sm:py-32"
>

       {/* Left Glow */}
  <div className="pointer-events-none absolute left-[-280px] top-0 z-0 h-[900px] w-[900px] bg-gradient-to-br from-orange-500/100 via-orange-500/70 to-transparent blur-[220px] animate-glow" />
     {/* Right Glow */}
  <div className="pointer-events-none absolute right-[-140px] top-1/2 -translate-y-1/2 z-0 h-[420px] w-[420px] rounded-full bg-gradient-to-bl from-orange-500/70 via-orange-500/35 to-transparent blur-[180px] animate-glow" />
  <div className="pointer-events-none absolute right-[-240px] top-1/2 -translate-y-1/2 z-0 h-[420px] w-[420px] rounded-full bg-orange-500/80 blur-[160px] animate-glow" />
      
      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mb-14 flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end"
        >
          <div>
            <span className="text-sm font-medium uppercase tracking-[0.2em] text-brand-orange">
              What we do
            </span>
            <h2 className="mt-4 font-display text-[clamp(2rem,4.5vw,3.5rem)] font-semibold leading-tight text-white">
              Services crafted for
              <br />
              <span className="text-gradient-orange">visionary brands.</span>
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-white/55">
            Every engagement is a partnership. We build, refine, and elevate
            digital products with obsessive attention to detail.
          </p>
        </motion.div>

        {/* Cards — grid on desktop, slider on mobile */}
        <AnimatedCards />
      </div>
    </section>
  );
}
