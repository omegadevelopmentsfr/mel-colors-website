"use client";

import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsapInit";
import PricePill from "@/components/ui/PricePill";
import ImagePlaceholder from "@/components/ui/ImagePlaceholder";
import { ThumbsUp } from "lucide-react";

export default function PackColorBoost() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!sectionRef.current) return;
    const tl = gsap.timeline({
      scrollTrigger: { trigger: sectionRef.current, start: "top 70%", toggleActions: "play none none reverse" },
    });
    tl.from(sectionRef.current.querySelectorAll(".pack-image-stack > div"), { x: -60, opacity: 0, duration: 0.7, ease: "power3.out", stagger: 0.15 });
    tl.from(sectionRef.current.querySelector(".pack-content"), { x: 60, opacity: 0, duration: 0.8, ease: "power3.out" }, "-=0.5");
    gsap.to(sectionRef.current.querySelector(".stroke-lime"), { y: -50, scrollTrigger: { trigger: sectionRef.current, start: "top bottom", end: "bottom top", scrub: 1 } });
    gsap.to(sectionRef.current.querySelector(".stroke-cyan"), { y: 30, scrollTrigger: { trigger: sectionRef.current, start: "top bottom", end: "bottom top", scrub: 1 } });
  }, { scope: sectionRef });

  return (
    <section id="pack-boost" ref={sectionRef} className="relative flex items-center" style={{ minHeight: "90vh" }}>
      <div className="paint-stroke stroke-lime" style={{ width: "220px", height: "85px", background: "linear-gradient(135deg, var(--olive), #A8C02A)", top: "5%", left: "-3%", opacity: 0.15, transform: "rotate(12deg)" }} />
      <div className="paint-stroke stroke-cyan" style={{ width: "190px", height: "75px", background: "linear-gradient(135deg, var(--cyan), #4DD0E1)", bottom: "10%", right: "-2%", opacity: 0.12, transform: "rotate(-18deg)" }} />
      <div className="ink-dot-grid" style={{ top: "30px", right: "40px", opacity: 0.15 }} />
      <div className="w-full max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
        <div className="pack-image-stack flex-1 max-w-lg flex flex-col gap-6">
          <ImagePlaceholder label="PAINTING: Eiffel Tower, expressionist style" color="var(--magenta)" shape="rect" height="280px" />
          <ImagePlaceholder label="PAINTING: figurative figure in magenta/gold" color="var(--purple)" shape="rect" height="240px" />
        </div>
        <div className="pack-content flex-1">
          <div className="flex items-center gap-4 mb-6">
            <h2 className="font-heading" style={{ fontSize: "clamp(2rem, 4vw, 3.2rem)" }}>Pack Color Boost</h2>
            <PricePill price="12€" />
          </div>
          <div className="info-card" style={{ backgroundColor: "var(--orange)", maxWidth: "480px" }}>
            <p>Ici, on monte en subtilité. Les dessins restent libres, mais on ajoute plus de finesse, des formes plus travaillées.</p>
          </div>
          <p className="mt-6 font-body flex gap-3" style={{ fontSize: "1.15rem", color: "var(--black)", maxWidth: "480px", lineHeight: 1.7 }}>
            <ThumbsUp size={24} color="var(--orange)" className="flex-shrink-0 mt-1" />
            <span>Cadre ou plastification +2€</span>
          </p>
        </div>
      </div>
    </section>
  );
}
