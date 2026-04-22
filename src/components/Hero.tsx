"use client";

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import Countdown from './Countdown';

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, 280]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -280]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.4]);
  const opacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
  const rotateX = useTransform(scrollYProgress, [0, 1], [0, 35]);
  const contentScale = useTransform(scrollYProgress, [0, 1], [1, 0.82]);

  // Mouse parallax state
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      setMousePos({
        x: (e.clientX / innerWidth - 0.5) * 2,
        y: (e.clientY / innerHeight - 0.5) * 2,
      });
    };
    window.addEventListener('mousemove', handleMouse, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouse);
  }, []);

  return (
    <div
      ref={ref}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        position: 'relative',
        height: '100vh',
        minHeight: '700px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        perspective: '1200px',
        background: 'transparent',
        width: '100%',
      }}
    >
      {/* Deep background orbs — mouse parallax layer 1 */}
      <motion.div
        className="ornament"
        style={{
          y: y1,
          scale,
          position: 'absolute',
          top: '-20%',
          left: '-15%',
          width: 'clamp(350px, 55vw, 900px)',
          height: 'clamp(350px, 55vw, 900px)',
          background: 'radial-gradient(circle, rgba(255,142,114,0.45) 0%, transparent 65%)',
          filter: 'blur(clamp(50px, 10vw, 120px))',
          x: isHovered ? mousePos.x * -18 : 0,
          transition: { x: { type: 'spring', stiffness: 40, damping: 30 } } as never,
        }}
      />

      <motion.div
        className="ornament"
        style={{
          y: y2,
          scale,
          position: 'absolute',
          bottom: '-20%',
          right: '-15%',
          width: 'clamp(400px, 65vw, 1000px)',
          height: 'clamp(400px, 65vw, 1000px)',
          background: 'radial-gradient(circle, rgba(216,180,226,0.45) 0%, transparent 65%)',
          filter: 'blur(clamp(60px, 12vw, 140px))',
          x: isHovered ? mousePos.x * 18 : 0,
          transition: { x: { type: 'spring', stiffness: 40, damping: 30 } } as never,
        }}
      />

      {/* Mid-layer glow — mouse parallax layer 2 */}
      <motion.div
        className="ornament"
        style={{
          y: y3,
          position: 'absolute',
          top: '30%',
          right: '-5%',
          width: 'clamp(200px, 35vw, 600px)',
          height: 'clamp(200px, 35vw, 600px)',
          background: 'radial-gradient(circle, rgba(255,184,158,0.35) 0%, transparent 60%)',
          filter: 'blur(clamp(40px, 8vw, 100px))',
          x: isHovered ? mousePos.x * -10 : 0,
          transition: { x: { type: 'spring', stiffness: 60, damping: 30 } } as never,
        }}
      />

      {/* Floating sparkle particles */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
        {[...Array(20)].map((_, i) => {
          const size = 4 + Math.random() * 10;
          const shapes = ['50%', '50%', '50%', '3px', '50%'];
          const colors = [
            'var(--color-sunset)', 'var(--color-gold)', 'var(--color-rose)',
            'var(--color-lavender)', 'var(--color-peach)', 'var(--color-gold-light)'
          ];
          return (
            <motion.div
              key={i}
              initial={{
                y: '108vh',
                x: `${5 + Math.random() * 90}vw`,
                opacity: 0,
                scale: 0,
              }}
              animate={{
                y: '-8vh',
                x: `${5 + Math.random() * 90}vw`,
                opacity: [0, 0.7, 0.7, 0],
                scale: [0, 1, 1, 0],
                rotate: Math.random() * 720,
              }}
              transition={{
                duration: 12 + Math.random() * 18,
                repeat: Infinity,
                ease: 'linear',
                delay: Math.random() * 12,
              }}
              style={{
                position: 'absolute',
                width: size,
                height: size,
                background: colors[i % colors.length],
                borderRadius: shapes[i % shapes.length],
                boxShadow: `0 0 ${size * 2}px ${colors[i % colors.length]}`,
                filter: 'blur(0.5px)',
              }}
            />
          );
        })}
      </div>

      {/* Main Content */}
      <motion.div
        style={{
          opacity,
          rotateX,
          scale: contentScale,
          translateZ: '80px',
          zIndex: 10,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          transformStyle: 'preserve-3d',
          width: '100%',
          padding: '0 clamp(1rem, 5vw, 4rem)',
          x: isHovered ? mousePos.x * 6 : 0,
          y: isHovered ? mousePos.y * 6 : 0,
          transition: {
            x: { type: 'spring', stiffness: 60, damping: 30 },
            y: { type: 'spring', stiffness: 60, damping: 30 },
          } as never,
        }}
      >
        {/* Eyebrow badge */}
        <motion.div
          initial={{ opacity: 0, y: -30, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          style={{
            background: 'rgba(255,255,255,0.25)',
            padding: 'clamp(5px, 1vw, 9px) clamp(18px, 3vw, 32px)',
            borderRadius: '40px',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(255,255,255,0.5)',
            marginBottom: 'clamp(1.2rem, 3vw, 2rem)',
            boxShadow: '0 8px 30px rgba(232, 141, 150, 0.2)',
          }}
        >
          <p style={{
            fontFamily: 'var(--font-script)',
            letterSpacing: '1px',
            color: 'var(--color-rose)',
            fontSize: 'clamp(0.9rem, 1.5vw, 1.1rem)',
            fontWeight: 600,
            margin: 0,
          }}>
            A celebration of the most wonderful soul ✦
          </p>
        </motion.div>

        {/* Main title */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.85, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.4, delay: 0.1, type: 'spring', stiffness: 60 }}
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(3.5rem, 11vw, 11rem)',
            color: 'var(--color-text-dark)',
            textAlign: 'center',
            lineHeight: 1,
            marginBottom: 'clamp(0.5rem, 1vw, 1rem)',
            textShadow: '0 15px 40px rgba(212, 175, 55, 0.35)',
            position: 'relative',
            fontWeight: 400,
            letterSpacing: '-2px',
          }}
        >
          Happy Birthday
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, delay: 0.4, type: 'spring', stiffness: 50 }}
          style={{ marginBottom: 'clamp(1.5rem, 4vw, 3.5rem)', textAlign: 'center' }}
        >
          <span style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(4rem, 14vw, 13rem)',
            background: 'linear-gradient(135deg, var(--color-sunset) 0%, var(--color-gold) 50%, var(--color-rose) 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontStyle: 'italic',
            display: 'inline-block',
            lineHeight: 1,
            letterSpacing: '-2px',
            filter: 'drop-shadow(0 8px 24px rgba(212, 175, 55, 0.3))',
          }}>
            Mom
          </span>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.9 }}
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(1rem, 2.5vw, 1.5rem)',
            color: 'var(--color-text-mid)',
            fontStyle: 'italic',
            textAlign: 'center',
            marginBottom: 'clamp(1.5rem, 4vw, 3rem)',
            maxWidth: '600px',
            opacity: 0.85,
            letterSpacing: '0.5px',
          }}
        >
          From your daughter, with every piece of my heart
        </motion.p>

        {/* Countdown */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.1 }}
          style={{ width: '100%', display: 'flex', justifyContent: 'center' }}
        >
          <Countdown />
        </motion.div>

        {/* CTA Button */}
        <motion.button
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="btn-primary"
          style={{ marginTop: 'clamp(2rem, 5vw, 4rem)' }}
          onClick={() => {
            window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
          }}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
        >
          Enter Your Birthday World ✦
        </motion.button>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        className="scroll-indicator"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1 }}
        style={{ zIndex: 15 }}
      >
        <div className="scroll-indicator-line" />
        <div className="scroll-indicator-dot" />
      </motion.div>

      {/* Bottom fade */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '100%',
        height: 'clamp(120px, 20vh, 220px)',
        background: 'linear-gradient(to top, var(--color-cream), transparent)',
        pointerEvents: 'none',
        zIndex: 20,
      }} />
    </div>
  );
}
