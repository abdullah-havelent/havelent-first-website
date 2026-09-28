"use client";

import { useEffect, useState } from "react";
import LoadingScreen from "./LoadingScreen";
import Navbar from "./Navbar";
import CursorGlow from "./CursorGlow";
import SecretAccessGate from "./SecretAccessGate";
import BirthdayNavbar from "./BirthdayNavbar";
import BirthdayCakeCursor from "./BirthdayCakeCursor";
import { usePathname } from "next/navigation";
import { PRIVATE_VAULT_PATH } from "@/lib/privateVaultPath";



export default function ClientRoot({
  children,
}: {
  children: React.ReactNode;
}) {
  const [ready, setReady] = useState(false);
  const pathname = usePathname();




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
          {pathname === PRIVATE_VAULT_PATH ? (
            <BirthdayCakeCursor />
          ) : (
            <CursorGlow />
          )}
          {pathname === PRIVATE_VAULT_PATH ? (
            <BirthdayNavbar />
          ) : (
            <Navbar />
          )}
          <SecretAccessGate />
          {children}
        </>
      )}
    </>
  );
}
