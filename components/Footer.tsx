'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import {
  motion,
  AnimatePresence,
} from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const COMPANY_LINKS = [
  {
    name: 'Home',
    section: 'home',
  },
  {
    name: 'Our Work',
    section: 'our-work',
  },
  {
    name: 'Services',
    section: 'services',
  },
  {
    name: 'About',
    section: 'about',
  },
  {
    name: 'Contact Us',
    section: 'contact',
  },
];

const SERVICE_GROUPS = [
  {
    title: 'Video Editing',
    services: [
      'YouTube Video Editing',
      'Commercial & Ads Editing',
      'Podcast Editing',
      'Shorts & Reels Editing',
      'Documentary Editing',
      'Motion Graphics',
    ],
  },
  {
    title: 'Graphic Design',
    services: [
      'Logo Design',
      'Poster Design',
      'Business Card Design',
      'Invitation Card Design',
      'Brand Identity',
      'Social Media Design',
    ],
  },
  {
    title: 'Digital Marketing',
    services: [
      'YouTube Ads',
      'Facebook Ads',
      'Instagram Ads',
      'TikTok Ads',
      'Campaign Strategy',
      'Performance Analytics',
    ],
  },
  {
    title: 'Social Media Management',
    services: [
      'Content Strategy',
      'Content Creation',
      'Account Management',
      'Community Management',
      'Social Media Advertising',
      'Analytics & Reporting',
    ],
  },
];

