'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';

const projects = [
  {
    title: 'Luxury Brand Website',
    category: 'Web Design',
    image: '/images/work/1.webp',
  },
  {
    title: 'YouTube Documentary',
    category: 'Video Editing',
    image: '/images/work/2.webp',
  },
  {
    title: 'Restaurant Branding',
    category: 'Graphic Design',
    image: '/images/work/3.webp',
  },
  {
    title: 'Fashion Campaign',
    category: 'Social Media',
    image: '/images/work/4.webp',
  },
];

export default function OurWork() {
  return (
    <section className="relative overflow-hidden bg-brand-dark px-6 py-32">

      {/* Background Glow */}
      <div className="pointer-events-none absolute -left-40 top-20 h-[420px] w-[420px] rounded-full bg-orange-500/10 blur-[140px]" />
      <div className="pointer-events-none absolute -right-52 bottom-0 h-[550px] w-[550px] rounded-full bg-orange-500/15 blur-[180px]" />

      <div className="relative z-10 mx-auto max-w-7xl">

        {/* Hero */}

        <motion.div
          initial={{
            opacity:0,
            y:40,
            filter:'blur(8px)'
          }}
          whileInView={{
            opacity:1,
            y:0,
            filter:'blur(0px)'
          }}
          viewport={{once:true}}
          transition={{duration:.8}}
          className="mx-auto max-w-3xl text-center"
        >

          <span className="inline-flex rounded-full border border-brand-orange/30 bg-brand-orange/10 px-5 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-brand-orange">
            Portfolio
          </span>

          <h1 className="mt-8 font-display text-[clamp(3rem,7vw,6rem)] font-semibold leading-none text-white">
            Our{' '}
            <span className="text-gradient-orange">
              Work
            </span>
          </h1>

          <p className="mx-auto mt-8 max-w-2xl text-lg leading-8 text-white/60">
            A curated collection of premium websites,
            cinematic edits and digital experiences
            crafted to help brands stand out.
          </p>

        </motion.div>

        {/* Featured Project */}

        <motion.div
          initial={{
            opacity:0,
            y:60,
            filter:'blur(8px)'
          }}
          whileInView={{
            opacity:1,
            y:0,
            filter:'blur(0px)'
          }}
          viewport={{once:true}}
          transition={{
            duration:.9,
            delay:.2
          }}
          className="group relative mt-24 overflow-hidden rounded-[36px] border border-white/10"
        >

          <div className="relative aspect-[16/8] overflow-hidden">

            <Image
              src="/images/work/featured.webp"
              alt="Featured Project"
              fill
              className="object-cover transition duration-700 group-hover:scale-105"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

            <div className="absolute bottom-0 left-0 p-12">

              <span className="text-sm uppercase tracking-[0.3em] text-brand-orange">
                Featured Project
              </span>

              <h2 className="mt-4 max-w-xl font-display text-5xl font-semibold text-white">
                Building unforgettable digital experiences.
              </h2>

              <Link
                href="#"
                className="mt-8 inline-flex items-center gap-2 text-white transition hover:text-brand-orange"
              >
                View Case Study

                <ArrowUpRight
                  size={18}
                  className="transition group-hover:translate-x-1 group-hover:-translate-y-1"
                />
              </Link>

            </div>

          </div>

        </motion.div>

        {/* Projects Grid */}

        <div className="mt-24 grid gap-8 md:grid-cols-2">
                    {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{
                opacity: 0,
                y: 50,
                filter: 'blur(8px)',
              }}
              whileInView={{
                opacity: 1,
                y: 0,
                filter: 'blur(0px)',
              }}
              viewport={{ once: true }}
              transition={{
                duration: 0.7,
                delay: index * 0.12,
              }}
              className="group overflow-hidden rounded-[30px] border border-white/10 bg-white/[0.03] transition-all duration-500 hover:-translate-y-2 hover:border-brand-orange/40 hover:shadow-[0_20px_60px_rgba(249,115,22,0.18)]"
            >
              <div className="relative aspect-[4/3] overflow-hidden">

                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transition duration-700 group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />

              </div>

              <div className="p-8">

                <span className="text-xs uppercase tracking-[0.3em] text-brand-orange">
                  {project.category}
                </span>

                <h3 className="mt-3 text-3xl font-display font-semibold text-white">
                  {project.title}
                </h3>

                <p className="mt-4 leading-7 text-white/60">
                  Crafted with strategy, creativity and attention to every
                  detail to deliver a premium digital experience.
                </p>

                <Link
                  href="#"
                  className="mt-8 inline-flex items-center gap-2 text-white transition hover:text-brand-orange"
                >
                  View Project

                  <ArrowUpRight
                    size={18}
                    className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                  />
                </Link>

              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}

        <motion.div
          initial={{
            opacity: 0,
            y: 50,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{ once: true }}
          transition={{
            duration: 0.8,
          }}
          className="mt-32 rounded-[36px] border border-white/10 bg-white/[0.03] px-10 py-20 text-center"
        >

          <span className="text-xs uppercase tracking-[0.35em] text-brand-orange">
            Let's Create
          </span>

          <h2 className="mx-auto mt-6 max-w-3xl font-display text-5xl font-semibold text-white">
            Ready to build something extraordinary together?
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-white/60">
            Whether you're launching a new brand or elevating an existing one,
            we're here to craft experiences that leave a lasting impression.
          </p>

          <Link
            href="/#contact"
            className="mt-10 inline-flex items-center rounded-full bg-brand-orange px-8 py-4 text-sm font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_rgba(249,115,22,0.45)]"
          >
            Start Your Project
          </Link>

        </motion.div>

      </div>
    </section>
  );
}  