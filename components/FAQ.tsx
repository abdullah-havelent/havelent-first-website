'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

const faqs = [
  {
    question: 'What services do you offer?',
    answer:
      'We specialize in Video Editing, Branding, Motion Graphics, and Digital Solutions tailored to help businesses grow.',
  },
  {
    question: 'How long does a project take?',
    answer:
      'Project timelines depend on the scope and complexity. Most projects are completed within 1–4 weeks.',
  },
  {
    question: 'How much does a project cost?',
    answer:
      'Every project is unique, so pricing is customized based on your goals and requirements. Contact us for a free quote.',
  },
  {
    question: 'Do you work with international clients?',
    answer:
      'Yes. We work remotely with businesses and creators worldwide, ensuring smooth communication throughout the project.',
  },
  {
    question: 'How do we get started?',
    answer:
      'Simply contact us through our website. We’ll discuss your project, understand your goals, and recommend the best solution.',
  },
  {
    question: 'Do you offer revisions?',
    answer:
      'Absolutely. Every project includes revisions to make sure the final result matches your expectations.',
  },
  {
  question: "What does your paid advertising service include?",
  answer:
    "Our paid advertising service covers everything from campaign strategy and audience research to ad creatives, campaign setup, optimization, conversion tracking, and detailed performance reporting. We focus on delivering measurable results that help your business grow.",
},
{
  question: "How do your advertising services work?",
  answer:
    "We manage the entire advertising process from start to finish. After understanding your business goals, we create a tailored strategy, launch your campaigns, continuously optimize performance, and provide transparent reports so you always know how your campaigns are performing.",
},
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section
      id="faq"
      className="relative py-28 px-6 bg-[#050505] overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none overflow-hidden">

  <div
    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
               w-[1400px] h-[1400px]
               rounded-full blur-[220px] opacity-100"
    style={{
      background:
        "radial-gradient(circle, rgba(249,115,22,0.40) 0%, rgba(249,115,22,0.12) 45%, transparent 75%)",
    }}
  />

</div>

<div className="relative max-w-5xl mx-auto">

        <div className="text-center mb-14">
          <p className="text-orange-500 uppercase tracking-[0.35em] text-sm font-semibold mb-4">
            FAQ
          </p>

          <h2 className="text-4xl md:text-5xl font-bold text-white">
            Frequently Asked
            <span className="text-orange-500"> Questions</span>
          </h2>

          <p className="text-gray-400 mt-5 max-w-2xl mx-auto leading-8">
            Everything you need to know before starting your project with
            Havelent.
          </p>
        </div>

        <div className="space-y-5">
          {faqs.map((faq, index) => {
            const open = openIndex === index;

            return (
              <motion.div
                key={faq.question}
                layout
                transition={{ duration: 0.35 }}
                className={`
group
relative
overflow-hidden
rounded-3xl
border
transition-all
duration-500
bg-white/[0.03]

${
  open
    ? "border-orange-500/35"
    : "border-white/10 hover:border-orange-500/30"
}
`}
              >

<div
  className={`
absolute
bottom-0
left-0
right-0
h-[160px]
pointer-events-none
transition-opacity
duration-500

${
  open
    ? "opacity-100"
    : "opacity-0 group-hover:opacity-100"
}
`}
style={{
  background:
    "linear-gradient(to top, rgba(249,115,22,.22) 0%, rgba(249,115,22,.08) 40%, transparent 100%)",
  filter: "blur(70px)",
}}
/>



                <button
                  onClick={() =>
                    setOpenIndex(open ? null : index)
                  }
                  className="w-full flex items-center justify-between px-8 py-7 text-left"
                >
<h3
  className={
    `font-playfair
    text-[2rem]
    md:text-[1.55rem]
    font-bold
    leading-[1.15]
    tracking-[-0.02em]
    pr-6
    transition-all
    duration-500 ${
open
  ? "bg-[linear-gradient(90deg,#F47A20_0%,#F35B1F_55%,#D94841_100%)] bg-clip-text text-transparent"
  : "text-white"
    }`
  }
>
  {faq.question}
</h3>
                  <motion.div
                    animate={{ rotate: open ? 180 : 0 }}
                    transition={{ duration: 0.25 }}
                    className="text-orange-500 flex-shrink-0"
                  >
                    {open ? (
                      <Minus size={24} />
                    ) : (
                      <Plus size={24} />
                    )}
                  </motion.div>
                </button>

                <AnimatePresence initial={false}>
                  {open && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{
                        height: 'auto',
                        opacity: 1,
                      }}
                      exit={{
                        height: 0,
                        opacity: 0,
                      }}
                      transition={{
                        duration: 0.35,
                        ease: 'easeInOut',
                      }}
                    >
                      <div className="px-8 pb-8">
                        <div className="h-px bg-white/10 mb-6" />

<p
  className="
    font-inter
    text-[#CFCFCF]
    text-[18px]
    md:text-[19px]
    leading-[2]
    font-normal
    tracking-[0.02em]
  "
>
                          {faq.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}