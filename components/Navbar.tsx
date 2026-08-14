'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';


const LINKS = ['Home', 'Services', 'About', 'Contact Us'];


export default function Navbar() {
  const [active, setActive] = useState('Home');
  const router = useRouter();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [manualNav, setManualNav] = useState(false);


  useEffect(() => {
  const handleScroll = () => {
    setScrolled(window.scrollY > 40);
  };

  window.addEventListener("scroll", handleScroll);
  handleScroll();

  return () => window.removeEventListener("scroll", handleScroll);
}, []);



  useEffect(() => {
  const sections = ["home", "services", "about", "contact"];

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (manualNav) return;
        if (!entry.isIntersecting) return;

        switch (entry.target.id) {
          case "home":
            setActive("Home");
            break;
          case "services":
            setActive("Services");
            break;
          case "about":
            setActive("About");
            break;
          case "contact":
            setActive("Contact Us");
            break;
        }
      });
    },
    {
      threshold: 0.55,
    }
  );

  sections.forEach((id) => {
    const el = document.getElementById(id);
    if (el) observer.observe(el);
  });

  return () => observer.disconnect();
}, [manualNav]);

const handleNav = (link: string) => {
  setOpen(false);

  // If we are NOT on the homepage,
  // every navbar link goes to the homepage.
  if (pathname !== "/") {
    setActive("Home");
    router.push("/");
    return;
  }

  // Homepage navigation
  const sectionMap: Record<string, string> = {
    Home: "home",
    Services: "services",
    About: "about",
    "Contact Us": "contact",
  };

  const sectionId = sectionMap[link];

  if (!sectionId) return;

  const section = document.getElementById(sectionId);

  if (section) {
    setManualNav(true);
    setActive(link);

    section.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });

    setTimeout(() => {
      setManualNav(false);
    }, 800);
  }
};

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-4 left-0 right-0 z-[200] flex justify-center px-4"
    >
      <nav
        className={`glass flex items-center gap-1 rounded-full border border-white/10 px-2 py-2 transition-all duration-500 ${
          scrolled ? 'shadow-[0_8px_40px_-8px_rgba(249,115,22,0.35)]' : ''
        }`}
        style={{
          boxShadow: scrolled
            ? '0 8px 40px -8px rgba(249,115,22,0.35), inset 0 1px 0 rgba(255,255,255,0.06)'
            : '0 4px 24px -6px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.06)',
        }}
      >
{/* Brand */}
<button
  onClick={() => handleNav("Home")}
  className="group flex items-center rounded-full px-3 py-2"
  data-cursor="button"
>
  <img
    src="/logos/horizontal-white.svg"
    alt="Havelent"
    className="h-10 w-auto transition-all duration-300 group-hover:scale-[1.03]"
    draggable={false}
  />
</button>

        {/* Desktop links */}
        <div className="ml-1 hidden items-center gap-1 md:flex">
         {LINKS.map((link, i) => (
  <motion.div
    key={link}
    initial={{ opacity: 0, y: -8 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: 0.5 + i * 0.08 }}
  >
    <motion.button
  key={link}
  initial={{ opacity: 0, y: -8 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5, delay: 0.5 + i * 0.08 }}
  onClick={() => handleNav(link)}
  data-cursor="button"
  className={`nav-link relative rounded-full px-4 py-2 text-base font-medium transition-colors duration-300 ${
    active === link
      ? 'text-brand-orange active'
      : 'text-white/100 hover:text-brand-orange'
  }`}
>
  {link}
  <span className="nav-underline" />
  {active === link && (
    <motion.span
      layoutId="nav-dot"
      className="absolute left-1/2 -bottom-0.5 h-1 w-1 -translate-x-1/2 rounded-full bg-brand-orange"
      style={{ boxShadow: '0 0 8px 2px rgba(249,115,22,0.8)' }}
    />
  )}
</motion.button>
  </motion.div>
))}
        </div>

        {/* Desktop actions */}
        <div className="hidden items-center gap-3 md:flex">
          <motion.button
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.58 + LINKS.length * 0.08 }}
            data-cursor="button"
            onClick={() => handleNav("Contact Us")}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="relative overflow-hidden rounded-full bg-gradient-to-r from-brand-accent to-brand-orange px-5 py-2 text-sm font-semibold text-white transition-all duration-300"
            style={{ boxShadow: '0 0 20px -4px rgba(249,115,22,0.5)' }}
          >
            <span className="relative z-10">Get a Quote</span>
            <span className="absolute inset-0 bg-gradient-to-r from-brand-orange to-brand-red opacity-0 transition-opacity duration-300 hover:opacity-100" />
          </motion.button>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen((o) => !o)}
          className="ml-1 flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-white md:hidden"
          aria-label="Menu"
        >
          {open ? <X size={16} /> : <Menu size={16} />}
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3 }}
            className="glass absolute top-20 left-4 right-4 rounded-3xl border border-white/10 p-4 md:hidden"
          >
            {LINKS.map((link) => (
  <motion.button
  key={link}
  onClick={() => handleNav(link)}
    className={`block w-full rounded-2xl px-4 py-3 text-left text-sm font-medium transition-colors ${
      active === link
        ? 'bg-brand-orange/10 text-brand-orange'
        : 'text-white/80 hover:text-brand-orange'
    }`}
  >
    {link}
  </motion.button>
))}
            <div className="mt-3 flex gap-2">
              <button className="flex-1 rounded-full border border-white/25 px-4 py-2.5 text-sm font-medium text-white">
                Sign Up
              </button>
              <button className="flex-1 rounded-full bg-gradient-to-r from-brand-accent to-brand-orange px-4 py-2.5 text-sm font-semibold text-white">
                Login
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
