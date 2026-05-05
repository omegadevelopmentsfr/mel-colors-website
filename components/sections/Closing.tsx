"use client";

import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsapInit";
import InkCircles from "@/components/ui/InkCircles";

export default function Closing() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!sectionRef.current) return;
    const tl = gsap.timeline({
      scrollTrigger: { trigger: sectionRef.current, start: "top 60%", toggleActions: "play none none reverse" },
    });

    // Paint blob explosion from corners
    tl.from(sectionRef.current.querySelector(".blob-olive"), { scale: 0, rotation: -15, opacity: 0, duration: 0.8, ease: "back.out(1.5)" });
    tl.from(sectionRef.current.querySelector(".blob-mustard"), { scale: 0, rotation: 10, opacity: 0, duration: 0.7, ease: "back.out(1.5)" }, "-=0.6");
    tl.from(sectionRef.current.querySelector(".blob-magenta"), { scale: 0, rotation: 5, opacity: 0, duration: 0.7, ease: "back.out(1.5)" }, "-=0.5");
    tl.from(sectionRef.current.querySelector(".blob-cyan"), { scale: 0, rotation: -8, opacity: 0, duration: 0.7, ease: "back.out(1.5)" }, "-=0.4");

    // Card
    tl.from(sectionRef.current.querySelector(".closing-card"), { y: 40, opacity: 0, scale: 0.95, duration: 0.8, ease: "power3.out" }, "-=0.3");
  }, { scope: sectionRef });

  return (
    <section id="closing" ref={sectionRef} className="relative flex items-center justify-center" style={{ minHeight: "100vh" }}>
      {/* Paint blob explosions */}
      <div className="blob-olive paint-stroke" style={{ width: "280px", height: "140px", background: "linear-gradient(135deg, var(--olive), #A8C02A)", top: "8%", left: "5%", opacity: 0.25, transform: "rotate(-15deg)" }} />
      <div className="blob-mustard paint-stroke" style={{ width: "250px", height: "120px", background: "linear-gradient(135deg, var(--mustard), #E0A830)", top: "5%", right: "8%", opacity: 0.22, transform: "rotate(10deg)" }} />
      <div className="blob-magenta paint-stroke" style={{ width: "240px", height: "110px", background: "linear-gradient(135deg, var(--magenta), #F05090)", bottom: "12%", left: "8%", opacity: 0.2, transform: "rotate(5deg)" }} />
      <div className="blob-cyan paint-stroke" style={{ width: "220px", height: "100px", background: "linear-gradient(135deg, var(--cyan), #40E0D0)", bottom: "8%", right: "10%", opacity: 0.18, transform: "rotate(-8deg)" }} />

      {/* Central card */}
      <div className="closing-card relative z-10 text-center" style={{ backgroundColor: "white", borderRadius: "32px", padding: "48px 64px", maxWidth: "600px", boxShadow: "0 20px 60px rgba(0,0,0,0.08)" }}>
        <p className="font-heading" style={{ fontSize: "clamp(1.8rem, 4vw, 2.5rem)", lineHeight: 1.4, color: "var(--black)" }}>
          En vous souhaitant une vie pleine de couleur et de bonne humeur
        </p>
        <div className="mt-6" style={{ width: "60px", height: "4px", borderRadius: "2px", background: "var(--orange)", margin: "0 auto" }} />
      </div>

      {/* Ink circles */}
      <div className="absolute" style={{ bottom: "60px", right: "60px" }}>
        <InkCircles />
      </div>
    </section>
  );
}
