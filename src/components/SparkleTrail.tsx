"use client";

import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  life: number;
  maxLife: number;
  active: boolean;
}

export default function SparkleTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particles = useRef<Particle[]>([]);
  const poolSize = 60;
  const lastMouse = useRef({ x: 0, y: 0 });
  const isTouching = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth * window.devicePixelRatio;
      canvas.height = window.innerHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };
    resize();
    window.addEventListener('resize', resize);

    // Initialize particle pool
    particles.current = Array.from({ length: poolSize }, () => ({
      x: 0, y: 0, vx: 0, vy: 0, size: 0, color: '', life: 0, maxLife: 0, active: false
    }));

    const colors = ['#FFD700', '#FF69B4', '#E8718A', '#FADADD', '#FFFFFF'];

    const spawn = (x: number, y: number) => {
      const p = particles.current.find(p => !p.active);
      if (!p) return;

      p.active = true;
      p.x = x;
      p.y = y;
      p.vx = (Math.random() - 0.5) * 1.5;
      p.vy = (Math.random() - 0.5) * 1.5;
      p.size = Math.random() * 3 + 1;
      p.color = colors[Math.floor(Math.random() * colors.length)];
      p.maxLife = 20 + Math.random() * 30;
      p.life = p.maxLife;
    };

    const handleMove = (e: MouseEvent | TouchEvent) => {
      const x = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const y = 'touches' in e ? e.touches[0].clientY : e.clientY;
      
      const dx = x - lastMouse.current.x;
      const dy = y - lastMouse.current.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist > 5) {
        spawn(x, y);
        lastMouse.current = { x, y };
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      isTouching.current = true;
      const x = e.touches[0].clientX;
      const y = e.touches[0].clientY;
      lastMouse.current = { x, y };
      for(let i=0; i<5; i++) spawn(x, y);
    };

    window.addEventListener('mousemove', handleMove, { passive: true });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleMove, { passive: true });

    let raf: number;
    const draw = () => {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      particles.current.forEach(p => {
        if (!p.active) return;

        p.x += p.vx;
        p.y += p.vy;
        p.life--;

        if (p.life <= 0) {
          p.active = false;
          return;
        }

        const alpha = p.life / p.maxLife;
        ctx.globalAlpha = alpha;
        ctx.fillStyle = p.color;
        
        // Draw a small star or diamond
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * alpha, 0, Math.PI * 2);
        ctx.fill();
        
        // Add a slight glow
        if (p.life > p.maxLife * 0.7) {
            ctx.shadowBlur = 10;
            ctx.shadowColor = p.color;
        } else {
            ctx.shadowBlur = 0;
        }
      });

      ctx.globalAlpha = 1;
      ctx.shadowBlur = 0;
      raf = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleMove);
      cancelAnimationFrame(raf);
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
        zIndex: 9999,
        willChange: 'transform'
      }}
    />
  );
}
