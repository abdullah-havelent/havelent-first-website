'use client';

import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from 'framer-motion';

import {
  ArrowRight,
  Sparkles,
} from 'lucide-react';

import Link from 'next/link';
import React from 'react';

import Marquee from '@/components/Marquee';
import RotatingTriangle from '@/components/RotatingTriangle';
import RotatingSquare from '@/components/RotatingSquare';


// ==========================================
// HERO HEADING
// ==========================================

const headingWords = [
  { text: 'Your', color: 'white' },
  { text: 'Vision,', color: 'gradient' },
  { text: 'Our', color: 'white' },
  { text: 'Responsibility.', color: 'gradient' },
];


// ==========================================
// LIVE COUNTER SETTINGS
// ==========================================

const TOTAL_LOOPS = 100;
const NUMBERS_PER_LOOP = 10;
const CHANGE_INTERVAL = 2000;

const STORAGE_KEY = 'havelent_live_counter_v3';


// ==========================================
// GENERATE RANDOM NUMBER
// ==========================================

function generateNumber(): number {
  return Math.floor(Math.random() * 875) + 8;
}


// ==========================================
// SHUFFLE ARRAY
// ==========================================

function shuffleArray<T>(array: T[]): T[] {
  const copy = [...array];

  for (let i = copy.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1));

    [copy[i], copy[randomIndex]] = [
      copy[randomIndex],
      copy[i],
    ];
  }

  return copy;
}


// ==========================================
// GENERATE ONE LOOP
// ==========================================

function generateLoop(): number[] {
  const numbers: number[] = [];

  while (numbers.length < NUMBERS_PER_LOOP) {
    const number = generateNumber();

    if (!numbers.includes(number)) {
      numbers.push(number);
    }
  }

  // Extra shuffle so every loop has a random order
  return shuffleArray(numbers);
}


// ==========================================
// GENERATE 100 LOOPS
// ==========================================

function generateAllLoops(): number[][] {
  return Array.from(
    { length: TOTAL_LOOPS },
    () => generateLoop()
  );
}


// ==========================================
// HERO COMPONENT
// ==========================================

