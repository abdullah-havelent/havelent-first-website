'use client';


import AnimatedCards from './AnimatedCards';


export default function Services() {
  return (
    <section
  id="services"
  className="relative overflow-hidden px-6 py-24 sm:py-32"
>

      <div aria-hidden="true" className="services-backdrop pointer-events-none absolute inset-0" />
      <div aria-hidden="true" className="services-grid pointer-events-none absolute inset-0" />

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Header */}
        <div
          className="mb-14 flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end"
        >
          <div>
            <span className="text-sm font-medium uppercase tracking-[0.2em] text-brand-orange">
              What we do
            </span>
            <h2 className="mt-4 font-display text-[clamp(2rem,4.5vw,3.5rem)] font-semibold leading-tight text-white">
              Digital Agency Services
              <br />
              <span className="text-gradient-orange">for visionary brands.</span>
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-white/55">
              Every engagement is a partnership. As a full service digital agency,
              we build, refine, and elevate digital experiences with obsessive
              attention to detail.
          </p>
        </div>

        {/* Service cards */}
        <AnimatedCards />
      </div>

      <style jsx>{`
        .services-backdrop {
          background: radial-gradient(ellipse 320px 260px at 85% 80px, rgba(249, 115, 22, 0.10), transparent 75%), #080808;
        }
          .services-grid {
            background-image:
              linear-gradient(rgba(249, 115, 22, 0.07) 1px, transparent 1px),
              linear-gradient(90deg, rgba(249, 115, 22, 0.07) 1px, transparent 1px);
            background-size: 64px 64px;
            mask-image: linear-gradient(transparent, black 20%, black 80%, transparent);
          }
        @media (min-width: 768px) {
          .services-backdrop {
            background:
              radial-gradient(ellipse 750px 600px at 0% 8%, rgba(249, 115, 22, 0.16), transparent 75%),
              radial-gradient(ellipse 650px 550px at 100% 95%, rgba(185, 28, 28, 0.12), transparent 75%),
              #080808;
          }

        }
        :global(html.charcoal) .services-backdrop {
          background-color: #1C1C1C;
        }

        @media (max-width: 767px), (prefers-reduced-motion: reduce) {
          #services :global(*) {
            animation: none !important;
            transition: none !important;
          }
        }
        @media (max-width: 767px) {
          #services :global([class*="blur-"]) {
            display: none;
          }
        }
      `}</style>

    </section>
  );
}