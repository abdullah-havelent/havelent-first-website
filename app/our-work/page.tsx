import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Our Work | Havelent",
  description:
    "Explore Havelent's creative work across video editing, graphic design, digital marketing, and social media management.",
};

export default function Page() {
  redirect("/#our-work");
}