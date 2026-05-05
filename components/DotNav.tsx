"use client";

import React, { useEffect, useState } from "react";

const SECTION_IDS = [
  "hero",
  "about",
  "packs-overview",
  "pack-starter",
  "pack-boost",
  "pack-full",
  "closing",
];

export default function DotNav() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (isMobile) return;

    const observers: IntersectionObserver[] = [];

    SECTION_IDS.forEach((id, index) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveIndex(index);
          }
        },
        { threshold: 0.3 }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, [isMobile]);

  if (isMobile) return null;

  const handleClick = (index: number) => {
    const el = document.getElementById(SECTION_IDS[index]);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav
      id="dot-nav"
      style={{
        position: "fixed",
        right: "24px",
        top: "50%",
        transform: "translateY(-50%)",
        zIndex: 100,
        display: "flex",
        flexDirection: "column",
        gap: "14px",
      }}
    >
      {SECTION_IDS.map((_, i) => (
        <button
          key={i}
          onClick={() => handleClick(i)}
          aria-label={`Go to section ${i + 1}`}
          data-cursor-hover
          style={{
            width: activeIndex === i ? "12px" : "8px",
            height: activeIndex === i ? "12px" : "8px",
            borderRadius: "50%",
            border: "none",
            backgroundColor:
              activeIndex === i ? "var(--orange)" : "rgba(17,17,17,0.25)",
            cursor: "none",
            transition: "all 0.3s ease",
            padding: 0,
            boxShadow:
              activeIndex === i ? "0 0 8px rgba(224,122,63,0.4)" : "none",
          }}
        />
      ))}
    </nav>
  );
}