export default function Hero() {

  // ==========================================
  // PARALLAX
  // ==========================================

  const mx = useMotionValue(0);
  const my = useMotionValue(0);

  const sx = useSpring(mx, {
    damping: 40,
    stiffness: 120,
  });

  const sy = useSpring(my, {
    damping: 40,
    stiffness: 120,
  });

  const tx1 = useTransform(
    sx,
    (v) => `${v * 5}px`
  );

  const ty1 = useTransform(
    sy,
    (v) => `${v * 5}px`
  );

  const tx2 = useTransform(
    sx,
    (v) => `${v * -8}px`
  );

  const ty2 = useTransform(
    sy,
    (v) => `${v * -8}px`
  );


  const onMouseMove = (
    e: React.MouseEvent
  ) => {

    const rect =
      e.currentTarget.getBoundingClientRect();

    mx.set(
      (e.clientX - rect.left) /
        rect.width -
        0.5
    );

    my.set(
      (e.clientY - rect.top) /
        rect.height -
        0.5
    );
  };


  // ==========================================
  // CLICK TO REVEAL
  // ==========================================

  const [
    clickCount,
    setClickCount,
  ] = React.useState(0);

  const [
    revealed,
    setRevealed,
  ] = React.useState(false);


  const handleReveal = () => {
    setRevealed(true);

    setClickCount(
      (prev) => prev + 1
    );
  };


  // ==========================================
  // LIVE COUNTER STATE
  // ==========================================

  const [
    counterLoops,
    setCounterLoops,
  ] = React.useState<number[][]>([]);

  const [
    activeLoop,
    setActiveLoop,
  ] = React.useState(0);

  const [
    counterIndex,
    setCounterIndex,
  ] = React.useState(0);


  // ==========================================
  // INITIALIZE COUNTER
  // ==========================================

  React.useEffect(() => {

    if (
      typeof window === 'undefined'
    ) {
      return;
    }

    try {

      const savedData =
        localStorage.getItem(
          STORAGE_KEY
        );


      // ========================================
      // LOAD EXISTING COUNTER
      // ========================================

      if (savedData) {

        const parsed =
          JSON.parse(savedData);


        if (
          parsed &&
          Array.isArray(parsed.loops) &&
          Array.isArray(parsed.usedLoops)
        ) {

          let loops =
            parsed.loops as number[][];

          let usedLoops =
            parsed.usedLoops as number[];

          let currentLoop =
            typeof parsed.currentLoop === 'number'
              ? parsed.currentLoop
              : 0;

          let currentIndex =
            typeof parsed.currentIndex === 'number'
              ? parsed.currentIndex
              : 0;


          // ======================================
          // IF 100 LOOPS ARE FINISHED
          // ======================================

          if (
            usedLoops.length >= TOTAL_LOOPS
          ) {

            loops =
              generateAllLoops();

            usedLoops = [];

            currentLoop = 0;
            currentIndex = 0;

          }


          // ======================================
          // SAFETY CHECK
          // ======================================

          if (
            !loops[currentLoop] ||
            currentIndex >= NUMBERS_PER_LOOP
          ) {

            currentLoop = 0;
            currentIndex = 0;

          }


          setCounterLoops(loops);
          setActiveLoop(currentLoop);
          setCounterIndex(currentIndex);

          return;
        }
      }


      // ========================================
      // FIRST VISIT
      // CREATE 100 NEW LOOPS
      // ========================================

      const newLoops =
        generateAllLoops();


      // ========================================
      // RANDOMIZE LOOP ORDER
      // ========================================

      const shuffledIndexes =
        shuffleArray(
          Array.from(
            { length: TOTAL_LOOPS },
            (_, index) => index
          )
        );


      const firstLoop =
        shuffledIndexes[0];


      // ========================================
      // RANDOM STARTING NUMBER
      // ========================================

      const randomStart =
        Math.floor(
          Math.random() *
            NUMBERS_PER_LOOP
        );


      // ========================================
      // SAVE INITIAL STATE
      // ========================================

      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          loops: newLoops,
          usedLoops: [firstLoop],
          currentLoop: firstLoop,
          currentIndex: randomStart,
        })
      );


      setCounterLoops(newLoops);

      setActiveLoop(firstLoop);

      setCounterIndex(randomStart);


    } catch (error) {

      console.error(
        'Havelent counter error:',
        error
      );


      // ========================================
      // FALLBACK
      // ========================================

      const fallbackLoops =
        generateAllLoops();


      setCounterLoops(
        fallbackLoops
      );

      setActiveLoop(0);
      setCounterIndex(0);

    }

  }, []);


  // ==========================================
  // CHANGE NUMBER EVERY 2 SECONDS
  // ==========================================

  React.useEffect(() => {

    if (
      counterLoops.length === 0
    ) {
      return;
    }


    const interval =
      setInterval(() => {

        setCounterIndex(
          (prevIndex) => {

            // ==================================
            // NORMAL NUMBER CHANGE
            // ==================================

            if (
              prevIndex <
              NUMBERS_PER_LOOP - 1
            ) {

              const nextIndex =
                prevIndex + 1;


              // SAVE CURRENT POSITION
              try {

                const savedData =
                  localStorage.getItem(
                    STORAGE_KEY
                  );


                if (savedData) {

                  const parsed =
                    JSON.parse(savedData);


                  localStorage.setItem(
                    STORAGE_KEY,
                    JSON.stringify({
                      ...parsed,
                      currentLoop: activeLoop,
                      currentIndex: nextIndex,
                    })
                  );

                }

              } catch {
                // Ignore storage errors
              }


              return nextIndex;
            }


            // ==================================
            // 10 NUMBERS COMPLETE
            // MOVE TO NEXT UNUSED LOOP
            // ==================================

            let nextLoop =
              activeLoop;


            try {

              const savedData =
                localStorage.getItem(
                  STORAGE_KEY
                );


              if (savedData) {

                const parsed =
                  JSON.parse(savedData);


                let usedLoops =
                  Array.isArray(parsed.usedLoops)
                    ? parsed.usedLoops
                    : [];


                // Find loops that haven't been used
                let unusedLoops =
                  Array.from(
                    {
                      length: TOTAL_LOOPS,
                    },
                    (_, index) => index
                  ).filter(
                    (index) =>
                      !usedLoops.includes(index)
                  );


                // ==================================
                // ALL 100 LOOPS FINISHED
                // CREATE COMPLETELY NEW CYCLE
                // ==================================

                if (
                  unusedLoops.length === 0
                ) {

                  const freshLoops =
                    generateAllLoops();


                  const randomLoop =
                    Math.floor(
                      Math.random() *
                        TOTAL_LOOPS
                    );


                  const randomIndex =
                    Math.floor(
                      Math.random() *
                        NUMBERS_PER_LOOP
                    );


                  setCounterLoops(
                    freshLoops
                  );

                  setActiveLoop(
                    randomLoop
                  );


                  setCounterIndex(
                    randomIndex
                  );


                  localStorage.setItem(
                    STORAGE_KEY,
                    JSON.stringify({
                      loops: freshLoops,
                      usedLoops: [
                        randomLoop,
                      ],
                      currentLoop:
                        randomLoop,
                      currentIndex:
                        randomIndex,
                    })
                  );


                  return randomIndex;
                }


                // ==================================
                // SELECT RANDOM UNUSED LOOP
                // ==================================

                nextLoop =
                  unusedLoops[
                    Math.floor(
                      Math.random() *
                        unusedLoops.length
                    )
                  ];


                usedLoops = [
                  ...usedLoops,
                  nextLoop,
                ];


                // ==================================
                // RANDOM START NUMBER
                // ==================================

                const randomStart =
                  Math.floor(
                    Math.random() *
                      NUMBERS_PER_LOOP
                  );


                setActiveLoop(
                  nextLoop
                );


                localStorage.setItem(
                  STORAGE_KEY,
                  JSON.stringify({
                    ...parsed,
                    usedLoops,
                    currentLoop:
                      nextLoop,
                    currentIndex:
                      randomStart,
                  })
                );


                return randomStart;

              }

            } catch (error) {

              console.error(
                'Counter loop error:',
                error
              );

            }


            return 0;

          }
        );

      }, CHANGE_INTERVAL);


    return () =>
      clearInterval(interval);

  }, [
    counterLoops,
    activeLoop,
  ]);


  // ==========================================
  // CURRENT NUMBER
  // ==========================================

  const currentNumber =
    counterLoops.length > 0 &&
    counterLoops[activeLoop] &&
    counterLoops[activeLoop][counterIndex]
      !== undefined
      ? counterLoops[
          activeLoop
        ][counterIndex]
      : null;


  // ==========================================
  // RETURN
  // ==========================================

  return (

    <section
      id="home"
      onMouseMove={onMouseMove}
      className="
        relative
        flex
        w-full
        flex-col
        items-center
        justify-start
        bg-[#ffefe8]
        px-6
        pb-20
        pt-32
      "
    >


      {/* ======================================
          ROTATING SHAPES
      ====================================== */}

      <RotatingSquare />

      <RotatingTriangle />


      {/* ======================================
          BACKGROUND GRID
      ====================================== */}

      <div
        className="
          bg-grid
          pointer-events-none
          absolute
          inset-0
          opacity-[0.08]
        "
      />


      {/* ======================================
          LEFT ORANGE GLOW
      ====================================== */}

      <motion.div
        style={{
          x: tx1,
          y: ty1,
        }}
        className="
          animate-float
          pointer-events-none
          absolute
          -left-32
          top-24
          h-[420px]
          w-[420px]
          rounded-full
          bg-gradient-to-br
          from-brand-orange/30
          to-brand-red/10
          blur-[120px]
        "
      />


      {/* ======================================
          RIGHT ORANGE GLOW
      ====================================== */}

      <motion.div
        style={{
          x: tx2,
          y: ty2,
        }}
        className="
          pointer-events-none
          absolute
          right-0
          top-0
          h-[900px]
          w-[900px]
          translate-x-1/2
          animate-glow
          bg-gradient-to-bl
          from-orange-500/100
          via-orange-500/70
          to-transparent
          blur-[220px]
        "
      />


      <div className="noise" />


      {/* ======================================
          CLICK TO REVEAL
      ====================================== */}

      <motion.button
        initial={{
          opacity: 0,
          y: 20,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.7,
          ease: [0.22, 1, 0.36, 1],
        }}
        whileHover={{
          scale: 1.04,
          y: -2,
        }}
        onClick={handleReveal}
        onMouseLeave={() =>
          setRevealed(false)
        }
        data-cursor="button"
        className={`
          group
          relative
          mb-8
          inline-flex
          min-w-[190px]
          items-center
          justify-center
          gap-2
          rounded-full
          border
          px-5
          py-2
          text-sm
          font-medium
          transition-all
          duration-300
          ${
            revealed
              ? 'border-white/10 bg-black text-white'
              : 'border-white/15 bg-white text-brand-dark'
          }
        `}
      >

        {revealed ? (

          <span className="text-gradient-orange">
            {clickCount === 1
              ? 'Welcome'
              : 'Welcome Again'}
          </span>

        ) : (

          <>
            <Sparkles
              size={14}
              className="text-brand-orange"
            />

            <span>
              Click to Reveal
            </span>

            <span
              className="
                ml-1
                h-1.5
                w-1.5
                rounded-full
                bg-brand-orange
              "
            />
          </>

        )}

      </motion.button>


      {/* ======================================
          HEADING
      ====================================== */}

      <h1
        className="
          font-display
          text-center
          text-[clamp(2.75rem,7vw,6.5rem)]
          font-semibold
          leading-[1.2]
          tracking-tight
        "
      >

        {headingWords.map(
          (word, i) => (

            <span
              key={i}
              className="
                mr-3
                inline-block
                overflow-visible
                align-bottom
              "
            >

              <motion.span
                initial={{
                  opacity: 0,
                  y: 0,
                  filter: 'blur(3px)',
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                  filter: 'blur(0px)',
                }}
                transition={{
                  duration: 0.45,
                  delay:
                    0.3 + i * 0.1,
                  ease: [
                    0.22,
                    1,
                    0.36,
                    1,
                  ],
                }}
                className="
                  inline-block
                "
              >

                <span
                  className={
                    word.color === 'gradient'
                      ? 'text-gradient-orange'
                      : 'text-[#000000]'
                  }
                >
                  {word.text}
                </span>

              </motion.span>

            </span>

          )
        )}

      </h1>


      {/* ======================================
          CTA
      ====================================== */}

      <motion.div
        initial={{
          opacity: 0,
          y: 24,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.8,
          delay: 0.9,
        }}
        className="
          mt-10
          flex
          flex-col
          items-center
          gap-4
          sm:flex-row
        "
      >


        {/* START A PROJECT */}

        <Link href="/#contact">

          <motion.button
            whileHover={{
              scale: 1.04,
            }}
            whileTap={{
              scale: 0.97,
            }}
            data-cursor="button"
            className="
              group
              relative
              inline-flex
              items-center
              gap-2
              overflow-hidden
              rounded-full
              bg-gradient-to-r
              from-brand-accent
              to-brand-orange
              px-7
              py-3.5
              text-sm
              font-semibold
              text-white
            "
            style={{
              boxShadow:
                '0 0 30px -6px rgba(249,115,22,0.55)',
            }}
          >

            <span className="relative z-10">
              Start a Project
            </span>

            <motion.span
              className="relative z-10"
              initial={{
                x: 0,
              }}
              whileHover={{
                x: 4,
              }}
              transition={{
                duration: 0.3,
              }}
            >
              <ArrowRight
                size={16}
              />
            </motion.span>

            <span
              className="
                absolute
                inset-0
                bg-gradient-to-r
                from-brand-orange
                to-brand-red
                opacity-0
                transition-opacity
                duration-300
                group-hover:opacity-100
              "
            />

          </motion.button>

        </Link>


        {/* VIEW SERVICES */}

        <motion.button
          whileHover={{
            scale: 1.04,
          }}
          whileTap={{
            scale: 0.97,
          }}
          onClick={() => {

            document
              .getElementById(
                'services'
              )
              ?.scrollIntoView({
                behavior:
                  'smooth',
              });

          }}
          data-cursor="button"
          className="
            rounded-full
            border
            border-black/20
            px-7
            py-3.5
            text-sm
            font-medium
            text-black/90
            transition-all
            duration-300
            hover:border-brand-orange
            hover:text-brand-orange
          "
        >
          View Our Services
        </motion.button>

      </motion.div>


      {/* ======================================
          MARQUEE + LIVE ACTIVITY
      ====================================== */}

      <div className="mt-14 w-full">

        <motion.div
          initial={{
            opacity: 0,
            y: 30,
            scale: 0.98,
            filter: 'blur(8px)',
          }}
          animate={{
            opacity: 1,
            y: 0,
            scale: 1,
            filter: 'blur(0px)',
          }}
          transition={{
            duration: 0.9,
            delay: 1.2,
            ease: [
              0.22,
              1,
              0.36,
              1,
            ],
          }}
        >

          <Marquee />

        </motion.div>


        {/* ==================================
            LIVE ACTIVITY COUNTER
        ================================== */}

        <motion.div
          initial={{
            opacity: 0,
            y: 10,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.7,
            delay: 1.7,
            ease: [
              0.22,
              1,
              0.36,
              1,
            ],
          }}
          className="
            mt-7
            flex
            w-full
            justify-center
          "
        >

          <div
            className="
              flex
              items-center
              justify-center
              gap-2
              text-center
            "
          >

            {/* ORANGE LIVE DOT */}

            <span
              className="
                relative
                flex
                h-2
                w-2
                shrink-0
                items-center
                justify-center
              "
            >

              <span
                className="
                  absolute
                  h-2
                  w-2
                  animate-ping
                  rounded-full
                  bg-brand-orange/30
                "
              />

              <span
                className="
                  relative
                  h-1.5
                  w-1.5
                  rounded-full
                  bg-brand-orange
                "
                style={{
                  boxShadow:
                    '0 0 8px rgba(249,115,22,0.8)',
                }}
              />

            </span>


            {/* COUNTER TEXT */}

            <p
              className="
                whitespace-nowrap
                text-[10px]
                font-medium
                leading-none
                text-black/55
                sm:text-xs
              "
            >

              <motion.span
                key={`${activeLoop}-${counterIndex}`}
                initial={{
                  opacity: 0.4,
                  y: 2,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: 0.25,
                }}
                className="
                  font-semibold
                  tabular-nums
                  text-black/75
                "
              >
                {currentNumber !== null
                  ? currentNumber.toLocaleString()
                  : '—'}
              </motion.span>


              <span className="ml-1 text-brand-orange">
                people are exploring Havelent
              </span>


              <span className="mx-1.5 text-brand-orange">
                ·
              </span>


              <span className="font-semibold text-black/70">
                You are one of them.
              </span>

            </p>

          </div>

        </motion.div>

      </div>


    </section>

  );
}