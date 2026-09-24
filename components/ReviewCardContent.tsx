'use client';

import { Star } from 'lucide-react';

type ReviewCardContentProps = {
  name: string;
  role: string;
  text: string;
  rating: number;
  category: string;
  singleColumn?: boolean;
  expanded?: boolean;
  onToggle?: () => void;
  marquee?: boolean;
};

export default function ReviewCardContent({ name, role, text, rating, category, singleColumn = false, expanded = false, onToggle, marquee = false }: ReviewCardContentProps) {
  const initials = name.trim().split(/\s+/).filter(Boolean).slice(0, 2).map((part) => Array.from(part)[0]).join('').toUpperCase();
  const formattedCategory = category
    .split(/\r?\n|,\s*/)
    .map((service) => service.trim())
    .filter(Boolean)
    .map((service) => {
      const [mainService, ...subServiceParts] = service.split('→');
      const subService = subServiceParts.join('→').trim();

      return subService ? `${mainService.trim()} (${subService})` : mainService.trim();
    })
    .join('\n');


  return (
    <div className={singleColumn ? "min-w-0" : marquee ? "flex h-full min-w-0 flex-col" : "flex h-full min-w-0 flex-col"}>
      <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-4">
        <div className="flex min-w-0 flex-1 items-center gap-3">
          <span aria-hidden="true" className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-brand-orange/25 bg-brand-orange/[0.08] text-sm font-semibold tracking-wide text-brand-orange">
            {initials}
          </span>
          <div className="min-w-0">
            <p className="break-words text-base font-semibold leading-6 text-white">{name}</p>
            <p className="mt-1 break-words text-sm leading-5 text-white/50">{role}</p>
          </div>
        </div>
        <div role="img" aria-label={`${rating} out of 5 stars`} className="flex w-full shrink-0 items-center gap-1 md:w-auto">
          {Array.from({ length: rating }, (_, index) => (
            <Star key={index} size={16} aria-hidden="true" className="fill-brand-orange text-brand-orange" />
          ))}
          <span aria-hidden="true" className="ml-2 text-sm font-medium text-white/70">{rating}/5</span>
        </div>
      </div>
      <div style={{ display: singleColumn && !expanded ? 'none' : undefined }} className={singleColumn ? "my-6" : marquee ? "my-6 min-h-0 flex-1 md:flex-none" : "my-6 min-h-0 flex-1"}>
        <p className={singleColumn ? "whitespace-pre-line break-words text-[17px] leading-8 text-white/80 md:text-lg" : marquee ? "h-full overflow-y-auto whitespace-pre-line break-words pr-2 text-[17px] leading-8 text-white/80 [scrollbar-color:rgba(249,115,22,0.65)_rgba(255,255,255,0.06)] [scrollbar-width:thin] md:h-auto md:overflow-visible md:pr-0 md:text-lg" : "h-full overflow-y-auto whitespace-pre-line break-words pr-2 text-[17px] leading-8 text-white/80 [scrollbar-color:rgba(249,115,22,0.65)_rgba(255,255,255,0.06)] [scrollbar-width:thin] md:text-lg"}>
          {text}
        </p>
      </div>
      <div style={{ display: singleColumn && !expanded ? 'none' : undefined }} className={singleColumn ? "pt-1" : "mt-auto pt-1"}>
        <p className="text-xs text-white/40">Service</p>
        <p className="mt-1 whitespace-pre-line break-words text-sm leading-6 text-brand-orange/80">
          {formattedCategory}
        </p>
      </div>
      {singleColumn && !expanded && (
        <>
          <button
            type="button"
            onClick={onToggle}
            className="absolute inset-0 z-20 block cursor-pointer rounded-[22px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-orange"
            aria-label={'Expand ' + name + "'s full review"}
          />
          <p className="pointer-events-none absolute bottom-3 right-7 z-30 block text-right text-xs font-medium text-brand-orange">
            Expand to read full review
          </p>
        </>
      )}
      {singleColumn && expanded && (
        <button
          type="button"
          onClick={onToggle}
          className="mt-4 block w-full text-right text-xs font-medium text-brand-orange hover:text-orange-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-orange"
        >
          Click to collapse review
        </button>
      )}
    </div>
  );
}















