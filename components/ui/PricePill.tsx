"use client";

import React from "react";

interface PricePillProps {
  price: string;
  className?: string;
}

export default function PricePill({ price, className = "" }: PricePillProps) {
  return (
    <span
      className={`pill-badge ${className}`}
      style={{
        backgroundColor: "var(--orange)",
        color: "var(--black)",
        fontSize: "1.8rem",
        padding: "10px 32px",
        boxShadow: "0 4px 20px rgba(224, 122, 63, 0.3)",
      }}
    >
      {price}
    </span>
  );
}
