'use client';

import Hero from '@/components/Hero';
import Reviews from '@/components/Reviews';
import Services from '@/components/Services';
import About from '@/components/About';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import WhyHavelent from '@/components/WhyHavelent';
import FAQ from '@/components/FAQ';
import Blog from '@/components/Blog';
import BrandContactPopup from '@/components/BrandContactPopup';

export default function Home() {
  return (
    <>
      <BrandContactPopup />

      {/* HOME */}
      <div>
        <Hero />
      </div>

      {/* REVIEWS */}
      <Reviews />

      {/* WHY HAVELENT */}
      <div
        
      >
        <WhyHavelent />
      </div>

      {/* SERVICES */}
      <div
        
      >
        <Services />
      </div>

      {/* FAQ */}
      <FAQ />

      {/* ABOUT */}
      <div
        
      >
        <About />
      </div>

      {/* BLOG */}
      <div
        
      >
        <Blog />
      </div>

      {/* CONTACT */}
      <div
        
        
      >
        <Contact />
      </div>

      {/* FOOTER */}
      <Footer />
    </>
  );
}