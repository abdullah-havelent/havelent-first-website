'use client';

import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useMotionValue } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  X,
} from 'lucide-react';

export const projects = [
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
  const [activeProject, setActiveProject] = useState(0);
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    const mobileQuery = window.matchMedia('(max-width: 767px)');
    const updateMobile = () => setIsMobile(mobileQuery.matches);
    updateMobile();
    mobileQuery.addEventListener('change', updateMobile);
    return () => mobileQuery.removeEventListener('change', updateMobile);
  }, []);
  const showcaseRef = useRef<HTMLDivElement>(null);
  const activeProjectRef = useRef(0);
  const wheelLockedRef = useRef(false);
  const projectListY = useMotionValue(0);

  useEffect(() => {
    const desktop = window.matchMedia('(min-width: 1024px)');
    const previousOverflowX = document.body.style.overflowX;
    let frame = 0;

    const updateShowcase = () => {
      frame = 0;
      const showcase = showcaseRef.current;
      if (!desktop.matches || !showcase) return;

      // The full stage stays pinned beneath the navbar for this scroll range.
      const pinnedHeight = window.innerHeight - 96;
      const travel = Math.max(1, showcase.offsetHeight - pinnedHeight);
      const progress = Math.max(0, Math.min(1, (96 - showcase.getBoundingClientRect().top) / travel));
      // Half a step at each end lets the first and last projects settle on screen.
      const position = Math.max(0, Math.min(projects.length - 1, progress * projects.length - 0.5));
      projectListY.set(-position * 132);
      const nextActiveProject = Math.round(position);
      activeProjectRef.current = nextActiveProject;
      setActiveProject(nextActiveProject);
    };

    const scheduleUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(updateShowcase);
    };

    const updateBreakpoint = () => {
      // Avoid a body scroll container trapping position: sticky on this route.
      document.body.style.overflowX = desktop.matches ? 'clip' : previousOverflowX;
      scheduleUpdate();
    };

    const handleShowcaseWheel = (event: WheelEvent) => {
      const showcase = showcaseRef.current;
      if (!desktop.matches || !showcase || wheelLockedRef.current || Math.abs(event.deltaY) < 8) return;

      const rect = showcase.getBoundingClientRect();
      const isPinned = rect.top <= 98 && rect.bottom >= window.innerHeight - 2;
      if (!isPinned) return;

      const direction = event.deltaY > 0 ? 1 : -1;
      const target = activeProjectRef.current + direction;
      if (target < 0 || target >= projects.length) return;

      event.preventDefault();
      wheelLockedRef.current = true;

      const pinnedHeight = window.innerHeight - 96;
      const travel = Math.max(1, showcase.offsetHeight - pinnedHeight);
      const showcaseTop = window.scrollY + rect.top;
      const progress = (target + 0.5) / projects.length;

      window.scrollTo({
        top: showcaseTop - 96 + progress * travel,
        behavior: 'smooth',
      });

      window.setTimeout(() => {
        wheelLockedRef.current = false;
      }, 420);
    };
    updateBreakpoint();
    window.addEventListener('wheel', handleShowcaseWheel, { passive: false });
    window.addEventListener('scroll', scheduleUpdate, { passive: true });
    window.addEventListener('resize', scheduleUpdate);
    desktop.addEventListener('change', updateBreakpoint);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener('wheel', handleShowcaseWheel);
      window.removeEventListener('scroll', scheduleUpdate);
      window.removeEventListener('resize', scheduleUpdate);
      desktop.removeEventListener('change', updateBreakpoint);
      document.body.style.overflowX = previousOverflowX;
    };
  }, [projectListY]);

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

  // Keep the scroll lock stable while navigating between viewer images.
  useEffect(() => {
    if (!isViewerOpen) return;

    const bodyStyle = document.body.style;
    // Preserve each axis: reading the shorthand loses a standalone overflowX: clip.
    const previousOverflowX = bodyStyle.overflowX;
    const previousOverflowY = bodyStyle.overflowY;
    bodyStyle.overflowX = 'hidden';
    bodyStyle.overflowY = 'hidden';

    return () => {
      bodyStyle.overflowX = previousOverflowX;
      bodyStyle.overflowY = previousOverflowY;
    };
  }, [isViewerOpen]);

  // Viewer keyboard navigation.
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


    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [
    isViewerOpen,
    selectedImages.length,
    selectedIndex,
    selectedProjectIndex,
  ]);

  return (
    <>
      <section className="relative overflow-clip bg-brand-dark px-6 py-32">

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



          {/* Desktop sticky portfolio showcase */}
          <div ref={showcaseRef} className="relative mt-24 hidden lg:block" style={{ height: `calc(100vh + ${projects.length * 400}px)` }}>
            <div className="sticky top-24 grid h-[calc(100vh-6rem)] grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)] items-stretch gap-12 pb-8 xl:gap-16">
            <div className="relative min-h-0 overflow-hidden" style={{ maskImage: 'linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)' }}>
              <motion.div className="absolute left-0 right-0 top-1/2 -mt-[66px] border-t border-white/10" style={{ y: projectListY }}>
              {projects.map((project, index) => {
                const isActive = activeProject === index;

                return (
                  <motion.button
                    key={project.title}
                    type="button"
                    onClick={() => openViewer(project.images, 0, index + 1)}
                    className="group relative flex h-[132px] w-full items-center gap-6 border-b border-white/10 py-7 text-left"
                    aria-label={`View ${project.title}`}
                  >
                    <motion.span
                      animate={{ color: isActive ? '#f97316' : 'rgba(255,255,255,0.3)' }}
                      className="w-9 shrink-0 font-display text-sm tracking-[0.16em]"
                    >
                      {String(index + 1).padStart(2, '0')}
                    </motion.span>

                    <div className="min-w-0 flex-1">
                      <span className={`text-[10px] font-medium uppercase tracking-[0.28em] transition-colors duration-300 ${isActive ? 'text-brand-orange' : 'text-white/35'}`}>
                        {project.category}
                      </span>
                      <h3 className={`mt-2 font-display text-[clamp(1.45rem,2vw,2rem)] font-semibold leading-tight transition-all duration-300 ${isActive ? 'translate-x-2 text-white' : 'text-white/55 group-hover:text-white'}`}>
                        {project.title}
                      </h3>
                    </div>

                    <ArrowUpRight
                      size={19}
                      className={`shrink-0 transition-all duration-300 ${isActive ? '-translate-y-1 translate-x-1 text-brand-orange' : 'text-white/25'}`}
                    />

                    <motion.span
                      className="absolute bottom-[-1px] left-0 h-px bg-brand-orange"
                      animate={{ width: isActive ? '100%' : '0%' }}
                      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                    />
                  </motion.button>
                );
              })}
              </motion.div>
            </div>

            <div className="min-h-0">
              <button
                type="button"
                onClick={() => openViewer(projects[activeProject].images, 0, activeProject + 1)}
                className="group/stage relative block h-full w-full overflow-hidden rounded-[28px] border border-white/10 bg-[#080808] text-left shadow-[0_35px_100px_rgba(0,0,0,0.45)]"
                aria-label={`Open ${projects[activeProject].title}`}
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={projects[activeProject].images[0]}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2, ease: 'easeInOut' }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={projects[activeProject].images[0]}
                      alt=""
                      fill
                      aria-hidden="true"
                      className="scale-110 object-cover opacity-30 blur-2xl"
                      sizes="65vw"
                    />
                    <div className="absolute inset-0 bg-black/25" />
                    <Image
                      src={projects[activeProject].images[0]}
                      alt={projects[activeProject].title}
                      fill
                      priority={activeProject === 0}
                      className="object-contain p-5 transition-transform duration-700 group-hover/stage:scale-[1.015] xl:p-8"
                      sizes="65vw"
                    />
                  </motion.div>
                </AnimatePresence>

                <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-black via-black/75 to-transparent px-8 pb-8 pt-28">
                  <div className="flex items-end justify-between gap-8">
                    <div>
                      <span className="text-[11px] font-semibold uppercase tracking-[0.3em] text-brand-orange">
                        {projects[activeProject].category}
                      </span>
                      <h3 className="mt-2 font-display text-3xl font-semibold text-white xl:text-4xl">
                        {projects[activeProject].title}
                      </h3>
                    </div>
                    <div className="flex items-center gap-3 text-xs uppercase tracking-[0.22em] text-white/55">
                      {projects[activeProject].images.length > 1 && (
                        <span>{projects[activeProject].images.length} images</span>
                      )}
                      <span className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-black/30 text-brand-orange backdrop-blur-md">
                        <ArrowUpRight size={18} />
                      </span>
                    </div>
                  </div>
                </div>
              </button>
            </div>
            </div>
          </div>

          {/* Mobile projects grid */}

          <div className="mt-24 grid gap-8 md:grid-cols-2 lg:hidden">

            {projects.map((project, index) => (

              <motion.div
                key={project.title}
                initial={isMobile ? false : {
                  opacity: 0,
                  y: 50,
                  filter: 'blur(8px)',
                }}
                whileInView={isMobile ? undefined : {
                  opacity: 1,
                  y: 0,
                  filter: 'blur(0px)',
                }}
                viewport={{ once: true }}
                transition={isMobile ? { duration: 0 } : {
                  duration: 0.7,
                  delay: index * 0.12,
                }}
                className="group overflow-hidden rounded-[30px] border border-white/10 bg-white/[0.03] md:transition-all md:duration-500 md:hover:-translate-y-2 md:hover:border-brand-orange/40 md:hover:shadow-[0_20px_60px_rgba(249,115,22,0.18)]"
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
                      className="object-cover md:transition md:duration-700 md:group-hover:scale-110"
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
                    className="mt-8 inline-flex items-center gap-2 text-white md:transition md:hover:text-brand-orange"
                  >

                    View Project

                    <ArrowUpRight
                      size={18}
                      className="md:transition-transform md:duration-300 md:group-hover:translate-x-1 md:group-hover:-translate-y-1"
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
            className="work-cta relative isolate mt-32 rounded-[36px] border border-white/10 bg-white/[0.03] px-10 py-20 text-center"
          >

            <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 hidden overflow-hidden rounded-[36px] lg:block">
              <svg className="absolute -bottom-5 -left-[15%] h-[48%] w-[130%]" viewBox="0 0 1440 260" preserveAspectRatio="none" fill="none">
                <path className="work-cta-wave work-cta-wave-one" d="M-300 140 C-60 30 160 240 430 140 S830 40 1120 140 S1500 220 1740 110 L1740 360 H-300 Z" fill="rgba(249,115,22,0.09)" />
                <path className="work-cta-wave work-cta-wave-two" d="M-300 180 C-20 280 200 60 480 160 S920 240 1160 150 S1540 80 1740 180 L1740 360 H-300 Z" fill="rgba(249,115,22,0.07)" />
                <path className="work-cta-wave work-cta-wave-three" d="M-300 210 C-40 100 240 280 540 200 S980 120 1210 200 S1500 290 1740 190 L1740 360 H-300 Z" fill="rgba(251,146,60,0.06)" />
              </svg>
            </div>

            <span className="text-xs uppercase tracking-[0.35em] text-brand-orange">
              Let&apos;s Create
            </span>

            <h2 className="mx-auto mt-6 max-w-3xl font-display text-5xl font-semibold text-white">
              Ready to build something extraordinary together?
            </h2>

            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-white/60">
              Whether you&apos;re launching a new brand or elevating an existing one,
              we&apos;re here to craft experiences that leave a lasting impression.
            </p>

            <Link
              href="#contact"
              className="work-cta-button relative mt-10 inline-flex items-center overflow-hidden rounded-full bg-brand-orange px-8 py-4 text-sm font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_rgba(249,115,22,0.45)]"
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
            initial={isMobile ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={isMobile ? undefined : { opacity: 0 }}
            transition={isMobile ? { duration: 0 } : { duration: 0.25 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/75 p-4 backdrop-blur-md sm:p-8"
            onClick={closeViewer}
          >

            {/* Close Button */}

            <button
              type="button"
              onClick={closeViewer}
              aria-label="Close image viewer"
              className="absolute right-5 top-5 z-50 flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white backdrop-blur-xl md:transition md:hover:scale-105 md:hover:bg-white/20 sm:right-8 sm:top-8"
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
                className="absolute left-3 top-1/2 z-50 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-black/40 text-white backdrop-blur-xl md:transition md:hover:scale-105 md:hover:bg-white/15 sm:left-8 sm:h-14 sm:w-14"
              >
                <ChevronLeft size={28} />
              </button>

            )}

            {/* Image */}

            <motion.div
              initial={isMobile ? false : {
                opacity: 0,
                scale: 0.88,
                y: 20,
              }}
              animate={{
                opacity: 1,
                scale: 1,
                y: 0,
              }}
              exit={isMobile ? undefined : {
                opacity: 0,
                scale: 0.88,
                y: 20,
              }}
              transition={isMobile ? { duration: 0 } : {
                duration: 0.35,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="relative flex h-[88vh] w-full max-w-6xl items-center justify-center"
              onClick={(event) => event.stopPropagation()}
            >

              <AnimatePresence mode="wait">

                <motion.div
                  key={selectedImages[selectedIndex]}
                  initial={isMobile ? false : {
                    opacity: 0,
                  }}
                  animate={{
                    opacity: 1,
                  }}
                  exit={isMobile ? undefined : {
                    opacity: 0,
                  }}
                  transition={isMobile ? { duration: 0 } : {
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
                className="absolute right-3 top-1/2 z-50 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-black/40 text-white backdrop-blur-xl md:transition md:hover:scale-105 md:hover:bg-white/15 sm:right-8 sm:h-14 sm:w-14"
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
      <style jsx global>{`
        @media (min-width: 1024px) {
          .work-cta-wave {
            filter: blur(7px);
            animation: workCtaWave 15s ease-in-out infinite alternate;
          }
          .work-cta-wave-two { animation-duration: 19s; animation-delay: -8s; animation-direction: alternate-reverse; }
          .work-cta-wave-three { animation-duration: 23s; animation-delay: -14s; }
          .work-cta-button { animation: workCtaBreathe 6s ease-in-out infinite; }
        }
        @keyframes workCtaWave {
          from { transform: translate3d(-65px, 8px, 0); }
          to { transform: translate3d(65px, -12px, 0); }
        }
        @keyframes workCtaBreathe {
          0%, 100% { box-shadow: 0 0 18px 2px rgba(249,115,22,.12); }
          50% { box-shadow: 0 0 42px 8px rgba(249,115,22,.28); }
        }
        @media (prefers-reduced-motion: reduce) {
          .work-cta-wave, .work-cta-button { animation: none !important; }
        }
      `}</style>
    </>
  );
}