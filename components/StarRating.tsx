'use client';

import { Star } from 'lucide-react';

type StarRatingProps = {
  value: number;
  size?: number;
  onChange?: (value: number) => void;
};

export default function StarRating({ value, size = 16, onChange }: StarRatingProps) {
  const normalizedValue = Math.min(5, Math.max(0, Math.round(value * 2) / 2));
  const interactive = typeof onChange === 'function';

  return (
    <div
      className="flex items-center gap-1"
      role={interactive ? 'radiogroup' : 'img'}
      aria-label={`${normalizedValue} out of 5 stars`}
    >
      {[1, 2, 3, 4, 5].map((star) => {
        const fill = Math.min(1, Math.max(0, normalizedValue - (star - 1)));

        return (
          <span
            key={star}
            className="relative inline-flex shrink-0"
            style={{ width: size, height: size }}
          >
            <Star size={size} aria-hidden="true" className="text-white/20" />
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-y-0 left-0 overflow-hidden"
              style={{ width: `${fill * 100}%` }}
            >
              <Star
                size={size}
                className="fill-brand-orange text-brand-orange"
                style={{ minWidth: size }}
              />
            </span>

            {interactive && (
              <button
                type="button"
                role="radio"
                aria-checked={normalizedValue === star - 0.5 || normalizedValue === star}
                aria-label={
                  normalizedValue === star - 0.5
                    ? `Set rating to ${star} out of 5 stars`
                    : `Set rating to ${star - 0.5} out of 5 stars`
                }
                onClick={() => onChange(normalizedValue === star - 0.5 ? star : star - 0.5)}
                className="absolute inset-0 z-10 rounded-sm transition-transform hover:scale-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-orange"
              />
            )}
          </span>
        );
      })}
    </div>
  );
}