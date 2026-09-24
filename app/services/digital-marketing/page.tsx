import type { Metadata } from "next";

import MarketingHero from "@/components/MarketingHero";
import MarketingServices from "@/components/MarketingServices";
import MarketingProcess from "@/components/MarketingProcess";
import MarketingWhyChoose from "@/components/MarketingWhyChoose";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Digital Marketing Services | Havelent",

  description:
    "Havelent provides data-driven digital marketing services, including paid advertising, campaign strategy, lead generation, and performance analytics.",

  alternates: {
    canonical: "/services/digital-marketing",
  },

  openGraph: {
    title: "Digital Marketing Services | Havelent",

    description:
      "Havelent provides data-driven digital marketing services, including paid advertising, campaign strategy, lead generation, and performance analytics.",

    url: "https://havelent.com/services/digital-marketing",

    siteName: "Havelent",

    type: "website",

    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Digital Marketing Services — Havelent",
      },
    ],
  },
};

/* =========================================================
   DIGITAL MARKETING SERVICE SCHEMA
   ========================================================= */

const digitalMarketingSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": "https://havelent.com/services/digital-marketing#service",

  name: "Digital Marketing Services",

  description:
    "Havelent provides data-driven digital marketing services, including YouTube Ads, Facebook Ads, Instagram Ads, TikTok Ads, campaign strategy, and performance analytics.",

  provider: {
    "@type": "Organization",
    "@id": "https://havelent.com/#organization",
    name: "Havelent",
    url: "https://havelent.com",
  },

  url: "https://havelent.com/services/digital-marketing",

  serviceType: "Digital Marketing",

  areaServed: {
    "@type": "Place",
    name: "Worldwide",
  },

  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Digital Marketing Services",

    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "YouTube Ads",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Facebook Ads",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Instagram Ads",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "TikTok Ads",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Campaign Strategy",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Performance Analytics",
        },
      },
    ],
  },
};

/* =========================================================
   BREADCRUMB SCHEMA
   ========================================================= */

const digitalMarketingBreadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "@id": "https://havelent.com/services/digital-marketing#breadcrumb",

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
      name: "Digital Marketing",
      item: "https://havelent.com/services/digital-marketing",
    },
  ],
};

export default function MarketingPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-brand-dark">

      {/* =========================================================
          DIGITAL MARKETING SERVICE SCHEMA
          ========================================================= */}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(digitalMarketingSchema),
        }}
      />

      {/* =========================================================
          BREADCRUMB SCHEMA
          ========================================================= */}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            digitalMarketingBreadcrumbSchema
          ),
        }}
      />

      <MarketingHero />

      <MarketingServices />

      <MarketingProcess />

      <MarketingWhyChoose />

      <Contact />

      <Footer />
    </main>
  );
}