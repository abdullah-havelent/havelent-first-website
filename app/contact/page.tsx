import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Contact Havelent | Get in Touch",
  description:
    "Contact Havelent to discuss your next project in video editing, graphic design, digital marketing, or social media management.",
};

export default function ContactPage() {
  redirect("/#contact");
}