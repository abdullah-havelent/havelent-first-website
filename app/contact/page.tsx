import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Havelent | Get in Touch",
  description:
    "Contact Havelent to discuss your next project in video editing, graphic design, digital marketing, or social media management.",
};

export default function ContactPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-black text-white">
      <h1 className="text-5xl font-bold">Contact Page</h1>
    </main>
  );
}