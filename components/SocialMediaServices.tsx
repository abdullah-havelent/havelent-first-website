'use client';

import { motion } from 'framer-motion';

const SERVICES = [
  {
    number: '01',
    title: 'Social Media Strategy',
    description:
      'Build a focused social media strategy around your brand goals, target audience, content direction, and long-term growth objectives.',
  },
  {
    number: '02',
    title: 'Social Media Content Creation',
    description:
      'Create engaging posts, reels, stories, and branded graphics designed to capture attention and strengthen your social media presence.',
  },
  {
    number: '03',
    title: 'Social Media Management',
    description:
      'Keep your social channels active and consistent with professional content scheduling, publishing, profile optimization, and ongoing account management.',
  },
  {
    number: '04',
    title: 'Community Management',
    description:
      'Manage comments, messages, and audience interactions to build meaningful relationships and create a stronger online community around your brand.',
  },
  {
    number: '05',
    title: 'Social Media Advertising',
    description:
      'Reach the right audience with targeted social media advertising campaigns across platforms such as Facebook, Instagram, and TikTok.',
  },
  {
    number: '06',
    title: 'Social Media Analytics',
    description:
      'Track content and campaign performance through social media analytics, reporting, and continuous optimization to improve your strategy over time.',
  },
];


export default function SocialMediaServices() {
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
            Social Media Management Services
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-white/60">
           We manage your social media presence through strategic content planning,
          consistent publishing, community engagement, targeted advertising, and
          performance analytics designed to support long-term brand growth.
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