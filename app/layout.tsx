import './globals.css';
import type { Metadata } from 'next';
import { Inter, Playfair_Display, League_Spartan } from 'next/font/google';
import ClientRoot from '@/components/ClientRoot';
import ThemeProvider from '@/components/ThemeProvider';

const leagueSpartan = League_Spartan({
  subsets: ['latin'],
  weight: ['900'],
  variable: '--font-league-spartan',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
  weight: ['500', '600', '700', '800'],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://havelent.com'),

  title: 'Havelent | Video Editing, Graphic Design & Digital Marketing',

  description:
    'Havelent provides video editing, graphic design, digital marketing, and social media management for modern brands.',

  alternates: {
    canonical: './',
  },

  icons: {
    icon: '/logos/main-gradient.svg',
  },

openGraph: {
  title: 'Havelent | Video Editing, Graphic Design & Digital Marketing',
  description:
    'Havelent provides video editing, graphic design, digital marketing, and social media management for modern brands.',
  url: 'https://havelent.com',
  siteName: 'Havelent',
  type: 'website',
  images: [
    {
      url: '/og-image.png',
      width: 1200,
      height: 630,
      alt: 'Havelent — Creative Digital Services',
    },
  ],
},
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfair.variable}`}
    >
      <body
        className={`${inter.variable} ${playfair.variable} ${leagueSpartan.variable}`}
      >
<ThemeProvider>
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Organization',
      '@id': 'https://havelent.com/#organization',
      name: 'Havelent',
      url: 'https://havelent.com',
      logo: 'https://havelent.com/logos/main-gradient.svg',

      founder: {
        '@type': 'Person',
        '@id': 'https://havelent.com/founder#person',
        name: 'Abdullah Rajpoot',
        jobTitle: 'Founder & CEO',
        url: 'https://havelent.com/founder',
        image:
          'https://havelent.com/images/ceo-of-havelent-abdullah-rajpoot.webp',
        sameAs: [
          'https://www.linkedin.com/in/abdullah-rajpoot-havelent/',
        ],
      },
    }),
  }}
/>

  <ClientRoot>
    {children}
  </ClientRoot>
</ThemeProvider>
      </body>
    </html>
  );
}