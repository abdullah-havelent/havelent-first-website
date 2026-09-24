import type { Metadata } from "next";

import Footer from "@/components/Footer";
import SocialMediaHero from "@/components/SocialMediaHero";
import SocialMediaServices from "@/components/SocialMediaServices";
import SocialMediaProcess from "@/components/SocialMediaProcess";
import SocialMediaWhyChoose from "@/components/SocialMediaWhyChoose";
import Contact from "@/components/Contact";

export const metadata: Metadata = {
  title: "Social Media Management Services | Havelent",

  description:
    "Social media management for content strategy, content creation, account management, community management, social media advertising, and analytics & reporting by Havelent.",

  alternates: {
    canonical: "/services/social-media-management",
  },

  openGraph: {
    title: "Social Media Management Services | Havelent",

    description:
      "Social media management for content strategy, content creation, account management, community management, social media advertising, and analytics & reporting by Havelent.",

    url: "https://havelent.com/services/social-media-management",

    siteName: "Havelent",

    type: "website",

    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Social Media Management Services — Havelent",
      },
    ],
  },
};

export default function SocialMediaManagementPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-brand-dark">

      {/* =========================================================
          SOCIAL MEDIA MANAGEMENT SERVICE SCHEMA
          ========================================================= */}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "@id":
              "https://havelent.com/services/social-media-management#service",

            name: "Social Media Management Services",

            description:
              "Havelent provides professional social media management services including content strategy, content creation, account management, community management, social media advertising, and analytics & reporting.",

            url: "https://havelent.com/services/social-media-management",

            provider: {
              "@type": "Organization",
              "@id": "https://havelent.com/#organization",
              name: "Havelent",
              url: "https://havelent.com",
            },

            serviceType: "Social Media Management",

            areaServed: {
              "@type": "Place",
              name: "Worldwide",
            },
          }),
        }}
      />

      {/* =========================================================
          BREADCRUMB SCHEMA
          ========================================================= */}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",

            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "Home",
                item: "https://havelent.com/",
              },
              {
                "@type": "ListItem",
                position: 2,
                name: "Services",
                item: "https://havelent.com/#services",
              },
              {
                "@type": "ListItem",
                position: 3,
                name: "Social Media Management Services",
                item: "https://havelent.com/services/social-media-management",
              },
            ],
          }),
        }}
      />

      <SocialMediaHero />

      <SocialMediaServices />

      <SocialMediaProcess />

      <SocialMediaWhyChoose />

      <Contact />

      <Footer />
    </main>
  );
}