import * as THREE from "three";

/**
 * Creates a canvas-generated acrylic paint stroke texture.
 * No external images — purely procedural.
 */
export function createPaintTexture(
  color: string,
  width = 512,
  height = 256
): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d")!;

  // Background transparent
  ctx.clearRect(0, 0, width, height);

  // Main blob shape with multiple bezier curves for organic feel
  ctx.beginPath();
  const cx = width / 2;
  const cy = height / 2;
  const rx = width * 0.42;
  const ry = height * 0.38;

  // Organic shape using randomized control points
  const points = 8;
  const angleStep = (Math.PI * 2) / points;

  for (let i = 0; i <= points; i++) {
    const angle = i * angleStep;
    const r1 = i % 2 === 0 ? rx * 0.9 : rx * 1.1;
    const r2 = i % 2 === 0 ? ry * 1.05 : ry * 0.85;

    const x = cx + Math.cos(angle) * r1;
    const y = cy + Math.sin(angle) * r2;

    if (i === 0) {
      ctx.moveTo(x, y);
    } else {
      const cpx = cx + Math.cos(angle - angleStep * 0.5) * r1 * 1.15;
      const cpy = cy + Math.sin(angle - angleStep * 0.5) * r2 * 1.15;
      ctx.quadraticCurveTo(cpx, cpy, x, y);
    }
  }
  ctx.closePath();

  // Gradient fill for depth/gloss
  const gradient = ctx.createRadialGradient(
    cx - rx * 0.2,
    cy - ry * 0.3,
    0,
    cx,
    cy,
    Math.max(rx, ry)
  );

  // Parse color and create lighter/darker variants
  gradient.addColorStop(0, lightenColor(color, 40));
  gradient.addColorStop(0.4, color);
  gradient.addColorStop(0.8, darkenColor(color, 15));
  gradient.addColorStop(1, darkenColor(color, 30));

  ctx.fillStyle = gradient;
  ctx.fill();

  // Impasto texture: small semi-transparent strokes overlaid
  ctx.globalAlpha = 0.15;
  for (let i = 0; i < 30; i++) {
    const sx = cx + (Math.random() - 0.5) * rx * 1.5;
    const sy = cy + (Math.random() - 0.5) * ry * 1.5;
    const sw = 20 + Math.random() * 60;
    const sh = 4 + Math.random() * 12;
    const angle = Math.random() * Math.PI;

    ctx.save();
    ctx.translate(sx, sy);
    ctx.rotate(angle);
    ctx.fillStyle = Math.random() > 0.5 ? lightenColor(color, 25) : color;
    ctx.beginPath();
    ctx.ellipse(0, 0, sw, sh, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  // Glossy highlight
  ctx.globalAlpha = 0.12;
  const highlightGrad = ctx.createLinearGradient(0, 0, width, height * 0.5);
  highlightGrad.addColorStop(0, "rgba(255,255,255,0.6)");
  highlightGrad.addColorStop(0.5, "rgba(255,255,255,0)");
  ctx.fillStyle = highlightGrad;
  ctx.fill();

  ctx.globalAlpha = 1;

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

function lightenColor(hex: string, percent: number): string {
  const num = parseInt(hex.replace("#", ""), 16);
  const r = Math.min(255, (num >> 16) + Math.round(2.55 * percent));
  const g = Math.min(255, ((num >> 8) & 0xff) + Math.round(2.55 * percent));
  const b = Math.min(255, (num & 0xff) + Math.round(2.55 * percent));
  return `rgb(${r},${g},${b})`;
}

function darkenColor(hex: string, percent: number): string {
  const num = parseInt(hex.replace("#", ""), 16);
  const r = Math.max(0, (num >> 16) - Math.round(2.55 * percent));
  const g = Math.max(0, ((num >> 8) & 0xff) - Math.round(2.55 * percent));
  const b = Math.max(0, (num & 0xff) - Math.round(2.55 * percent));
  return `rgb(${r},${g},${b})`;
}

/** Paint stroke configurations for the WebGL scene */
export const STROKE_CONFIGS = [
  { color: "#E07A3F", position: [-3, 2, -2], rotation: 0.3, scale: [2.5, 1.2] },
  { color: "#E0317F", position: [3.5, -1, -4], rotation: -0.5, scale: [2, 1] },
  { color: "#8B9E2A", position: [-2, -2.5, -3], rotation: 0.8, scale: [2.2, 1.1] },
  { color: "#C8922A", position: [2, 3, -5], rotation: -0.2, scale: [1.8, 0.9] },
  { color: "#00BCD4", position: [-4, 0, -6], rotation: 0.6, scale: [2, 1.3] },
  { color: "#7B5EA7", position: [4, -3, -3.5], rotation: -0.7, scale: [1.6, 0.8] },
] as const;
