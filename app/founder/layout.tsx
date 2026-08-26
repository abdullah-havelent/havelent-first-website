import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Abdullah Rajpoot | Founder & CEO of Havelent',

  description:
    'Meet Abdullah Rajpoot, Founder & CEO of Havelent, and discover the vision, principles, and creative thinking behind the company.',

  alternates: {
    canonical: '/founder',
  },

  openGraph: {
    title: 'Abdullah Rajpoot | Founder & CEO of Havelent',
    description:
      'Meet Abdullah Rajpoot, Founder & CEO of Havelent, and discover the vision, principles, and creative thinking behind the company.',
    url: 'https://havelent.com/founder',
    siteName: 'Havelent',
    type: 'profile',
    images: [
      {
        url: '/images/ceo-of-havelent-abdullah-rajpoot.webp',
        width: 1200,
        height: 1500,
        alt: 'Abdullah Rajpoot, Founder & CEO of Havelent',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Abdullah Rajpoot | Founder & CEO of Havelent',
    description:
      'Meet Abdullah Rajpoot, Founder & CEO of Havelent.',
    images: [
      '/images/ceo-of-havelent-abdullah-rajpoot.webp',
    ],
  },
};

export default function FounderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}