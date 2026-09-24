'use client';

import { motion } from 'framer-motion';

const SERVICES = [
  {
    number: '01',
    title: 'Logo Design',
    description:
      'Custom logo design created to establish a distinctive visual identity and give your brand a memorable presence.',
  },
  {
    number: '02',
    title: 'Poster Design',
    description:
      'Strategic poster design for promotions, events, advertising campaigns, and digital platforms that captures attention.',
  },
  {
    number: '03',
    title: 'Business Card Design',
    description:
      'Professional business card design that combines strong branding with a polished visual presentation.',
  },
  {
    number: '04',
    title: 'Invitation Design',
    description:
      'Professional invitation design for corporate events, business launches, conferences, and branded occasions.',
  },
  {
    number: '05',
    title: 'Brand Identity Design',
    description:
      'Complete branding and graphic design services covering visual identity, color systems, typography, guidelines, and brand assets.',
  },
  {
    number: '06',
    title: 'Social Media Design',
    description:
      'Custom graphic design for social media posts, banners, and marketing creatives built for consistent brand communication.',
  },
];

export default function GraphicDesignServices() {
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
            Graphic Design Services for Brands
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-white/60">
            We create professional graphic design solutions that strengthen your brand,
capture attention, and maintain a consistent visual identity across digital
platforms and marketing materials.
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