import type { Metadata } from 'next';

import VideoEditingHero from '@/components/VideoEditingHero';
import VideoEditingServices from '@/components/VideoEditingServices';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Video Editing Services | Havelent',
  description:
    'Professional video editing for YouTube videos, commercials and ads, podcasts, Shorts and Reels, documentaries, and motion graphics by Havelent.',
};

export default function VideoEditingPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-brand-dark">
      <VideoEditingHero />

      <VideoEditingServices />

      <Footer />
    </main>
  );
}