"use client";

import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsapInit";
import PricePill from "@/components/ui/PricePill";
import ImagePlaceholder from "@/components/ui/ImagePlaceholder";
import { ThumbsUp } from "lucide-react";

export default function PackFullColor() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!sectionRef.current) return;
    const tl = gsap.timeline({
      scrollTrigger: { trigger: sectionRef.current, start: "top 70%", toggleActions: "play none none reverse" },
    });
    tl.from(sectionRef.current.querySelectorAll(".pack-images > div"), { y: 60, opacity: 0, duration: 0.7, ease: "power3.out", stagger: 0.15 });
    tl.from(sectionRef.current.querySelector(".pack-content"), { x: 60, opacity: 0, duration: 0.8, ease: "power3.out" }, "-=0.5");
    gsap.to(sectionRef.current.querySelector(".stroke-olive"), { y: -40, scrollTrigger: { trigger: sectionRef.current, start: "top bottom", end: "bottom top", scrub: 1 } });
    gsap.to(sectionRef.current.querySelector(".stroke-purple"), { y: 50, scrollTrigger: { trigger: sectionRef.current, start: "top bottom", end: "bottom top", scrub: 1 } });
  }, { scope: sectionRef });

  return (
    <section id="pack-full" ref={sectionRef} className="relative flex items-center" style={{ minHeight: "90vh" }}>
      <div className="paint-stroke stroke-olive" style={{ width: "200px", height: "80px", background: "linear-gradient(135deg, var(--olive), #9DB030)", top: "8%", left: "-2%", opacity: 0.14, transform: "rotate(-10deg)" }} />
      <div className="paint-stroke stroke-purple" style={{ width: "180px", height: "70px", background: "linear-gradient(135deg, var(--purple), #9B7EC7)", bottom: "12%", right: "-1%", opacity: 0.13, transform: "rotate(20deg)" }} />

      <div className="w-full max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
        <div className="pack-images flex-1 max-w-lg flex flex-col gap-6">
          <ImagePlaceholder label="PAINTING: religious icon, gold tones" color="var(--mustard)" shape="rect" height="280px" />
          <ImagePlaceholder label="PAINTING: family portrait, colorful" color="var(--coral)" shape="rect" height="260px" />
        </div>

        <div className="pack-content flex-1">
          <div className="flex items-center gap-4 mb-6 flex-wrap">
            <h2 className="font-heading" style={{ fontSize: "clamp(2rem, 4vw, 3.2rem)" }}>Pack Full Color</h2>
            <PricePill price="15€" />
          </div>
          <div className="info-card" style={{ backgroundColor: "var(--orange)", maxWidth: "480px" }}>
            <p>Là, on est dans la précision. Chaque dessin est conçu comme une œuvre unique, avec des détails minutieux, par exemple un monument ou un portrait.</p>
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
