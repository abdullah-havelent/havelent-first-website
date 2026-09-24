import Contact from '@/components/Contact';
import type { Metadata } from "next";

import WorkCategories from "@/components/WorkCategories";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: 'Explore Our Work | Havelent',

  description:
    'Choose between Havelent’s creative portfolio, social media performance, and paid campaign results.',

  alternates: {
    canonical: '/our-work',
  },

  openGraph: {
    title: 'Explore Our Work | Havelent',

    description:
      'Choose between Havelent’s creative portfolio, social media performance, and paid campaign results.',

    url: 'https://havelent.com/our-work',

    siteName: 'Havelent',

    type: 'website',

    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Havelent Creative Work Portfolio',
      },
    ],
  },
};

export default function Page() {
  return (
    <>
      <WorkCategories />
      <Contact />
      <Footer />
    </>
  );
}