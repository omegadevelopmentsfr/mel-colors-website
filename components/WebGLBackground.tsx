"use client";

import React, { useRef, useMemo, useEffect, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { createPaintTexture, STROKE_CONFIGS } from "@/lib/paintTextures";

/** Individual paint stroke mesh */
function PaintStroke({
  color,
  position,
  rotation,
  scale,
  index,
}: {
  color: string;
  position: [number, number, number];
  rotation: number;
  scale: [number, number];
  index: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const targetPos = useRef({ x: 0, y: 0 });
  const currentOffset = useRef({ x: 0, y: 0 });

  const texture = useMemo(() => {
    if (typeof window === "undefined") return null;
    return createPaintTexture(color);
  }, [color]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (window.innerWidth < 768) return;
      targetPos.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      targetPos.current.y = -(e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    const lerpFactor = 0.05;
    const parallaxStrength = 0.3 + index * 0.1;

    currentOffset.current.x +=
      (targetPos.current.x * parallaxStrength - currentOffset.current.x) * lerpFactor;
    currentOffset.current.y +=
      (targetPos.current.y * parallaxStrength - currentOffset.current.y) * lerpFactor;

    meshRef.current.position.x = position[0] + currentOffset.current.x;
    meshRef.current.position.y = position[1] + currentOffset.current.y;
    meshRef.current.rotation.z += delta * 0.05 * (index % 2 === 0 ? 1 : -1);
  });

  if (!texture) return null;

  return (
    <mesh ref={meshRef} position={position} rotation={[0, 0, rotation]}>
      <planeGeometry args={[scale[0], scale[1]]} />
      <meshBasicMaterial map={texture} transparent opacity={0.85} side={THREE.DoubleSide} />
    </mesh>
  );
}

/** Scene with all paint strokes and scroll-driven camera */
function PaintScene() {
  const { camera } = useThree();
  const scrollProgress = useRef(0);
  const targetZ = useRef(10);

  useEffect(() => {
    const handleScroll = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      scrollProgress.current = window.scrollY / maxScroll;
      targetZ.current = 10 - scrollProgress.current * 8;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useFrame(() => {
    camera.position.z += (targetZ.current - camera.position.z) * 0.05;
  });

  return (
    <>
      <ambientLight intensity={0.8} />
      {STROKE_CONFIGS.map((config, i) => (
        <PaintStroke
          key={i}
          color={config.color}
          position={config.position as unknown as [number, number, number]}
          rotation={config.rotation}
          scale={config.scale as unknown as [number, number]}
          index={i}
        />
      ))}
    </>
  );
}

export default function WebGLBackground() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div
      id="webgl-background"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 0,
        pointerEvents: "none",
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 10], fov: 50 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <PaintScene />
      </Canvas>
    </div>
  );
}
