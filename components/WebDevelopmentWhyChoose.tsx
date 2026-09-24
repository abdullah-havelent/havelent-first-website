'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';

const BENEFITS = [
  { number: '01', title: 'Strategy Before Screens', description: 'The website starts with a clear understanding of your offer, audience, and the action you want visitors to take.' },
  { number: '02', title: 'Premium Visual Direction', description: 'Every layout, type choice, and visual detail is considered as part of a polished brand experience.' },
  { number: '03', title: 'Responsive by Design', description: 'Desktop, tablet, and mobile are planned as connected parts of the same clear user experience.' },
  { number: '04', title: 'Built With Long-Term Clarity', description: 'Clean structure and performance-conscious decisions create a strong foundation for future content and search visibility.' },
];

export default function WebDevelopmentWhyChoose() {
  const router = useRouter();

  function goToContact() {
    router.push('#contact');
    setTimeout(() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 500);
  }

  return (
    <section className="relative overflow-hidden px-6 py-28 md:py-36">
      <div className="pointer-events-none absolute -left-40 top-1/3 h-[500px] w-[500px] rounded-full bg-brand-orange/[0.06] blur-[160px]" />
      <div className="mx-auto max-w-7xl">
        <div className="mb-20 flex items-center gap-4">
          <span className="h-px w-10 bg-brand-orange" />
          <span className="text-xs font-medium uppercase tracking-[0.3em] text-brand-orange">Why Choose Havelent</span>
        </div>

        <div className="grid gap-16 lg:grid-cols-[0.8fr_1.5fr] lg:gap-24">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <p className="text-sm uppercase tracking-[0.25em] text-white/30">The Havelent Standard</p>
            <h2 className="mt-5 max-w-md font-display text-5xl font-semibold leading-[1.05] text-white md:text-6xl lg:text-7xl">
              Websites With{' '}
              <span className="text-gradient-orange">Intention.</span>
            </h2>
            <p className="mt-7 max-w-md text-base leading-8 text-white/45 md:text-lg">
              A strong website should make your brand easier to understand, easier to trust, and easier to choose.
            </p>
            <p className="mt-6 max-w-md text-sm leading-7 text-white/40">
              Pair your new website with{' '}
              <Link href="/services/graphic-design" className="text-white/70 underline decoration-brand-orange/60 underline-offset-4 transition-colors hover:text-brand-orange">
                Graphic Design services
              </Link>{' '}
              or a focused{' '}
              <Link href="/services/digital-marketing" className="text-white/70 underline decoration-brand-orange/60 underline-offset-4 transition-colors hover:text-brand-orange">
                Digital Marketing strategy
              </Link>{' '}
              when those capabilities support the wider project.
            </p>
            <motion.button
              type="button"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={goToContact}
              className="group mt-10 inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-3 text-sm font-medium text-white transition-colors hover:border-brand-orange hover:text-brand-orange"
            >
              Discuss Your Project
              <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
            </motion.button>
          </div>

          <div className="border-t border-white/10">
            {BENEFITS.map((benefit, index) => (
              <motion.article
                key={benefit.number}
                initial={{ opacity: 0, x: 35 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.65, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
                className="group relative border-b border-white/10 py-9 md:py-11"
              >
                <div className="absolute left-0 top-0 h-full w-px origin-top bg-brand-orange transition-transform duration-500 md:scale-y-0 md:group-hover:scale-y-100" />
                <div className="relative flex gap-6 pl-2 md:gap-10 md:pl-8">
                  <div className="relative w-10 shrink-0">
                    <span className="font-display text-xs tracking-[0.2em] text-brand-orange/70">{benefit.number}</span>
                    <span className="pointer-events-none absolute -left-2 -top-8 select-none font-display text-7xl font-semibold leading-none text-white/[0.025] md:transition-colors md:duration-500 md:group-hover:text-brand-orange/[0.06]">{benefit.number}</span>
                  </div>
                  <div>
                    <h3 className="max-w-sm font-display text-2xl font-semibold leading-tight text-white md:text-3xl">{benefit.title}</h3>
                    <p className="mt-5 max-w-2xl text-sm leading-7 text-white/45 md:text-base">{benefit.description}</p>
                    <div className="mt-7 h-px w-12 bg-white/10 transition-all duration-500 md:group-hover:w-24" />
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
