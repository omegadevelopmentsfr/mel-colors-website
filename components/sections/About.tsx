"use client";

import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsapInit";
import SplitText from "@/components/ui/SplitText";
import ImagePlaceholder from "@/components/ui/ImagePlaceholder";
import WaveDivider from "@/components/ui/WaveDivider";
import { Sparkles, Palette } from "lucide-react";

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!sectionRef.current) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
      });

      // Heading mask reveal
      tl.from(
        sectionRef.current.querySelectorAll(".about-heading .word-inner"),
        {
          y: "100%",
          duration: 0.7,
          ease: "power3.out",
          stagger: 0.08,
        }
      );

      // Image circle
      tl.from(
        sectionRef.current.querySelector(".about-image"),
        {
          scale: 0,
          opacity: 0,
          duration: 0.8,
          ease: "back.out(1.5)",
        },
        "-=0.4"
      );

      // Text lines stagger
      tl.from(
        sectionRef.current.querySelectorAll(".about-text-line"),
        {
          y: 40,
          opacity: 0,
          duration: 0.6,
          ease: "power2.out",
          stagger: 0.1,
        },
        "-=0.4"
      );

      // Ink grid
      tl.from(
        sectionRef.current.querySelector(".ink-dot-grid"),
        {
          opacity: 0,
          scale: 0.5,
          duration: 0.5,
        },
        "-=0.6"
      );
    },
    { scope: sectionRef }
  );

  const textLines = [
    <span key="1" className="flex items-center gap-2">Salut, bienvenue dans mon univers de couleurs <Palette size={20} color="var(--orange)" /></span>,
    "Je suis là pour donner vie à vos idées, créer des souvenirs uniques",
    "et apporter de la joie dans vos espaces grâce à mon savoir-faire",
    "et ma créativité.",
    "",
    "Chaque projet est pensé avec soin, pour transformer vos envies",
    <span key="2" className="flex items-center gap-2">en quelque chose qui vous ressemble vraiment. <Sparkles size={20} color="var(--mustard)" /></span>,
  ];

  return (
    <>
      <section
        id="about"
        ref={sectionRef}
        className="relative"
        style={{ minHeight: "100vh", display: "flex", alignItems: "center" }}
      >
        {/* Ink dot grid decoration */}
        <div
          className="ink-dot-grid"
          style={{ top: "40px", right: "60px" }}
        />

        <div className="w-full max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          {/* Text column */}
          <div className="flex-1 relative z-10">
            <SplitText as="h2" className="about-heading">
              {"La magie des couleurs commence ici"}
            </SplitText>
            <div className="inline-block align-top mt-2 ml-4 about-heading-icon" style={{ opacity: 0 }}>
               <Sparkles size={48} color="var(--orange)" strokeWidth={1.5} />
            </div>

            <div className="mt-8" style={{ maxWidth: "540px" }}>
              {textLines.map((line, i) =>
                line === "" ? (
                  <br key={i} />
                ) : (
                  <p
                    key={i}
                    className="about-text-line font-body"
                    style={{
                      fontSize: "1.25rem",
                      lineHeight: 1.8,
                      color: "var(--black)",
                    }}
                  >
                    {line}
                  </p>
                )
              )}
            </div>
          </div>

          {/* Circular image */}
          <div className="about-image flex-shrink-0">
            <ImagePlaceholder
              label="PHOTO: paint bowls close-up"
              color="var(--coral)"
              shape="circle"
              width="320px"
              height="320px"
            />
          </div>
        </div>

        <style jsx>{`
          .about-heading {
            font-size: clamp(2.5rem, 5vw, 3.8rem);
            color: var(--black);
            display: inline-block;
          }
        `}</style>
      </section>

      {/* Wave divider */}
      <WaveDivider color="var(--orange)" />
    </>
  );
}
