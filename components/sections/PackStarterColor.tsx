"use client";

import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsapInit";
import PricePill from "@/components/ui/PricePill";
import ImagePlaceholder from "@/components/ui/ImagePlaceholder";
import PaintTubeSVG from "@/components/ui/PaintTubeSVG";
import { ThumbsUp } from "lucide-react";

export default function PackStarterColor() {
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

      tl.from(sectionRef.current.querySelector(".pack-image"), {
        x: -80,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      });

      tl.from(
        sectionRef.current.querySelector(".pack-content"),
        {
          x: 60,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
        },
        "-=0.6"
      );

      tl.from(
        sectionRef.current.querySelector(".paint-tube"),
        {
          scale: 0,
          rotate: -30,
          opacity: 0,
          duration: 0.6,
          ease: "back.out(2)",
        },
        "-=0.4"
      );

      // Parallax paint strokes
      gsap.to(sectionRef.current.querySelector(".stroke-magenta"), {
        y: -60,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });

      gsap.to(sectionRef.current.querySelector(".stroke-mustard"), {
        y: 40,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      id="pack-starter"
      ref={sectionRef}
      className="relative flex items-center"
      style={{ minHeight: "90vh" }}
    >
      {/* Decorative paint strokes */}
      <div
        className="paint-stroke stroke-magenta"
        style={{
          width: "200px",
          height: "80px",
          background: "linear-gradient(135deg, var(--magenta), var(--purple))",
          top: "10%",
          left: "-2%",
          opacity: 0.15,
          transform: "rotate(-20deg)",
        }}
      />
      <div
        className="paint-stroke stroke-mustard"
        style={{
          width: "180px",
          height: "70px",
          background: "linear-gradient(135deg, var(--mustard), var(--orange))",
          bottom: "15%",
          right: "2%",
          opacity: 0.12,
          transform: "rotate(15deg)",
        }}
      />

      {/* Paint tube decoration */}
      <div
        className="paint-tube absolute hidden lg:block"
        style={{ top: "30px", right: "80px" }}
      >
        <PaintTubeSVG />
      </div>

      <div className="w-full max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
        {/* Image */}
        <div className="pack-image flex-1 max-w-lg">
          <ImagePlaceholder
            label="PAINTING: chapel/landscape"
            color="var(--mustard)"
            shape="rect"
            height="400px"
          />
        </div>

        {/* Content */}
        <div className="pack-content flex-1">
          <div className="flex items-center gap-4 mb-6">
            <h2
              className="font-heading"
              style={{ fontSize: "clamp(2rem, 4vw, 3.2rem)" }}
            >
              Pack Starter Color
            </h2>
            <PricePill price="10€" />
          </div>

          <div
            className="info-card"
            style={{
              backgroundColor: "var(--mustard)",
              maxWidth: "480px",
            }}
          >
            <p>
              Ce pack, c&apos;est un espace de liberté totale. Vous pouvez
              choisir parmi des dessins simples, des objets du quotidien, des
              paysages etc.
            </p>
          </div>

          <p
            className="mt-6 font-body flex gap-3"
            style={{
              fontSize: "1.15rem",
              color: "var(--black)",
              maxWidth: "480px",
              lineHeight: 1.7,
            }}
          >
            <ThumbsUp size={24} color="var(--orange)" className="flex-shrink-0 mt-1" />
            <span>
              Si vous le souhaitez, vous pouvez opter pour un cadre ou une
              plastification pour seulement 2€ de plus.
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}
