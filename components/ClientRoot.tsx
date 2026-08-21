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