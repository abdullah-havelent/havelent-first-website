"use client";

import { useEffect, useState } from "react";
import LoadingScreen from "./LoadingScreen";
import Navbar from "./Navbar";
import CursorGlow from "./CursorGlow";



export default function ClientRoot({
  children,
}: {
  children: React.ReactNode;
}) {
  const [ready, setReady] = useState(false);




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