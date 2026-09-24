'use client';

import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState, type PointerEvent } from 'react';
import BlogThumbnail from './BlogThumbnail';

const tiltBlogCard = (event: PointerEvent<HTMLAnchorElement>) => {
  if (
    event.pointerType !== 'mouse' ||
    !window.matchMedia(
      '(min-width: 768px) and (hover: hover) and (prefers-reduced-motion: no-preference)'
    ).matches
  ) {
    return;
  }

  const card = event.currentTarget;
  const rect = card.getBoundingClientRect();
  const x = (event.clientX - rect.left) / rect.width - 0.5;
  const y = (event.clientY - rect.top) / rect.height - 0.5;

  card.style.transition =
    'transform 90ms cubic-bezier(0.22, 1, 0.36, 1), border-color 300ms ease, box-shadow 300ms ease';
  card.style.transform =
    `perspective(950px) rotateX(${-y * 13}deg) rotateY(${x * 15}deg) translateY(-7px) scale3d(1.025, 1.025, 1.025)`;
};

const resetBlogCard = (card: HTMLAnchorElement) => {
  card.style.transition =
    'transform 420ms cubic-bezier(0.22, 1, 0.36, 1), border-color 300ms ease, box-shadow 300ms ease';
  card.style.transform =
    'perspective(1100px) rotateX(0deg) rotateY(0deg) translateY(0) scale3d(1, 1, 1)';
};

const FEATURED_INSIGHTS = [
  {
    category: 'Video Editing',
    title: 'How Better Editing Keeps Viewers Watching',
    href: '/blog/video-editing',
    type: 'video' as const,
  },
  {
    category: 'Graphic Design',
    title: 'What Makes a Brand Identity Feel Memorable',
    href: '/blog/graphic-design',
    type: 'design' as const,
  },
  {
    category: 'Digital Marketing',
    title: 'How to Build Campaigns That Create Measurable Growth',
    href: '/blog/digital-marketing',
    type: 'marketing' as const,
  },
  {
    category: 'Social Media Management',
    title: 'Why Consistency Is the Foundation of Social Growth',
    href: '/blog/social-media-management',
    type: 'social' as const,
  },
  {
    category: 'Web Development',
    title: 'What Makes a Website Effective for Modern Brands',
    href: '/blog/web-development',
    type: 'web' as const,
  },
];

export default function Blog() {
  const [isMobile, setIsMobile] = useState(
    () =>
      typeof window !== 'undefined' &&
      window.innerWidth < 768
  );

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  return (
    <section
      id="blog"
      className="
        relative
        overflow-hidden
        px-6
        py-28
        scroll-mt-28
      "
    >
      {/* Ambient Glow */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          -right-40
          top-10
          h-96
          w-96
          rounded-full
          bg-brand-orange/10
          blur-[150px]
        "
      />

      <div className="relative mx-auto max-w-7xl min-[1600px]:max-w-[96rem]">

        {/* HEADER */}
        <motion.div
          initial={isMobile ? false : { opacity: 0, y: 20 }}
          whileInView={isMobile ? undefined : { opacity: 1, y: 0 }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 0.7,
          }}
          className="max-w-2xl min-[1600px]:ml-32"
        >
          <span
            className="
              text-xs
              font-medium
              uppercase
              tracking-[0.2em]
              text-brand-orange
            "
          >
            Havelent Insights
          </span>

          <h2
            className="
              mt-4
              font-display
              text-4xl
              font-semibold
              leading-tight
              text-white
              md:text-5xl
            "
          >
            Ideas, Insights &
            <span className="text-brand-orange">
              {' '}Digital Expertise.
            </span>
          </h2>

          <p
            className="
              mt-5
              max-w-xl
              text-base
              leading-relaxed
              text-white/50
            "
          >
            Explore practical insights on video editing,
            graphic design, digital marketing, social media
            management, and web development.
          </p>
        </motion.div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 xl:grid-cols-4 min-[1600px]:grid-cols-5">
          {FEATURED_INSIGHTS.map((insight, index) => (
            <motion.div
              key={insight.category}
              className="h-full"
              initial={isMobile ? false : { opacity: 0, y: 24 }}
              whileInView={
                isMobile ? undefined : { opacity: 1, y: 0 }
              }
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.55, delay: index * 0.1 }}
            >
              <Link
                href={insight.href}
                data-cursor="button"
                onPointerMove={tiltBlogCard}
                onPointerLeave={(event) => resetBlogCard(event.currentTarget)}
                onPointerCancel={(event) => resetBlogCard(event.currentTarget)}
                onBlur={(event) => resetBlogCard(event.currentTarget)}
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] md:will-change-transform md:hover:border-brand-orange/50 md:hover:shadow-[0_24px_65px_rgba(249,115,22,0.18)]"
              >
                <BlogThumbnail type={insight.type} />

                <div className="flex flex-1 flex-col p-5 sm:p-6">
                  <span className="text-xs font-medium uppercase tracking-[0.16em] text-brand-orange">
                    {insight.category}
                  </span>
                  <h3 className="mt-3 font-display text-2xl font-semibold leading-tight text-white md:transition-colors md:duration-300 md:group-hover:text-brand-orange">
                    {insight.title}
                  </h3>
                  <span className="mt-auto inline-flex items-center gap-2 pt-5 text-sm text-white/55 md:transition-colors md:duration-300 md:group-hover:text-white">
                    Read insight
                    <ArrowUpRight
                      size={16}
                      className="md:transition-transform md:duration-300 md:group-hover:-translate-y-0.5 md:group-hover:translate-x-0.5"
                    />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* VIEW ALL BLOGS */}
        <motion.div
          initial={isMobile ? false : { opacity: 0, y: 15 }}
          whileInView={isMobile ? undefined : { opacity: 1, y: 0 }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 0.7,
            delay: 0.15,
          }}
          className="mt-8 min-[1600px]:ml-32"
        >
          <Link
            href="/blog"
            data-cursor="button"
            className="
              group
              inline-flex
              items-center
              gap-2
              rounded-full
              border
              border-white/10
              bg-white/5
              px-5
              py-2.5
              text-sm
              font-medium
              text-white
              md:transition-all
              md:duration-300
              md:hover:border-brand-orange/40
              md:hover:text-brand-orange
            "
          >
            Explore Our Blog

            <ArrowUpRight
              size={16}
              className="
                md:transition-transform
                md:duration-300
                md:group-hover:-translate-y-0.5
                md:group-hover:translate-x-0.5
              "
            />
          </Link>
        </motion.div>

      </div>
    </section>
  );
}
