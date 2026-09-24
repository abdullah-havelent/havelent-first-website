'use client';

import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from 'framer-motion';
import { ArrowRight, Check, Coffee, Mail, User, X } from 'lucide-react';
import { FormEvent, useEffect, useState } from 'react';

type SubmitState = 'idle' | 'loading' | 'success' | 'error';

export default function BrandContactPopup() {
  const [open, setOpen] = useState(false);
  const [desktopMotion, setDesktopMotion] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [submitState, setSubmitState] = useState<SubmitState>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 768px)');
    const updateMotionPreference = () => setDesktopMotion(mediaQuery.matches);

    updateMotionPreference();
    mediaQuery.addEventListener('change', updateMotionPreference);

    const timer = window.setTimeout(() => {
      setOpen(true);
    }, 3000);

    return () => {
      window.clearTimeout(timer);
      mediaQuery.removeEventListener('change', updateMotionPreference);
    };
  }, []);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', closeOnEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', closeOnEscape);
    };
  }, [open]);

  const shouldAnimate = desktopMotion && !prefersReducedMotion;

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (submitState === 'loading') return;

    setSubmitState('loading');
    setErrorMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          company: '10-minute coffee chat popup',
          message:
            'I would like to schedule a free 10-minute coffee chat to discuss my project.',
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || 'Unable to send your request.');
      }

      setSubmitState('success');
      setName('');
      setEmail('');
    } catch (error) {
      setSubmitState('error');
      setErrorMessage(
        error instanceof Error
          ? error.message
          : 'Unable to send your request. Please try again.'
      );
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={shouldAnimate ? { opacity: 0 } : false}
          animate={{ opacity: 1 }}
          exit={shouldAnimate ? { opacity: 0 } : undefined}
          transition={{ duration: 0.28 }}
          className="fixed inset-0 z-[110] flex items-center justify-center overflow-y-auto bg-black/75 px-4 py-5 backdrop-blur-md sm:px-6"
          onClick={() => setOpen(false)}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="brand-contact-popup-title"
            aria-describedby="brand-contact-popup-description"
            initial={
              shouldAnimate
                ? { opacity: 0, y: 24, scale: 0.97 }
                : false
            }
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={
              shouldAnimate
                ? { opacity: 0, y: 18, scale: 0.98 }
                : undefined
            }
            transition={{
              duration: 0.36,
              ease: [0.22, 1, 0.36, 1],
            }}
            onClick={(event) => event.stopPropagation()}
            className="relative my-auto w-full max-w-lg overflow-hidden rounded-[1.5rem] border border-white/[0.14] bg-[#0a0a0a]/95 px-5 py-7 shadow-[0_35px_120px_-35px_rgba(0,0,0,0.98)] backdrop-blur-[30px] sm:rounded-[2rem] sm:px-8 sm:py-8 md:max-w-2xl md:px-12 md:py-11"
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-28 -top-28 hidden h-72 w-72 rounded-full bg-brand-orange/20 blur-[105px] md:block"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/[0.045] via-transparent to-brand-orange/[0.035]"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute left-[9%] right-[9%] top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"
            />

            <button
              type="button"
              onClick={() => setOpen(false)}
              data-cursor="button"
              aria-label="Close coffee chat invitation"
              className="absolute right-4 top-4 z-20 flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.06] text-white/55 transition-colors md:hover:border-white/25 md:hover:text-white"
            >
              <X size={17} />
            </button>

            <div className="relative z-10">
              {submitState === 'success' ? (
                <div
                  className="rounded-2xl border border-brand-orange/25 bg-brand-orange/[0.07] p-7 text-center"
                  role="status"
                >
                  <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-brand-orange text-white">
                    <Check size={21} />
                  </span>
                  <h2 className="mt-4 font-display text-2xl font-semibold text-white">
                    Your coffee chat is requested.
                  </h2>
                  <p className="mt-2 text-sm leading-6 text-white/55">
                    Thanks, {name || 'there'}. We&apos;ll contact you within one
                    business day to arrange a focused 10-minute conversation.
                  </p>
                </div>
              ) : (
                <>
                  <div className="flex items-center gap-3">
                    <span className="h-px w-8 bg-brand-orange/80" />
                    <Coffee size={16} className="text-brand-orange" />
                    <div>
                      <p className="text-sm font-semibold tracking-[-0.01em] text-white">
                        10-Minute Coffee Chat
                      </p>
                      <p className="mt-0.5 text-[0.65rem] uppercase tracking-[0.15em] text-white/35">
                        A complimentary project conversation
                      </p>
                    </div>
                  </div>

                  <h2
                    id="brand-contact-popup-title"
                    className="mt-5 max-w-md pr-8 font-display text-[clamp(2rem,6vw,2.75rem)] md:mt-7 md:max-w-xl md:text-[3.35rem] font-semibold leading-[1.04] tracking-[-0.02em] text-white"
                  >
                    Let&apos;s turn your idea into a
                    <span className="text-gradient-orange"> clear next step.</span>
                  </h2>

                  <p
                    id="brand-contact-popup-description"
                    className="mt-4 max-w-md text-sm leading-6 text-white/55 md:mt-5 md:max-w-xl md:text-[0.95rem] md:leading-7"
                  >
                    Tell us what you&apos;re building. In ten focused minutes,
                    we&apos;ll understand your goals, discuss the challenge, and
                    help you see the right way forward.
                  </p>

                  <form onSubmit={handleSubmit} className="mt-6 md:mt-8">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label
                          htmlFor="popup-contact-name"
                          className="text-[0.68rem] font-medium uppercase tracking-[0.15em] text-white/55"
                        >
                          Your name
                        </label>
                        <div className="relative mt-2">
                          <User
                            aria-hidden="true"
                            size={16}
                            className="absolute left-4 top-1/2 -translate-y-1/2 text-white/35"
                          />
                          <input
                            id="popup-contact-name"
                            required
                            type="text"
                            autoComplete="name"
                            value={name}
                            onChange={(event) => setName(event.target.value)}
                            placeholder="Full name"
                            className="h-12 w-full rounded-xl border border-white/10 bg-white/[0.055] pl-10 pr-3 text-sm text-white outline-none transition-colors placeholder:text-white/28 focus:border-brand-orange/70"
                          />
                        </div>
                      </div>

                      <div>
                        <label
                          htmlFor="popup-contact-email"
                          className="text-[0.68rem] font-medium uppercase tracking-[0.15em] text-white/55"
                        >
                          Your email
                        </label>
                        <div className="relative mt-2">
                          <Mail
                            aria-hidden="true"
                            size={16}
                            className="absolute left-4 top-1/2 -translate-y-1/2 text-white/35"
                          />
                          <input
                            id="popup-contact-email"
                            required
                            type="email"
                            autoComplete="email"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                            placeholder="you@company.com"
                            className="h-12 w-full rounded-xl border border-white/10 bg-white/[0.055] pl-10 pr-3 text-sm text-white outline-none transition-colors placeholder:text-white/28 focus:border-brand-orange/70"
                          />
                        </div>
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={submitState === 'loading'}
                      data-cursor="button"
                      className="group mt-4 inline-flex h-12 w-full md:mt-5 md:h-14 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-brand-accent to-brand-orange px-5 text-sm font-semibold text-white shadow-[0_14px_38px_-17px_rgba(249,115,22,0.8)] transition-shadow disabled:cursor-not-allowed disabled:opacity-65 md:hover:shadow-[0_18px_45px_-14px_rgba(249,115,22,0.95)]"
                    >
                      {submitState === 'loading'
                        ? 'Sending...'
                        : 'Book My Free Coffee Chat'}
                      {submitState !== 'loading' && (
                        <ArrowRight
                          size={17}
                          className="md:transition-transform md:duration-300 md:group-hover:translate-x-1"
                        />
                      )}
                    </button>

                    {submitState === 'error' && (
                      <p
                        className="mt-3 text-xs leading-5 text-red-300"
                        role="alert"
                      >
                        {errorMessage}
                      </p>
                    )}
                  </form>

                  <p className="mt-4 text-center text-[0.7rem] leading-5 text-white/38 md:mt-5">
                    No pitch. No pressure. Just a useful conversation about your
                    project.
                  </p>
                </>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
