import type { Metadata } from "next";

import GraphicDesignHero from "@/components/GraphicDesignHero";
import GraphicDesignServices from "@/components/GraphicDesignServices";
import GraphicDesignProcess from "@/components/GraphicDesignProcess";
import GraphicDesignWhyChoose from "@/components/GraphicDesignWhyChoose";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Graphic Design Agency | Havelent",

  description:
    "Havelent is a professional graphic design agency creating custom visual designs, brand identities, and creative assets that help brands stand out.",

  alternates: {
    canonical: "/services/graphic-design",
  },

  openGraph: {
    title: "Graphic Design Agency | Havelent",

    description:
      "Havelent is a professional graphic design agency creating custom visual designs, brand identities, and creative assets that help brands stand out.",

    url: "https://havelent.com/services/graphic-design",

    siteName: "Havelent",

    type: "website",

    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Graphic Design Agency — Havelent",
      },
    ],
  },
};

export default function GraphicDesignPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-brand-dark">

      {/* =========================================================
          GRAPHIC DESIGN SERVICE SCHEMA
          ========================================================= */}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "@id": "https://havelent.com/services/graphic-design#service",

            name: "Graphic Design Services",

            description:
              "Havelent provides professional graphic design services, including custom visual designs, brand identities, and creative assets for modern brands.",

            url: "https://havelent.com/services/graphic-design",

            provider: {
              "@type": "Organization",
              "@id": "https://havelent.com/#organization",
              name: "Havelent",
              url: "https://havelent.com",
            },

            serviceType: "Graphic Design",

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
                name: "Graphic Design Services",
                item: "https://havelent.com/services/graphic-design",
              },
            ],
          }),
        }}
      />

      <GraphicDesignHero />

      <GraphicDesignServices />

      <GraphicDesignProcess />

      <GraphicDesignWhyChoose />

      <Contact />

      <Footer />

    </main>
  );
}