'use client';

import ServiceWhyChooseIntro from './ServiceWhyChooseIntro';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const BENEFITS = [
  {
    number: '01',
    title: 'Story-Driven Editing',
    description:
      'We shape your footage into a clear and engaging story that keeps viewers interested from the opening frame to the final moment.',
  },
  {
    number: '02',
    title: 'Strong Visual Pacing',
    description:
      'We carefully control cuts, timing, transitions, and rhythm to create a smooth viewing experience that holds attention.',
  },
  {
    number: '03',
    title: 'Cinematic Visual Quality',
    description:
      'From color grading and visual effects to composition and motion, every detail is refined to give your video a polished professional finish.',
  },
  {
    number: '04',
    title: 'Editing for Every Platform',
    description:
      'We adapt videos for YouTube, social media, advertising, and digital platforms while keeping the content visually strong and platform-ready.',
  },
  {
    number: '05',
    title: 'Detail-Driven Execution',
    description:
      'We refine every cut, sound detail, transition, graphic, and visual element to make sure the final video feels intentional and professionally crafted.',
  },
  {
    number: '06',
    title: 'A Creative Partner',
    description:
      'We work closely with brands and creators to provide reliable, consistent, and high-quality video editing support for ongoing content.',
  },
];

export default function VideoEditingWhyChoose() {
  const [isMobile, setIsMobile] = useState<boolean | null>(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 767px)');

    const handleChange = () => {
      setIsMobile(mediaQuery.matches);
    };

    handleChange();

    mediaQuery.addEventListener('change', handleChange);

    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, []);

  const ContactCTA = () => (
    <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.025] p-7 md:p-8">

      <div className="pointer-events-none absolute -right-20 -top-20 h-40 w-40 rounded-full bg-brand-orange/[0.08] blur-3xl" />

      <div className="relative">

        <span className="text-[10px] font-medium uppercase tracking-[0.28em] text-brand-orange">
          Start a Project
        </span>

        <h3 className="mt-4 max-w-xs font-display text-2xl font-semibold leading-tight text-white">
          Have a video project in mind?
        </h3>

        <p className="mt-4 max-w-sm text-sm leading-6 text-white/40">
          Let&apos;s turn your footage into a polished and engaging video that
          gives your content a stronger visual presence.
        </p>

        <button
          type="button"
          onClick={() => {
            document
              .getElementById('contact')
              ?.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
              });
          }}
          className="mt-7 inline-flex items-center gap-3 rounded-full border border-brand-orange/30 bg-brand-orange/[0.08] px-5 py-3 text-xs font-medium uppercase tracking-[0.16em] text-brand-orange transition-colors duration-300 md:hover:border-brand-orange/60 md:hover:bg-brand-orange md:hover:text-white"
        >
          <span>Contact Us</span>
          <span>→</span>
        </button>

      </div>
    </div>
  );

  return (
    <section className="relative overflow-hidden px-6 py-28 md:py-36">

      {/* ================================================= */}
      {/* AMBIENT BACKGROUND */}
      {/* ================================================= */}

      <div className="pointer-events-none absolute -left-40 top-1/3 h-[500px] w-[500px] rounded-full bg-brand-orange/[0.05] blur-[160px]" />

      <div className="pointer-events-none absolute -right-60 bottom-0 h-[500px] w-[500px] rounded-full bg-brand-red/[0.04] blur-[180px]" />


      <div className="mx-auto max-w-7xl">


        {/* ================================================= */}
        {/* SECTION LABEL */}
        {/* ================================================= */}

        <div className="mb-20 flex items-center gap-4">

          <span className="h-px w-10 bg-brand-orange" />

          <span className="text-xs font-medium uppercase tracking-[0.3em] text-brand-orange">
            Why Choose Havelent
          </span>

        </div>


        {/* ================================================= */}
        {/* MAIN GRID */}
        {/* ================================================= */}

        <div className="grid gap-16 lg:grid-cols-[0.82fr_1.5fr] lg:gap-24">


          {/* ================================================= */}
          {/* LEFT SIDE */}
          {/* ================================================= */}

          <div className="relative">

            <ServiceWhyChooseIntro title="Video With" accent="Purpose." description="Strong video editing turns your footage into a clear story that holds attention and strengthens your brand." related={[{"href":"/services/social-media-management","label":"Social Media Management"},{"href":"/services/digital-marketing","label":"Digital Marketing services"}]} />
          </div>


          {/* ================================================= */}
          {/* RIGHT SIDE — BENEFITS */}
          {/* ================================================= */}

          <div className="border-t border-white/10">

            {BENEFITS.map((benefit, index) => {

              /* ================================================= */
              /* MOBILE — COMPLETELY STATIC */
              /* ================================================= */

              if (isMobile === true) {
                return (
                  <article
                    key={benefit.number}
                    className="relative border-b border-white/10 py-9"
                  >

                    <div className="flex gap-6 pl-2">

                      <div className="relative w-10 shrink-0">

                        <span className="font-display text-xs tracking-[0.2em] text-brand-orange/70">
                          {benefit.number}
                        </span>

                        <span className="pointer-events-none absolute -left-2 -top-8 select-none font-display text-7xl font-semibold leading-none text-white/[0.025]">
                          {benefit.number}
                        </span>

                      </div>


                      <div className="flex-1">

                        <h3 className="max-w-sm font-display text-2xl font-semibold leading-tight text-white">
                          {benefit.title}
                        </h3>

                        <p className="mt-5 max-w-2xl text-sm leading-7 text-white/40">
                          {benefit.description}
                        </p>

                        <div className="mt-7 h-px w-12 bg-white/10" />

                      </div>

                    </div>

                  </article>
                );
              }


              /* ================================================= */
              /* DESKTOP — MOTION */
              /* ================================================= */

              return (
                <motion.article
                  key={benefit.number}
                  initial={{
                    opacity: 0,
                    x: 35,
                  }}
                  whileInView={{
                    opacity: 1,
                    x: 0,
                  }}
                  viewport={{
                    once: true,
                    amount: 0.2,
                  }}
                  transition={{
                    duration: 0.7,
                    delay: index * 0.08,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="group relative border-b border-white/10 py-9 md:py-11"
                >

                  {/* Desktop Accent */}

                  <div className="absolute left-0 top-0 h-full w-px origin-top scale-y-0 bg-brand-orange transition-transform duration-500 group-hover:scale-y-100" />


                  <div className="relative flex gap-6 pl-5 md:gap-10 md:pl-8">


                    {/* Number */}

                    <div className="relative w-10 shrink-0">

                      <span className="font-display text-xs tracking-[0.2em] text-brand-orange/70">
                        {benefit.number}
                      </span>

                      <span className="pointer-events-none absolute -left-2 -top-8 select-none font-display text-7xl font-semibold leading-none text-white/[0.025] transition-all duration-500 group-hover:text-brand-orange/[0.06]">
                        {benefit.number}
                      </span>

                    </div>


                    {/* Content */}

                    <div className="flex-1">

                      <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between md:gap-10">

                        <h3 className="max-w-sm font-display text-2xl font-semibold leading-tight text-white transition-transform duration-500 group-hover:translate-x-1 md:text-3xl">
                          {benefit.title}
                        </h3>

                        <span className="hidden shrink-0 pt-2 text-xs uppercase tracking-[0.2em] text-white/20 transition-colors duration-500 group-hover:text-brand-orange/70 md:block">
                          0{index + 1}
                        </span>

                      </div>


                      <p className="mt-5 max-w-2xl text-sm leading-7 text-white/40 transition-colors duration-500 group-hover:text-white/60 md:text-base">
                        {benefit.description}
                      </p>


                      {/* Progress Line */}

                      <div className="mt-7 h-px w-12 overflow-hidden bg-white/10 transition-all duration-500 group-hover:w-24">

                        <div className="h-full w-full origin-left scale-x-0 bg-brand-orange transition-transform duration-500 group-hover:scale-x-100" />

                      </div>

                    </div>

                  </div>

                </motion.article>
              );
            })}


            {/* ================================================= */}
            {/* MOBILE CONTACT — ALWAYS LAST */}
            {/* ================================================= */}

            <div className="mt-12 md:hidden">
              <ContactCTA />
            </div>

          </div>

        </div>
      </div>

    </section>
  );
}