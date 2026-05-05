"use client";

import React from "react";

interface WaveDividerProps {
  color?: string;
  flip?: boolean;
  className?: string;
}

export default function WaveDivider({
  color = "var(--orange)",
  flip = false,
  className = "",
}: WaveDividerProps) {
  return (
    <div
      className={`w-full overflow-hidden leading-none ${className}`}
      style={{
        transform: flip ? "scaleY(-1)" : undefined,
        marginTop: "-2px",
      }}
    >
      <svg
        viewBox="0 0 1440 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        className="w-full"
        style={{ display: "block", height: "80px" }}
      >
        <path
          d="M0,40 C240,100 480,0 720,50 C960,100 1200,10 1440,60 L1440,120 L0,120 Z"
          fill={color}
          fillOpacity="0.15"
        />
        <path
          d="M0,60 C200,20 400,90 720,40 C1040,-10 1240,80 1440,40 L1440,120 L0,120 Z"
          fill={color}
          fillOpacity="0.08"
        />
        <path
          d="M0,80 C360,40 720,100 1080,50 C1260,30 1380,70 1440,55"
          fill="none"
          stroke={color}
          strokeWidth="2"
          strokeOpacity="0.4"
        />
      </svg>
    </div>
  );
}
