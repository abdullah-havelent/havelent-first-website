'use client';

import { motion } from 'framer-motion';

const WEBSITE_TYPES = [
  'Business Websites',
  'Corporate Websites',
  'Professional Service Websites',
  'Agency Websites',
  'Brand Websites',
  'B2B Websites',
  'Marketing-Focused Websites',
];

export default function WebDevelopmentWebsiteTypes() {
  return (
    <section className="relative overflow-hidden px-6 py-20 md:py-28">
      <div className="pointer-events-none absolute right-0 top-0 h-72 w-72 rounded-full bg-brand-orange/[0.07] blur-[120px]" />
      <div className="mx-auto max-w-7xl rounded-3xl border border-white/10 bg-white/[0.025] p-8 md:p-12">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
          <div>
            <span className="text-sm uppercase tracking-[0.25em] text-brand-orange">
              Built For Your Presence
            </span>
            <h2 className="mt-4 max-w-md font-display text-4xl font-semibold leading-tight text-white md:text-5xl">
              Website Experiences With a Clear Role
            </h2>
          </div>
          <p className="max-w-xl leading-7 text-white/55">
            Whether the priority is credibility, lead generation, a stronger brand presence,
            or clearer service information, each website is structured around the role it needs to play.
          </p>
        </div>

        <div className="mt-10 flex flex-wrap gap-3 border-t border-white/10 pt-8">
          {WEBSITE_TYPES.map((type, index) => (
            <motion.span
              key={type}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.45, delay: index * 0.05 }}
              className="rounded-full border border-white/10 px-4 py-2 text-sm text-white/65 transition-colors duration-300 hover:border-brand-orange/50 hover:text-brand-orange"
            >
              {type}
            </motion.span>
          ))}
        </div>
      </div>
    </section>
  );
}
