'use client';

import { motion } from 'framer-motion';

const SERVICES = [
  {
    number: '01',
    title: 'Custom Website Development',
    description:
      'Tailored websites shaped around your goals, content, brand, and the customer journey you want visitors to take.',
  },
  {
    number: '02',
    title: 'Responsive Web Design',
    description:
      'Polished, responsive websites that give people a clear and consistent experience on desktop, tablet, and mobile.',
  },
  {
    number: '03',
    title: 'Modern Website Design',
    description:
      'Visually refined page design that reflects your brand positioning and gives your digital presence a more considered feel.',
  },
  {
    number: '04',
    title: 'Conversion-Focused Web Design',
    description:
      'Clear page structure and purposeful calls to action that help visitors understand your offer and take the next step.',
  },
  {
    number: '05',
    title: 'Performance-Focused Development',
    description:
      'Lightweight, efficient development with close attention to loading performance, usability, and everyday reliability.',
  },
  {
    number: '06',
    title: 'Ready Website Development',
    description:
      'A strong technical foundation that supports search visibility through clear structure, responsive design, and useful content.',
  },
];

export default function WebDevelopmentServices() {
  return (
    <section id="services" className="px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 text-center">
          <span className="text-sm uppercase tracking-[0.25em] text-brand-orange">
            Our Web Development Services
          </span>
          <h2 className="mt-4 font-display text-4xl font-semibold text-white md:text-5xl">
            Websites Built With Purpose
          </h2>
          <p className="mx-auto mt-5 max-w-2xl leading-7 text-white/60">
            We combine professional web design and development to create modern,
            responsive websites that present your business clearly and support meaningful inquiries.
          </p>
        </div>

        <div className="overflow-hidden rounded-3xl border border-white/10">
          {SERVICES.map((service, index) => (
            <motion.article
              key={service.number}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.6, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="group relative overflow-hidden border-b border-white/10 bg-white/[0.03] p-8 last:border-none md:transition-all md:duration-500 md:hover:bg-[#1b130d]"
            >
              <div className="pointer-events-none absolute left-0 top-0 h-full w-56 bg-[radial-gradient(circle_at_left,rgba(249,115,22,.18),transparent_70%)] opacity-0 transition-opacity duration-500 md:group-hover:opacity-100" />
              <div className="relative flex gap-6 md:gap-8">
                <span className="font-display text-sm text-brand-orange/70">{service.number}</span>
                <div>
                  <h3 className="font-display text-2xl font-semibold text-white">{service.title}</h3>
                  <p className="mt-3 max-w-2xl leading-7 text-white/55">{service.description}</p>
                </div>
              </div>
              <div className="absolute bottom-0 left-0 h-[2px] w-full origin-left bg-gradient-to-r from-brand-orange via-brand-orange to-transparent transition-transform duration-500 md:scale-x-0 md:group-hover:scale-x-100" />
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
