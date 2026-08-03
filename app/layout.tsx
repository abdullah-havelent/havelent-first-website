import './globals.css';
import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import CursorGlow from "@/components/CursorGlow";
import Navbar from "@/components/Navbar";
import { League_Spartan } from "next/font/google";


const leagueSpartan = League_Spartan({
  subsets: ["latin"],
  weight: ["900"],
  variable: "--font-league-spartan",
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
  title: 'Havelent — Premium Digital Agency',
  description:
    'Havelent is a luxury digital agency crafting cinematic digital experiences, brand systems, and interactive products for visionary brands.',
  openGraph: {
    title: 'Havelent — Premium Digital Agency',
    description:
      'Your Vision, Our Responsibility. Cinematic digital experiences for visionary brands.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {


  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
<body
  className={`${inter.variable} ${playfair.variable} ${leagueSpartan.variable}`}
>

  <CursorGlow />
  <Navbar />
  {children}
</body>
    </html>
  );
}
