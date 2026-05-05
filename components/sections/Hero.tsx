"use client";

import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsapInit";
import SplitText from "@/components/ui/SplitText";

export default function Hero() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!sectionRef.current) return;

      const tl = gsap.timeline({ delay: 0.5 });

      // Word-by-word mask reveal for "MEL'S COLORS"
      tl.from(
        sectionRef.current.querySelectorAll(".hero-title .word-inner"),
        {
          y: "100%",
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.1,
        }
      );

      // Subtitle pill fade in
      tl.from(
        sectionRef.current.querySelector(".hero-subtitle"),
        {
          opacity: 0,
          y: 20,
          duration: 0.6,
          ease: "power2.out",
        },
        "-=0.3"
      );

      // Tagline
      tl.from(
        sectionRef.current.querySelector(".hero-tagline"),
        {
          opacity: 0,
          y: 15,
          duration: 0.5,
          ease: "power2.out",
        },
        "-=0.2"
      );

      // Scroll indicator
      tl.from(
        sectionRef.current.querySelector(".scroll-indicator"),
        {
          opacity: 0,
          duration: 0.8,
        },
        "-=0.1"
      );
    },
    { scope: sectionRef }
  );

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="flex flex-col items-center justify-center relative"
      style={{ minHeight: "100vh", padding: "0 5vw" }}
    >
      {/* Decorative paint strokes (CSS) */}
      <div
        className="paint-stroke"
        style={{
          width: "300px",
          height: "120px",
          background: "linear-gradient(135deg, var(--orange), var(--mustard))",
          top: "10%",
          left: "-5%",
          opacity: 0.2,
          transform: "rotate(-15deg)",
        }}
      />
      <div
        className="paint-stroke"
        style={{
          width: "250px",
          height: "100px",
          background: "linear-gradient(135deg, var(--magenta), var(--purple))",
          bottom: "15%",
          right: "-3%",
          opacity: 0.15,
          transform: "rotate(10deg)",
        }}
      />
      <div
        className="paint-stroke"
        style={{
          width: "200px",
          height: "80px",
          background: "linear-gradient(135deg, var(--olive), var(--cyan))",
          top: "60%",
          left: "8%",
          opacity: 0.12,
          transform: "rotate(25deg)",
        }}
      />

      {/* Main content */}
      <div className="text-center relative z-10 w-full px-4">
        <div className="flex flex-col items-center">
          <SplitText
            as="h1"
            className="hero-title"
          >
            {"MEL'S"}
          </SplitText>
          <SplitText
            as="h1"
            className="hero-title"
          >
            {"COLORS"}
          </SplitText>
        </div>

        <div
          className="hero-subtitle pill-badge mt-8"
          style={{
            backgroundColor: "var(--black)",
            color: "white",
            fontSize: "1.4rem",
            padding: "16px 40px",
          }}
        >
          by Melvy Bou Rjeili
        </div>

        <p
          className="hero-tagline mt-8 font-body"
          style={{
            fontSize: "1.4rem",
            color: "rgba(17,17,17,0.8)",
            maxWidth: "500px",
            margin: "32px auto 0",
            lineHeight: 1.6,
          }}
        >
          Art sur commande · Couleurs sur mesure
        </p>
      </div>

      {/* Scroll indicator */}
      <div
        className="scroll-indicator absolute bottom-8 left-1/2"
        style={{ transform: "translateX(-50%)" }}
      >
        <div
          style={{
            width: "12px",
            height: "12px",
            borderRadius: "50%",
            backgroundColor: "var(--orange)",
            boxShadow: "0 4px 12px rgba(224,122,63,0.4)",
          }}
        />
        <div
          style={{
            width: "2px",
            height: "40px",
            background: "linear-gradient(to bottom, var(--orange), transparent)",
            margin: "0 auto",
          }}
        />
      </div>

      <style jsx>{`
        :global(.hero-title) {
          font-size: clamp(4rem, 11vw, 10rem);
          font-weight: 700;
          letter-spacing: -0.04em;
          line-height: 0.95;
          color: var(--black);
          width: 100%;
        }
      `}</style>
    </section>
  );
}
