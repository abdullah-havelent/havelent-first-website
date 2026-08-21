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
    question: 'What does your paid advertising service include?',
    answer:
      'Our paid advertising service covers everything from campaign strategy and audience research to ad creatives, campaign setup, optimization, conversion tracking, and detailed performance reporting. We focus on delivering measurable results that help your business grow.',
  },
  {
    question: 'How do your advertising services work?',
    answer:
      'We manage the entire advertising process from start to finish. After understanding your business goals, we create a tailored strategy, launch your campaigns, continuously optimize performance, and provide transparent reports so you always know how your campaigns are performing.',
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


      {/* ========================================= */}
      {/* ORANGE SNOW — TEMPORARILY DISABLED */}
      {/* ========================================= */}

      {/*
      <div
        className="
          pointer-events-none
          absolute
          inset-0
          z-[1]
          overflow-hidden
        "
      >

        <div className="absolute inset-0 overflow-hidden">

          {Array.from({ length: 42 }, (_, i) => {

            const size = 4 + (i % 5);

            return (
              <span
                key={`large-${i}`}
                className="
                  absolute
                  top-[-40px]
                  rounded-full
                  bg-orange-200
                "
                style={{
                  left: `${(i * 67.31) % 105}%`,

                  width: `${size}px`,
                  height: `${size}px`,

                  opacity:
                    0.28 + ((i * 9) % 25) / 100,

                  filter:
                    'blur(0.25px)',

                  boxShadow: `
                    0 0 7px rgba(249,115,22,0.55),
                    0 0 18px rgba(249,115,22,0.28),
                    0 0 30px rgba(249,115,22,0.12)
                  `,

                  animationName:
                    'faqLargeSnow',

                  animationDuration: `${
                    7.5 + ((i * 17) % 55) / 10
                  }s`,

                  animationDelay: `-${(
                    (i * 0.61) % 10
                  )}s`,

                  animationTimingFunction:
                    'linear',

                  animationIterationCount:
                    'infinite',
                }}
              />
            );
          })}

        </div>


        <div className="absolute inset-0 overflow-hidden">

          {Array.from({ length: 90 }, (_, i) => {

            const glowing = i % 17 === 0;
            const size = glowing
              ? 4
              : 2 + (i % 3);

            return (
              <span
                key={`medium-${i}`}
                className="
                  absolute
                  top-[-25px]
                  rounded-full
                "
                style={{
                  left: `${(i * 47.73) % 103}%`,

                  width: `${size}px`,
                  height: `${size}px`,

                  background: glowing
                    ? 'rgba(249,115,22,0.90)'
                    : 'rgba(255,190,125,0.58)',

                  opacity: glowing
                    ? 0.60
                    : 0.18 + ((i * 17) % 28) / 100,

                  filter: glowing
                    ? 'blur(0.2px)'
                    : 'blur(0.55px)',

                  boxShadow: glowing
                    ? `
                        0 0 6px rgba(249,115,22,0.80),
                        0 0 16px rgba(249,115,22,0.45)
                      `
                    : '0 0 5px rgba(249,115,22,0.16)',

                  animationName:
                    'faqMediumSnow',

                  animationDuration: `${
                    5.5 + ((i * 23) % 55) / 10
                  }s`,

                  animationDelay: `-${(
                    (i * 0.37) % 8
                  )}s`,

                  animationTimingFunction:
                    'linear',

                  animationIterationCount:
                    'infinite',
                }}
              />
            );
          })}

        </div>


        <div className="absolute inset-0 overflow-hidden">

          {Array.from({ length: 100 }, (_, i) => (

            <span
              key={`small-${i}`}
              className="
                absolute
                top-[-15px]
                rounded-full
                bg-orange-300
              "
              style={{
                left: `${(i * 71.31) % 105}%`,

                width:
                  `${1 + (i % 2)}px`,

                height:
                  `${1 + (i % 2)}px`,

                opacity:
                  0.06 + ((i * 13) % 14) / 100,

                filter:
                  'blur(1.2px)',

                animationName:
                  'faqSmallSnow',

                animationDuration: `${
                  6 + ((i * 19) % 60) / 10
                }s`,

                animationDelay: `-${(
                  (i * 0.51) % 9
                )}s`,

                animationTimingFunction:
                  'linear',

                animationIterationCount:
                  'infinite',
              }}
            />

          ))}

        </div>


        <motion.div
          animate={{
            x: ['-8%', '8%', '-4%', '-8%'],
            opacity: [0.03, 0.08, 0.04, 0.03],
            scale: [1, 1.08, 1.02, 1],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="
            absolute
            -left-[15%]
            top-[20%]
            h-[300px]
            w-[130%]
            rounded-full
            bg-orange-400/[0.05]
            blur-[100px]
          "
        />

      </div>
      */}


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
                    className={`
                      font-display
                      text-[2.35rem]
                      md:text-[2.6rem]
                      font-semibold
                      leading-[1.08]
                      tracking-[-0.03em]
                      pr-6
                      transition-all
                      duration-500

                      ${
                        open
                          ? "text-gradient-orange"
                          : "text-white"
                      }
                    `}
                  >
                    {faq.question}
                  </h3>

                  <motion.div
                    animate={{
                      rotate: open ? 180 : 0,
                    }}
                    transition={{
                      duration: 0.25,
                    }}
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
                      initial={{
                        height: 0,
                        opacity: 0,
                      }}
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


      {/* ========================================= */}
      {/* SNOW ANIMATIONS */}
      {/* KEEPING KEYFRAMES — EFFECT IS DISABLED */}
      {/* ========================================= */}

      <style jsx>{`

        @keyframes faqLargeSnow {

          0% {
            transform:
              translate3d(0, -50px, 0)
              rotate(0deg);
          }

          20% {
            transform:
              translate3d(35px, 20vh, 0)
              rotate(55deg);
          }

          40% {
            transform:
              translate3d(-28px, 42vh, 0)
              rotate(110deg);
          }

          60% {
            transform:
              translate3d(42px, 64vh, 0)
              rotate(170deg);
          }

          80% {
            transform:
              translate3d(-30px, 86vh, 0)
              rotate(235deg);
          }

          100% {
            transform:
              translate3d(28px, 120vh, 0)
              rotate(310deg);
          }

        }


        @keyframes faqMediumSnow {

          0% {
            transform:
              translate3d(0, -35px, 0)
              rotate(0deg);
          }

          25% {
            transform:
              translate3d(-22px, 25vh, 0)
              rotate(45deg);
          }

          50% {
            transform:
              translate3d(20px, 52vh, 0)
              rotate(90deg);
          }

          75% {
            transform:
              translate3d(-16px, 78vh, 0)
              rotate(135deg);
          }

          100% {
            transform:
              translate3d(24px, 120vh, 0)
              rotate(180deg);
          }

        }


        @keyframes faqSmallSnow {

          0% {
            transform:
              translate3d(0, -25px, 0);
          }

          30% {
            transform:
              translate3d(28px, 30vh, 0);
          }

          60% {
            transform:
              translate3d(-22px, 65vh, 0);
          }

          100% {
            transform:
              translate3d(25px, 120vh, 0);
          }

        }

      `}</style>

    </section>
  );
}