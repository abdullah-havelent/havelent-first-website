'use client';

import { motion } from 'framer-motion';

const SERVICES = [
  {
    number: '01',
    title: 'Content Strategy',
    description:
      'Plan engaging content that aligns with your brand and business goals.',
  },
  {
    number: '02',
    title: 'Content Creation',
    description:
      'Creative posts, reels, stories, and graphics designed to capture attention.',
  },
  {
    number: '03',
    title: 'Account Management',
    description:
      'Consistent posting, scheduling, and profile optimization across all platforms.',
  },
  {
    number: '04',
    title: 'Community Management',
    description:
      'Respond to comments, messages, and build meaningful relationships with your audience.',
  },
  {
    number: '05',
    title: 'Social Media Advertising',
    description:
      'Run targeted campaigns to increase reach, engagement, and conversions.',
  },
  {
    number: '06',
    title: 'Analytics & Reporting',
    description:
      'Track performance with detailed reports and optimize your social media strategy.',
  },
];

export default function MarketingServices() {
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
            Professional Social Media Management
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-white/60">
            We help brands grow through strategic content planning, creative publishing,
community engagement, and consistent social media management across every platform.
          </p>
        </div>

        <div className="overflow-hidden rounded-3xl border border-white/10">

          {SERVICES.map((service, index) => (
            <motion.div
              key={service.number}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              className="group relative overflow-hidden border-b border-white/10 bg-white/[0.03] p-8 transition-all duration-500 last:border-none hover:bg-[#1b130d]"
            >

              {/* Left Glow */}
              <div className="pointer-events-none absolute left-0 top-0 h-full w-56 bg-[radial-gradient(circle_at_left,rgba(249,115,22,.18),transparent_70%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

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

              {/* Bottom Line */}
              <div className="absolute bottom-0 left-0 h-[2px] w-full origin-left scale-x-0 bg-gradient-to-r from-brand-orange via-brand-orange to-transparent transition-transform duration-500 group-hover:scale-x-100" />

            </motion.div>
          ))}

        </div>
      </div>
    </section>
  );
}