"use client";

import React from "react";

interface SplitTextProps {
  children: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "div" | "span";
}

/**
 * Splits text into individually animatable words.
 * Each word is wrapped in an overflow:hidden mask with an inner span
 * that GSAP can animate (translateY from 100% to 0).
 */
export default function SplitText({
  children,
  className = "",
  as = "div",
}: SplitTextProps) {
  const words = children.split(" ");

  const content = words.map((word, i) => (
    <span key={i} className="word-mask" style={{ marginRight: "0.3em" }}>
      <span className="word-inner">{word}</span>
    </span>
  ));

  const sharedProps = { className: `split-text ${className}` };

  switch (as) {
    case "h1": return <h1 {...sharedProps}>{content}</h1>;
    case "h2": return <h2 {...sharedProps}>{content}</h2>;
    case "h3": return <h3 {...sharedProps}>{content}</h3>;
    case "h4": return <h4 {...sharedProps}>{content}</h4>;
    case "p":  return <p {...sharedProps}>{content}</p>;
    case "span": return <span {...sharedProps}>{content}</span>;
    default: return <div {...sharedProps}>{content}</div>;
  }
}
