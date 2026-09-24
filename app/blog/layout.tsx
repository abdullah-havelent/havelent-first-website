import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Havelent Insights | Video, Design, Marketing & Web Guides',
  description:
    'Explore practical insights from Havelent on video editing, graphic design, digital marketing, social media management, and web development.',

  alternates: {
    canonical: '/blog',
  },

  openGraph: {
    title: 'Havelent Insights | Video, Design, Marketing & Web Guides',
    description:
      'Practical insights on video editing, graphic design, digital marketing, social media management, and web development from Havelent.',
    url: 'https://havelent.com/blog',
    siteName: 'Havelent',
    type: 'website',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Havelent Insights',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Havelent Insights | Video, Design, Marketing & Web Guides',
    description:
      'Practical insights on video editing, graphic design, digital marketing, social media management, and web development from Havelent.',
    images: ['/og-image.png'],
  },
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
