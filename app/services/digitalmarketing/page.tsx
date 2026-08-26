import type { Metadata } from "next";

import MarketingHero from "@/components/MarketingHero";
import MarketingServices from "@/components/MarketingServices";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Digital Marketing Services | Havelent",
  description:
    "Digital marketing services for YouTube Ads, Facebook Ads, Instagram Ads, TikTok Ads, campaign strategy, and performance analytics by Havelent.",
};

export default function MarketingPage() {
  return (
    <>
      <MarketingHero />
      <MarketingServices />
      <Footer />
    </>
  );
}