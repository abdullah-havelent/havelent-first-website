"use client";

import { useEffect, useRef } from "react";

export default function CursorGlow() {
  const dotRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dot = dotRef.current;
    const inner = innerRef.current;

    if (!dot || !inner) return;

    let mouseX = 0;
    let mouseY = 0;
    let currentX = 0;
    let currentY = 0;
    let isMoving = false;
    let isClicking = false;
    let movementTimer: ReturnType<typeof setTimeout> | undefined;
    let clickTimer: ReturnType<typeof setTimeout> | undefined;

    const updateScale = () => {
      const scale = isClicking ? 2 : isMoving ? 1.35 : 1;
      inner.style.transform = `scale(${scale})`;
    };

    const move = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      isMoving = true;
      updateScale();

      if (movementTimer) clearTimeout(movementTimer);
      movementTimer = setTimeout(() => {
        isMoving = false;
        updateScale();
      }, 100);
    };

    const animate = () => {
      currentX += (mouseX - currentX) * 0.22;
      currentY += (mouseY - currentY) * 0.22;

      dot.style.transform = `translate3d(${currentX - 5}px, ${
        currentY - 5
      }px, 0)`;

      requestAnimationFrame(animate);
    };

    const click = () => {
      isClicking = true;
      updateScale();
      inner.style.boxShadow = "0 0 18px rgba(249, 115, 22, 0.75)";

      if (clickTimer) clearTimeout(clickTimer);
      clickTimer = setTimeout(() => {
        isClicking = false;
        updateScale();
        inner.style.boxShadow = "0 0 10px rgba(249, 115, 22, 0.45)";
      }, 180);
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("click", click);

    animate();

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("click", click);
      if (movementTimer) clearTimeout(movementTimer);
      if (clickTimer) clearTimeout(clickTimer);
    };
  }, []);

  return (
    <div
      ref={dotRef}
      className="hidden md:block"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "10px",
        height: "10px",
        pointerEvents: "none",
        zIndex: 999999,
      }}
    >
      <div
        ref={innerRef}
        style={{
          width: "10px",
          height: "10px",
          borderRadius: "50%",
          background: "#f97316",
          boxShadow: "0 0 10px rgba(249, 115, 22, 0.45)",
          transition:
            "transform 180ms ease, box-shadow 180ms ease",
        }}
      />
    </div>
  );
}