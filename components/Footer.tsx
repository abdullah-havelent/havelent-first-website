'use client';

import { useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const COMPANY_LINKS = [
  { name: 'Home', section: 'home' },
  { name: 'Our Work', section: 'our-work' },
  { name: 'Services', section: 'services' },
  { name: 'About', section: 'about' },
  { name: 'Contact Us', section: 'contact' },
];

const SERVICE_GROUPS = [
  {
    title: 'Video Editing',
    services: [
      { name: 'YouTube Video Editing', href: '#' },
      { name: 'Commercial & Ads Editing', href: '#' },
      { name: 'Podcast Editing', href: '#' },
      { name: 'Shorts & Reels Editing', href: '#' },
      { name: 'Documentary Editing', href: '#' },
      { name: 'Motion Graphics', href: '#' },
    ],
  },

  {
    title: 'Graphic Design',
    services: [
      { name: 'Logo Design', href: '#' },
      { name: 'Poster Design', href: '#' },
      { name: 'Business Card Design', href: '#' },
      { name: 'Invitation Card Design', href: '#' },
      { name: 'Brand Identity', href: '#' },
      { name: 'Social Media Design', href: '#' },
    ],
  },

  {
    title: 'Digital Marketing',
    services: [
      { name: 'YouTube Ads', href: '#' },
      { name: 'Facebook Ads', href: '#' },
      { name: 'Instagram Ads', href: '#' },
      { name: 'TikTok Ads', href: '#' },
      { name: 'Campaign Strategy', href: '#' },
      { name: 'Performance Analytics', href: '#' },
    ],
  },

  {
    title: 'Social Media Management',
    services: [
      { name: 'Content Strategy', href: '#' },
      { name: 'Content Creation', href: '#' },
      { name: 'Account Management', href: '#' },
      { name: 'Community Management', href: '#' },
      { name: 'Social Media Advertising', href: '#' },
      { name: 'Analytics & Reporting', href: '#' },
    ],
  },
];

export default function Footer() {
  const [openGroup, setOpenGroup] = useState<string | null>(null);

  const router = useRouter();
  const pathname = usePathname();

  /*
   * ----------------------------------------------------
   * FOOTER NAVIGATION
   * ----------------------------------------------------
   *
   * Homepage:
   *     Smooth scroll to exact section.
   *
   * Inner page:
   *     Save requested section.
   *     Go homepage.
   *     Navbar will scroll to that section after Home loads.
   */
  const handleFooterNav = (section: string) => {
    setOpenGroup(null);

    /*
     * HOME
     */
    if (section === 'home') {
      if (pathname === '/') {
        window.scrollTo({
          top: 0,
          behavior: 'smooth',
        });

        window.history.replaceState(null, '', '/');
      } else {
        sessionStorage.setItem(
          'havelent-scroll-target',
          'home'
        );

        router.push('/');
      }

      return;
    }

    /*
     * HOMEPAGE
     */
    if (pathname === '/') {
      const element = document.getElementById(section);

      if (element) {
        const navOffset = 100;

        const sectionTop =
          element.getBoundingClientRect().top +
          window.scrollY -
          navOffset;

        window.scrollTo({
          top: Math.max(0, sectionTop),
          behavior: 'smooth',
        });

        window.history.replaceState(
          null,
          '',
          `#${section}`
        );
      }

      return;
    }

    /*
     * INNER PAGE
     *
     * Save target section first.
     * Navbar will read this after homepage loads.
     */
    sessionStorage.setItem(
      'havelent-scroll-target',
      section
    );

    router.push('/');
  };

  const toggleGroup = (title: string) => {
    setOpenGroup((current) =>
      current === title ? null : title
    );
  };

  return (
    <footer className="relative border-t border-white/10 px-6 py-16">
      <div className="mx-auto max-w-7xl">

        {/* ============================= */}
        {/* DESKTOP FOOTER */}
        {/* ============================= */}

        <div className="hidden lg:grid lg:grid-cols-[1.2fr_0.75fr_1.15fr_1.15fr_1.2fr_1.35fr] lg:gap-6">

          {/* Brand */}
          <div>
            <div className="flex items-center">
              <img
                src="/logos/horizontal-white.svg"
                alt="Havelent"
                className="h-10 w-auto"
                draggable={false}
              />
            </div>

            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/50">
              A premium digital agency crafting cinematic experiences for
              visionary brands worldwide.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-medium uppercase tracking-[0.2em] text-white/40">
              Quick Links
            </h4>

            <ul className="mt-5 space-y-3">
              {COMPANY_LINKS.map((link) => (
                <li key={link.name}>
                  <button
                    type="button"
                    onClick={() =>
                      handleFooterNav(link.section)
                    }
                    className="group relative inline-block text-sm text-white/65 transition-colors duration-300 hover:text-brand-orange"
                  >
                    {link.name}

                    <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-brand-orange transition-all duration-300 group-hover:w-full" />
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Service Groups */}
          {SERVICE_GROUPS.map((group) => (
            <div key={group.title}>
              <h4 className="whitespace-nowrap text-xs font-medium uppercase tracking-[0.12em] text-white/40">
                {group.title}
              </h4>

              <ul className="mt-5 space-y-3">
                {group.services.map((service, index) => (
                  <li key={service.name}>
                    <div className="flex items-start gap-2 text-sm text-white/65">
                      <span className="text-[10px] font-medium text-brand-orange/80">
                        {String(index + 1).padStart(2, '0')}
                      </span>

                      <span>{service.name}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>


        {/* ============================= */}
        {/* MOBILE FOOTER */}
        {/* ============================= */}

        <div className="lg:hidden">

          {/* Brand */}
          <div className="pb-8">
            <div className="flex items-center">
              <img
                src="/logos/horizontal-white.svg"
                alt="Havelent"
                className="h-10 w-auto"
                draggable={false}
              />
            </div>

            <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/50">
              A premium digital agency crafting cinematic experiences for
              visionary brands worldwide.
            </p>
          </div>


          {/* Company Accordion */}
          <div className="border-t border-white/10">
            <button
              type="button"
              onClick={() => toggleGroup('Company')}
              className="flex w-full items-center justify-between py-5 text-left"
            >
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-orange">
                Company
              </span>

              <motion.span
                animate={{
                  rotate:
                    openGroup === 'Company' ? 180 : 0,
                }}
                transition={{ duration: 0.25 }}
              >
                <ChevronDown
                  size={18}
                  className="text-white/60"
                />
              </motion.span>
            </button>

            <AnimatePresence initial={false}>
              {openGroup === 'Company' && (
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
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <ul className="space-y-3 pb-5">
                    {COMPANY_LINKS.map((link) => (
                      <li key={link.name}>
                        <button
                          type="button"
                          onClick={() =>
                            handleFooterNav(
                              link.section
                            )
                          }
                          className="block text-left text-sm text-white/65 transition-colors duration-300 hover:text-brand-orange"
                        >
                          {link.name}
                        </button>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </div>


          {/* Service Accordions */}
          {SERVICE_GROUPS.map((group) => {
            const isOpen =
              openGroup === group.title;

            return (
              <div
                key={group.title}
                className="border-t border-white/10"
              >
                <button
                  type="button"
                  onClick={() =>
                    toggleGroup(group.title)
                  }
                  className="flex w-full items-center justify-between py-5 text-left"
                >
                  <span className="text-xs font-semibold uppercase tracking-[0.15em] text-brand-orange">
                    {group.title}
                  </span>

                  <motion.span
                    animate={{
                      rotate: isOpen ? 180 : 0,
                    }}
                    transition={{
                      duration: 0.25,
                    }}
                  >
                    <ChevronDown
                      size={18}
                      className="text-white/60"
                    />
                  </motion.span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
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
                        duration: 0.3,
                      }}
                      className="overflow-hidden"
                    >
                      <ul className="space-y-3 pb-5">
                        {group.services.map(
                          (service, index) => (
                            <li
                              key={service.name}
                            >
                              <div className="flex items-start gap-3 text-sm text-white/65">
                                <span className="text-[10px] font-medium text-brand-orange/80">
                                  {String(
                                    index + 1
                                  ).padStart(
                                    2,
                                    '0'
                                  )}
                                </span>

                                <span>
                                  {service.name}
                                </span>
                              </div>
                            </li>
                          )
                        )}
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>


        {/* ============================= */}
        {/* BOTTOM */}
        {/* ============================= */}

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-xs text-white/40 sm:flex-row"
        >
          <span>
            © {new Date().getFullYear()} Havelent Studio.
            All rights reserved.
          </span>

          <span>
            Designed & built with obsession.
          </span>
        </motion.div>

      </div>
    </footer>
  );
}