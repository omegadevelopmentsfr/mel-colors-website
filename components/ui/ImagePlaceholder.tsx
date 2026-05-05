"use client";

import React from "react";

interface ImagePlaceholderProps {
  label: string;
  color?: string;
  shape?: "rect" | "circle";
  width?: string;
  height?: string;
  className?: string;
}

export default function ImagePlaceholder({
  label,
  color = "var(--orange)",
  shape = "rect",
  width = "100%",
  height = "300px",
  className = "",
}: ImagePlaceholderProps) {
  return (
    <div
      className={`placeholder-img ${className}`}
      style={{
        width,
        height,
        backgroundColor: color,
        borderRadius: shape === "circle" ? "50%" : "16px",
        aspectRatio: shape === "circle" ? "1" : undefined,
        background: `linear-gradient(135deg, ${color} 0%, ${color}dd 50%, ${color}aa 100%)`,
        boxShadow: `0 8px 32px ${color}40`,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Subtle texture overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "repeating-conic-gradient(rgba(255,255,255,0.03) 0% 25%, transparent 0% 50%)",
          backgroundSize: "20px 20px",
          borderRadius: "inherit",
        }}
      />
      <span style={{ position: "relative", zIndex: 1, textShadow: "0 1px 4px rgba(0,0,0,0.3)" }}>
        {label}
      </span>
    </div>
  );
}
