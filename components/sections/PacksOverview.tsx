"use client";

import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsapInit";
import { useMouseTilt } from "@/hooks/useMouseTilt";
import SplitText from "@/components/ui/SplitText";
import { LucideIcon, Palette, Rocket, Sparkles } from "lucide-react";

function PackCard({
  icon: Icon,
  label,
  name,
}: {
  icon: LucideIcon;
  label: string;
  name: string;
}) {
  const { ref, tiltStyle, handleMouseMove, handleMouseLeave } =
    useMouseTilt(12);

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      data-cursor-hover
      className="pack-card flex flex-col items-center justify-between"
      style={{
        ...tiltStyle,
        position: "relative",
        cursor: "none",
        minHeight: "160px",
        padding: "10px",
      }}
    >
        <div className="flex flex-col items-center gap-3">
          <Icon size={36} color="var(--black)" />
          <span style={{ fontSize: "1.25rem", fontWeight: 700 }}>{label}</span>
        </div>
      {/* Label */}
      <div
        className="mt-8 pill-badge mx-auto"
        style={{
          backgroundColor: "white",
          color: "var(--black)",
          fontSize: "1.1rem",
          padding: "10px 24px",
          display: "block",
          textAlign: "center",
          maxWidth: "240px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.05)"
        }}
      >
        {name}
      </div>
    </div>
  );
}

export default function PacksOverview() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!sectionRef.current) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          toggleActions: "play none none reverse",
        },
      });

      // Heading
      tl.from(
        sectionRef.current.querySelectorAll(".packs-heading .word-inner"),
        {
          y: "100%",
          duration: 0.7,
          ease: "power3.out",
          stagger: 0.08,
        }
      );

      // Cards scale up staggered
      tl.from(
        sectionRef.current.querySelectorAll(".pack-card"),
        {
          scale: 0,
          opacity: 0,
          duration: 0.7,
          ease: "back.out(1.7)",
          stagger: 0.15,
        },
        "-=0.3"
      );

      // Plus signs
      tl.from(
        sectionRef.current.querySelectorAll(".plus-sign"),
        {
          scale: 0,
          opacity: 0,
          duration: 0.4,
          stagger: 0.1,
        },
        "-=0.5"
      );
    },
    { scope: sectionRef }
  );

  return (
    <section
      id="packs-overview"
      ref={sectionRef}
      className="flex flex-col items-center justify-center"
      style={{ minHeight: "80vh" }}
    >
      <SplitText as="h2" className="packs-heading text-center">
        {"Je vous propose"}
      </SplitText>

      <div className="flex flex-col md:flex-row items-start justify-center gap-6 md:gap-4 mt-16">
        <PackCard
          icon={Palette}
          label="Starter"
          name="Pack Starter Color"
        />

        <div
          className="plus-sign hidden md:flex items-center justify-center"
          style={{
            width: "48px",
            height: "48px",
            borderRadius: "50%",
            backgroundColor: "transparent",
            color: "var(--black)",
            fontSize: "2.4rem",
            fontWeight: 700,
            flexShrink: 0,
          }}
        >
          +
        </div>

        <PackCard
          icon={Rocket}
          label="Boost"
          name="Pack Color Boost"
        />

        <div
          className="plus-sign hidden md:flex items-center justify-center"
          style={{
            width: "48px",
            height: "48px",
            borderRadius: "50%",
            backgroundColor: "transparent",
            color: "var(--black)",
            fontSize: "2.4rem",
            fontWeight: 700,
            flexShrink: 0,
          }}
        >
          +
        </div>

        <PackCard
          icon={Sparkles}
          label="Full"
          name="Pack Full Color"
        />
      </div>

      <style jsx>{`
        .packs-heading {
          font-size: clamp(2.2rem, 5vw, 3.5rem);
          color: var(--black);
        }
      `}</style>
    </section>
  );
}