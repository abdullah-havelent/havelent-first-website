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

  "/services/digitalmarketing":
    "Digital Marketing — Havelent",
  "/services/graphic-design":
    "Graphic Design — Havelent",
  "/services/social-media-management":
    "Social Media Management — Havelent",
  "/services/video-editing":
    "Video Editing — Havelent",
};

export default function ClientRoot({
  children,
}: {
  children: React.ReactNode;
}) {
  const [ready, setReady] = useState(false);
  const pathname = usePathname();

  /*
   * =========================================
   * PAGE TITLE
   * =========================================
   */

  useEffect(() => {
    document.title =
      pageTitles[pathname] ||
      "Havelent — Premium Digital Agency";
  }, [pathname]);

  /*
   * =========================================
   * INTRO
   * FIRST VISIT / NEW TAB ONLY
   * =========================================
   */

  useEffect(() => {
    const introSeen = sessionStorage.getItem(
      "havelent-intro-seen"
    );

    /*
     * Intro already played in this tab.
     * Show website immediately.
     */
    if (introSeen === "true") {
      setReady(true);
      return;
    }

    /*
     * First visit in this tab.
     * Wait for LoadingScreen to finish
     * before mounting the website.
     */
    const timer = window.setTimeout(() => {
      sessionStorage.setItem(
        "havelent-intro-seen",
        "true"
      );

      setReady(true);
    }, 1500);

    return () => {
      window.clearTimeout(timer);
    };
  }, []);

  return (
    <>
      {/* ========================================= */}
      {/* INTRO */}
      {/* ========================================= */}

      {!ready && (
        <LoadingScreen show={true} />
      )}

      {/* ========================================= */}
      {/* WEBSITE */}
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