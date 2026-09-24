'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, ChevronLeft, ChevronRight, X } from 'lucide-react';

type ResultsGalleryProps = { eyebrow: string; title: string; accent: string; description: string; images: string[]; mode: 'grid' | 'masonry' };

export default function ResultsGallery({ eyebrow, title, accent, description, images, mode }: ResultsGalleryProps) {
  const [selected, setSelected] = useState<number | null>(null);
  useEffect(() => {
    if (selected === null) return;
    const oldOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setSelected(null);
      if (event.key === 'ArrowRight') setSelected((current) => current === null ? 0 : (current + 1) % images.length);
      if (event.key === 'ArrowLeft') setSelected((current) => current === null ? 0 : (current - 1 + images.length) % images.length);
    };
    window.addEventListener('keydown', onKey);
    return () => { document.body.style.overflow = oldOverflow; window.removeEventListener('keydown', onKey); };
  }, [selected, images.length]);
  const previous = () => setSelected((current) => current === null ? 0 : (current - 1 + images.length) % images.length);
  const next = () => setSelected((current) => current === null ? 0 : (current + 1) % images.length);

  return (
    <section className="relative min-h-screen overflow-hidden bg-brand-dark px-5 pb-28 pt-28 sm:px-8 lg:pb-36 lg:pt-36">
      <div className="pointer-events-none absolute -right-52 top-20 h-[520px] w-[520px] rounded-full bg-orange-500/[0.09] blur-[160px]" />
      <div className="relative mx-auto max-w-[1500px]">
        <Link href="/our-work" className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-white/55 transition-colors hover:text-brand-orange"><ArrowLeft size={16} /> All Collections</Link>
        <div className="mt-14 max-w-4xl">
          <span className="text-xs font-semibold uppercase tracking-[0.34em] text-brand-orange">{eyebrow}</span>
          <h1 className="mt-6 font-display text-[clamp(2.8rem,6vw,6rem)] font-semibold leading-[0.98] text-white">{title} <span className="text-gradient-orange">{accent}</span></h1>
          <p className="mt-7 max-w-2xl text-base leading-7 text-white/55 sm:text-lg sm:leading-8">{description}</p>
        </div>
        {mode === 'grid' ? (
          <div className="mt-16 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {images.map((src, index) => <button key={src} onClick={() => setSelected(index)} className="result-tile group relative overflow-hidden rounded-[24px] border border-white/10 bg-white/[0.025] p-3 text-left"><Image src={src} alt={`Social media performance report ${index + 1}`} width={1600} height={1000} className="h-auto w-full rounded-[16px] object-contain" sizes="(max-width:640px) 100vw,(max-width:1280px) 50vw,33vw" /><span className="mt-4 flex items-center justify-between px-2 pb-2 text-[10px] font-semibold uppercase tracking-[0.25em] text-white/45">Performance Report <span className="text-brand-orange">{String(index + 1).padStart(2, '0')}</span></span></button>)}
          </div>
        ) : (
          <div className="mt-16 columns-1 gap-5 sm:columns-2 lg:columns-3">
            {images.map((src, index) => <button key={src} onClick={() => setSelected(index)} className="result-tile group mb-5 inline-block w-full break-inside-avoid overflow-hidden rounded-[24px] border border-white/10 bg-white/[0.025] p-3 text-left"><Image src={src} alt={`Paid campaign result ${index + 1}`} width={1600} height={1200} className="h-auto w-full rounded-[16px] object-contain" sizes="(max-width:640px) 100vw,(max-width:1024px) 50vw,33vw" /><span className="mt-4 flex items-center justify-between px-2 pb-2 text-[10px] font-semibold uppercase tracking-[0.25em] text-white/45">Campaign Result <span className="text-brand-orange">{String(index + 1).padStart(2, '0')}</span></span></button>)}
          </div>
        )}
      </div>
      {selected !== null && <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 p-4 backdrop-blur-lg sm:p-8" onClick={() => setSelected(null)}>
        <button aria-label="Close viewer" onClick={() => setSelected(null)} className="absolute right-5 top-5 z-20 flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white sm:right-8 sm:top-8"><X size={21} /></button>
        <button aria-label="Previous image" onClick={(event) => { event.stopPropagation(); previous(); }} className="absolute left-3 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-black/60 text-white sm:left-8 sm:h-14 sm:w-14"><ChevronLeft /></button>
        <div className="relative h-[88vh] w-[88vw] max-w-6xl" onClick={(event) => event.stopPropagation()}><Image src={images[selected]} alt="Result preview" fill priority className="object-contain" sizes="90vw" /></div>
        <button aria-label="Next image" onClick={(event) => { event.stopPropagation(); next(); }} className="absolute right-3 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-black/60 text-white sm:right-8 sm:h-14 sm:w-14"><ChevronRight /></button>
        <span className="absolute bottom-5 left-1/2 -translate-x-1/2 rounded-full border border-white/10 bg-black/60 px-4 py-2 text-xs tracking-widest text-white/70">{selected + 1} / {images.length}</span>
      </div>}
      <style jsx global>{`@media (hover:hover) and (pointer:fine){.result-tile{transition:transform .35s ease,border-color .35s ease,box-shadow .35s ease}.result-tile:hover{transform:translateY(-6px);border-color:rgba(249,115,22,.45);box-shadow:0 22px 65px rgba(0,0,0,.4),0 0 24px rgba(249,115,22,.08)}}`}</style>
    </section>
  );
}
