import type { Metadata } from 'next';
import ResultsGallery from '@/components/ResultsGallery';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
export const metadata: Metadata = { title: 'Paid Campaign Results | Havelent', description: 'Explore real paid advertising campaign results delivered by Havelent.', alternates: { canonical: '/our-work/campaign-results' } };
const images = Array.from({ length: 7 }, (_, index) => `/ads-results/image-${index + 1}.webp`);
export default function CampaignResultsPage() { return <><ResultsGallery eyebrow="Advertising Outcomes" title="Paid Campaign" accent="Results." description="Real campaign screenshots presented in their original proportions, showing the measurable outcomes behind the strategy." images={images} mode="masonry" /><Contact /><Footer /></>; }
