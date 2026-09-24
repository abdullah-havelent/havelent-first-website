import type { Metadata } from 'next';
import ResultsGallery from '@/components/ResultsGallery';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
export const metadata: Metadata = { title: 'Social Media Performance | Havelent', description: 'Explore social media growth and performance reports from Havelent.', alternates: { canonical: '/our-work/social-performance' } };
const images = Array.from({ length: 7 }, (_, index) => `/metricool/${index + 1}.webp`);
export default function SocialPerformancePage() { return <><ResultsGallery eyebrow="Metricool Analytics" title="Social Media" accent="Performance." description="These results are powered by Metricool—a platform that combines performance data from all social channels in one place, making reach, engagement, and growth easy to understand." images={images} mode="grid" /><Contact /><Footer /></>; }
