'use client';

import { motion } from 'framer-motion';
import Link from "next/link";

// const STATS = [
//   { icon: Award, value: '120+', label: 'Projects shipped' },
//   { icon: Globe, value: '24', label: 'Countries served' },
//   { icon: Users, value: '40+', label: 'Specialists' },
//   { icon: Zap, value: '8 yrs', label: 'Crafting digital' },
// ];

const PRINCIPLES = [
  {
    n: "01",
    title: "No Templates.",
    body: "Every brand deserves its own identity. We don't recycle ideas—every project is crafted from the ground up to reflect your unique vision.",
  },
  {
    n: "02",
    title: "No Shortcuts.",
    body: "Quality takes time. We'd rather do it right than do it fast, because lasting work is never rushed.",
  },
  {
    n: "03",
    title: "Every Detail Matters.",
    body: "From the first impression to the final interaction, every detail is crafted with intention to create an experience people remember.",
  },
];

export default function About() {
  return (
<section
  id="about"
  className="relative bg-[#000000] px-6 pt-24 pb-52 sm:pt-32 sm:pb-72"
>
      {/* Background Outline Typography */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden z-0"
style={{
  clipPath: 'inset(0 0 0 0)',
}}
      >
        <h1
          className="
            pointer-events-auto
            absolute
            left-1/2
            top-1/2
            hidden
            -translate-x-1/2
            -translate-y-1/2
            select-none
            font-black
            uppercase
            md:flex
          "
          style={{
            fontFamily: 'Arial Black, Arial, Helvetica, sans-serif',
fontSize: "16vw",
letterSpacing: "0em",
lineHeight: 1,
whiteSpace: "nowrap",
zIndex: 20,
top: "70%",
transform: "translateX(-50%) scaleX(1)",
transformOrigin: "center center",
  textShadow: `
    0 0 2px rgba(249,115,22,0.001),
    0 0 6px rgba(249,115,22,0.000005)
  `,
}}
        >
          {"HAVELENT".split("").map((letter, index) => (
            <span
              key={`${letter}-${index}`}
              className="about-havelent-letter"
            >
              {letter}
            </span>
          ))}
        </h1>

        <style jsx>{`
          .about-havelent-letter {
            display: inline-block;
            cursor: default;

            color: transparent;

            -webkit-text-fill-color: transparent;
            -webkit-text-stroke: 1.5px rgba(249, 115, 22, 0.65);

            transition:
              -webkit-text-fill-color 0.45s ease,
              -webkit-text-stroke 0.45s ease,
              transform 0.45s ease;
          }

.about-havelent-letter:hover {
  background: linear-gradient(
    135deg,
    #9a3412 0%,
    #c2410c 35%,
    #ea6c0c 70%,
    #f97316 100%
  );

  -webkit-background-clip: text;
  background-clip: text;

  -webkit-text-fill-color: transparent;
  -webkit-text-stroke: 1.5px #c2410c;

  transform: scale(1.01);
}


        `}</style>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="grid gap-14 lg:grid-cols-12">

          {/* Left — statement */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{
              duration: 0.9,
              delay: 0.2,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="lg:col-span-5"
          >
            <span className="text-sm font-medium uppercase tracking-[0.2em] text-brand-orange">
              About Havelent
            </span>

            <h2 className="mt-4 font-display text-[clamp(2rem,4vw,3.25rem)] font-semibold leading-tight text-white">
              The Promise of{" "}
              <span className="text-gradient-orange">Havelent.</span>
            </h2>

            <p className="mt-6 max-w-md text-base leading-relaxed text-white/60">
              We don't rely on bold claims to earn your trust.
              <br />
              Transparency isn't a feature at{" "}
              <span className="font-semibold text-gradient-orange">
                Havelent
              </span>
              —it's our first rule.
            </p>

            {/* Meet the Founder */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.8,
                delay: 0.35,
              }}
              className="mt-10"
            >
              <Link
                href="/founder"
                className="group inline-flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.02] px-6 py-5 transition-all duration-300 hover:border-brand-orange/50 hover:bg-white/[0.04]"
              >
                <div>
                  <h3
                    className="
                      font-display
                      text-[clamp(1.2rem,2vw,1.6rem)]
                      font-semibold
                      leading-none
                      text-white
                      transition-all
                      duration-300
                      group-hover:scale-[1.02]
                      group-hover:bg-gradient-to-r
                      group-hover:from-[#F97316]
                      group-hover:to-[#FFB36B]
                      group-hover:bg-clip-text
                      group-hover:text-transparent
                    "
                  >
                    Meet the Founder
                  </h3>

                  <p className="mt-5 text-sm text-white/50">
                    Discover the story, vision, and values behind Havelent.
                  </p>
                </div>

                <span className="text-2xl text-brand-orange transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </Link>
            </motion.div>
          </motion.div>

          {/* Right — principles */}
          <div className="lg:col-span-6 lg:col-start-7">
            <div className="flex flex-col gap-px overflow-hidden rounded-3xl border border-white/10">
              {PRINCIPLES.map((p, i) => (
                <motion.div
                  key={p.n}
                  initial={{
                    opacity: 0,
                    y: 50,
                  }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{
                    duration: 0.8,
                    delay: 0.5 + i * 0.15,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="group relative overflow-hidden bg-white/[0.03] p-7 transition-all duration-500 hover:bg-[#21150d]"
                >
                  <div className="pointer-events-none absolute left-0 top-0 h-full w-72 bg-[radial-gradient(circle_at_left,rgba(249,115,22,0.22),transparent_72%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                  <div className="flex items-start gap-6">
                    <span className="font-display text-sm text-brand-orange/70">
                      {p.n}
                    </span>

                    <div>
                      <h3 className="font-display text-xl font-semibold text-gradient-orange">
                        {p.title}
                      </h3>

<p className="mt-2 text-sm leading-relaxed font-normal text-white/60">
  {p.body}
</p>
                    </div>
                  </div>

                  <span className="absolute bottom-0 left-0 h-px w-0 bg-gradient-to-r from-brand-accent to-brand-orange transition-all duration-500 group-hover:w-full" />
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}