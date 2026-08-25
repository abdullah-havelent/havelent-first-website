'use client';

import { useEffect } from 'react';

import Hero from '@/components/Hero';
import Services from '@/components/Services';
import About from '@/components/About';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import WhyHavelent from '@/components/WhyHavelent';
import FAQ from '@/components/FAQ';

export default function Home() {
  useEffect(() => {
    document.title = 'Havelent — Premium Digital Agency';
  }, []);

  return (
    <>
      {/* HOME */}
      <Hero />

      {/* WHY HAVELENT */}
      <div
        id="our-work"
        className="scroll-mt-28"
      >
        <WhyHavelent />
      </div>

      {/* SERVICES */}
      <div
        id="services"
        className="scroll-mt-28"
      >
        <Services />
      </div>

      {/* FAQ */}
      <FAQ />

      {/* ABOUT */}
      <div
        id="about"
        className="scroll-mt-28"
      >
        <About />
      </div>

      {/* CONTACT */}
      <div
        id="contact"
        className="scroll-mt-28"
      >
        <Contact />
      </div>

      {/* FOOTER */}
      <Footer />
    </>
  );
}