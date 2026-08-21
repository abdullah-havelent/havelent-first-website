"use client";

import { useEffect, useState } from "react";
import LoadingScreen from "./LoadingScreen";

export default function IntroProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mounted, setMounted] = useState(false);
  const [showIntro, setShowIntro] = useState(false);

  useEffect(() => {
    setMounted(true);

    const isMobile =
      window.matchMedia("(max-width: 767px)").matches;

    // Mobile → Skip intro completely
    if (isMobile) {
      return;
    }

    // Laptop / Desktop → Show intro
    setShowIntro(true);

    const timer = setTimeout(() => {
      setShowIntro(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  // Mobile → render website immediately
  if (mounted && window.matchMedia("(max-width: 767px)").matches) {
    return <>{children}</>;
  }

  // Wait until hydration on desktop
  if (!mounted) {
    return null;
  }

  // Show intro first
  if (showIntro) {
    return <LoadingScreen show={true} />;
  }

  // Then render website
  return <>{children}</>;
}