import type { Metadata } from 'next';
import OurWork from '@/components/OurWork';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
export const metadata: Metadata = { title: 'Creative Portfolio | Havelent', description: 'Explore Havelent’s creative design, branding, website and social media portfolio.', alternates: { canonical: '/our-work/designs' } };
export default function DesignsPage() { return <><OurWork /><Contact /><Footer /></>; }
