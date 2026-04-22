"use client";

import { useEffect, useRef } from 'react';

const PETAL_COLORS = [
  'rgba(255,184,158,0.55)',
  'rgba(255,209,214,0.6)',
  'rgba(232,141,150,0.45)',
  'rgba(212,175,55,0.35)',
  'rgba(216,180,226,0.5)',
  'rgba(255,184,158,0.4)',
];

interface Petal {
  x: number;
  y: number;
  size: number;
  speed: number;
  drift: number;
  rotation: number;
  rotationSpeed: number;
  color: string;
  opacity: number;
  swayAmplitude: number;
  swaySpeed: number;
  swayOffset: number;
}

export default function FloatingPetals() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let rafId: number;
    let petals: Petal[] = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const createPetal = (): Petal => ({
      x: Math.random() * window.innerWidth,
      y: window.innerHeight + 20,
      size: 4 + Math.random() * 8,
      speed: 0.4 + Math.random() * 0.7,
      drift: (Math.random() - 0.5) * 0.6,
      rotation: Math.random() * Math.PI * 2,
      rotationSpeed: (Math.random() - 0.5) * 0.025,
      color: PETAL_COLORS[Math.floor(Math.random() * PETAL_COLORS.length)],
      opacity: 0.3 + Math.random() * 0.5,
      swayAmplitude: 20 + Math.random() * 40,
      swaySpeed: 0.003 + Math.random() * 0.005,
      swayOffset: Math.random() * Math.PI * 2,
    });

    // Seed petals across the screen
    for (let i = 0; i < 18; i++) {
      const p = createPetal();
      p.y = Math.random() * window.innerHeight;
      petals.push(p);
    }

    let t = 0;

    const drawPetal = (p: Petal) => {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rotation);
      ctx.globalAlpha = p.opacity;
      ctx.fillStyle = p.color;
      ctx.beginPath();
      // Soft ellipse petal
      ctx.ellipse(0, 0, p.size, p.size * 0.55, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    };

    const tick = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      t += 1;

      petals.forEach((p, i) => {
        p.x += p.drift + Math.sin(t * p.swaySpeed + p.swayOffset) * 0.5;
        p.y -= p.speed;
        p.rotation += p.rotationSpeed;

        drawPetal(p);

        if (p.y < -30) {
          petals[i] = createPetal();
        }
      });

      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
        opacity: 1,
      }}
    />
  );
}
