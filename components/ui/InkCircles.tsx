"use client";

import React, { useEffect, useRef } from "react";

interface InkCirclesProps {
  className?: string;
}

export default function InkCircles({ className = "" }: InkCirclesProps) {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const circles = entry.target.querySelectorAll(".ink-circle");
            circles.forEach((circle, i) => {
              setTimeout(() => {
                circle.classList.add("animate");
              }, i * 400);
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    if (svgRef.current) {
      observer.observe(svgRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <svg
      ref={svgRef}
      width="180"
      height="180"
      viewBox="0 0 180 180"
      className={className}
      style={{ overflow: "visible" }}
    >
      <circle
        className="ink-circle"
        cx="90"
        cy="90"
        r="50"
        strokeWidth="2.5"
      />
      <circle
        className="ink-circle"
        cx="110"
        cy="70"
        r="35"
        strokeWidth="1.5"
        style={{ animationDelay: "0.3s" }}
      />
      <circle
        className="ink-circle"
        cx="70"
        cy="110"
        r="25"
        strokeWidth="2"
        style={{ animationDelay: "0.6s" }}
      />
    </svg>
  );
}
