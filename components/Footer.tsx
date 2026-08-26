'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import {
  motion,
  AnimatePresence,
} from 'framer-motion';
import { ChevronDown, X, Linkedin } from 'lucide-react';

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

  const [reportOpen, setReportOpen] =
    useState(false);

  const [reportMessage, setReportMessage] =
    useState('');

  const [reportEmail, setReportEmail] =
    useState('');

  const [reportLoading, setReportLoading] =
    useState(false);

  const [reportSent, setReportSent] =
    useState(false);

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


  /*
   * ====================================================
   * REPORT A PROBLEM
   * ====================================================
   */
  const handleReportSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    if (!reportEmail.trim() || !reportMessage.trim()) {
      return;
    }

    setReportLoading(true);

    try {
      const res = await fetch(
        '/api/report-problem',
        {
          method: 'POST',
          headers: {
            'Content-Type':
              'application/json',
          },
          body: JSON.stringify({
            name: 'Website Visitor',
            email: reportEmail,
            message: reportMessage,
          }),
        }
      );

      const data =
        await res.json();

      if (data.success) {
        setReportSent(true);
        setReportMessage('');
        setReportEmail('');

        setTimeout(() => {
          setReportSent(false);
          setReportOpen(false);
        }, 2000);
      } else {
        alert(
          'Failed to submit report.'
        );
      }
    } catch (error) {
      console.error(error);
      alert(
        'Something went wrong.'
      );
    }

    setReportLoading(false);
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
      {/* REPORT A PROBLEM — TOP RIGHT */}
      <button
        type="button"
        onClick={() =>
          setReportOpen(true)
        }
        data-cursor="button"
        className="
          absolute
          right-6
          top-5
          z-20
          text-xs
          font-medium
          text-white/45
          transition-colors
          duration-300
          hover:text-brand-orange
        "
      >
        Report a Problem
      </button>

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


            <a
  href="https://www.linkedin.com/in/abdullah-rajpoot-havelent/"
  target="_blank"
  rel="noopener noreferrer"
  aria-label="Havelent on LinkedIn"
  className="
    mt-6
    inline-flex
    items-center
    justify-center
    text-white/50
    transition-colors
    duration-300
    hover:text-brand-orange
  "
>
  <Linkedin
    size={20}
    strokeWidth={1.8}
  />
</a>

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


            <a
  href="https://www.linkedin.com/in/abdullah-rajpoot-havelent/"
  target="_blank"
  rel="noopener noreferrer"
  aria-label="Havelent on LinkedIn"
  className="
    mt-6
    inline-flex
    items-center
    justify-center
    text-white/50
    transition-colors
    duration-300
    hover:text-brand-orange
  "
>
  <Linkedin
    size={20}
    strokeWidth={1.8}
  />
</a>

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
            © {new Date().getFullYear()} Havelent.
            All rights reserved.
          </span>

          <span>
            Designed & built with obsession.
          </span>

        </motion.div>

      </div>


      {/* ========================================= */}
      {/* REPORT A PROBLEM MODAL */}
      {/* ========================================= */}

      <AnimatePresence>
        {reportOpen && (
          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            className="
              fixed
              inset-0
              z-[100]
              flex
              items-center
              justify-center
              bg-black/70
              px-6
              backdrop-blur-md
            "
            onClick={() =>
              setReportOpen(false)
            }
          >
            <motion.div
              initial={{
                opacity: 0,
                y: 25,
                scale: 0.96,
              }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
              }}
              exit={{
                opacity: 0,
                y: 25,
                scale: 0.96,
              }}
              transition={{
                duration: 0.3,
              }}
              onClick={(e) =>
                e.stopPropagation()
              }
              className="
                relative
                w-full
                max-w-lg
                overflow-hidden
                rounded-[1.5rem]
                border
                border-white/[0.15]
                bg-[#0b0b0b]/95
                p-7
                shadow-[0_30px_100px_-30px_rgba(0,0,0,0.95)]
                backdrop-blur-[30px]
              "
            >

              {/* Orange Glow */}
              <div
                aria-hidden="true"
                className="
                  pointer-events-none
                  absolute
                  -right-24
                  -top-24
                  h-48
                  w-48
                  rounded-full
                  bg-brand-orange/20
                  blur-[80px]
                "
              />

              {/* Close */}
              <button
                type="button"
                onClick={() =>
                  setReportOpen(false)
                }
                data-cursor="button"
                className="
                  absolute
                  right-5
                  top-5
                  z-20
                  flex
                  h-8
                  w-8
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-white/10
                  bg-white/5
                  text-white/50
                  transition-colors
                  hover:text-white
                "
                aria-label="Close"
              >
                <X size={16} />
              </button>

              <div className="relative z-10">

                <span
                  className="
                    text-xs
                    font-medium
                    uppercase
                    tracking-[0.2em]
                    text-brand-orange
                  "
                >
                  Website Feedback
                </span>

                <h3
                  className="
                    mt-3
                    font-display
                    text-2xl
                    font-semibold
                    text-white
                  "
                >
                  Report a Problem
                </h3>

                <p
                  className="
                    mt-2
                    text-sm
                    leading-relaxed
                    text-white/50
                  "
                >
                  Found something that isn't working correctly?
                  Let us know. Please include your email address so our team
                  can follow up, discuss the issue with you, and make sure
                  everything is resolved to your satisfaction.
                </p>

                <form
                  onSubmit={
                    handleReportSubmit
                  }
                  className="
                    mt-6
                    flex
                    flex-col
                    gap-4
                  "
                >

                  <input
                    required
                    type="email"
                    value={reportEmail}
                    onChange={(e) =>
                      setReportEmail(
                        e.target.value
                      )
                    }
                    placeholder="Your email address"
                    className="
                      rounded-xl
                      border
                      border-white/10
                      bg-white/5
                      px-4
                      py-3
                      text-sm
                      text-white
                      placeholder:text-white/35
                      outline-none
                      transition-colors
                      focus:border-brand-orange
                    "
                  />

                  <textarea
                    required
                    rows={6}
                    value={
                      reportMessage
                    }
                    onChange={(e) =>
                      setReportMessage(
                        e.target.value
                      )
                    }
                    placeholder="Tell us what went wrong..."
                    className="
                      resize-none
                      rounded-xl
                      border
                      border-white/10
                      bg-white/5
                      px-4
                      py-3
                      text-sm
                      text-white
                      placeholder:text-white/35
                      outline-none
                      transition-colors
                      focus:border-brand-orange
                    "
                  />

                  <button
                    type="submit"
                    disabled={
                      reportLoading ||
                      reportSent
                    }
                    data-cursor="button"
                    className="
                      inline-flex
                      items-center
                      justify-center
                      rounded-xl
                      bg-gradient-to-r
                      from-brand-accent
                      to-brand-orange
                      px-6
                      py-3.5
                      text-sm
                      font-semibold
                      text-white
                      transition-opacity
                      disabled:cursor-not-allowed
                      disabled:opacity-60
                    "
                  >
                    {reportLoading
                      ? 'Submitting...'
                      : reportSent
                        ? 'Report submitted'
                        : 'Submit Report'}
                  </button>

                </form>

              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </footer>
  );
}