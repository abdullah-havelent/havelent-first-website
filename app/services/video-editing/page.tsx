import type { Metadata } from 'next';

import VideoEditingHero from '@/components/VideoEditingHero';
import VideoEditingServices from '@/components/VideoEditingServices';
import VideoEditingProcess from '@/components/VideoEditingProcess';
import VideoEditingWhyChoose from '@/components/VideoEditingWhyChoose';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Video Editing Services | Havelent',

  description:
    'Professional video editing for YouTube videos, commercials and ads, podcasts, Shorts and Reels, documentaries, and motion graphics by Havelent.',

  alternates: {
    canonical: '/services/video-editing',
  },

  openGraph: {
    title: 'Video Editing Services | Havelent',

    description:
      'Professional video editing for YouTube videos, commercials and ads, podcasts, Shorts and Reels, documentaries, and motion graphics by Havelent.',

    url: 'https://havelent.com/services/video-editing',

    siteName: 'Havelent',

    type: 'website',

    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Video Editing Services — Havelent',
      },
    ],
  },
};

export default function VideoEditingPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-brand-dark">

      {/* =========================================================
          VIDEO EDITING SERVICE SCHEMA
          ========================================================= */}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Service',
            '@id': 'https://havelent.com/services/video-editing#service',

            name: 'Video Editing Services',

            description:
              'Professional video editing for YouTube videos, commercials and ads, podcasts, Shorts and Reels, documentaries, and motion graphics by Havelent.',

            url: 'https://havelent.com/services/video-editing',

            provider: {
              '@type': 'Organization',
              '@id': 'https://havelent.com/#organization',
              name: 'Havelent',
              url: 'https://havelent.com',
            },

            serviceType: 'Video Editing',

areaServed: {
  '@type': 'Place',
  name: 'Worldwide',
},

hasOfferCatalog: {
  '@type': 'OfferCatalog',
  name: 'Video Editing Services',

  itemListElement: [
    {
      '@type': 'Offer',
      itemOffered: {
        '@type': 'Service',
        name: 'YouTube Video Editing',
      },
    },
    {
      '@type': 'Offer',
      itemOffered: {
        '@type': 'Service',
        name: 'Commercial & Ads Editing',
      },
    },
    {
      '@type': 'Offer',
      itemOffered: {
        '@type': 'Service',
        name: 'Podcast Editing',
      },
    },
    {
      '@type': 'Offer',
      itemOffered: {
        '@type': 'Service',
        name: 'Shorts & Reels Editing',
      },
    },
    {
      '@type': 'Offer',
      itemOffered: {
        '@type': 'Service',
        name: 'Documentary Editing',
      },
    },
    {
      '@type': 'Offer',
      itemOffered: {
        '@type': 'Service',
        name: 'Motion Graphics',
      },
    },
  ],
},
          }),
        }}
      />

      {/* =========================================================
          BREADCRUMB SCHEMA
          ========================================================= */}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',

            itemListElement: [
              {
                '@type': 'ListItem',
                position: 1,
                name: 'Home',
                item: 'https://havelent.com/',
              },
              {
                '@type': 'ListItem',
                position: 2,
                name: 'Services',
                item: 'https://havelent.com/#services',
              },
              {
                '@type': 'ListItem',
                position: 3,
                name: 'Video Editing Services',
                item: 'https://havelent.com/services/video-editing',
              },
            ],
          }),
        }}
      />

      <VideoEditingHero />

      <VideoEditingServices />

      <VideoEditingProcess />

      <VideoEditingWhyChoose />

      <Contact />

      <Footer />

    </main>
  );
}