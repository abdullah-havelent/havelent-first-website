import type { Metadata } from 'next';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import WebDevelopmentHero from '@/components/WebDevelopmentHero';
import WebDevelopmentProcess from '@/components/WebDevelopmentProcess';
import WebDevelopmentServices from '@/components/WebDevelopmentServices';
import WebDevelopmentWebsiteTypes from '@/components/WebDevelopmentWebsiteTypes';
import WebDevelopmentWhyChoose from '@/components/WebDevelopmentWhyChoose';

const pageUrl = 'https://havelent.com/services/web-development';
const pageDescription =
  'Explore Havelent\'s web design and development services for modern, responsive and conversion-focused websites built to strengthen your digital presence.';

export const metadata: Metadata = {
  title: 'Web Design & Development Services | Havelent',
  description: pageDescription,
  alternates: { canonical: '/services/web-development' },
  openGraph: {
    title: 'Web Design & Development Services | Havelent',
    description: pageDescription,
    url: pageUrl,
    siteName: 'Havelent',
    type: 'website',
    images: [
      { url: '/og-image.png', width: 1200, height: 630, alt: 'Web Design & Development Services — Havelent' },
    ],
  },
};

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  '@id': `${pageUrl}#service`,
  name: 'Web Design & Development Services',
  description: pageDescription,
  url: pageUrl,
  provider: {
    '@type': 'Organization',
    '@id': 'https://havelent.com/#organization',
    name: 'Havelent',
    url: 'https://havelent.com',
  },
  serviceType: 'Web Design and Development',
  areaServed: { '@type': 'Place', name: 'Worldwide' },
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Web Design & Development Services',
    itemListElement: [
      'Custom Website Development',
      'Responsive Web Design',
      'Modern Website Design',
      'Conversion-Focused Web Design',
      'Performance-Focused Development',
      'SEO-Ready Website Development',
    ].map((name) => ({
      '@type': 'Offer',
      itemOffered: { '@type': 'Service', name },
    })),
  },
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://havelent.com/' },
    { '@type': 'ListItem', position: 2, name: 'Services', item: 'https://havelent.com/#services' },
    { '@type': 'ListItem', position: 3, name: 'Web Design & Development', item: pageUrl },
  ],
};

export default function WebDevelopmentPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-brand-dark">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <WebDevelopmentHero />
      <WebDevelopmentServices />
      <WebDevelopmentWebsiteTypes />
      <WebDevelopmentProcess />
      <WebDevelopmentWhyChoose />
      <Contact />
      <Footer />
    </main>
  );
}