export default function Footer() {
  const [openGroup, setOpenGroup] =
    useState<string | null>(null);

  const pathname = usePathname();


  /*
   * ====================================================
   * FIND SCROLLABLE PARENT
   * ====================================================
   */
  const getScrollParent = (
    element: HTMLElement
  ): HTMLElement | Window => {
    let parent =
      element.parentElement;

    while (parent) {
      const style =
        window.getComputedStyle(parent);

      const overflowY =
        style.overflowY;

      const canScroll =
        (overflowY === 'auto' ||
          overflowY === 'scroll') &&
        parent.scrollHeight >
          parent.clientHeight;

      if (canScroll) {
        return parent;
      }

      parent =
        parent.parentElement;
    }

    return window;
  };


  /*
   * ====================================================
   * ACTUAL SCROLL FUNCTION
   * ====================================================
   */
  const scrollToSection = (
    sectionId: string
  ) => {
    let attempts = 0;

    const tryScroll = () => {
      const element =
        document.getElementById(
          sectionId
        );

      /*
       * Section not mounted yet
       */
      if (!element) {
        attempts += 1;

        if (attempts < 40) {
          window.setTimeout(
            tryScroll,
            100
          );
        }

        return;
      }


      /*
       * Close mobile accordion
       */
      setOpenGroup(null);


      /*
       * Small delay makes this reliable
       * after React/Framer Motion layout.
       */
      window.requestAnimationFrame(() => {
        window.requestAnimationFrame(() => {

          const scrollParent =
            getScrollParent(
              element
            );

          const navOffset = 0;


          /*
           * ==========================================
           * NORMAL WINDOW SCROLL
           * ==========================================
           */
          if (
            scrollParent ===
            window
          ) {
            const rect =
              element.getBoundingClientRect();

            const currentScroll =
              window.pageYOffset ||
              document.documentElement
                .scrollTop ||
              document.body.scrollTop ||
              0;

            const target =
              currentScroll +
              rect.top -
              navOffset;

            window.scrollTo({
              top: Math.max(
                0,
                target
              ),
              behavior: 'smooth',
            });

          }


          /*
           * ==========================================
           * CUSTOM SCROLL CONTAINER
           * ==========================================
           */
else if (
  scrollParent instanceof HTMLElement
) {
  const parentRect =
    scrollParent.getBoundingClientRect();

  const elementRect =
    element.getBoundingClientRect();

  const target =
    scrollParent.scrollTop +
    (elementRect.top -
      parentRect.top) -
    navOffset;

  scrollParent.scrollTo({
    top: Math.max(
      0,
      target
    ),
    behavior: 'smooth',
  });
}


          /*
           * Update URL only AFTER
           * the scroll command.
           */
          if (
            sectionId ===
            'home'
          ) {
            window.history.replaceState(
              null,
              '',
              '/'
            );
          } else {
            window.history.replaceState(
              null,
              '',
              `#${sectionId}`
            );
          }

        });
      });
    };

    tryScroll();
  };


  /*
   * ====================================================
   * HANDLE HASH AFTER PAGE LOAD
   * ====================================================
   *
   * This is important when:
   *
   * Service Page
   *      ↓
   * Footer → Services
   *      ↓
   * Homepage loads
   *      ↓
   * #services
   *      ↓
   * Footer finds it
   *      ↓
   * Scroll
   */
  useEffect(() => {
    if (
      pathname !== '/'
    ) {
      return;
    }

    const hash =
      window.location.hash.replace(
        '#',
        ''
      );

    if (!hash) {
      return;
    }

    const timer =
      window.setTimeout(() => {
        scrollToSection(hash);
      }, 300);

    return () => {
      window.clearTimeout(
        timer
      );
    };
  }, [pathname]);


  /*
   * ====================================================
   * FOOTER LINK
   * ====================================================
   */
  const handleFooterNav = (
    section: string
  ) => {
    setOpenGroup(null);


    /*
     * ==========================================
     * HOME
     * ==========================================
     */
    if (
      section === 'home'
    ) {
      if (
        pathname === '/'
      ) {
        scrollToSection(
          'home'
        );
      } else {
        window.location.href =
          '/#home';
      }

      return;
    }


    /*
     * ==========================================
     * HOMEPAGE
     * ==========================================
     */
    if (
      pathname === '/'
    ) {
      scrollToSection(
        section
      );

      return;
    }


    /*
     * ==========================================
     * INNER PAGE
     * ==========================================
     *
     * Full browser navigation guarantees
     * the homepage is loaded first.
     */
    window.location.href =
      `/#${section}`;
  };


  /*
   * ====================================================
   * MOBILE ACCORDION
   * ====================================================
   */
  const toggleGroup = (
    title: string
  ) => {
    setOpenGroup(
      (current) =>
        current === title
          ? null
          : title
    );
  };


  return (
    <footer
      className="
        relative
        border-t
        border-white/10
        px-6
        py-16
      "
    >
      <div
        className="
          mx-auto
          max-w-7xl
        "
      >

        {/* ========================================= */}
        {/* DESKTOP */}
        {/* ========================================= */}

        <div
          className="
            hidden
            items-stretch
            lg:grid
            lg:grid-cols-[1.2fr_0.75fr_1.15fr_1.15fr_1.2fr_1.35fr]
            lg:gap-6
          "
        >

          {/* BRAND */}
          <div>

            <div
              className="
                flex
                items-center
              "
            >

              <img
                src="/logos/horizontal-white.svg"
                alt="Havelent"
                className="
                  h-10
                  w-auto
                "
                draggable={false}
              />

            </div>

            <p
              className="
                mt-4
                max-w-xs
                text-sm
                leading-relaxed
                text-white/50
              "
            >
              A premium digital agency crafting
              cinematic experiences for visionary
              brands worldwide.
            </p>

          </div>


          {/* QUICK LINKS */}
          <div
            className="
              flex
              h-full
              min-h-[250px]
              flex-col
            "
          >

            <h4
              className="
                text-xs
                font-medium
                uppercase
                tracking-[0.2em]
                text-white
              "
            >
              Quick Links
            </h4>

            <div
              className="
                mt-3
                h-px
                w-10
                bg-brand-orange/70
              "
            />

            <ul
              className="
                mt-5
                space-y-4
              "
            >

              {COMPANY_LINKS.map(
                (link) => (
                  <li
                    key={link.name}
                  >

                    <button
                      type="button"
                      onClick={() =>
                        handleFooterNav(
                          link.section
                        )
                      }
                      className="
                        group
                        flex
                        items-center
                        gap-3
                        text-left
                      "
                    >

                      <span
                        className="
                          text-[10px]
                          font-medium
                          tracking-wide
                          text-white/30
                          transition-colors
                          duration-300
                          group-hover:text-brand-orange
                        "
                      >
                        →
                      </span>

                      <span
                        className="
                          relative
                          inline-block
                          text-sm
                          text-white/65
                          transition-colors
                          duration-300
                          group-hover:text-brand-orange
                        "
                      >
                        {link.name}

                        <span
                          className="
                            absolute
                            -bottom-0.5
                            left-0
                            h-px
                            w-0
                            bg-brand-orange
                            transition-all
                            duration-300
                            group-hover:w-full
                          "
                        />

                      </span>

                    </button>

                  </li>
                )
              )}

            </ul>

          </div>


          {/* SERVICE GROUPS */}
          {SERVICE_GROUPS.map(
            (group) => {

              const serviceHref =
                group.title ===
                'Video Editing'
                  ? '/services/video-editing'
                  : group.title ===
                    'Graphic Design'
                    ? '/services/graphic-design'
                    : group.title ===
                      'Digital Marketing'
                      ? '/services/digitalmarketing'
                      : '/services/social-media-management';

              return (
                <div
                  key={
                    group.title
                  }
                  className="
                    flex
                    h-full
                    min-h-[250px]
                    flex-col
                  "
                >

                  <a
                    href={
                      serviceHref
                    }
                    className="
                      whitespace-nowrap
                      text-xs
                      font-medium
                      uppercase
                      tracking-[0.12em]
                      text-white
                      transition-colors
                      duration-300
                      hover:text-brand-orange
                    "
                  >
                    {group.title}
                  </a>

                  <div
                    className="
                      mt-3
                      h-px
                      w-10
                      bg-brand-orange/70
                    "
                  />

                  <ul
                    className="
                      mt-5
                      space-y-3
                    "
                  >

                    {group.services.map(
                      (
                        service,
                        index
                      ) => (

                        <li
                          key={
                            service
                          }
                        >

                          <div
                            className="
                              flex
                              items-start
                              gap-2
                              text-sm
                              text-white/60
                            "
                          >

                            <span
                              className="
                                text-[10px]
                                font-medium
                                text-brand-orange/80
                              "
                            >
                              {String(
                                index + 1
                              ).padStart(
                                2,
                                '0'
                              )}
                            </span>

                            <span>
                              {service}
                            </span>

                          </div>

                        </li>

                      )
                    )}

                  </ul>

                </div>
              );
            }
          )}

        </div>


        {/* ========================================= */}
        {/* MOBILE */}
        {/* ========================================= */}

        <div
          className="
            lg:hidden
          "
        >

          {/* BRAND */}

          <div
            className="
              pb-8
            "
          >

            <div
              className="
                flex
                items-center
              "
            >

              <img
                src="/logos/horizontal-white.svg"
                alt="Havelent"
                className="
                  h-10
                  w-auto
                "
                draggable={false}
              />

            </div>

            <p
              className="
                mt-4
                max-w-sm
                text-sm
                leading-relaxed
                text-white/50
              "
            >
              A premium digital agency crafting
              cinematic experiences for visionary
              brands worldwide.
            </p>

          </div>


          {/* QUICK LINKS */}

          <div
            className="
              border-t
              border-white/10
            "
          >

            <button
              type="button"
              onClick={() =>
                toggleGroup(
                  'Quick Links'
                )
              }
              className="
                flex
                w-full
                items-center
                justify-between
                py-5
                text-left
              "
            >

              <span
                className="
                  text-xs
                  font-semibold
                  uppercase
                  tracking-[0.2em]
                  text-brand-orange
                "
              >
                Quick Links
              </span>

              <motion.span
                animate={{
                  rotate:
                    openGroup ===
                    'Quick Links'
                      ? 180
                      : 0,
                }}
                transition={{
                  duration: 0.25,
                }}
              >

                <ChevronDown
                  size={18}
                  className="
                    text-white/60
                  "
                />

              </motion.span>

            </button>


            <AnimatePresence
              initial={false}
            >

              {openGroup ===
                'Quick Links' && (

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
                  className="
                    overflow-hidden
                  "
                >

                  <ul
                    className="
                      space-y-3
                      pb-5
                    "
                  >

                    {COMPANY_LINKS.map(
                      (link) => (
                        <li
                          key={
                            link.name
                          }
                        >

                          <button
                            type="button"
                            onClick={() =>
                              handleFooterNav(
                                link.section
                              )
                            }
                            className="
                              group
                              flex
                              items-center
                              gap-3
                              text-left
                              text-sm
                              text-white/65
                              transition-colors
                              duration-300
                              hover:text-brand-orange
                            "
                          >

                            <span
                              className="
                                text-[10px]
                                text-white/30
                                transition-colors
                                duration-300
                                group-hover:text-brand-orange
                              "
                            >
                              →
                            </span>

                            <span>
                              {
                                link.name
                              }
                            </span>

                          </button>

                        </li>
                      )
                    )}

                  </ul>

                </motion.div>
              )}

            </AnimatePresence>

          </div>


          {/* SERVICE ACCORDIONS */}

          {SERVICE_GROUPS.map(
            (group) => {

              const isOpen =
                openGroup ===
                group.title;

              return (
                <div
                  key={
                    group.title
                  }
                  className="
                    border-t
                    border-white/10
                  "
                >

                  <button
                    type="button"
                    onClick={() =>
                      toggleGroup(
                        group.title
                      )
                    }
                    className="
                      flex
                      w-full
                      items-center
                      justify-between
                      py-5
                      text-left
                    "
                  >

                    <span
                      className="
                        text-xs
                        font-semibold
                        uppercase
                        tracking-[0.15em]
                        text-white
                      "
                    >
                      {group.title}
                    </span>

                    <motion.span
                      animate={{
                        rotate:
                          isOpen
                            ? 180
                            : 0,
                      }}
                      transition={{
                        duration: 0.25,
                      }}
                    >

                      <ChevronDown
                        size={18}
                        className="
                          text-white/60
                        "
                      />

                    </motion.span>

                  </button>


                  <AnimatePresence
                    initial={false}
                  >

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
                        className="
                          overflow-hidden
                        "
                      >

                        <ul
                          className="
                            space-y-3
                            pb-5
                          "
                        >

                          {group.services.map(
                            (
                              service,
                              index
                            ) => (

                              <li
                                key={
                                  service
                                }
                              >

                                <div
                                  className="
                                    flex
                                    items-start
                                    gap-3
                                    text-sm
                                    text-white/60
                                  "
                                >

                                  <span
                                    className="
                                      text-[10px]
                                      font-medium
                                      text-brand-orange/80
                                    "
                                  >
                                    {String(
                                      index + 1
                                    ).padStart(
                                      2,
                                      '0'
                                    )}
                                  </span>

                                  <span>
                                    {service}
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
            }
          )}

        </div>


        {/* ========================================= */}
        {/* BOTTOM */}
        {/* ========================================= */}

        <motion.div
          initial={{
            opacity: 0,
          }}
          whileInView={{
            opacity: 1,
          }}
          viewport={{
            once: true,
          }}
          className="
            mt-12
            flex
            flex-col
            items-center
            justify-between
            gap-4
            border-t
            border-white/10
            pt-8
            text-xs
            text-white/40
            sm:flex-row
          "
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