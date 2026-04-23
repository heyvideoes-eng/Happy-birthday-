"use client";

import { useEffect, useRef } from 'react';

// Cute floating birthday elements rendered on a canvas
// Covers the entire page as a fixed background layer
interface Element {
  x: number; y: number;
  vx: number; vy: number;
  emoji: string;
  size: number;
  opacity: number;
  rotation: number;
  rotSpeed: number;
  wobble: number;
  wobbleSpeed: number;
  wobbleAmp: number;
}

const EMOJIS = [
  '🎀','🎈','🎊','🎉','🎂','🧁','🕯️',
  '💕','💖','🩷','❤️','💗','💝',
  '🌸','🌷','🌺','🌼','✨','⭐','🌟',
  '✦','✧',
];

interface Confetto {
  x: number; y: number;
  vx: number; vy: number;
  w: number; h: number;
  color: string;
  rotation: number;
  rotSpeed: number;
  shape: 'rect' | 'circle' | 'diamond';
}

const CONFETTI_COLORS = [
  'rgba(232,141,150,0.55)',
  'rgba(255,184,158,0.55)',
  'rgba(212,175,55,0.45)',
  'rgba(216,180,226,0.55)',
  'rgba(255,182,193,0.6)',
  'rgba(255,218,185,0.55)',
];

export default function BirthdayBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const raf       = useRef<number | null>(null);
  const elems     = useRef<Element[]>([]);
  const confetti  = useRef<Confetto[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    const setSize = () => {
      canvas.width  = window.innerWidth  * window.devicePixelRatio;
      canvas.height = window.innerHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };
    setSize();
    window.addEventListener('resize', setSize, { passive: true });

    const W = () => window.innerWidth;
    const H = () => window.innerHeight;
    const isMobile = window.innerWidth < 768;

    // Initialise emoji elements
    const baseCount = Math.min(55, Math.floor(W() * H() / 28000));
    const COUNT = isMobile ? Math.floor(baseCount * 0.4) : baseCount; // Stricter mobile cap
    
    elems.current = Array.from({ length: COUNT }, () => ({
      x: Math.random() * W(),
      y: Math.random() * H(),
      vx: (Math.random() - 0.5) * 0.25,
      vy: -Math.random() * 0.35 - 0.08,
      emoji: EMOJIS[Math.floor(Math.random() * EMOJIS.length)],
      size: (isMobile ? 12 : 14) + Math.random() * (isMobile ? 18 : 22),
      opacity: 0.25 + Math.random() * 0.45,
      rotation: Math.random() * Math.PI * 2,
      rotSpeed: (Math.random() - 0.5) * 0.008,
      wobble: Math.random() * Math.PI * 2,
      wobbleSpeed: 0.008 + Math.random() * 0.012,
      wobbleAmp: 0.5 + Math.random() * 1.5,
    }));

    // Initialise confetti shapes
    const baseCCount = Math.min(80, Math.floor(W() * H() / 18000));
    const CCOUNT = isMobile ? Math.floor(baseCCount * 0.4) : baseCCount;
    
    confetti.current = Array.from({ length: CCOUNT }, () => ({
      x: Math.random() * W(),
      y: Math.random() * H(),
      vx: (Math.random() - 0.5) * 0.3,
      vy: -Math.random() * 0.2 - 0.05,
      w: (isMobile ? 4 : 5) + Math.random() * (isMobile ? 8 : 10),
      h: (isMobile ? 3 : 4) + Math.random() * (isMobile ? 6 : 8),
      color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
      rotation: Math.random() * Math.PI * 2,
      rotSpeed: (Math.random() - 0.5) * 0.02,
      shape: (['rect','circle','diamond'] as const)[Math.floor(Math.random() * 3)],
    }));

    const draw = () => {
      const w = W(), h = H();
      ctx.clearRect(0, 0, w, h);

      // ── Draw confetti shapes ──────────────────────────────────────────────
      confetti.current.forEach(c => {
        c.x += c.vx;
        c.y += c.vy;
        c.rotation += c.rotSpeed;

        // Wrap around
        if (c.y < -30) c.y = h + 20;
        if (c.x < -30) c.x = w + 20;
        if (c.x > w + 30) c.x = -20;

        // Viewport Culling
        if (c.x < -40 || c.x > w + 40 || c.y < -40 || c.y > h + 40) return;

        ctx.save();
        ctx.translate(c.x, c.y);
        ctx.rotate(c.rotation);
        ctx.fillStyle = c.color;

        if (c.shape === 'rect') {
          ctx.fillRect(-c.w / 2, -c.h / 2, c.w, c.h);
        } else if (c.shape === 'circle') {
          ctx.beginPath();
          ctx.arc(0, 0, c.w / 2, 0, Math.PI * 2);
          ctx.fill();
        } else {
          ctx.beginPath();
          ctx.moveTo(0, -c.h / 2);
          ctx.lineTo(c.w / 2, 0);
          ctx.lineTo(0, c.h / 2);
          ctx.lineTo(-c.w / 2, 0);
          ctx.closePath();
          ctx.fill();
        }
        ctx.restore();
      });

      // ── Draw emoji elements ───────────────────────────────────────────────
      elems.current.forEach(el => {
        el.wobble += el.wobbleSpeed;
        el.x  += el.vx + Math.sin(el.wobble) * el.wobbleAmp * 0.08;
        el.y  += el.vy;
        el.rotation += el.rotSpeed;

        // Wrap vertically
        if (el.y < -70) el.y = h + 40;
        if (el.x < -50) el.x = w + 30;
        if (el.x > w + 50) el.x = -30;

        // Viewport Culling
        if (el.x < -60 || el.x > w + 60 || el.y < -60 || el.y > h + 60) return;

        ctx.save();
        ctx.translate(el.x, el.y);
        ctx.rotate(el.rotation);
        ctx.globalAlpha = el.opacity;
        ctx.font = `${el.size}px serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(el.emoji, 0, 0);
        ctx.globalAlpha = 1;
        ctx.restore();
      });

      raf.current = requestAnimationFrame(draw);
    };

    raf.current = requestAnimationFrame(draw);

    return () => {
      if (raf.current) cancelAnimationFrame(raf.current);
      window.removeEventListener('resize', setSize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0, left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 0,
        opacity: 1,
        willChange: 'transform',
        transform: 'translateZ(0)'
      }}
    />
  );
}
