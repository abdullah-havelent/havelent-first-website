'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Minus, Plus } from 'lucide-react';

const faqs = [
  { question: 'What services do you offer?', answer: 'We provide professional Video Editing, Graphic Design, Digital Marketing, Social Media Management, and Web Design & Development services tailored to help brands grow.' },
  { question: 'How long does a project take?', answer: 'Project timelines depend on the service, scope, and complexity. Most creative projects are completed within 1–4 weeks. A complete website typically takes at least 1 month, while larger websites with custom features can take 2 months or more. Contact us for a timeline tailored to your project.' },
  { question: 'How much does a project cost?', answer: 'Every project is unique, so pricing is customized based on your goals and requirements. Contact us for a free quote.' },
  { question: 'Do you work with international clients?', answer: 'Yes. We work remotely with businesses and creators worldwide, ensuring smooth communication throughout the project.' },
  { question: 'How do we get started?', answer: 'Simply contact us through our website. We’ll discuss your project, understand your goals, and recommend the best solution.' },
  { question: 'Do you offer revisions?', answer: 'Absolutely. Every project includes revisions to make sure the final result matches your expectations.' },
  { question: 'What does your paid advertising service include?', answer: 'Our paid advertising service covers everything from campaign strategy and audience research to ad creatives, campaign setup, optimization, conversion tracking, and detailed performance reporting. We focus on delivering measurable results that help your business grow.' },
  { question: 'How do your advertising services work?', answer: 'We manage the entire advertising process from start to finish. After understanding your business goals, we create a tailored strategy, launch your campaigns, continuously optimize performance, and provide transparent reports so you always know how your campaigns are performing.' },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <section id="faq" className="relative overflow-hidden bg-[#050505] px-6 py-24 md:py-32">
      <div className="bg-grid pointer-events-none absolute inset-0 opacity-[0.045]" />
      <div className="pointer-events-none absolute -left-52 top-24 h-[580px] w-[580px] rounded-full bg-brand-orange/[0.12] blur-[160px]" />
      <div className="pointer-events-none absolute -right-48 bottom-0 h-[420px] w-[420px] rounded-full bg-brand-orange/[0.07] blur-[140px]" />

      <div className="relative mx-auto max-w-7xl">
        <div className="grid gap-14 lg:grid-cols-[0.78fr_1.22fr] lg:gap-24">
          <motion.div
            initial={isMobile ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
            animate={isMobile ? { opacity: 1, y: 0 } : undefined}
            whileInView={isMobile ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={isMobile ? { duration: 0 } : { duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="lg:sticky lg:top-32 lg:self-start"
          >
            <div className="flex items-center gap-4">
              <span className="h-px w-10 bg-brand-orange" />
              <span className="text-xs font-medium uppercase tracking-[0.3em] text-brand-orange">FAQ</span>
            </div>
            <h2 className="mt-6 max-w-lg font-display text-4xl font-semibold leading-[1.05] text-white md:text-5xl lg:text-6xl">
              Frequently Asked{' '}
              <span className="text-gradient-orange">Questions About Havelent.</span>
            </h2>
            <p className="mt-6 max-w-md text-base leading-8 text-white/50 md:text-lg">
              Clear answers about starting a project, working together, and what to expect from Havelent.
            </p>
            <div className="mt-9 inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.025] px-4 py-2.5">
              <span className="h-2 w-2 rounded-full bg-brand-orange shadow-[0_0_12px_rgba(249,115,22,0.7)]" />
              <span className="text-xs uppercase tracking-[0.18em] text-white/45">{faqs.length} common questions</span>
            </div>
          </motion.div>

          <div className="border-t border-white/10">
            {faqs.map((faq, index) => {
              const open = openIndex === index;
              const answerId = `faq-answer-${index}`;

              return (
                <motion.article
                  key={faq.question}
                  layout
                  initial={isMobile ? { opacity: 1, x: 0 } : { opacity: 0, x: 28 }}
                  animate={isMobile ? { opacity: 1, x: 0 } : undefined}
                  whileInView={isMobile ? undefined : { opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={isMobile ? { duration: 0 } : { duration: 0.5, delay: index * 0.045, ease: [0.22, 1, 0.36, 1] }}
                  className={`group relative border-b border-white/10 transition-colors duration-500 ${open ? 'bg-white/[0.025]' : 'hover:bg-white/[0.015]'}`}
                >
                  <div className={`absolute left-0 top-0 h-full w-px bg-brand-orange transition-transform duration-500 ${open ? 'scale-y-100' : 'scale-y-0 group-hover:scale-y-100'}`} />
                  <button type="button" onClick={() => setOpenIndex(open ? null : index)} aria-expanded={open} aria-controls={answerId} className="flex w-full items-center gap-4 px-1 py-7 text-left sm:gap-7 sm:px-6 md:py-8">
                    <span className="w-8 shrink-0 font-display text-xs tracking-[0.16em] text-brand-orange/75">{String(index + 1).padStart(2, '0')}</span>
                    <h3 className={`flex-1 font-display text-xl font-semibold leading-tight transition-colors duration-300 md:text-2xl ${open ? 'text-brand-orange' : 'text-white'}`}>{faq.question}</h3>
                    <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.25 }} className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border transition-colors duration-300 ${open ? 'border-brand-orange/50 bg-brand-orange/10 text-brand-orange' : 'border-white/10 text-white/60 group-hover:border-brand-orange/35 group-hover:text-brand-orange'}`}>
                      {open ? <Minus size={18} /> : <Plus size={18} />}
                    </motion.span>
                  </button>
                  <AnimatePresence initial={false}>
                    {open && (
                      <motion.div id={answerId} initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }} className="overflow-hidden">
                        <div className="pb-8 pl-12 pr-4 sm:pl-[5.25rem] sm:pr-16 md:pb-9">
                          <div className="h-px bg-gradient-to-r from-brand-orange/50 to-transparent" />
                          <p className="mt-6 max-w-2xl text-sm leading-7 text-white/55 md:text-base md:leading-8">{faq.answer}</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
