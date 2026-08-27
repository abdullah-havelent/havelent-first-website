import type { Metadata } from "next";

import OurWork from "@/components/OurWork";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Our Work | Havelent",
  description:
    "Explore Havelent's creative work across video editing, graphic design, digital marketing, and social media management.",
};

export default function Page() {
  return (
    <>
      <OurWork />
      <Footer />
    </>
  );
}