'use client';

import { motion } from 'framer-motion';
import Link from "next/link";

const COLS = [
  {
    title: 'Studio',
    links: ['Home', 'Services', 'About', 'Contact Us'],
  },
  {
  title: 'Services',
  links: [
    'Video Editing',
    'Graphic Design',
    'Digital Marketing',
    'Social Media Management',
  ],
},
  {
    title: 'Social',
    links: ['Instagram', 'Dribbble', 'LinkedIn', 'X / Twitter'],
  },
];

export default function Footer() {
  return (
    <footer className="relative border-t border-white/10 px-6 py-16">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 md:grid-cols-12">
          {/* Brand */}
          <div className="md:col-span-5">
            <div className="flex items-center gap-2">
              <span className="relative flex h-7 w-7 items-center justify-center">
                <span className="absolute inset-0 rounded-md bg-gradient-to-br from-brand-accent to-brand-red" />
                <span className="relative text-xs font-bold text-white">H</span>
              </span>
              <span className="font-display text-lg font-semibold text-white">
                Havelent
              </span>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/50">
              A premium digital agency crafting cinematic experiences for
              visionary brands worldwide.
            </p>
          </div>

          {/* Link columns */}
          {COLS.map((col) => (
            <div key={col.title} className="md:col-span-2">
              <h4 className="text-xs font-medium uppercase tracking-[0.2em] text-white/40">
                {col.title}
              </h4>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((l) => (
                  <li key={l}>
                   <Link
  href={
  l === "Home"
    ? "/"
    : l === "Services"
    ? "/#services"
    : l === "About"
    ? "/#about"
    : l === "Contact Us"
    ? "/#contact"
    : l === "Video Editing"
    ? "/services/video-editing"
    : l === "Graphic Design"
    ? "/services/graphic-design"
    : l === "Digital Marketing"
    ? "/services/digitalmarketing"
    : l === "Social Media Management"
    ? "/services/social-media-management"
    : "#"
}
  className="group relative text-sm text-white/65 transition-colors duration-300 hover:text-brand-orange"
>
  {l}
  <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-brand-orange transition-all duration-300 group-hover:w-full" />
</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="md:col-span-1" />
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-xs text-white/40 sm:flex-row"
        >
          <span>© {new Date().getFullYear()} Havelent Studio. All rights reserved.</span>
          <span>Designed & built with obsession.</span>
        </motion.div>
      </div>
    </footer>
  );
}
