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

    // Mobile → Skip intro completely
    if (window.innerWidth < 768) {
      return;
    }

    // Desktop → Show intro
    setShowIntro(true);

    const timer = setTimeout(() => {
      setShowIntro(false);
    }, 2200);

    return () => clearTimeout(timer);
  }, []);

  // Wait until hydration
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