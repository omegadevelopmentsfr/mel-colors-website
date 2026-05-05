"use client";

import { useCallback, useRef, useState } from "react";

interface TiltStyle {
  transform: string;
  transition: string;
}

interface ShimmerStyle {
  background: string;
  opacity: number;
}

export function useMouseTilt(maxTilt = 15) {
  const ref = useRef<HTMLDivElement>(null);
  const [tiltStyle, setTiltStyle] = useState<TiltStyle>({
    transform: "perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)",
    transition: "transform 0.1s ease-out",
  });
  const [shimmerStyle, setShimmerStyle] = useState<ShimmerStyle>({
    background: "transparent",
    opacity: 0,
  });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!ref.current || window.innerWidth < 768) return;
      const rect = ref.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;

      const rotateX = (0.5 - y) * maxTilt;
      const rotateY = (x - 0.5) * maxTilt;

      setTiltStyle({
        transform: `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.03,1.03,1.03)`,
        transition: "transform 0.1s ease-out",
      });

      setShimmerStyle({
        background: `radial-gradient(circle at ${x * 100}% ${y * 100}%, rgba(255,255,255,0.3) 0%, transparent 60%)`,
        opacity: 1,
      });
    },
    [maxTilt]
  );

  const handleMouseLeave = useCallback(() => {
    setTiltStyle({
      transform: "perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)",
      transition: "transform 0.4s ease-out",
    });
    setShimmerStyle({
      background: "transparent",
      opacity: 0,
    });
  }, []);

  return { ref, tiltStyle, shimmerStyle, handleMouseMove, handleMouseLeave };
}
