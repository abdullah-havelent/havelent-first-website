'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  X,
} from 'lucide-react';

const projects = [
  {
    title: 'Luxury Hotel & Resort',
    category: 'Hospitality',
    images: ['/images/work/luxury-hotel.webp'],
  },
  {
    title: 'Skincare',
    category: 'Beauty & Skincare',
    images: ['/images/work/skincare.webp'],
  },
  {
    title: 'TRILOBE',
    category: 'Luxury Watches',
    images: ['/images/work/trilobe.webp'],
  },
  {
    title: 'XSY Yachts',
    category: 'Luxury & Travel',
    images: ['/images/work/xsy-yachts.webp'],
  },
  {
    title: 'Jewelry',
    category: 'Luxury Jewelry',
    images: [
      '/images/work/jewelry-1.webp',
      '/images/work/jewelry-2.webp',
    ],
  },
  {
    title: 'Healthcare & Dental Campaign',
    category: 'Healthcare',
    images: ['/images/work/healthcare.webp'],
  },

  // NEW — High-End Furniture
  {
    title: 'High-End Furniture',
    category: 'Luxury Interiors',
    images: [
      '/images/work/High-End Furniture 1.webp',
      '/images/work/High-End Furniture 2.webp',
      '/images/work/High-End Furniture 3.webp',
      '/images/work/High-End Furniture 4.webp',
    ],
  },

  // NEW — Men's Accessories
  {
    title: "Men's Accessories",
    category: 'Luxury Fashion',
    images: [
      '/images/work/MEN’S 1 .webp',
      '/images/work/MEN’S 2 .webp',
      '/images/work/MEN’S 3.webp',
      '/images/work/MEN’S 4.webp',
    ],
  },
];

/*
  Viewer projects:
  Healthcare remains the Featured Project,
  then all normal portfolio cards follow.
*/
const viewerProjects = [
  {
    title: 'Healthcare & Dental Campaign',
    images: ['/images/work/healthcare.webp'],
  },
  ...projects,
];



