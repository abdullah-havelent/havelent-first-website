import type { Metadata } from 'next';

import Footer from "@/components/Footer";
import SocialMediaHero from "@/components/SocialMediaHero";
import SocialMediaServices from "@/components/SocialMediaServices";

export const metadata: Metadata = {
  title: 'Social Media Management Services | Havelent',
  description:
    'Social media management for content strategy, content creation, account management, community management, social media advertising, and analytics & reporting by Havelent.',
};

export default function SocialMediaManagementPage() {
  return (
    <>
      <SocialMediaHero />
      <SocialMediaServices />
      <Footer />
    </>
  );
}