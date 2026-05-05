"use client";

import dynamic from "next/dynamic";
import CustomCursor from "@/components/CustomCursor";
import DotNav from "@/components/DotNav";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import PacksOverview from "@/components/sections/PacksOverview";
import PackStarterColor from "@/components/sections/PackStarterColor";
import PackColorBoost from "@/components/sections/PackColorBoost";
import PackFullColor from "@/components/sections/PackFullColor";
import Closing from "@/components/sections/Closing";

const WebGLBackground = dynamic(
  () => import("@/components/WebGLBackground"),
  { ssr: false }
);

export default function Home() {
  return (
    <>
      <WebGLBackground />
      <CustomCursor />
      <DotNav />

      <main className="relative" style={{ zIndex: 1 }}>
        <Hero />
        <About />
        <PacksOverview />
        <PackStarterColor />
        <PackColorBoost />
        <PackFullColor />
        <Closing />
      </main>
    </>
  );
}
