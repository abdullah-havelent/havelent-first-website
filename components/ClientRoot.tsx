"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import LoadingScreen from "./LoadingScreen";
import Navbar from "./Navbar";
import CursorGlow from "./CursorGlow";

const pageTitles: Record<string, string> = {
  "/": "Havelent — Premium Digital Agency",

  "/about": "About Havelent — Premium Digital Agency",

  "/founder": "Founder — Havelent",

  "/our-work": "Our Work — Havelent",

  "/contact": "Contact Havelent — Let's Talk",

  "/services/digitalmarketing": "Digital Marketing — Havelent",

  "/services/graphic-design": "Graphic Design — Havelent",

  "/services/social-media-management":
    "Social Media Management — Havelent",

  "/services/video-editing": "Video Editing — Havelent",
};

export default function ClientRoot({
  children,
}: {
  children: React.ReactNode;
}) {
  const [ready, setReady] = useState(false);
  const pathname = usePathname();

  // =========================================
  // PAGE TITLE
  // =========================================

  useEffect(() => {
    document.title =
      pageTitles[pathname] || "Havelent — Premium Digital Agency";
  }, [pathname]);

  // =========================================
  // INTRO
  // =========================================

  useEffect(() => {
    // Mobile + Desktop → Intro first
    const timer = setTimeout(() => {
      setReady(true);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* ========================================= */}
      {/* INTRO */}
      {/* ========================================= */}

      {!ready && <LoadingScreen show={true} />}

      {/* ========================================= */}
      {/* WEBSITE */}
      {/* RENDERS ONLY AFTER INTRO */}
      {/* ========================================= */}

      {ready && (
        <>
          <CursorGlow />
          <Navbar />
          {children}
        </>
      )}
    </>
  );
}