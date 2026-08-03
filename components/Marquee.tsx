'use client';

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
  const loop = [...ITEMS, ...ITEMS];

  return (
    <section className="relative w-full overflow-x-hidden overflow-y-visible border-y border-black/10 py-5">
      <div
  className="flex whitespace-nowrap animate-marquee"
  style={{ width: "max-content", willChange: "transform" }}
>
        {loop.map((item, i) => (
          <div
            key={i}
            className="mx-8 flex items-center gap-8 text-sm font-semibold tracking-[0.08em] text-black/70 uppercase"
          >
            <span>{item}</span>
            <span className="text-brand-orange text-2xl">•</span>
          </div>
        ))}
      </div>
    </section>
  );
}