"use client";

import React, { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const trailRefs = useRef<(HTMLDivElement | null)[]>([]);
  const mousePos = useRef({ x: -100, y: -100 });
  const dotPos = useRef({ x: -100, y: -100 });
  const trailPositions = useRef([
    { x: -100, y: -100 },
    { x: -100, y: -100 },
    { x: -100, y: -100 },
  ]);
  const [isHovering, setIsHovering] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const hueRef = useRef(20);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (isMobile) return;

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current.x = e.clientX;
      mousePos.current.y = e.clientY;
      // Shift hue based on movement speed
      hueRef.current = (hueRef.current + 0.3) % 360;
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("[data-cursor-hover]") ||
        target.style.cursor === "pointer"
      ) {
        setIsHovering(true);
      }
    };

    const handleMouseOut = () => {
      setIsHovering(false);
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseout", handleMouseOut);

    let rafId: number;

    const animate = () => {
      // Lerp main dot
      dotPos.current.x += (mousePos.current.x - dotPos.current.x) * 0.15;
      dotPos.current.y += (mousePos.current.y - dotPos.current.y) * 0.15;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${dotPos.current.x}px, ${dotPos.current.y}px) translate(-50%, -50%) scale(${isHovering ? 2.2 : 1})`;
      }

      // Lerp trails with decreasing speed
      const lerpFactors = [0.1, 0.07, 0.04];
      trailPositions.current.forEach((pos, i) => {
        const target = i === 0 ? dotPos.current : trailPositions.current[i - 1];
        pos.x += (target.x - pos.x) * lerpFactors[i];
        pos.y += (target.y - pos.y) * lerpFactors[i];

        const trail = trailRefs.current[i];
        if (trail) {
          trail.style.transform = `translate(${pos.x}px, ${pos.y}px) translate(-50%, -50%)`;
        }
      });

      rafId = requestAnimationFrame(animate);
    };

    rafId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseout", handleMouseOut);
    };
  }, [isMobile, isHovering]);

  if (isMobile) return null;

  const trailSizes = [8, 6, 4];
  const trailOpacities = [0.4, 0.25, 0.15];

  return (
    <>
      {/* Trail dots */}
      {trailSizes.map((size, i) => (
        <div
          key={`trail-${i}`}
          ref={(el) => { trailRefs.current[i] = el; }}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: `${size}px`,
            height: `${size}px`,
            borderRadius: "50%",
            backgroundColor: "var(--orange)",
            opacity: trailOpacities[i],
            pointerEvents: "none",
            zIndex: 9998,
            willChange: "transform",
            mixBlendMode: "multiply",
          }}
        />
      ))}
      {/* Main cursor dot */}
      <div
        ref={dotRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "14px",
          height: "14px",
          borderRadius: "50%",
          background: isHovering
            ? "var(--magenta)"
            : "var(--orange)",
          pointerEvents: "none",
          zIndex: 9999,
          willChange: "transform",
          transition: "background 0.3s ease, width 0.3s, height 0.3s",
          mixBlendMode: "multiply",
          boxShadow: isHovering
            ? "0 0 20px rgba(224,49,127,0.4)"
            : "0 0 12px rgba(224,122,63,0.3)",
        }}
      />
    </>
  );
}
