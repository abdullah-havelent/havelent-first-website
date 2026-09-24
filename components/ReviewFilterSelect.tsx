'use client';

import { useEffect, useRef, useState } from 'react';
import { Check, ChevronDown } from 'lucide-react';

type ReviewFilterSelectProps = {
  value: string;
  options: string[];
  allLabel: string;
  disabled?: boolean;
  onChange: (value: string) => void;
};

export default function ReviewFilterSelect({
  value,
  options,
  allLabel,
  disabled = false,
  onChange,
}: ReviewFilterSelectProps) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    const closeOnOutsideClick = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };

    document.addEventListener('mousedown', closeOnOutsideClick);
    document.addEventListener('keydown', closeOnEscape);

    return () => {
      document.removeEventListener('mousedown', closeOnOutsideClick);
      document.removeEventListener('keydown', closeOnEscape);
    };
  }, [open]);

  const choices = [{ value: '', label: allLabel }, ...options.map((option) => ({ value: option, label: option }))];
  const selectedLabel = choices.find((choice) => choice.value === value)?.label ?? allLabel;

  return (
    <div ref={rootRef} className={`relative ${open ? 'z-50' : 'z-0'}`}>
      <button
        type="button"
        disabled={disabled}
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((current) => !current)}
        className="flex w-full items-center justify-between gap-3 rounded-xl border border-white/10 bg-[#171717] px-4 py-3 text-left text-sm text-white outline-none focus-visible:border-brand-orange md:transition-colors md:hover:border-brand-orange/50 disabled:cursor-not-allowed disabled:opacity-40"
      >
        <span className="truncate">{selectedLabel}</span>
        <ChevronDown size={16} className={`shrink-0 text-brand-orange md:transition-transform md:duration-200 ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && !disabled && (
        <div role="listbox" className="mt-2 max-h-64 w-full overflow-y-auto rounded-xl border border-white/15 bg-[#101010] p-1.5 shadow-[0_22px_60px_rgba(0,0,0,0.75)] md:absolute md:left-0 md:right-0 md:top-[calc(100%+0.4rem)] md:mt-0 lg:bg-[#080808]">
          {choices.map((choice) => {
            const selected = choice.value === value;

            return (
              <button
                key={choice.value || 'all'}
                type="button"
                role="option"
                aria-selected={selected}
                onClick={() => {
                  onChange(choice.value);
                  setOpen(false);
                }}
                className={`flex w-full items-center justify-between gap-3 rounded-lg px-3 py-2.5 text-left text-sm md:transition-colors ${
                  selected
                    ? 'bg-gradient-to-r from-brand-orange to-brand-red font-medium text-white'
                    : 'text-white/80 md:hover:text-brand-orange'
                }`}
              >
                <span className="min-w-0 break-words">{choice.label}</span>
                {selected && <Check size={15} className="shrink-0 text-white" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