export default function OurWork() {
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedProjectIndex, setSelectedProjectIndex] = useState(0);

  const isViewerOpen = selectedImages.length > 0;

  // Arrows are available because we can move between projects
  // even when the current project has only one image.
  const hasMultipleImages = viewerProjects.length > 1;

  const openViewer = (
    images: string[],
    startIndex = 0,
    projectIndex = 0
  ) => {
    setSelectedImages(images);
    setSelectedIndex(startIndex);
    setSelectedProjectIndex(projectIndex);
  };

  const closeViewer = () => {
    setSelectedImages([]);
    setSelectedIndex(0);
    setSelectedProjectIndex(0);
  };

  const showNext = () => {
    // First move through images inside the current project
    if (selectedIndex < selectedImages.length - 1) {
      setSelectedIndex((current) => current + 1);
      return;
    }

    // Last image → next project
    const nextProjectIndex =
      selectedProjectIndex === viewerProjects.length - 1
        ? 0
        : selectedProjectIndex + 1;

    const nextProject = viewerProjects[nextProjectIndex];

    setSelectedProjectIndex(nextProjectIndex);
    setSelectedImages(nextProject.images);
    setSelectedIndex(0);
  };

  const showPrevious = () => {
    // Move through images inside the current project
    if (selectedIndex > 0) {
      setSelectedIndex((current) => current - 1);
      return;
    }

    // First image → previous project
    const previousProjectIndex =
      selectedProjectIndex === 0
        ? viewerProjects.length - 1
        : selectedProjectIndex - 1;

    const previousProject = viewerProjects[previousProjectIndex];

    setSelectedProjectIndex(previousProjectIndex);
    setSelectedImages(previousProject.images);
    setSelectedIndex(previousProject.images.length - 1);
  };

  // ESC key + prevent background scrolling
  useEffect(() => {
    if (!isViewerOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeViewer();
      }

      if (event.key === 'ArrowRight') {
        showNext();
      }

      if (event.key === 'ArrowLeft') {
        showPrevious();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [
    isViewerOpen,
    selectedImages.length,
    selectedIndex,
    selectedProjectIndex,
  ]);

  return (
    <>
      <section className="relative overflow-hidden bg-brand-dark px-6 py-32">

        {/* Background Glow */}
        <div className="pointer-events-none absolute -left-40 top-20 h-[420px] w-[420px] rounded-full bg-orange-500/10 blur-[140px]" />

        <div className="pointer-events-none absolute -right-52 bottom-0 h-[550px] w-[550px] rounded-full bg-orange-500/15 blur-[180px]" />

        <div className="relative z-10 mx-auto max-w-7xl">

          {/* Hero */}

          <motion.div
            initial={{
              opacity: 0,
              y: 40,
              filter: 'blur(8px)',
            }}
            whileInView={{
              opacity: 1,
              y: 0,
              filter: 'blur(0px)',
            }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
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

{/* Portfolio Intro */}

<motion.div
  initial={{
    opacity: 0,
    y: 60,
    filter: 'blur(8px)',
  }}
  whileInView={{
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
  }}
  viewport={{ once: true }}
  transition={{
    duration: 0.9,
    delay: 0.2,
  }}
  className="group relative mt-24 overflow-hidden rounded-[36px] border border-white/10"
>

  <div className="relative min-h-[420px] overflow-hidden">

    {/* Soft Background Glow */}

    <div className="pointer-events-none absolute -right-32 -top-32 h-[420px] w-[420px] rounded-full bg-orange-500/10 blur-[140px]" />

    <div className="pointer-events-none absolute -bottom-40 -left-32 h-[420px] w-[420px] rounded-full bg-orange-500/10 blur-[140px]" />

    {/* Intro Content */}

    <div className="relative flex min-h-[420px] flex-col justify-center px-8 py-16 sm:px-12 lg:px-20">

      <span className="text-sm uppercase tracking-[0.3em] text-brand-orange">
        Selected Work
      </span>

      <h2 className="mt-5 max-w-none whitespace-nowrap font-display text-4xl font-semibold leading-tight text-white sm:text-5xl lg:text-6xl">
        Crafted to{' '}
        <span className="text-gradient-orange">
          Make Brands Stand Out.
        </span>
      </h2>

      <p className="mt-7 max-w-2xl text-base leading-8 text-white/60 sm:text-lg">
  We create digital experiences for brands across every industry 
  and niche — combining strategy, creativity 
  and attention to detail to help businesses stand out.
      </p>

      <div className="mt-10 flex items-center gap-4">

        <div className="h-px w-12 bg-brand-orange/60" />

        <span className="text-xs uppercase tracking-[0.3em] text-white/40">
          Explore Our Work
        </span>

      </div>

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

                {/* Clickable Image */}

                <button
                  type="button"
                  onClick={() =>
                    openViewer(project.images, 0, index + 1)
                  }
                  className="block w-full cursor-pointer text-left"
                  aria-label={`Open ${project.title}`}
                >

                  <div className="relative aspect-[4/3] overflow-hidden">

                    <Image
                      src={project.images[0]}
                      alt={project.title}
                      fill
                      className="object-cover transition duration-700 group-hover:scale-110"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />


                  </div>

                </button>

                <div className="p-8">

                  <span className="text-xs uppercase tracking-[0.3em] text-brand-orange">
                    {project.category}
                  </span>

                  <h3 className="mt-3 font-display text-3xl font-semibold text-white">
                    {project.title}
                  </h3>

                  <p className="mt-4 leading-7 text-white/60">
                    Crafted with strategy, creativity and attention to every
                    detail to deliver a premium digital experience.
                  </p>

                  {/* View Project Button */}

                  <button
                    type="button"
                    onClick={() =>
                      openViewer(project.images, 0, index + 1)
                    }
                    className="mt-8 inline-flex items-center gap-2 text-white transition hover:text-brand-orange"
                  >

                    View Project

                    <ArrowUpRight
                      size={18}
                      className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                    />

                  </button>

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

      {/* ========================================================= */}
      {/* IMAGE LIGHTBOX / FULLSCREEN VIEWER */}
      {/* ========================================================= */}

      <AnimatePresence>

        {isViewerOpen && (

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/75 p-4 backdrop-blur-md sm:p-8"
            onClick={closeViewer}
          >

            {/* Close Button */}

            <button
              type="button"
              onClick={closeViewer}
              aria-label="Close image viewer"
              className="absolute right-5 top-5 z-50 flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white backdrop-blur-xl transition hover:scale-105 hover:bg-white/20 sm:right-8 sm:top-8"
            >
              <X size={22} />
            </button>

            {/* Previous Arrow */}

            {hasMultipleImages && (

              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  showPrevious();
                }}
                aria-label="Previous image"
                className="absolute left-3 top-1/2 z-50 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-black/40 text-white backdrop-blur-xl transition hover:scale-105 hover:bg-white/15 sm:left-8 sm:h-14 sm:w-14"
              >
                <ChevronLeft size={28} />
              </button>

            )}

            {/* Image */}

            <motion.div
              initial={{
                opacity: 0,
                scale: 0.88,
                y: 20,
              }}
              animate={{
                opacity: 1,
                scale: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                scale: 0.88,
                y: 20,
              }}
              transition={{
                duration: 0.35,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="relative flex h-[88vh] w-full max-w-6xl items-center justify-center"
              onClick={(event) => event.stopPropagation()}
            >

              <AnimatePresence mode="wait">

                <motion.div
                  key={selectedImages[selectedIndex]}
                  initial={{
                    opacity: 0,
                  }}
                  animate={{
                    opacity: 1,
                  }}
                  exit={{
                    opacity: 0,
                  }}
                  transition={{
                    duration: 0.3,
                    ease: 'easeInOut',
                  }}
                  className="relative h-full w-full"
                >

                  <Image
                    src={selectedImages[selectedIndex]}
                    alt="Portfolio project preview"
                    fill
                    priority
                    sizes="100vw"
                    className="object-contain"
                  />

                </motion.div>

              </AnimatePresence>

            </motion.div>

            {/* Next Arrow */}

            {hasMultipleImages && (

              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  showNext();
                }}
                aria-label="Next image"
                className="absolute right-3 top-1/2 z-50 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-black/40 text-white backdrop-blur-xl transition hover:scale-105 hover:bg-white/15 sm:right-8 sm:h-14 sm:w-14"
              >
                <ChevronRight size={28} />
              </button>

            )}

            {/* Image Counter */}

            {hasMultipleImages && (

              <div className="absolute bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-full border border-white/10 bg-black/40 px-4 py-2 text-xs tracking-widest text-white/80 backdrop-blur-xl">
                {selectedIndex + 1} / {selectedImages.length}
              </div>

            )}

          </motion.div>

        )}

      </AnimatePresence>
    </>
  );
}