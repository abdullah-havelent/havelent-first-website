'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import { useTheme } from './ThemeProvider';

const LINKS = [
  'Home',
  'Reviews',
  'Our Work',
  'Services',
  'About',
  'Blog',
  'Contact Us',
];

const SECTION_MAP: Record<string, string> = {
  Reviews: 'reviews',
  Services: 'services',
  About: 'about',
  Blog: 'blog',
  'Contact Us': 'contact',
};

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [active, setActive] = useState('Home');
const router = useRouter();
const pathname = usePathname();

useEffect(() => {
  if (pathname === '/') {
    return;
  }

if (pathname === '/our-work' || pathname.startsWith('/our-work/')) {
  setActive('Our Work');
  return;
}

if (pathname === '/blog' || pathname.startsWith('/blog/')) {
  setActive('Blog');
  return;
}

if (pathname === '/reviews' || pathname.startsWith('/reviews/')) {
  setActive('Reviews');
  return;
}

if (pathname === '/services' || pathname.startsWith('/services/')) {
    setActive('Services');
    return;
  }

  if (pathname === '/about' || pathname.startsWith('/about/')) {
    setActive('About');
    return;
  }
  

  if (pathname === '/contact' || pathname.startsWith('/contact/')) {
    setActive('Contact Us');
    return;
  }
}, [pathname]);


  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [manualNav, setManualNav] = useState(false);

  const mobileMenuRef = useRef<HTMLDivElement>(null);

  /*
   * ----------------------------------------------------
   * MOBILE OUTSIDE CLICK
   * ----------------------------------------------------
   */
  useEffect(() => {
    if (!open) return;

    const handleOutsideClick = (event: MouseEvent) => {
      const target = event.target as Node;

      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(target)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      document.removeEventListener(
        'mousedown',
        handleOutsideClick
      );
    };
  }, [open]);

  /*
   * ----------------------------------------------------
   * Scroll state
   * ----------------------------------------------------
   */
  useEffect(() => {
    const sentinel = document.createElement('div');

    sentinel.style.position = 'absolute';
    sentinel.style.top = '40px';
    sentinel.style.left = '0';
    sentinel.style.width = '1px';
    sentinel.style.height = '1px';
    sentinel.style.pointerEvents = 'none';

    document.body.prepend(sentinel);

    const observer = new IntersectionObserver(
      ([entry]) => {
        setScrolled(!entry.isIntersecting);
      },
      {
        threshold: 0,
      }
    );

    observer.observe(sentinel);

    return () => {
      observer.disconnect();
      sentinel.remove();
    };
  }, []);

  /*
   * ----------------------------------------------------
   * Active section detection on HOME page
   * ----------------------------------------------------
   */
  useEffect(() => {
    if (pathname !== '/') {
      return;
    }

    const sections = [
      'home',
      'reviews',
      'our-work',
      'services',
      'about',
      'blog',
      'contact',
    ];

    const observer = new IntersectionObserver(
      (entries) => {
        if (manualNav) return;

        const visibleEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (a, b) =>
              b.intersectionRatio -
              a.intersectionRatio
          )[0];

        if (!visibleEntry) return;

switch (visibleEntry.target.id) {
  case 'home':
    setActive('Home');
    break;

  case 'reviews':
    setActive('Reviews');
    break;

  case 'our-work':
    setActive('Our Work');
    break;

  case 'services':
    setActive('Services');
    break;

          case 'about':
            setActive('About');
            break;

            case 'blog':
           setActive('Blog');
            break;

          case 'contact':
            setActive('Contact Us');
            break;
        }
      },
      {
        threshold: [0.25, 0.5, 0.75],
      }
    );

    sections.forEach((id) => {
      const element = document.getElementById(id);

      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, [pathname, manualNav]);

  /*
   * ----------------------------------------------------
   * Scroll to a section on HOME page
   * ----------------------------------------------------
   */
  const scrollToSection = (sectionId: string) => {
    const section =
      document.getElementById(sectionId);

    if (!section) {
      return false;
    }

    setManualNav(true);

    const navOffset = 0;

    const sectionTop =
      section.getBoundingClientRect().top +
      window.scrollY -
      navOffset;

    window.scrollTo({
      top: Math.max(0, sectionTop),
      behavior: 'smooth',
    });

    const activeLink =
      Object.entries(SECTION_MAP).find(
        ([, id]) => id === sectionId
      )?.[0];

    if (activeLink) {
      setActive(activeLink);
    }

setTimeout(() => {
  setManualNav(false);
}, 900);

    return true;
  };

  /*
   * ----------------------------------------------------
   * INNER PAGE → HOME SCROLL
   * ----------------------------------------------------
   */
  useEffect(() => {
    if (pathname !== '/') {
      return;
    }

    const target = sessionStorage.getItem(
      'havelent-scroll-target'
    );

    if (!target) {
      return;
    }

    sessionStorage.removeItem(
      'havelent-scroll-target'
    );

    const timer = window.setTimeout(() => {
      scrollToSection(target);
    }, 250);

    return () => {
      window.clearTimeout(timer);
    };
  }, [pathname]);

  /*
   * ----------------------------------------------------
   * NAVIGATION
   * ----------------------------------------------------
   */
  const handleNav = (link: string) => {
    if (link === 'Contact Us' && document.getElementById('contact')) {
      setOpen(false);
      scrollToSection('contact');
      return;
    }
    setOpen(false);

    /*
     * HOME
     */
    if (link === 'Home') {
      if (pathname === '/') {
        setManualNav(true);
        setActive('Home');

        window.scrollTo({
          top: 0,
          behavior: 'smooth',
        });

        window.history.replaceState(
          null,
          '',
          '/'
        );

        setTimeout(() => {
          setManualNav(false);
        }, 900);
      } else {
        router.push('/');
      }

      return;
    }

    /*
     * OUR WORK
     *
     * This is a REAL PAGE.
     * It must NOT be treated as a
     * Home section.
     */
if (link === 'Our Work') {
  if (pathname === '/') {
    scrollToSection('our-work');
  } else {
    sessionStorage.setItem(
      'havelent-scroll-target',
      'our-work'
    );

    router.push('/');
  }

  return;
}


    /*
     * SERVICES / ABOUT / CONTACT
     */
    const sectionId = SECTION_MAP[link];

    if (!sectionId) {
      return;
    }

    /*
     * Already on HOME
     */
    if (pathname === '/') {
      scrollToSection(sectionId);
      return;
    }

    /*
     * Inner page → HOME
     */
    sessionStorage.setItem(
      'havelent-scroll-target',
      sectionId
    );

    router.push('/');
  };

  /*
   * ----------------------------------------------------
   * RENDER
   * ----------------------------------------------------
   */
  return (
    <motion.header
      initial={{
        y: -80,
        opacity: 0,
      }}
      animate={{
        y: 0,
        opacity: 1,
      }}
      transition={{
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="
        fixed
        top-4
        left-0
        right-0
        z-[200]
        flex
        justify-center
        px-4
      "
    >
      <nav
        className={`
          navbar-orbit
          glass
          relative
          flex
          items-center
          gap-1
          rounded-[22px]
          border
          border-white/10
          px-2
          py-2
          transition-all
          duration-500
          ${scrolled ? 'navbar-orbit-active' : ''}
        `}
        style={{
          boxShadow:
            '0 4px 24px -6px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.06)',
        }}
      >
        {/* ========================================= */}
        {/* BRAND */}
        {/* ========================================= */}

        <button
          onClick={() => handleNav('Home')}
          className="
            group
            flex
            items-center
            rounded-full
            px-3
            py-2
          "
          data-cursor="button"
        >
          <span
            className="
              relative
              block
              h-10
              w-[120px]
              transition-transform
              duration-300
              group-hover:scale-[1.03]
            "
          >
            {/* Mobile/tablet keeps the current white logo. */}
            <img
              src="/logos/horizontal-white.svg"
              alt="Havelent"
              className="h-10 w-auto lg:hidden"
              draggable={false}
            />

            {/* Desktop logo cross-fade follows the navbar glow state and timing. */}
            <img
              src="/logos/horizontal-white.svg"
              alt="Havelent"
              className={`
                absolute
                inset-0
                hidden
                h-10
                w-auto
                transition-opacity
                duration-500
                lg:block
                ${scrolled ? 'opacity-0' : 'opacity-100'}
              `}
              draggable={false}
            />
            <img
              src="/logos/logo.svg"
              alt=""
              aria-hidden="true"
              className={`
                absolute
                inset-0
                hidden
                h-10
                w-auto
                transition-opacity
                duration-500
                lg:block
                ${scrolled ? 'opacity-100' : 'opacity-0'}
              `}
              draggable={false}
            />
          </span>
        </button>

        {/* ========================================= */}
        {/* DESKTOP LINKS */}
        {/* ========================================= */}

        <div className="ml-1 hidden items-center gap-1 md:flex">
          {LINKS.map((link, i) => (
            <motion.div
              key={link}
              initial={{
                opacity: 0,
                y: -8,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.5,
                delay: 0.5 + i * 0.08,
              }}
            >
              <motion.button
                onClick={() => handleNav(link)}
                data-cursor="button"
                className={`
                  nav-link
                  relative
                  rounded-full
                  px-4
                  py-2
                  text-base
                  font-medium
                  transition-colors
                  duration-300

                  ${
                    active === link
                      ? 'text-brand-orange active'
                      : 'text-white/100 hover:text-brand-orange'
                  }
                `}
              >
                {link}

                <span className="nav-underline" />

                {active === link && (
                  <motion.span
                    layoutId="nav-dot"
                    className="
                      absolute
                      -bottom-0.5
                      left-1/2
                      h-1
                      w-1
                      -translate-x-1/2
                      rounded-full
                      bg-brand-orange
                    "
                    style={{
                      boxShadow:
                        '0 0 8px 2px rgba(249,115,22,0.8)',
                    }}
                  />
                )}
              </motion.button>
            </motion.div>
          ))}
        </div>

        {/* ========================================= */}
        {/* DESKTOP ACTIONS */}
        {/* ========================================= */}

        <div className="hidden items-center gap-3 md:flex">

          {/* DESKTOP THEME BUTTON */}

          <motion.button
            initial={{
              opacity: 0,
              y: -8,
              scale: 0.92,
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            transition={{
              duration: 0.5,
              delay: 0.5 + LINKS.length * 0.08,
              ease: [0.22, 1, 0.36, 1],
            }}
            onClick={toggleTheme}
            whileHover={{
              scale: 1.08,
            }}
            whileTap={{
              scale: 0.9,
            }}
            aria-label={
              theme === 'dark'
                ? 'Switch to Warm Charcoal'
                : 'Switch to Dark Mode'
            }
            className="
              group
              relative
              flex
              h-9
              w-9
              items-center
              justify-center
              overflow-hidden
              rounded-full
              border
              border-white/10
              text-white
              transition-all
              duration-300
              hover:border-orange-500/50
              hover:text-orange-400
            "
          >
            <motion.span
              className="
                absolute
                inset-0
                rounded-full
                bg-orange-500/10
              "
              initial={{
                opacity: 0,
                scale: 0.5,
              }}
              whileHover={{
                opacity: 1,
                scale: 1,
              }}
              transition={{
                duration: 0.3,
              }}
            />

            <AnimatePresence
              mode="wait"
              initial={false}
            >
              <motion.span
                key={theme}
                initial={{
                  opacity: 0,
                  scale: 0.4,
                  rotate: -180,
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  rotate: 0,
                }}
                exit={{
                  opacity: 0,
                  scale: 0.4,
                  rotate: 180,
                }}
                transition={{
                  duration: 0.45,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="
                  relative
                  z-10
                  flex
                  items-center
                  justify-center
                "
              >
                {theme === 'dark' ? (
                  <Moon
                    size={16}
                    strokeWidth={1.8}
                  />
                ) : (
                  <Sun
                    size={16}
                    strokeWidth={1.8}
                  />
                )}
              </motion.span>
            </AnimatePresence>
          </motion.button>

          {/* GET A QUOTE */}

          <motion.button
            initial={{
              opacity: 0,
              y: -8,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.5,
              delay:
                0.58 + LINKS.length * 0.08,
            }}
            data-cursor="button"
            onClick={() =>
              handleNav('Contact Us')
            }
            whileHover={{
              scale: 1.05,
            }}
            whileTap={{
              scale: 0.97,
            }}
            className="
              relative
              overflow-hidden
              rounded-xl
              bg-gradient-to-r
              from-brand-accent
              to-brand-orange
              px-5
              py-2
              text-sm
              font-semibold
              text-white
              transition-all
              duration-300
            "
            style={{
              boxShadow:
                '0 0 20px -4px rgba(249,115,22,0.5)',
            }}
          >
            <span className="relative z-10">
              Get a Quote
            </span>

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
                hover:opacity-100
              "
            />
          </motion.button>
        </div>

        {/* ========================================= */}
        {/* MOBILE THEME BUTTON */}
        {/* ========================================= */}

        <motion.button
          onClick={toggleTheme}
          whileHover={{
            scale: 1.08,
          }}
          whileTap={{
            scale: 0.9,
          }}
          aria-label="Toggle theme"
          className="
            flex
            h-9
            w-9
            items-center
            justify-center
            rounded-full
            border
            border-white/10
            text-white
            transition-all
            duration-300
            hover:border-orange-500/50
            hover:text-orange-400
            md:hidden
          "
        >
          <AnimatePresence
            mode="wait"
            initial={false}
          >
            <motion.span
              key={theme}
              initial={{
                opacity: 0,
                scale: 0.5,
                rotate: -90,
              }}
              animate={{
                opacity: 1,
                scale: 1,
                rotate: 0,
              }}
              exit={{
                opacity: 0,
                scale: 0.5,
                rotate: 90,
              }}
              transition={{
                duration: 0.3,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="
                flex
                items-center
                justify-center
              "
            >
              {theme === 'dark' ? (
                <Moon
                  size={16}
                  strokeWidth={1.8}
                />
              ) : (
                <Sun
                  size={16}
                  strokeWidth={1.8}
                />
              )}
            </motion.span>
          </AnimatePresence>
        </motion.button>

        {/* ========================================= */}
        {/* MOBILE MENU TOGGLE */}
        {/* ========================================= */}

        <button
          onClick={() =>
            setOpen((o) => !o)
          }
          className="
            ml-1
            flex
            h-9
            w-9
            items-center
            justify-center
            rounded-full
            border
            border-white/10
            text-white
            transition-all
            duration-300
            hover:border-orange-500/40
            hover:text-orange-400
            md:hidden
          "
          aria-label="Menu"
        >
          <AnimatePresence
            mode="wait"
            initial={false}
          >
            <motion.span
              key={open ? 'close' : 'menu'}
              initial={{
                opacity: 0,
                scale: 0.5,
                rotate: -90,
              }}
              animate={{
                opacity: 1,
                scale: 1,
                rotate: 0,
              }}
              exit={{
                opacity: 0,
                scale: 0.5,
                rotate: 90,
              }}
              transition={{
                duration: 0.25,
              }}
            >
              {open ? (
                <X size={16} />
              ) : (
                <Menu size={16} />
              )}
            </motion.span>
          </AnimatePresence>
        </button>
      </nav>

      {/* ========================================= */}
      {/* MOBILE MENU */}
      {/* ========================================= */}

      <AnimatePresence>
        {open && (
          <motion.div
            ref={mobileMenuRef}
            initial={{
              opacity: 0,
              y: -12,
              scale: 0.98,
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              y: -12,
              scale: 0.98,
            }}
            transition={{
              duration: 0.3,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="
              glass
              absolute
              left-4
              right-4
              top-0
              rounded-3xl
              border
              border-white/10
              p-4
              md:hidden
            "
          >
            {LINKS.map((link, index) => (
              <motion.button
                key={link}
                initial={{
                  opacity: 0,
                  x: -8,
                }}
                animate={{
                  opacity: 1,
                  x: 0,
                }}
                transition={{
                  duration: 0.25,
                  delay: index * 0.04,
                }}
                onClick={() =>
                  handleNav(link)
                }
                className={`
                  block
                  w-full
                  rounded-2xl
                  px-4
                  py-3
                  text-left
                  text-sm
                  font-medium
                  transition-colors

                  ${
                    active === link
                      ? 'bg-brand-orange/10 text-brand-orange'
                      : 'text-white/80 hover:text-brand-orange'
                  }
                `}
              >
                {link}
              </motion.button>
            ))}

            {/* GET A FREE QUOTE */}

            <div className="mt-3">
              <motion.button
                whileHover={{
                  scale: 1.02,
                }}
                whileTap={{
                  scale: 0.98,
                }}
                onClick={() =>
                  handleNav('Contact Us')
                }
                data-cursor="button"
                className="
                  relative
                  w-full
                  overflow-hidden
                  rounded-xl
                  bg-gradient-to-r
                  from-brand-accent
                  to-brand-orange
                  px-5
                  py-3
                  text-sm
                  font-semibold
                  text-white
                "
                style={{
                  boxShadow:
                    '0 0 20px -4px rgba(249,115,22,0.5)',
                }}
              >
                <span className="relative z-10">
                  Get a Free Quote
                </span>

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
                    hover:opacity-100
                  "
                />
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx>{`
        @property --navbar-orbit-angle {
          syntax: '<angle>';
          inherits: false;
          initial-value: 0deg;
        }

        @keyframes navbarOrbit {
          to {
            --navbar-orbit-angle: 360deg;
          }
        }

        @media (min-width: 1024px) {
          .navbar-orbit::before {
            content: '';
            position: absolute;
            inset: -1px;
            z-index: 20;
            border-radius: inherit;
            padding: 1.5px;
            pointer-events: none;
            opacity: 0;
            background: conic-gradient(
              from var(--navbar-orbit-angle),
              transparent 0deg 285deg,
              rgba(194, 65, 12, 0.45) 310deg,
              rgba(249, 115, 22, 1) 336deg,
              rgba(255, 186, 120, 0.9) 346deg,
              transparent 360deg
            );
            -webkit-mask:
              linear-gradient(#000 0 0) content-box,
              linear-gradient(#000 0 0);
            -webkit-mask-composite: xor;
            mask-composite: exclude;
            transition: opacity 0.5s ease;
          }

          .navbar-orbit-active::before {
            opacity: 1;
            animation: navbarOrbit 3.8s cubic-bezier(0.45, 0, 0.55, 1) infinite alternate;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .navbar-orbit-active::before {
            animation: none;
          }
        }
      `}</style>
    </motion.header>
  );
}