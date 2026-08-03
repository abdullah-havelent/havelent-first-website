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
    // Mobile → Skip intro
    if (window.innerWidth < 768) {
      setReady(true);
      return;
    }

    // Desktop → Show intro
    const timer = setTimeout(() => {
      setReady(true);
    }, 2200);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <LoadingScreen show={!ready} />

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