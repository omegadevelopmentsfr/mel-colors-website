"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsapInit";

interface ScrollAnimationConfig {
  animation: (
    tl: gsap.core.Timeline,
    element: HTMLElement
  ) => void;
  triggerOptions?: ScrollTrigger.Vars;
}

export function useScrollAnimation(config: ScrollAnimationConfig) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!containerRef.current) return;
      const el = containerRef.current;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
          ...config.triggerOptions,
        },
      });

      config.animation(tl, el);
    },
    { scope: containerRef }
  );

  return containerRef;
}
