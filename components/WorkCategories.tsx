'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, BarChart3, Images, Megaphone } from 'lucide-react';

const categories = [
  { number: '01', title: 'Creative Portfolio', eyebrow: 'Designs & Visual Work', description: 'Explore brand visuals, social content, websites and creative campaigns crafted across different industries.', href: '/our-work/designs', images: ['/images/work/luxury-hotel.webp', '/images/work/High-End Furniture 1.webp', '/images/work/jewelry-1.webp'], icon: Images },
  { number: '02', title: 'Social Media Performance', eyebrow: 'Metricool Analytics', description: 'See the reach, engagement and account growth behind our social media work.', href: '/our-work/social-performance', images: ['/metricool/1.webp', '/metricool/2.webp', '/metricool/3.webp'], icon: BarChart3 },
  { number: '03', title: 'Paid Campaign Results', eyebrow: 'Advertising Outcomes', description: 'View real campaign screenshots and the measurable results produced through paid media.', href: '/our-work/campaign-results', images: ['/ads-results/image-1.webp', '/ads-results/image-2.webp', '/ads-results/image-3.webp'], icon: Megaphone },
];

export default function WorkCategories() {
  const tiltCard = (event: React.PointerEvent<HTMLAnchorElement>) => {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    const card = event.currentTarget;
    const bounds = card.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;
    card.style.transition = 'transform 110ms ease-out, border-color 350ms ease, box-shadow 350ms ease';
    card.style.transform = `perspective(950px) rotateX(${-y * 14}deg) rotateY(${x * 16}deg) translateY(-8px) scale(1.025)`;
  };

  const resetCard = (event: React.SyntheticEvent<HTMLAnchorElement>) => {
    const card = event.currentTarget;
    card.style.transition = 'transform 420ms cubic-bezier(.22,1,.36,1), border-color 350ms ease, box-shadow 350ms ease';
    card.style.transform = 'perspective(950px) rotateX(0deg) rotateY(0deg) translateY(0) scale(1)';
  };

  return (
    <section className="relative min-h-screen overflow-hidden bg-brand-dark px-5 pb-28 pt-32 sm:px-8 lg:pb-36 lg:pt-40">
      <div className="pointer-events-none absolute left-[-12rem] top-20 h-[34rem] w-[34rem] rounded-full bg-orange-500/[0.09] blur-[150px]" />
      <div className="pointer-events-none absolute right-[-12rem] top-1/3 h-[34rem] w-[34rem] rounded-full bg-red-700/[0.08] blur-[160px]" />
      <div className="relative mx-auto max-w-[1500px]">
        <div className="mx-auto max-w-4xl text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.34em] text-brand-orange">Our Work</span>
          <h1 className="mt-6 font-display text-[clamp(2.7rem,6.5vw,6.2rem)] font-semibold leading-[0.96] text-white">Choose what you want <span className="text-gradient-orange">to explore.</span></h1>
          <p className="mx-auto mt-7 max-w-2xl text-base leading-7 text-white/55 sm:text-lg sm:leading-8">Creative execution, social growth and paid campaign performance—each collection shows a different side of the work.</p>
        </div>
        <div className="mt-16 grid gap-5 md:grid-cols-3 lg:mt-24 lg:gap-7">
          {categories.map(({ number, title, eyebrow, description, href, images, icon: Icon }) => (
            <Link key={title} href={href} onPointerMove={tiltCard} onPointerLeave={resetCard} onPointerCancel={resetCard} onBlur={resetCard} className="work-category-card group relative flex min-h-[520px] flex-col overflow-hidden rounded-[28px] border border-white/10 bg-[#101010] p-4 shadow-[0_24px_80px_rgba(0,0,0,0.28)] sm:p-5 lg:min-h-[600px]">
              <div className="absolute left-0 top-0 z-20 flex h-16 w-16 items-center justify-center rounded-br-[24px] border-b border-r border-orange-500/35 bg-[#111111] text-brand-orange shadow-[8px_8px_28px_rgba(0,0,0,0.45)]"><Icon size={21} /></div>
              <div className="relative h-[265px] overflow-hidden rounded-[20px] border border-white/[0.08] bg-[#080808] lg:h-[330px]">
                <div className="absolute inset-0 grid grid-cols-2 gap-2 p-3">
                  <div className="relative row-span-2 overflow-hidden rounded-xl"><Image src={images[0]} alt="" fill className="object-cover opacity-80 transition-transform duration-700 md:group-hover:scale-105" sizes="(max-width: 768px) 50vw, 17vw" /></div>
                  <div className="relative overflow-hidden rounded-xl"><Image src={images[1]} alt="" fill className="object-cover opacity-70 transition-transform duration-700 md:group-hover:scale-105" sizes="(max-width: 768px) 50vw, 17vw" /></div>
                  <div className="relative overflow-hidden rounded-xl"><Image src={images[2]} alt="" fill className="object-cover opacity-60 transition-transform duration-700 md:group-hover:scale-105" sizes="(max-width: 768px) 50vw, 17vw" /></div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#101010] via-transparent to-transparent" />

              </div>
              <div className="flex flex-1 flex-col px-2 pb-3 pt-7 sm:px-3">
                <div className="flex items-center justify-between gap-4"><span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-brand-orange">{eyebrow}</span><span className="font-display text-sm text-white/25">{number}</span></div>
                <h2 className="mt-4 font-display text-[clamp(1.8rem,2.4vw,2.55rem)] font-semibold leading-tight text-white">{title}</h2>
                <p className="mt-4 text-sm leading-6 text-white/50 lg:text-[15px]">{description}</p>
                <div className="mt-auto flex items-center justify-between border-t border-white/10 pt-6 text-sm font-semibold text-white"><span>Open Collection</span><span className="flex h-11 w-11 items-center justify-center rounded-full bg-brand-orange text-white transition-transform duration-300 md:group-hover:-translate-y-1 md:group-hover:translate-x-1"><ArrowUpRight size={19} /></span></div>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <style jsx global>{`@media (hover:hover) and (pointer:fine){.work-category-card{transition:transform .45s cubic-bezier(.22,1,.36,1),border-color .35s ease,box-shadow .45s ease}.work-category-card:hover{border-color:rgba(249,115,22,.42);box-shadow:0 32px 95px rgba(0,0,0,.42),0 0 38px rgba(249,115,22,.10)}}`}</style>
    </section>
  );
}