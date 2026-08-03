'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function FounderPage() {
  return (
    <main className="relative overflow-hidden bg-brand-dark text-white">
      <section className="relative px-6 py-24 sm:py-32">
        <div className="mx-auto grid max-w-7xl items-center gap-16 lg:grid-cols-2">

          {/* Left */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-sm font-medium uppercase tracking-[0.25em] text-brand-orange">
              Founder
            </span>

            <h1 className="mt-5 font-display text-[clamp(2.8rem,6vw,5rem)] font-semibold leading-tight">
              The Story Behind{' '}
              <span className="text-gradient-orange">
                Havelent.
              </span>
            </h1>

            <p className="mt-8 max-w-xl text-lg leading-relaxed text-white/60">
              Havelent wasn't created to become just another digital agency.
              It was built with one belief—great design earns trust before it
              earns attention.
            </p>

            <p className="mt-6 max-w-xl leading-relaxed text-white/55">
              Every project starts with understanding the problem, not rushing
              to the solution. We focus on creating digital experiences that
              feel premium, purposeful, and built to last.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href="/#contact"
                className="rounded-full bg-brand-orange px-7 py-3 font-medium text-black transition hover:scale-105"
              >
                Get a Free Quote
              </Link>

              <Link
                href="/"
                className="rounded-full border border-white/10 px-7 py-3 transition hover:border-brand-orange"
              >
                Back to Home
              </Link>
            </div>
          </motion.div>

          {/* Right */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="absolute -left-20 top-10 h-64 w-64 rounded-full bg-brand-orange/20 blur-[140px]" />

            <div className="overflow-hidden rounded-[32px] border border-white/10 bg-white/[0.03]">
              <div className="aspect-[4/5] flex items-center justify-center bg-gradient-to-b from-white/5 to-transparent">
                <p className="text-white/40">
                  Founder Portrait
                </p>
              </div>
            </div>
          </motion.div>

        </div>
      </section>

      {/* Story */}

      <section className="px-6 py-24">
        <div className="mx-auto max-w-5xl">

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="font-display text-4xl font-semibold">
              My Story
            </h2>

            <p className="mt-8 text-lg leading-9 text-white/60">
              I believe businesses deserve more than beautiful visuals.
              They deserve digital experiences that communicate clearly,
              inspire confidence, and create lasting value.
            </p>

            <p className="mt-6 text-lg leading-9 text-white/60">
              Havelent is built around craftsmanship, transparency, and
              thoughtful execution. Every decision—from branding to web
              development—is made with long-term impact in mind.
            </p>
          </motion.div>

        </div>
      </section>

      {/* Values */}

      <section className="px-6 pb-24">
        <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-3">

          {[
            {
              title: 'Transparency',
              text: 'No inflated numbers. No exaggerated promises. Just honest work.'
            },
            {
              title: 'Quality',
              text: 'Every pixel, animation, and interaction should have a purpose.'
            },
            {
              title: 'Long-Term Partnerships',
              text: 'Building relationships that continue long after launch.'
            },
          ].map((item) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="rounded-3xl border border-white/10 bg-white/[0.03] p-8 transition hover:border-brand-orange/50"
            >
              <h3 className="font-display text-2xl font-semibold">
                {item.title}
              </h3>

              <p className="mt-4 leading-8 text-white/55">
                {item.text}
              </p>
            </motion.div>
          ))}

        </div>
      </section>

      {/* CTA */}

      <section className="px-6 pb-32">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mx-auto max-w-5xl rounded-[40px] border border-white/10 bg-white/[0.03] p-14 text-center"
        >
          <h2 className="font-display text-5xl font-semibold">
            Let's Build Something Great Together.
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-white/60">
            Whether you're building a brand from scratch or elevating an
            existing one, let's create something meaningful.
          </p>

          <Link
            href="/#contact"
            className="mt-10 inline-flex rounded-full bg-brand-orange px-8 py-4 font-medium text-black transition hover:scale-105"
          >
            Get a Free Quote
          </Link>
        </motion.div>
      </section>
    </main>
  );
}