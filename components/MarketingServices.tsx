'use client';

import { motion } from 'framer-motion';

const SERVICES = [
  {
    number: '01',
    title: 'YouTube Advertising',
    description:
      'Strategic YouTube advertising campaigns designed to increase brand visibility, reach high-intent audiences, generate qualified traffic, and drive measurable business results.',
  },
  {
    number: '02',
    title: 'Facebook Advertising',
    description:
      'Targeted Facebook advertising campaigns built around audience research, compelling creative, precise targeting, and continuous optimization to generate stronger engagement, leads, and conversions.',
  },
  {
    number: '03',
    title: 'Instagram Advertising',
    description:
      'Performance-focused Instagram advertising that combines creative content, audience targeting, and campaign optimization to strengthen brand reach, increase engagement, and generate valuable results.',
  },
  {
    number: '04',
    title: 'TikTok Advertising',
    description:
      'Creative TikTok advertising campaigns designed to capture attention, connect with relevant audiences, and turn short-form content into meaningful brand growth, engagement, and conversions.',
  },
  {
    number: '05',
    title: 'Campaign Strategy',
    description:
      'Data-driven digital marketing strategy covering audience research, campaign planning, creative direction, platform selection, and optimization to build more effective marketing campaigns.',
  },
  {
    number: '06',
    title: 'Performance Analytics',
    description:
      'Detailed marketing analytics and performance reporting that reveal campaign performance, identify growth opportunities, and guide continuous optimization for stronger digital marketing results.',
  },
];

export default function MarketingServices() {
  return (
    <section
      id="services"
      className="px-6 py-24"
    >
      <div className="mx-auto max-w-7xl">

        {/* SECTION HEADER */}
        <div className="mb-16 text-center">
          <span className="text-sm uppercase tracking-[0.25em] text-brand-orange">
            Our Services
          </span>

          <h2 className="mt-4 font-display text-5xl font-semibold text-white">
            Strategic Marketing Built for Growth
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-white/60">
                Our digital marketing services combine strategic campaign planning,
               targeted advertising, creative execution, and performance analytics
               to strengthen your online presence, generate qualified leads, and
               drive measurable business growth.
          </p>
        </div>

        {/* SERVICES LIST */}
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

              {/* LEFT GLOW — DESKTOP ONLY */}
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

              {/* CONTENT */}
              <div className="relative flex gap-8">

                {/* NUMBER */}
                <span className="font-display text-sm text-brand-orange/70">
                  {service.number}
                </span>

                {/* TEXT */}
                <div>
                  <h3 className="font-display text-2xl font-semibold text-white">
                    {service.title}
                  </h3>

                  <p className="mt-3 max-w-2xl leading-7 text-white/55">
                    {service.description}
                  </p>
                </div>

              </div>

              {/* BOTTOM LINE — DESKTOP ONLY */}
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