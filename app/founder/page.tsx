'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function FounderPage() {
  return (
    <main className="relative overflow-hidden bg-brand-dark text-white">

      {/* Hero */}
      <section className="relative px-6 py-24 sm:py-32">
        <div className="mx-auto grid max-w-7xl items-center gap-16 lg:grid-cols-2">

          {/* Left */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-sm font-medium uppercase tracking-[0.25em] text-brand-orange">
              Founder & CEO
            </span>

            <h1 className="mt-5 font-display text-[clamp(2.8rem,6vw,5rem)] font-semibold leading-tight">
              The Story Behind{' '}
              <span className="text-gradient-orange">
                Havelent.
              </span>
            </h1>

            <p className="mt-8 max-w-xl text-lg leading-relaxed text-white/60">
              I’m Abdullah Rajpoot, the Founder and CEO of Havelent.
              I built Havelent with one belief—great design should do more
              than earn attention. It should earn trust.
            </p>

            <p className="mt-6 max-w-xl leading-relaxed text-white/55">
              Every project starts with understanding the problem, not rushing
              to the solution. We create digital experiences that feel
              premium, purposeful, and built to last.
            </p>


            <p className="mt-6 max-w-xl leading-relaxed text-white/55">
             <a
  href="mailto:abdullah@havelent.com"
  className="text-white/70 transition-colors duration-300 hover:text-brand-orange"
>
  abdullah@havelent.com
</a>

            </p>


            <div className="mt-10 flex flex-wrap gap-4">
<Link
  href="/#contact"
  className="group relative inline-flex overflow-hidden rounded-full bg-gradient-to-r from-brand-accent to-brand-orange px-7 py-3 font-medium text-white transition-all duration-300 hover:scale-105"
  style={{ boxShadow: '0 0 20px -4px rgba(249,115,22,0.5)' }}
>
  <span className="relative z-10">Get a Free Quote</span>

  <span className="absolute inset-0 bg-gradient-to-r from-brand-orange to-brand-red opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
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
              <div className="aspect-[4/5] overflow-hidden bg-gradient-to-b from-white/5 to-transparent">
                <img
                  src="/images/ceo-of-havelent-abdullah-rajpoot.webp"
                  alt="Abdullah Rajpoot, CEO and Founder of Havelent"
                  className="h-full w-full object-cover object-center"
                />
              </div>
            </div>
          </motion.div>

        </div>
      </section>


      {/* My Story */}
      <section className="px-6 py-24">
        <div className="mx-auto max-w-5xl">

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <span className="text-sm font-medium uppercase tracking-[0.25em] text-brand-orange">
              My Story
            </span>

            <h2 className="mt-4 font-display text-4xl font-semibold sm:text-5xl">
              Why I Built Havelent.
            </h2>

            <p className="mt-8 text-lg leading-9 text-white/60">
              I’ve always believed that creativity becomes truly powerful
              when it has a clear purpose behind it. Businesses deserve more
              than beautiful visuals. They deserve digital experiences that
              communicate clearly, inspire confidence, and create lasting value.
            </p>

            <p className="mt-6 text-lg leading-9 text-white/60">
              Havelent was created to bring that mindset into every project.
              Instead of treating design, content, branding, and technology
              as separate pieces, we look at the bigger picture and focus on
              how everything works together.
            </p>

            <p className="mt-6 text-lg leading-9 text-white/60">
              For me, Havelent is more than a digital agency. It is a place
              where ideas are turned into meaningful work through creativity,
              strategy, and thoughtful execution.
            </p>
          </motion.div>

        </div>
      </section>


      {/* Why Havelent */}
      <section className="px-6 py-24">
        <div className="mx-auto max-w-5xl">

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <span className="text-sm font-medium uppercase tracking-[0.25em] text-brand-orange">
              Why Havelent
            </span>

            <h2 className="mt-4 font-display text-4xl font-semibold sm:text-5xl">
              More Than Just Another Agency.
            </h2>

            <p className="mt-8 max-w-4xl text-lg leading-9 text-white/60">
              There are countless agencies that can deliver a design, edit a
              video, or build a website. What matters is the thinking behind
              the work.
            </p>

            <p className="mt-6 max-w-4xl text-lg leading-9 text-white/60">
              At Havelent, we focus on understanding the story, audience, and
              goals behind every project before we start creating. The result
              is work that is not only visually strong, but purposeful and
              aligned with the business behind it.
            </p>

            <p className="mt-6 max-w-4xl text-lg leading-9 text-white/60">
              Our goal is simple: create work that makes your business look
              professional, communicate with confidence, and stand apart in
              a crowded digital world.
            </p>
          </motion.div>

        </div>
      </section>


      {/* Principles */}
      <section className="px-6 pb-24">
        <div className="mx-auto max-w-7xl">

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-10"
          >
            <span className="text-sm font-medium uppercase tracking-[0.25em] text-brand-orange">
              Our Principles
            </span>

            <h2 className="mt-4 font-display text-4xl font-semibold sm:text-5xl">
              What We Stand For.
            </h2>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-3">

            {[
              {
                title: 'Transparency',
                text: 'No inflated numbers. No exaggerated promises. Just honest communication and work we can stand behind.',
              },
              {
                title: 'Quality',
                text: 'Every pixel, frame, animation, and interaction should have a purpose. Details matter because they shape the final experience.',
              },
              {
                title: 'Long-Term Partnerships',
                text: 'We don’t want to be just another service provider. We want to build relationships that continue long after launch.',
              },
            ].map((item) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
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
        </div>
      </section>


      {/* Vision */}
      <section className="px-6 py-24">
        <div className="mx-auto max-w-5xl">

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <span className="text-sm font-medium uppercase tracking-[0.25em] text-brand-orange">
              The Vision
            </span>

            <h2 className="mt-4 font-display text-4xl font-semibold sm:text-5xl">
              Building Something That Lasts.
            </h2>

            <p className="mt-8 text-lg leading-9 text-white/60">
              Havelent is still growing, and that is part of the journey.
              Every project, every client, and every challenge gives us another
              opportunity to improve what we do.
            </p>

            <p className="mt-6 text-lg leading-9 text-white/60">
              My vision is to build Havelent into a creative company known
              not only for the quality of its work, but for the thinking,
              trust, and craftsmanship behind it.
            </p>

            <p className="mt-6 text-lg leading-9 text-white/60">
              We’re not trying to become the biggest agency.
              We’re focused on becoming one that people trust.
            </p>
          </motion.div>

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
            Let’s Build Something Great Together.
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-white/60">
            Whether you’re building a brand from scratch or elevating an
            existing one, let’s turn your vision into something meaningful.
          </p>

<Link
  href="/#contact"
  className="group relative mt-10 inline-flex overflow-hidden rounded-full bg-gradient-to-r from-brand-accent to-brand-orange px-8 py-4 font-medium text-white transition-all duration-300 hover:scale-105"
  style={{ boxShadow: '0 0 20px -4px rgba(249,115,22,0.5)' }}
>
  <span className="relative z-10">Get a Free Quote</span>

  <span className="absolute inset-0 bg-gradient-to-r from-brand-orange to-brand-red opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
</Link>
        </motion.div>
      </section>

    </main>
  );
}