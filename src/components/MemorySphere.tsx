"use client";

import { useEffect, useRef } from 'react';

export default function MemorySphere({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: 0, y: 0 });
  const raf   = useRef<number | null>(null);
  const touchSpeed = useRef(1);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    const resize = () => {
      canvas.width  = canvas.offsetWidth  * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const onMouse = (e: MouseEvent) => {
      mouse.current = {
        x: (e.clientX / window.innerWidth  - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2,
      };
    };

    const onTouch = (e: TouchEvent) => {
      if (e.touches[0]) {
        mouse.current = {
          x: (e.touches[0].clientX / window.innerWidth  - 0.5) * 2,
          y: (e.touches[0].clientY / window.innerHeight - 0.5) * 2,
        };
        touchSpeed.current = 2.5; // Speed boost on touch
      }
    };

    window.addEventListener('mousemove', onMouse, { passive: true });
    window.addEventListener('touchstart', onTouch, { passive: true });
    window.addEventListener('touchmove', onTouch, { passive: true });

    const isMobile = window.innerWidth < 768;

    // Orbital particles (hearts & stars orbit the sphere)
    const orbits = [
      { r: 1.42, tilt: 20,  spd: 0.005,  emojis: ['💛','✨','🌸'], pts: isMobile ? 2 : 3, sz: isMobile ? 12 : 14 },
      { r: 1.75, tilt: -22, spd: -0.003, emojis: ['🩷','⭐','💕'], pts: isMobile ? 2 : 4, sz: isMobile ? 10 : 12 },
      { r: 2.1,  tilt: 50,  spd: 0.002,  emojis: ['✦','🌷','💫'], pts: isMobile ? 2 : 3, sz: isMobile ? 9 : 11 },
    ];
    const angles = orbits.map(o =>
      Array.from({ length: o.pts }, (_, i) => (i / o.pts) * Math.PI * 2)
    );

    const startTime = Date.now();
    let rot = 0;

    const draw = () => {
      const W = canvas.offsetWidth;
      const H = canvas.offsetHeight;
      const t = (Date.now() - startTime) / 1000;
      
      // Smoothly return speed to normal
      touchSpeed.current += (1 - touchSpeed.current) * 0.05;
      rot += 0.003 * touchSpeed.current;

      // Zoom-out opening (first 3 seconds)
      const zp    = Math.min(1, t / 3.2);
      const eased = 1 - Math.pow(1 - zp, 3);
      const zoom  = 2.4 - 1.4 * eased;

      // Parallax offset from mouse
      const mx = W / 2 + mouse.current.x * 14;
      const my = H / 2 + mouse.current.y * 9;
      const R  = Math.min(W, H) * (isMobile ? 0.20 : 0.21) * zoom;

      ctx.clearRect(0, 0, W, H);

      // ── 1. Outer atmospheric glow ──────────────────────────────────────────
      const atm = ctx.createRadialGradient(mx, my, R * 0.8, mx, my, R * 2.0);
      atm.addColorStop(0,    'rgba(255,160,180,0.22)');
      atm.addColorStop(0.35, 'rgba(255,184,158,0.13)');
      atm.addColorStop(0.6,  'rgba(212,175,55,0.06)');
      atm.addColorStop(1,    'transparent');
      ctx.fillStyle = atm;
      ctx.beginPath(); ctx.arc(mx, my, R * 2.0, 0, Math.PI * 2); ctx.fill();

      // ── 2. Orbital paths & emoji particles ────────────────────────────────
      const orbitAlpha = Math.max(0, (eased - 0.35) / 0.65);
      if (orbitAlpha > 0) {
        orbits.forEach((od, oi) => {
          angles[oi] = angles[oi].map(a => a + od.spd * touchSpeed.current);
          const orR  = R * od.r;
          const tilR = od.tilt * Math.PI / 180;
          const scY  = Math.cos(tilR) * 0.3;

          ctx.save();
          ctx.translate(mx, my);
          ctx.rotate(rot * 0.25);

          // Orbit ring
          ctx.beginPath();
          ctx.ellipse(0, 0, orR, orR * Math.abs(scY), 0, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(232,141,150,${0.12 * orbitAlpha})`;
          ctx.lineWidth = 0.8;
          ctx.setLineDash([4, 8]);
          ctx.stroke();
          ctx.setLineDash([]);

          // Emoji particles on orbit
          angles[oi].forEach((angle, pi) => {
            const px    = Math.cos(angle) * orR;
            const py    = Math.sin(angle) * orR * Math.abs(scY);
            const depth = Math.sin(angle) * Math.sin(tilR);
            const alpha = orbitAlpha * (0.6 + depth * 0.4);
            const sz    = od.sz * (0.7 + depth * 0.4);

            ctx.globalAlpha = alpha;
            ctx.font = `${sz}px serif`;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            const emoji = od.emojis[pi % od.emojis.length];
            ctx.fillText(emoji, px, py);
            ctx.globalAlpha = 1;
          });
          ctx.restore();
        });
      }

      // ── 3. Sphere shadow (cast on "floor", subtle) ─────────────────────────
      const shadow = ctx.createRadialGradient(mx + R*0.1, my + R*1.05, 0, mx + R*0.1, my + R*1.05, R*0.9);
      shadow.addColorStop(0,   'rgba(180,80,100,0.12)');
      shadow.addColorStop(0.5, 'rgba(180,80,100,0.05)');
      shadow.addColorStop(1,   'transparent');
      ctx.fillStyle = shadow;
      ctx.beginPath();
      ctx.ellipse(mx + R*0.1, my + R*1.05, R*0.9, R*0.2, 0, 0, Math.PI*2);
      ctx.fill();

      // ── 4. Sphere body — Glassy Liquid Shading ────────────────────
      const lx = mx - R * 0.35;
      const ly = my - R * 0.35;

      // Base glass color (very soft and transparent)
      const base = ctx.createRadialGradient(lx, ly, R * 0.05, mx, my, R * 1.1);
      base.addColorStop(0,    'rgba(255,245,247,0.7)');
      base.addColorStop(0.3,  'rgba(255,210,220,0.4)');
      base.addColorStop(0.6,  'rgba(232,141,150,0.2)');
      base.addColorStop(1,    'rgba(255,184,158,0.1)');
      
      ctx.beginPath(); ctx.arc(mx, my, R, 0, Math.PI * 2);
      ctx.fillStyle = base; ctx.fill();

      // ── 5. Grid lines (Subtle & Glassy) ───────────────────────────────────
      ctx.save();
      ctx.beginPath(); ctx.arc(mx, my, R, 0, Math.PI * 2); ctx.clip();

      const latCount = isMobile ? 3 : 6;
      for (let i = 1; i <= latCount; i++) {
        const latAngle = (i / (latCount + 1)) * Math.PI;
        const ry = Math.cos(latAngle) * R;
        const rx = Math.sin(latAngle) * R;
        const isEq = i === Math.ceil(latCount / 2);
        
        ctx.beginPath();
        ctx.ellipse(mx, my + ry, rx, rx * 0.2, 0, 0, Math.PI * 2);
        const alpha = isEq ? 0.3 : 0.08;
        ctx.strokeStyle = `rgba(255,255,255,${alpha})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }

      const numLon = isMobile ? 4 : 8;
      for (let i = 0; i < numLon; i++) {
        const a = (i / numLon) * Math.PI * 2 + rot * 0.5;
        ctx.beginPath();
        const latDetail = 30;
        for (let j = 0; j <= latDetail; j++) {
          const f    = j / latDetail;
          const lat  = f * Math.PI;
          const x    = mx + Math.sin(lat) * Math.cos(a) * R;
          const y    = my + Math.cos(lat) * R;
          j === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        }
        ctx.strokeStyle = `rgba(255,255,255,0.06)`;
        ctx.lineWidth   = 0.5;
        ctx.stroke();
      }
      ctx.restore();

      // ── 6. Rim light (Stronger but soft) ──────────────────────────────────
      const rim = ctx.createRadialGradient(mx, my, R * 0.85, mx, my, R * 1.05);
      rim.addColorStop(0,    'transparent');
      rim.addColorStop(0.8,  'rgba(255,255,255,0.2)');
      rim.addColorStop(1,    'rgba(255,255,255,0.5)');
      ctx.beginPath(); ctx.arc(mx, my, R * 1.05, 0, Math.PI * 2);
      ctx.fillStyle = rim; ctx.fill();

      // ── 7. Liquid Highlight — Reactive to mouse ───────────────────────────
      const highlightX = mx + mouse.current.x * R * 0.3;
      const highlightY = my + mouse.current.y * R * 0.3;
      
      const liquidH = ctx.createRadialGradient(highlightX - R*0.2, highlightY - R*0.2, 0, highlightX, highlightY, R * 0.8);
      liquidH.addColorStop(0,   'rgba(255,255,255,0.6)');
      liquidH.addColorStop(0.5, 'rgba(255,255,255,0.1)');
      liquidH.addColorStop(1,   'transparent');
      
      ctx.beginPath(); ctx.arc(mx, my, R, 0, Math.PI * 2);
      ctx.fillStyle = liquidH; ctx.fill();

      // ── 8. Specular glints (very simple) ──────────────────────────────────
      const specX = mx - R * 0.4 + mouse.current.x * 10;
      const specY = my - R * 0.4 + mouse.current.y * 10;
      
      const spec = ctx.createRadialGradient(specX, specY, 0, specX, specY, R * 0.3);
      spec.addColorStop(0, 'rgba(255,255,255,0.8)');
      spec.addColorStop(1, 'transparent');
      
      ctx.beginPath(); ctx.arc(mx, my, R, 0, Math.PI * 2);
      ctx.fillStyle = spec; ctx.fill();

      // ── 9. Secondary Glint ────────────────────────────────────────────────
      const glintX = mx + R * 0.3 - mouse.current.x * 5;
      const glintY = my + R * 0.3 - mouse.current.y * 5;
      
      const glint = ctx.createRadialGradient(glintX, glintY, 0, glintX, glintY, R * 0.2);
      glint.addColorStop(0, 'rgba(255,255,255,0.4)');
      glint.addColorStop(1, 'transparent');
      
      ctx.beginPath(); ctx.arc(mx, my, R, 0, Math.PI * 2);
      ctx.fillStyle = glint; ctx.fill();

      // ── 10. Golden Ring (Simple & interactive) ─────────────────────────────
      const ringAlpha = 0.3 + Math.abs(mouse.current.x) * 0.2;
      ctx.beginPath();
      ctx.arc(mx, my, R * 1.02, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(212,175,55,${ringAlpha})`;
      ctx.lineWidth = 1.2;
      ctx.stroke();
      ctx.fillStyle = 'rgba(212,175,55,0.05)';
      ctx.fill();

      raf.current = requestAnimationFrame(draw);
    };

    raf.current = requestAnimationFrame(draw);

    return () => {
      if (raf.current) cancelAnimationFrame(raf.current);
      window.removeEventListener('mousemove', onMouse);
      window.removeEventListener('touchstart', onTouch);
      window.removeEventListener('touchmove', onTouch);
      ro.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{ 
        width: '100%', 
        height: '100%', 
        display: 'block',
        willChange: 'transform',
        transform: 'translateZ(0)'
      }}
    />
  );
}
