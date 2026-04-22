"use client";

import { useEffect, useRef } from 'react';

export default function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = glowRef.current;
    if (!el) return;

    let rafId: number;
    let mouseX = -500;
    let mouseY = -500;
    let currentX = -500;
    let currentY = -500;

    const lerp = (a: number, b: number, n: number) => a + (b - a) * n;

    const track = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const animate = () => {
      currentX = lerp(currentX, mouseX, 0.09);
      currentY = lerp(currentY, mouseY, 0.09);
      el.style.left = `${currentX}px`;
      el.style.top = `${currentY}px`;
      rafId = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', track, { passive: true });
    rafId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', track);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div
      ref={glowRef}
      className="cursor-glow"
      style={{
        position: 'fixed',
        width: '380px',
        height: '380px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(255,200,185,0.2) 0%, rgba(212,175,55,0.07) 45%, transparent 70%)',
        pointerEvents: 'none',
        zIndex: 9997,
        transform: 'translate(-50%, -50%)',
        mixBlendMode: 'multiply',
        willChange: 'left, top',
      }}
    />
  );
}
