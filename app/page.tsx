'use client';


import IntroProvider from "@/components/IntroProvider";
import Hero from '@/components/Hero';
import Services from '@/components/Services';
import About from '@/components/About';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import WhyHavelent from "@/components/WhyHavelent";
import FAQ from "@/components/FAQ";

export default function Home() {
return (
  <IntroProvider>
      <Hero />
      <WhyHavelent />
      <Services />
      <FAQ />
      <About />
      <Contact />
      <Footer />
    </IntroProvider>
  );
}