"use client";

import React from "react";

interface PaintTubeSVGProps {
  className?: string;
}

export default function PaintTubeSVG({ className = "" }: PaintTubeSVGProps) {
  return (
    <svg
      width="120"
      height="160"
      viewBox="0 0 120 160"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Tube cap */}
      <rect x="40" y="5" width="40" height="16" rx="3" fill="#888" />
      <rect x="44" y="0" width="32" height="8" rx="2" fill="#999" />

      {/* Tube body */}
      <path
        d="M35 21 L85 21 L90 140 C90 148 82 155 60 155 C38 155 30 148 30 140 Z"
        fill="var(--orange)"
      />
      {/* Tube highlight */}
      <path
        d="M45 21 L55 21 L52 140 C52 144 54 146 60 146"
        fill="none"
        stroke="rgba(255,255,255,0.3)"
        strokeWidth="8"
        strokeLinecap="round"
      />
      {/* Tube shadow */}
      <path
        d="M70 25 L78 25 L82 135"
        fill="none"
        stroke="rgba(0,0,0,0.1)"
        strokeWidth="6"
        strokeLinecap="round"
      />
      {/* Crimp lines */}
      <line x1="38" y1="25" x2="82" y2="25" stroke="rgba(0,0,0,0.15)" strokeWidth="1" />
      <line x1="37" y1="30" x2="83" y2="30" stroke="rgba(0,0,0,0.1)" strokeWidth="1" />

      {/* Paint squeeze coming out */}
      <path
        d="M56 5 C56 -5 52 -10 50 -15 C48 -20 55 -22 58 -18 C61 -14 60 -8 58 -2"
        fill="var(--orange)"
        stroke="var(--coral)"
        strokeWidth="0.5"
      />
    </svg>
  );
}
