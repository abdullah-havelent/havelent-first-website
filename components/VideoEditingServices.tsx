'use client';

import { motion } from 'framer-motion';

const SERVICES = [
  {
    number: '01',
    title: 'YouTube Video Editing',
    description:
      'Professional YouTube video editing designed to improve audience retention, strengthen storytelling, and keep viewers engaged from the first frame to the last.',
  },
  {
    number: '02',
    title: 'Commercial & Ads Editing',
    description:
      'Cinematic commercial and ads editing for brands and businesses, combining strong pacing, polished visuals, and compelling storytelling to communicate your message.',
  },
  {
    number: '03',
    title: 'Podcast Editing',
    description:
      'Professional podcast video editing with clean audio, seamless cuts, multi-camera editing, and engaging visuals for long-form content and social media clips.',
  },
  {
    number: '04',
    title: 'Shorts & Reels Editing',
    description:
      'High-retention short-form video editing for Instagram Reels, TikTok, and YouTube Shorts, built around fast pacing, engaging visuals, and platform-friendly storytelling.',
  },
  {
    number: '05',
    title: 'Documentary Editing',
    description:
      'Cinematic documentary editing focused on narrative structure, pacing, emotional storytelling, sound design, and visual flow that keeps audiences watching.',
  },
  {
    number: '06',
    title: 'Motion Graphics',
    description:
      'Custom motion graphics including titles, animated text, lower thirds, transitions, and visual effects that add clarity and a premium feel to your videos.',
  },
];

export default function VideoEditingServices() {
  return (
    <section
      id="services"
      className="px-6 py-24"
    >
      <div className="mx-auto max-w-7xl">

        <div className="mb-16 text-center">
          <span className="text-sm uppercase tracking-[0.25em] text-brand-orange">
            Our Services
          </span>

          <h2 className="mt-4 font-display text-5xl font-semibold text-white">
           Video Editing Solutions for Every Story
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-white/60">
            From YouTube videos and commercials to podcasts, Shorts, documentaries,
            and motion graphics, we create polished edits that capture attention
            and bring your story to life.
          </p>
        </div>

        <div className="overflow-hidden rounded-3xl border border-white/10">

          {SERVICES.map((service, index) => (
            <motion.div
              key={service.number}

              /* Desktop animation only */
              initial={{
                opacity: 0,
                y: 40,
              }}

              whileInView={{
                opacity: 1,
                y: 0,
              }}

              viewport={{
                once: true,
              }}

              transition={{
                delay: index * 0.15,
              }}

              className="
                group
                relative
                overflow-hidden
                border-b
                border-white/10
                bg-white/[0.03]
                p-8
                last:border-none

                md:transition-all
                md:duration-500
                md:hover:bg-[#1b130d]
              "
            >

              {/* Left Glow — desktop only */}
              <div
                className="
                  pointer-events-none
                  absolute
                  left-0
                  top-0
                  hidden
                  h-full
                  w-56
                  bg-[radial-gradient(circle_at_left,rgba(249,115,22,.18),transparent_70%)]
                  opacity-0
                  transition-opacity
                  duration-500
                  md:block
                  md:group-hover:opacity-100
                "
              />

              <div className="relative flex gap-8">

                <span className="font-display text-sm text-brand-orange/70">
                  {service.number}
                </span>

                <div>
                  <h3 className="font-display text-2xl font-semibold text-white">
                    {service.title}
                  </h3>

                  <p className="mt-3 max-w-2xl leading-7 text-white/55">
                    {service.description}
                  </p>
                </div>

              </div>

              {/* Bottom Line — desktop animation only */}
              <div
                className="
                  absolute
                  bottom-0
                  left-0
                  h-[2px]
                  w-full
                  origin-left
                  bg-gradient-to-r
                  from-brand-orange
                  via-brand-orange
                  to-transparent

                  md:scale-x-0
                  md:transition-transform
                  md:duration-500
                  md:group-hover:scale-x-100
                "
              />

            </motion.div>
          ))}

        </div>
      </div>
    </section>
  );
}