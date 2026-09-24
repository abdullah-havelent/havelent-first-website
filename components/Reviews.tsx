'use client';

import ReviewCardContent from '@/components/ReviewCardContent';
import { motion, useSpring } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState, type PointerEvent, type ReactNode, type TouchEvent } from 'react';
import { supabase } from '@/lib/supabase';


function DesktopReviewTilt({ children }: { children: ReactNode }) {
  const rotateX = useSpring(0, { stiffness: 180, damping: 24 });
  const rotateY = useSpring(0, { stiffness: 180, damping: 24 });

  const resetTilt = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  const followPointer = (event: PointerEvent<HTMLDivElement>) => {
    if (
      event.pointerType !== 'mouse' ||
      !window.matchMedia('(min-width: 768px) and (hover: hover) and (prefers-reduced-motion: no-preference)').matches
    ) return;

    const bounds = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;

    rotateX.set(-y * 9);
    rotateY.set(x * 9);
  };

  return (
    <div className="flex" onPointerMove={followPointer} onPointerLeave={resetTilt} onPointerCancel={resetTilt}>
      <motion.div className="flex w-full" style={{ rotateX, rotateY, transformPerspective: 1100 }}>
        {children}
      </motion.div>
    </div>
  );
}

export default function Reviews() {
  const router = useRouter();



  type Review = {
    id: number;
    client_name: string;
    client_role: string;
    service: string;
    sub_service?: string | null;
    review: string;
    rating: number;
    approved: boolean;
    created_at: string;
  };

  const [reviews, setReviews] = useState<Review[]>([]);
  const reviewMarqueeRef = useRef<HTMLDivElement>(null);
  const reviewDragActive = useRef(false);
  const reviewDragStartX = useRef(0);
  const reviewDragStartY = useRef(0);
  const reviewDragStartTime = useRef(0);
  const reviewDragAnimation = useRef<Animation | null>(null);
  const reviewDragLoopWidth = useRef(0);
  const reviewDragDuration = useRef(0);
  const reviewDragFrame = useRef<number | null>(null);
  const reviewPendingDistance = useRef(0);
  const reviewPointerDownAt = useRef(0);
  const reviewResumeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const reviewDidDrag = useRef(false);
  const [draggingReviews, setDraggingReviews] = useState(false);

  const getReviewAnimation = (marquee: HTMLDivElement) => {
    const track = marquee.firstElementChild as HTMLElement | null;
    return {
      animation: track?.getAnimations()[0],
      loopWidth: track?.firstElementChild?.getBoundingClientRect().width ?? 0,
    };
  };

  const cancelReviewResume = () => {
    if (reviewResumeTimer.current) {
      clearTimeout(reviewResumeTimer.current);
      reviewResumeTimer.current = null;
    }
  };

  const resumeReviewAfterDelay = (marquee: HTMLDivElement) => {
    cancelReviewResume();
    reviewResumeTimer.current = setTimeout(() => {
      const { animation } = getReviewAnimation(marquee);
      animation?.play();
      reviewResumeTimer.current = null;
    }, 1000);
  };
  const startReviewDrag = (event: PointerEvent<HTMLDivElement>) => {
    const { animation, loopWidth } = getReviewAnimation(event.currentTarget);
    cancelReviewResume();

    reviewDragActive.current = true;
    reviewDidDrag.current = false;
    reviewDragStartX.current = event.clientX;
    reviewDragStartY.current = event.clientY;
    reviewPointerDownAt.current = performance.now();
    reviewDragStartTime.current = typeof animation?.currentTime === 'number' ? animation.currentTime : 0;
    reviewDragAnimation.current = animation ?? null;
    reviewDragLoopWidth.current = loopWidth;
    const duration = animation?.effect?.getTiming().duration;
    reviewDragDuration.current = typeof duration === 'number' ? duration : 0;
    animation?.pause();
    setDraggingReviews(true);
  };

  const moveReviewDrag = (event: PointerEvent<HTMLDivElement>) => {
    if (!reviewDragActive.current) {
      if (event.pointerType === 'mouse') {
        cancelReviewResume();
        const { animation } = getReviewAnimation(event.currentTarget);
        if (animation?.playState !== 'paused') animation?.pause();
      }
      return;
    }

    const distanceX = event.clientX - reviewDragStartX.current;
    const distanceY = event.clientY - reviewDragStartY.current;

    if (!reviewDidDrag.current && Math.abs(distanceY) > Math.abs(distanceX)) return;

    if (Math.abs(distanceX) > 12) {
      reviewDidDrag.current = true;
      if (!event.currentTarget.hasPointerCapture(event.pointerId)) {
        event.currentTarget.setPointerCapture(event.pointerId);
      }
    }

    const animation = reviewDragAnimation.current;
    const loopWidth = reviewDragLoopWidth.current;
    const duration = reviewDragDuration.current;
    if (!animation || loopWidth <= 0 || duration <= 0) return;

    reviewPendingDistance.current = distanceX;
    if (reviewDragFrame.current !== null) return;

    reviewDragFrame.current = requestAnimationFrame(() => {
      const distance = reviewPendingDistance.current;
      animation.currentTime = ((reviewDragStartTime.current - (distance / loopWidth) * duration) % duration + duration) % duration;
      reviewDragFrame.current = null;
    });
  };

  const stopReviewDrag = (event: PointerEvent<HTMLDivElement>) => {
    if (reviewDragFrame.current !== null) {
      cancelAnimationFrame(reviewDragFrame.current);
      reviewDragFrame.current = null;
    }
    const { animation } = getReviewAnimation(event.currentTarget);
    const heldLongEnough = performance.now() - reviewPointerDownAt.current > 250;

    reviewDragActive.current = false;
    if (heldLongEnough && event.pointerType !== 'mouse') reviewDidDrag.current = true;
    setDraggingReviews(false);

    const mouseStillHovering = event.pointerType === 'mouse' && event.currentTarget.matches(':hover');
    if (mouseStillHovering) {
      cancelReviewResume();
      animation?.pause();
    } else if (!(event.type === 'pointercancel' && event.pointerType === 'touch')) {
      resumeReviewAfterDelay(event.currentTarget);
    }

    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  };
  const stopReviewTouch = (event: TouchEvent<HTMLDivElement>) => {
    reviewDragActive.current = false;
    setDraggingReviews(false);
    resumeReviewAfterDelay(event.currentTarget);
  };
  const pauseReviewMouse = () => {
    const marquee = reviewMarqueeRef.current;
    if (!marquee) return;
    cancelReviewResume();
    const { animation } = getReviewAnimation(marquee);
    animation?.pause();
  };

  const resumeReviewMouse = () => {
    const marquee = reviewMarqueeRef.current;
    if (!marquee || reviewDragActive.current) return;
    resumeReviewAfterDelay(marquee);
  };
useEffect(() => {
    async function fetchReviews() {
      const { data, error } = await supabase
        .from('reviews')
        .select('*')
        .eq('approved', true)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error loading reviews:', error);
        return;
      }

      const shuffledReviews = [...(data || [])];

      for (let index = shuffledReviews.length - 1; index > 0; index -= 1) {
        const randomIndex = Math.floor(Math.random() * (index + 1));
        [shuffledReviews[index], shuffledReviews[randomIndex]] =
          [shuffledReviews[randomIndex], shuffledReviews[index]];
      }

      setReviews(shuffledReviews);
    }

    fetchReviews();
  }, []);



  return (
    <>
    <section
  id="reviews" 
  className="relative overflow-hidden bg-[#0b0b0b] px-6 py-24 sm:py-28">
    
      {/* Ambient glow */}
      <div
  className="
    pointer-events-none
    absolute
    left-1/2
    top-0
    h-[500px]
    w-[500px]
    -translate-x-1/2
    rounded-full
    bg-orange-500/[0.10]
    blur-[170px]
  "
/>

      <div className="relative z-10 mx-auto max-w-7xl">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.35 }}
          viewport={{ once: true }}
          className="mx-auto max-w-3xl text-center"
        >
          <h2
            className="
              font-display
              text-5xl
              font-semibold
              md:text-6xl
              reviews-heading
            "
          >
            What Our
            <span className="text-gradient-orange">
              {' '}
              Clients Say
            </span>
          </h2>

          <p
            className="
              mt-8
              text-lg
              leading-8
              reviews-description
            "
          >
            Real experiences from the people and brands
            we have worked with.
          </p>
        </motion.div>

        {/* Latest 3 Reviews — seamless marquee */}
        <div
          ref={reviewMarqueeRef}
          onMouseEnter={pauseReviewMouse}
          onMouseLeave={resumeReviewMouse}
          onPointerDown={startReviewDrag}
          onPointerMove={moveReviewDrag}
          onPointerUp={stopReviewDrag}
          onPointerCancel={stopReviewDrag}
          onTouchEnd={stopReviewTouch}
          onTouchCancel={stopReviewTouch}
          className={`reviews-marquee mt-8 overflow-x-hidden overflow-y-hidden py-6 ${draggingReviews ? 'is-dragging cursor-grabbing select-none' : 'cursor-grab'}`}
        >
          <div className="reviews-track flex w-max" style={{ animationDuration: Math.max(30, reviews.length * 5) + 's' }}>
            {[false, true].map((duplicate) => (
              <div
                key={duplicate ? 'duplicate' : 'original'}
                className="reviews-group flex shrink-0 gap-6 pr-6"
                aria-hidden={duplicate || undefined}
              >
                {reviews.map((review) => (
                  <DesktopReviewTilt key={`${duplicate ? 'duplicate' : 'original'}-${review.id}`}>
                  <motion.a
                    href="/reviews"
                    draggable={false}
                    onDragStart={(event) => event.preventDefault()}
                    onClick={(event) => {
                      const desktopPointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

                      if (reviewDidDrag.current && !desktopPointer) {
                        event.preventDefault();
                      }

                      reviewDidDrag.current = false;
                    }}
                    tabIndex={duplicate ? -1 : 0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        router.push('/reviews');
                      }
                    }}
                    className="group relative block h-[560px] cursor-pointer overflow-hidden rounded-[22px] md:h-auto md:flex-1 border border-white/10 bg-white/[0.035] p-7 backdrop-blur-xl md:transition-colors md:duration-500 md:hover:border-brand-orange/30"
                  >
                    <ReviewCardContent
                      name={review.client_name}
                      role={review.client_role}
                      text={review.review}
                      rating={review.rating}
                      category={review.sub_service ? `${review.service} (${review.sub_service})` : review.service}
                      marquee
                    />
                  </motion.a>
                  </DesktopReviewTilt>
                ))}
              </div>
            ))}
          </div>
        </div>
        {/* Button */}
        <div className="mt-12 flex justify-center">
          <motion.div
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => router.push('/reviews')}
            className="
              group
              flex
              w-fit
              cursor-pointer
              items-center
              gap-3
              rounded-full
              border
              border-brand-orange/30
              bg-brand-orange/[0.06]
              px-7
              py-3.5
              text-sm
              font-medium
              text-brand-orange
              transition-all
              duration-500
              hover:border-brand-orange/70
              hover:bg-brand-orange/[0.10]
            "
            style={{
              boxShadow:
                '0 0 30px -15px rgba(249,115,22,0.8)',
            }}
          >
            <span>Read or Submit Reviews</span>

            <span
              className="
                text-lg
                transition-transform
                duration-500
                group-hover:translate-x-1
              "
            >
              →
            </span>
          </motion.div>
        </div>
      </div>

      {/* Theme styles */}
      <style jsx>{`
        .reviews-marquee {
          scrollbar-width: none;
          touch-action: pan-y;
          -webkit-mask-image: linear-gradient(to right, transparent, black 7%, black 93%, transparent);
          mask-image: linear-gradient(to right, transparent, black 7%, black 93%, transparent);
        }

        .reviews-track {
          animation: reviews-scroll 32s linear infinite;
          will-change: transform;
        }
        .reviews-marquee::-webkit-scrollbar {
          display: none;
        }

        .reviews-marquee.is-dragging .reviews-track {
          animation-play-state: paused;
        }

        .reviews-group {
          width: auto;
        }

        .reviews-group > :global(*) {
          width: calc((min(100vw - 3rem, 80rem) - 3rem) / 3);
          flex: 0 0 calc((min(100vw - 3rem, 80rem) - 3rem) / 3);
        }

        @keyframes reviews-scroll {
          to {
            transform: translateX(-50%);
          }
        }

        @media (max-width: 767px) {
          .reviews-marquee {
          scrollbar-width: none;
          touch-action: pan-y;
            margin-left: -1.5rem;
            margin-right: -1.5rem;
            -webkit-mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
            mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
          }

          .reviews-group {
            width: auto;
            gap: 1rem;
            padding-right: 1rem;
          }

          .reviews-group > :global(*) {
            width: 82vw;
            flex-basis: 82vw;
          }

          .reviews-track {
            animation-duration: 26s;
          }
        }

        @media (min-width: 768px) and (hover: hover) {
          .reviews-marquee:hover .reviews-track {
            animation-play-state: paused !important;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .reviews-track {
            animation-play-state: paused;
          }
        }

        .reviews-heading {
          color: #ffffff;
        }

        .reviews-description {
          color: rgba(255, 255, 255, 0.62);
        }

        :global(html.charcoal) .reviews-heading {
          color: #f5f1eb;
        }

        :global(html.charcoal) .reviews-description {
          color: rgba(245, 241, 235, 0.62);
        }
      `}</style>
    </section>
   
    </>
  );
}






























