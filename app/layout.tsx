import './globals.css';
import type { Metadata } from 'next';
import localFont from 'next/font/local';

import '@fontsource/playfair-display/500.css';
import '@fontsource/playfair-display/600.css';
import '@fontsource/playfair-display/700.css';
import '@fontsource/playfair-display/800.css';

import ClientRoot from '@/components/ClientRoot';
import ThemeProvider from '@/components/ThemeProvider';

const leagueSpartan = localFont({
  src: './fonts/LeagueSpartan.ttf',
  weight: '900',
  display: 'swap',
  variable: '--font-league-spartan',
});

const inter = localFont({
  src: './fonts/Inter.ttf',
  weight: '100 900',
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://havelent.com'),

  title: 'Havelent | Digital Agency for Modern Brands',

  description:
    'Havelent provides video editing, graphic design, digital marketing, and social media management for modern brands.',

  alternates: {
    canonical: './',
  },

  icons: {
    icon: '/favicon-192.png',
  },

  openGraph: {
    title: 'Havelent | Digital Agency for Modern Brands',
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
      className={`${inter.variable}`}
      style={
        {
          '--font-display': '"Playfair Display"',
        } as React.CSSProperties
      }
    >
      <body
        className={`${inter.variable} ${leagueSpartan.variable}`}
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