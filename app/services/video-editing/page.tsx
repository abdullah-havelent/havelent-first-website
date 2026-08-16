import VideoEditingHero from '@/components/VideoEditingHero';
import VideoEditingServices from '@/components/VideoEditingServices';
import Footer from '@/components/Footer';

export default function VideoEditingPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-brand-dark">
      <VideoEditingHero />

      <VideoEditingServices />

      <Footer />
    </main>
  );
}