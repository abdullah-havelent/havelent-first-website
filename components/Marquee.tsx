'use client';

import { useTheme } from '@/components/ThemeProvider';

const ITEMS = [
  'CREATIVE',
  'CINEMATIC',
  'MODERN',
  'TRUSTED',
  'DETAIL-ORIENTED',
  'PREMIUM',
  'STRATEGIC',
  'INNOVATIVE',
];

export default function Marquee() {
  const { theme } = useTheme();

  return (
    <section
      className="
        relative
        left-1/2
        w-screen
        -translate-x-1/2
        overflow-x-hidden
        overflow-y-visible
        border-y
        border-black/10
        py-5
      "
    >
      <div
        className="
          flex
          whitespace-nowrap
          animate-marquee
        "
        style={{
          width: 'max-content',
          willChange: 'transform',
        }}
      >
        {[0, 1].map((groupIndex) => (
          <div
            key={groupIndex}
            aria-hidden={groupIndex === 1}
            className="flex min-w-[100vw] shrink-0 justify-around"
          >
            {ITEMS.map((item, itemIndex) => (
              <div
                key={`${groupIndex}-${itemIndex}`}
                className={`
                  mx-8
                  flex
                  shrink-0
                  items-center
                  gap-8
                  text-sm
                  font-semibold
                  tracking-[0.08em]
                  uppercase
                  ${
                    theme === 'charcoal'
                      ? 'text-white'
                      : 'text-black/70'
                  }
                `}
              >
                <span>{item}</span>

                <span className="text-2xl text-brand-orange">
                  •
                </span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}