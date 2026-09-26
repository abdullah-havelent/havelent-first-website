'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Code2,
  Layers3,
  Megaphone,
  MessageCircle,
  PenTool,
  Play,
} from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';

const services = [
  { label: 'Video Editing', href: '/services/video-editing', icon: Play },
  { label: 'Graphic Design', href: '/services/graphic-design', icon: PenTool },
  { label: 'Digital Marketing', href: '/services/digital-marketing', icon: Megaphone },
  { label: 'Social Media', href: '/services/social-media-management', icon: MessageCircle },
  { label: 'Web Development', href: '/services/web-development', icon: Code2 },
] as const;

const nodeAngles = [-62, -31, 0, 31, 62];
const centerY = 270;

function polarPoint(radius: number, angle: number) {
  const radians = (angle * Math.PI) / 180;
  return {
    x: Math.cos(radians) * radius,
    y: centerY + Math.sin(radians) * radius,
  };
}

function arcPath(radius: number, startAngle: number, endAngle: number) {
  const start = polarPoint(radius, startAngle);
  const end = polarPoint(radius, endAngle);
  return `M ${start.x} ${start.y} A ${radius} ${radius} 0 0 1 ${end.x} ${end.y}`;
}

export default function ServiceWheel() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredHref, setHoveredHref] = useState<string | null>(null);

  const activeService = useMemo(
    () => services.find((service) => service.href === pathname) ?? services[0],
    [pathname],
  );
  const focusedService = services.find((service) => service.href === hoveredHref) ?? activeService;
  const focusedIndex = services.findIndex((service) => service.href === focusedService.href);

  useEffect(() => {
    setIsOpen(false);
    setHoveredHref(null);
  }, [pathname]);

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
        setHoveredHref(null);
      }
    };
    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, []);

  const closeWheel = () => {
    setIsOpen(false);
    setHoveredHref(null);
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.button
            type="button"
            aria-label="Close service wheel"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            onClick={closeWheel}
            className="fixed inset-0 z-[130] hidden cursor-default bg-black/45 backdrop-blur-[6px] xl:block"
          />
        )}
      </AnimatePresence>

      <motion.nav
        aria-label="Switch service"
        data-service-wheel
        initial={false}
        animate={{ width: isOpen ? 430 : 48, height: isOpen ? 540 : 96 }}
        transition={{ type: 'spring', stiffness: 285, damping: 31 }}
        onPointerEnter={() => setIsOpen(true)}
        onPointerLeave={closeWheel}
        onFocusCapture={() => setIsOpen(true)}
        onBlurCapture={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget as Node | null)) closeWheel();
        }}
        className="fixed left-0 top-1/2 z-[140] hidden -translate-y-1/2 overflow-visible xl:block"
      >
        <AnimatePresence mode="wait">
          {!isOpen && (
            <motion.div
              key="wheel-trigger"
              initial={{ opacity: 0, x: -12, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -12, scale: 0.9 }}
              className="pointer-events-none absolute -left-8 top-1/2 flex h-20 w-20 -translate-y-1/2 items-center justify-end rounded-full border border-white/10 bg-black/80 pr-3 shadow-[0_0_32px_rgba(0,0,0,0.7),0_0_24px_rgba(249,115,22,0.13)] backdrop-blur-xl"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-full border border-orange-400/35 bg-orange-500/10 text-orange-400">
                <Layers3 size={18} strokeWidth={1.8} />
              </span>
              <span className="absolute right-1 top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-orange-500 shadow-[0_0_12px_rgba(249,115,22,0.9)]" />
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              key="service-orbit"
              initial={{ opacity: 0, x: -24, scale: 0.97 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -24, scale: 0.97 }}
              transition={{ duration: 0.22, ease: 'easeOut' }}
              className="absolute inset-0"
            >
              <div className="pointer-events-none absolute -left-[270px] top-1/2 h-[540px] w-[540px] -translate-y-1/2 rounded-full border border-white/[0.08] bg-[radial-gradient(circle_at_84%_50%,rgba(249,115,22,0.13),rgba(18,12,10,0.88)_43%,rgba(3,3,3,0.96)_68%)] shadow-[0_0_90px_rgba(0,0,0,0.78),inset_-1px_0_0_rgba(249,115,22,0.3)] backdrop-blur-2xl" />
              <div className="pointer-events-none absolute left-0 top-1/2 h-[450px] w-[225px] -translate-y-1/2 overflow-hidden">
                <div className="absolute -left-[225px] top-0 h-[450px] w-[450px] rounded-full border border-orange-500/35 shadow-[0_0_36px_rgba(249,115,22,0.08)]" />
              </div>

              <svg aria-hidden="true" viewBox="0 0 250 540" className="pointer-events-none absolute left-0 top-0 h-[540px] w-[250px] overflow-visible">
                <path d={arcPath(225, -64, 64)} fill="none" stroke="rgba(249,115,22,0.34)" strokeWidth="1.2" />
                <path d={arcPath(74, -68, 68)} fill="none" stroke="rgba(255,255,255,0.09)" strokeWidth="1" />
                {nodeAngles.map((angle) => {
                  const inner = polarPoint(80, angle);
                  const outer = polarPoint(178, angle);
                  return <line key={angle} x1={inner.x} y1={inner.y} x2={outer.x} y2={outer.y} stroke="rgba(255,255,255,0.055)" strokeWidth="1" />;
                })}
              </svg>

              <div className="pointer-events-none absolute left-[275px] top-[52px]">
                <div className="flex items-center gap-2 text-[9px] font-bold uppercase tracking-[0.2em] text-white/35">
                  <span>{String(focusedIndex + 1).padStart(2, '0')}</span>
                  <span className="h-px w-6 bg-orange-500/50" />
                  <span>{String(services.length).padStart(2, '0')}</span>
                </div>
                <motion.p key={focusedService.href} initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className="mt-2 w-[140px] font-display text-xl font-semibold leading-tight text-white">
                  {focusedService.label}
                </motion.p>
              </div>

              {services.map((service, index) => {
                const point = polarPoint(190, nodeAngles[index]);
                const isActive = service.href === pathname;
                const isHovered = service.href === hoveredHref;
                const Icon = service.icon;

                return (
                  <motion.div
                    key={service.href}
                    initial={{ opacity: 0, x: -16, scale: 0.9 }}
                    animate={{ opacity: 1, x: 0, scale: isHovered ? 1.045 : 1, left: point.x - 27, top: point.y - 29 }}
                    exit={{ opacity: 0, x: -16, scale: 0.9 }}
                    transition={{ opacity: { duration: 0.15, delay: index * 0.025 }, x: { duration: 0.2, delay: index * 0.025 }, scale: { type: 'spring', stiffness: 380, damping: 25 } }}
                    className="absolute z-10"
                  >
                    <Link
                      href={service.href}
                      aria-label={`Open ${service.label}`}
                      aria-current={isActive ? 'page' : undefined}
                      onPointerEnter={() => setHoveredHref(service.href)}
                      onPointerLeave={() => setHoveredHref(null)}
                      onFocus={() => setHoveredHref(service.href)}
                      onBlur={() => setHoveredHref(null)}
                      className={`group flex h-[58px] w-[198px] items-center gap-3 rounded-full border px-2 pr-5 backdrop-blur-xl transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 ${
                        isHovered
                          ? 'border-white/80 bg-white text-black shadow-[0_14px_38px_rgba(0,0,0,0.34),0_0_24px_rgba(255,255,255,0.1)]'
                          : isActive
                            ? 'border-orange-400/75 bg-[linear-gradient(90deg,rgba(249,115,22,0.34),rgba(40,18,10,0.86))] text-white shadow-[0_0_30px_rgba(249,115,22,0.2)]'
                            : 'border-white/[0.11] bg-black/70 text-white/60 shadow-[0_12px_30px_rgba(0,0,0,0.34)] hover:text-white'
                      }`}
                    >
                      <span className={`relative flex h-11 w-11 shrink-0 items-center justify-center rounded-full border transition-colors duration-200 ${isHovered ? 'border-black/10 bg-black text-white' : isActive ? 'border-orange-300/50 bg-orange-500/20 text-orange-200' : 'border-white/10 bg-white/[0.035] text-white/70'}`}>
                        <Icon size={19} strokeWidth={1.8} />
                        {isActive && <span className="absolute -left-0.5 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-orange-400 shadow-[0_0_10px_rgba(249,115,22,0.9)]" />}
                      </span>
                      <span className="min-w-0">
                        <span className={`block text-[8px] font-bold uppercase tracking-[0.18em] ${isHovered ? 'text-black/45' : isActive ? 'text-orange-300' : 'text-white/30'}`}>
                          {String(index + 1).padStart(2, '0')}{isActive ? ' / Active' : ' / Service'}
                        </span>
                        <span className="mt-0.5 block whitespace-nowrap text-[11px] font-bold uppercase tracking-[0.08em]">{service.label}</span>
                      </span>
                    </Link>
                  </motion.div>
                );
              })}

              <div className="pointer-events-none absolute -left-[74px] top-1/2 h-[148px] w-[148px] -translate-y-1/2 rounded-full border border-white/[0.07] bg-black/90 shadow-[0_0_45px_rgba(0,0,0,0.7)]" />
              <span className="pointer-events-none absolute -left-1 top-1/2 h-2.5 w-2.5 -translate-y-1/2 rounded-full bg-orange-500 shadow-[0_0_18px_rgba(249,115,22,0.9)]" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  );
}