"use client";

import { useEffect, useRef } from "react";

export default function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const glow = glowRef.current;
    if (!glow) return;

    let mouseX = 0;
    let mouseY = 0;
    let currentX = 0;
    let currentY = 0;

    const move = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const animate = () => {
      currentX += (mouseX - currentX) * 1;
      currentY += (mouseY - currentY) * 1;

      glow.style.transform = `translate(${currentX - 20}px, ${currentY - 20}px)`;

      requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", move);
    animate();

    return () => {
      window.removeEventListener("mousemove", move);
    };
  }, []);

  return (
    <div
      ref={glowRef}
      className="cursor-glow"
      style={{
        position: "fixed",
        width: "60px",
        height: "60px",
        boxShadow: "0 0 14px 5px rgba(249,115,22,0.008)",
        borderRadius: "50%",
        top: 0,
        left: 0,
        zIndex: 999999,
        pointerEvents: "none",
      }}
    />
  );
}