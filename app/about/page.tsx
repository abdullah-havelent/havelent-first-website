import type { Metadata } from "next";
import About from "@/components/About";

export const metadata: Metadata = {
  title: "About Havelent | Creative Digital Services",
  description:
    "Learn about Havelent and our approach to video editing, graphic design, digital marketing, and social media management for modern brands.",
};

export default function AboutPage() {
  return <About />;
}