import type { Metadata } from "next";

import GraphicDesignHero from "@/components/GraphicDesignHero";
import GraphicDesignServices from "@/components/GraphicDesignServices";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Graphic Design Services | Havelent",
  description:
    "Graphic design services for logo design, poster design, business cards, invitation cards, brand identity, and social media design by Havelent.",
};

export default function GraphicDesignPage() {
  return (
    <>
      <GraphicDesignHero />
      <GraphicDesignServices />
      <Footer />
    </>
  );
}