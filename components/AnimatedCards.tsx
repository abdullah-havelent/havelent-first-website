'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  ArrowUpRight,
  Play,
  PenTool,
  Megaphone,
  MessageCircle,
} from 'lucide-react';

const services = [
  {
    title: 'Video Editing',
    description:
      'Cinematic edits that tell your story with precision and creativity.',
    icon: Play,
    type: 'video',
    href: '/services/video-editing',
  },
  {
    title: 'Graphic Design',
    description:
      'Designs that capture attention and communicate your brand.',
    icon: PenTool,
    type: 'design',
    href: '/services/graphic-design',
  },
  {
    title: 'Digital Marketing',
    description:
      'Strategic marketing that grows your brand and reaches more customers.',
    icon: Megaphone,
    type: 'marketing',
    href: '/services/digitalmarketing',
  },
  {
    title: 'Social Media Management',
    description:
      'Manage your social presence and engage your audience effectively.',
    icon: MessageCircle,
    type: 'social',
    href: '/services/social-media-management',
  },
];

export default function AnimatedCards() {
  return (
    <div className="relative w-full pt-16">
      <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-4">
        {services.map((service, index) => {
          const Icon = service.icon;

          return (
            <motion.div
              key={service.title}
              initial={{
                opacity: 0,
                x: -70,
                y: 50,
                rotate: -4,
                scale: 0.92,
                filter: 'blur(12px)',
              }}
              whileInView={{
                opacity: 1,
                x: 0,
                y: 0,
                rotate: 0,
                scale: 1,
                filter: 'blur(0px)',
              }}
              viewport={{
                once: true,
                amount: 0.25,
              }}
              transition={{
                duration: 0.58,
                delay: 0.6 + index * 0.09,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <Link
                href={service.href}
                className="group relative block min-h-[560px] overflow-hidden rounded-[30px] border border-orange-500/35 bg-[#070707] transition-all duration-500 hover:-translate-y-2 hover:border-orange-500/70 hover:shadow-[0_25px_80px_rgba(249,115,22,0.18)]"
              >

                {/* ================================================= */}
                {/* CARD AMBIENT GLOW */}
                {/* ================================================= */}

                <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-orange-500/10 blur-[90px] transition-all duration-700 group-hover:bg-orange-500/20" />

                <div className="pointer-events-none absolute -bottom-24 -left-20 h-64 w-64 rounded-full bg-orange-500/[0.06] blur-[90px]" />


                {/* ================================================= */}
                {/* VIDEO BACKGROUND */}
                {/* ================================================= */}

                {service.type === 'video' && (
                  <div className="pointer-events-none absolute inset-0 overflow-hidden">

                    <div className="absolute left-1/2 top-[155px] h-[430px] w-[430px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-orange-500/10" />

                    <div className="absolute left-1/2 top-[155px] h-[360px] w-[360px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-orange-500/15" />

                    <div className="absolute left-1/2 top-[155px] h-[290px] w-[290px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-orange-500/20" />

                    <div className="absolute left-1/2 top-[155px] h-[220px] w-[220px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-orange-500/25" />

                    <div className="absolute left-1/2 top-[155px] h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-orange-500/[0.035] blur-[2px]" />

                  </div>
                )}


                {/* ================================================= */}
                {/* GRAPHIC DESIGN BACKGROUND */}
                {/* ================================================= */}

                {service.type === 'design' && (
                  <div className="pointer-events-none absolute inset-0 overflow-hidden">

                    <div className="absolute left-[8%] top-[8%] h-24 w-28 border border-orange-500/[0.12]" />

                    <div className="absolute left-[32%] top-[12%] h-20 w-24 bg-white/[0.025]" />

                    <div className="absolute right-[8%] top-[8%] h-32 w-24 border-l border-orange-500/[0.15] border-r" />

                    <div className="absolute left-[15%] top-[28%] h-24 w-36 bg-orange-500/[0.025]" />

                    <div className="absolute right-[15%] top-[31%] h-28 w-32 border border-white/[0.05]" />

                    <div className="absolute left-[6%] top-[44%] h-px w-[88%] bg-orange-500/[0.08]" />

                    <div className="absolute left-[22%] top-[50%] h-24 w-32 border border-orange-500/[0.1]" />

                    <div className="absolute right-[10%] top-[52%] h-20 w-28 bg-white/[0.025]" />

                    <div className="absolute left-[5%] top-[67%] h-px w-[90%] bg-orange-500/[0.07]" />

                    <span className="absolute left-[62%] top-[18%] h-1.5 w-1.5 rounded-full bg-orange-500/60 shadow-[0_0_12px_rgba(249,115,22,0.8)]" />

                    <span className="absolute left-[72%] top-[25%] h-1 w-1 rounded-full bg-orange-500/70" />

                    <span className="absolute left-[80%] top-[31%] h-1.5 w-1.5 rounded-full bg-orange-500/60" />

                  </div>
                )}


                {/* ================================================= */}
                {/* DIGITAL MARKETING BACKGROUND */}
                {/* ================================================= */}

                {service.type === 'marketing' && (
                  <div className="pointer-events-none absolute inset-0 overflow-hidden">

                    <div className="absolute -left-[15%] top-[185px] h-40 w-[130%] -rotate-[5deg] rounded-[50%] border-t border-orange-500/25" />

                    <div className="absolute -left-[15%] top-[200px] h-40 w-[130%] -rotate-[5deg] rounded-[50%] border-t border-orange-500/20" />

                    <div className="absolute -left-[15%] top-[215px] h-40 w-[130%] -rotate-[5deg] rounded-[50%] border-t border-orange-500/15" />

                    <div className="absolute -left-[15%] top-[230px] h-40 w-[130%] -rotate-[5deg] rounded-[50%] border-t border-orange-500/10" />

                    <div className="absolute -left-[10%] top-[270px] h-36 w-[120%] rotate-[7deg] rounded-[50%] border-t border-orange-500/15" />

                    <div className="absolute -left-[10%] top-[285px] h-36 w-[120%] rotate-[7deg] rounded-[50%] border-t border-orange-500/10" />

                    <div className="absolute left-1/2 top-[215px] h-56 w-56 -translate-x-1/2 rounded-full bg-orange-500/[0.035] blur-[80px]" />

                  </div>
                )}


                {/* ================================================= */}
                {/* SOCIAL MEDIA BACKGROUND */}
                {/* ================================================= */}

                {service.type === 'social' && (
                  <div className="pointer-events-none absolute inset-0 overflow-hidden">

                    <div className="absolute left-[14%] top-[12%] h-px w-[72%] rotate-[7deg] bg-orange-500/15" />

                    <div className="absolute left-[18%] top-[30%] h-px w-[65%] -rotate-[12deg] bg-orange-500/15" />

                    <div className="absolute left-[25%] top-[44%] h-px w-[55%] rotate-[8deg] bg-orange-500/10" />

                    <div className="absolute left-[12%] top-[61%] h-px w-[75%] -rotate-[8deg] bg-orange-500/10" />

                    <div className="absolute left-[22%] top-[18%] h-2 w-2 rounded-full bg-orange-500/70 shadow-[0_0_12px_rgba(249,115,22,0.8)]" />

                    <div className="absolute left-[68%] top-[13%] h-1.5 w-1.5 rounded-full bg-orange-500/60" />

                    <div className="absolute left-[78%] top-[32%] h-2 w-2 rounded-full bg-orange-500/70 shadow-[0_0_12px_rgba(249,115,22,0.8)]" />

                    <div className="absolute left-[34%] top-[38%] h-1.5 w-1.5 rounded-full bg-orange-500/50" />

                    <div className="absolute left-[82%] top-[52%] h-1.5 w-1.5 rounded-full bg-orange-500/60" />

                    <div className="absolute left-[20%] top-[65%] h-2 w-2 rounded-full bg-orange-500/60" />

                    <div className="absolute left-[62%] top-[72%] h-1.5 w-1.5 rounded-full bg-orange-500/50" />

                  </div>
                )}


                {/* ================================================= */}
                {/* CONTENT */}
                {/* ================================================= */}

<div className="relative z-10 flex h-full flex-col items-center px-7 py-10 text-center">

  {/* ICON */}

  <div className="relative mt-10 flex h-40 w-40 shrink-0 items-center justify-center">

    {/* Large soft glow */}

    <div className="absolute inset-0 rounded-full bg-orange-500/10 blur-[45px] transition-all duration-700 group-hover:scale-125 group-hover:bg-orange-500/25" />

    {/* Outer Ring */}

    <div className="absolute inset-[8px] rounded-full border border-orange-500/20 transition-all duration-500 group-hover:scale-110 group-hover:border-orange-500/40" />

    {/* Glass Orb */}

    <div className="relative flex h-[112px] w-[112px] items-center justify-center rounded-full border border-orange-500/30 bg-gradient-to-br from-white/[0.10] via-white/[0.035] to-orange-500/[0.08] shadow-[inset_0_1px_2px_rgba(255,255,255,0.15),0_0_35px_rgba(249,115,22,0.16)] backdrop-blur-xl transition-all duration-500 group-hover:scale-110 group-hover:border-orange-500/70 group-hover:shadow-[inset_0_1px_2px_rgba(255,255,255,0.2),0_0_55px_rgba(249,115,22,0.4)]">

      <Icon
        size={48}
        strokeWidth={1.7}
        className="text-orange-500 transition-all duration-500 group-hover:scale-110 group-hover:drop-shadow-[0_0_14px_rgba(249,115,22,0.95)]"
      />

    </div>

  </div>


  {/* TITLE */}

  <div className="mt-8 flex h-[65px] w-full items-start justify-center">

    <h3
  className={`max-w-[270px] font-display text-[30px] font-semibold leading-[1.08] text-white ${
    service.title === 'Social Media Management' ? '-translate-y-2' : ''
  }`}
>
  
      {service.title}
    </h3>

  </div>


  {/* LINE */}

  <div className="mt-1 h-px w-16 shrink-0 bg-orange-500/80 transition-all duration-500 group-hover:w-20" />


  {/* DESCRIPTION */}

  <div className="mt-7 flex h-[70px] w-full items-start justify-center">

    <p className="max-w-[280px] text-base leading-7 text-white/60">
      {service.description}
    </p>

  </div>


  {/* VIEW MORE */}

  <div className="mt-auto flex h-[40px] items-end pt-10">

    <span className="inline-flex items-center gap-2 font-display text-base text-orange-500 transition-all duration-300 group-hover:text-orange-400">

      View More

      <ArrowUpRight
        size={17}
        className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
      />

    </span>

  </div>

</div>

              </Link>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}