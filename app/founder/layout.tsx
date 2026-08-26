import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Founder & CEO | Havelent",
  description:
    "Meet Abdullah Rajpoot, Founder and CEO of Havelent, and discover the vision, principles, and creative thinking behind the company.",
};

export default function FounderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}