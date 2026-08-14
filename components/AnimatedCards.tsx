'use client';

import Link from "next/link";
import { motion } from 'framer-motion';

const images = [
  "/images/1.webp",
  "/images/2.webp",
  "/images/3.webp",
  "/images/4.webp",
];

export default function AnimatedCards() {
  return (
  <div className="relative w-full pt-16">
    <div className="relative flex justify-center">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 md:grid-cols-2 xl:grid-cols-4">
        {images.map((src, index) => (
<motion.div
  key={index}
  initial={{
    opacity: 0,
    x: -70,
    y: 50,
    rotate: -4,
    scale: 0.92,
    filter: "blur(12px)",
  }}
  whileInView={{
    opacity: 1,
    x: 0,
    y: 0,
    rotate: 0,
    scale: 1,
    filter: "blur(0px)",
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
    {/* Card Glow */}
    <div className="absolute inset-0 -z-10 flex items-center justify-center">
      <div className="h-56 w-56 rounded-full bg-[#ff6b00]/25 blur-[80px]" />
    </div>
  
  <Link
  href={
  index === 0
    ? "/services/video-editing"
    : index === 1
    ? "/services/graphic-design"
    : index === 2
    ? "/services/digitalmarketing"
    : index === 3
    ? "/services/social-media-management"
    : "#"
}
>

   <div className="group h-[320px] w-[240px] sm:h-[360px] sm:w-[270px] lg:h-[400px] lg:w-[300px] overflow-hidden rounded-[32px] border-2 border-orange-500/30 bg-[#111] shadow-[0_0_25px_rgba(255,107,0,0.12)] transition-transform duration-300 ease-out will-change-transform hover:-translate-y-4 hover:border-[3px] hover:border-orange-400 hover:shadow-[0_0_60px_rgba(255,107,0,0.45)]">
  <img
  src={src}
  alt=""
  className="h-full w-full object-cover transition-all duration-500 group-hover:scale-110 group-hover:brightness-50"
/>
{(index === 0 || index === 1 || index === 2 || index === 3)&& (
  <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black via-black/70 to-transparent p-6">
    <h3 className="font-display text-3xl font-semibold text-white">
  {index === 0
  ? "Video Editing"
  : index === 1
  ? "Graphic Design"
  : index === 2
  ? "Digital Marketing"
  : "Social Media\nManagement"}
</h3>
<button className="mt-4 text-xs font-medium text-brand-orange transition-all duration-300 hover:translate-x-1">
  View More →
</button>
  </div>
)}
</div>
</Link>
</motion.div>
        ))}
      </div>
    </div>
    </div>
  );
}