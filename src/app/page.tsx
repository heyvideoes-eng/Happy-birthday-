"use client";

import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

// ── Components ────────────────────────────────────────────────────────────────
const MemorySphere      = dynamic(() => import('@/components/MemorySphere'),      { ssr: false });
const GlobalBlessingOrb = dynamic(() => import('@/components/GlobalBlessingOrb'), { ssr: false });
const BirthdayBackground = dynamic(() => import('@/components/BirthdayBackground'), { ssr: false });
const SparkleTrail      = dynamic(() => import('@/components/SparkleTrail'),      { ssr: false });
const MobileGyroParallax = dynamic(() => import('@/components/MobileGyroParallax'), { ssr: false });
const InteractiveDecorations = dynamic(() => import('@/components/InteractiveDecorations'), { ssr: false });
const MusicPlayer        = dynamic(() => import('@/components/MusicPlayer'),        { ssr: false });

import WhySpecial      from '@/components/WhySpecial';
import Memories        from '@/components/Memories';

import InteractiveCake from '@/components/InteractiveCake';
import SecretLetterPopup from '@/components/SecretLetterPopup';
import BlessingsSection  from '@/components/BlessingsSection';

// ── ZoomSection: scroll-driven scale in/out ───────────────────────────────────
function ZoomSection({ children, className, id }: { children: React.ReactNode; className?: string; id?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const scale   = useTransform(scrollYProgress, [0, 0.25, 0.75, 1], [0.88, 1, 1, 0.92]);
  const opacity = useTransform(scrollYProgress, [0, 0.18, 0.82, 1], [0, 1, 1, 0]);
  const y       = useTransform(scrollYProgress, [0, 0.25, 0.75, 1], [60, 0, 0, -30]);

  return (
    <motion.div ref={ref} id={id} style={{ scale, opacity, y, willChange: 'transform,opacity', position: 'relative', zIndex: 2 }} className={className}>
      {children}
    </motion.div>
  );
}

// ── Loading screen ─────────────────────────────────────────────────────────────
function LoadingScreen({ onDone }: { onDone: () => void }) {
  const [pct, setPct] = useState(0);

  useEffect(() => {
    const start = Date.now();
    const dur   = 2000;
    const iv = setInterval(() => {
      const p = Math.min(100, Math.round(((Date.now() - start) / dur) * 100));
      setPct(p);
      if (p >= 100) { clearInterval(iv); setTimeout(onDone, 350); }
    }, 18);
    return () => clearInterval(iv);
  }, [onDone]);

  return (
    <motion.div exit={{ opacity: 0 }} transition={{ duration: 0.8 }}
      style={{
        position: 'fixed', inset: 0, zIndex: 99999,
        background: 'linear-gradient(160deg,#FFF5F7 0%,#FFE4EA 50%,#FFF8F5 100%)',
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '2rem',
      }}>

      {/* Petal animation */}
      {[0,1,2,3,4].map(i => (
        <motion.div key={i}
          animate={{ y: [0, -18, 0], rotate: [0, 15, -10, 0], opacity: [0.3, 0.8, 0.3] }}
          transition={{ duration: 2.5 + i * 0.4, delay: i * 0.3, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            position: 'absolute',
            left: `${15 + i * 18}%`, top: `${20 + (i % 3) * 20}%`,
            fontSize: '1.8rem', opacity: 0.25, pointerEvents: 'none',
          }}
        >
          🌸
        </motion.div>
      ))}

      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7 }}
        style={{ textAlign: 'center' }}>
        <p style={{ fontFamily: 'var(--script)', fontSize: 'clamp(1.2rem,3vw,1.8rem)', color: 'var(--rose)', marginBottom: '0.5rem' }}>
          for Mama, with all my love
        </p>
        <h1 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(2rem,5vw,3rem)', color: 'var(--text-dark)', fontWeight: 300 }}>
          A birthday universe — just for you
        </h1>
      </motion.div>

      {/* Progress bar */}
      <div style={{ width: 'clamp(160px,25vw,240px)' }}>
        <div style={{ height: 2, borderRadius: 2, background: 'rgba(232,141,150,0.2)', overflow: 'hidden' }}>
          <motion.div animate={{ width: `${pct}%` }} transition={{ duration: 0.05, ease: 'linear' }}
            style={{ height: '100%', background: 'linear-gradient(90deg,var(--rose),var(--gold))', borderRadius: 2 }} />
        </div>
        <p className="mono-label" style={{ textAlign: 'center', marginTop: '0.75rem' }}>{pct}%</p>
      </div>
    </motion.div>
  );
}

// ── Hero ───────────────────────────────────────────────────────────────────────
function Hero() {
  const [ready, setReady] = useState(false);
  useEffect(() => { setTimeout(() => setReady(true), 300); }, []);

  return (
    <section style={{ 
      position: 'relative', 
      height: '100svh', 
      minHeight: '600px', 
      overflow: 'hidden', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center' 
    }}>

      {/* Full-canvas sphere */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        <MemorySphere />
      </div>

      {/* Cute floating emoji accents around sphere — heartbeat pulse rings */}
      {[1.15, 1.35, 1.6].map((scale, i) => (
        <motion.div key={i}
          animate={{ scale: [1, scale, 1], opacity: [0.35, 0, 0.35] }}
          transition={{ duration: 3 + i * 1.1, delay: i * 0.9, repeat: Infinity, ease: 'easeOut' }}
          style={{
            position: 'absolute', zIndex: 1, pointerEvents: 'none',
            width: 'clamp(260px,42vw,520px)', height: 'clamp(260px,42vw,520px)',
            borderRadius: '50%',
            border: `1.5px solid rgba(232,141,150,${0.3 - i * 0.07})`,
            left: '50%', top: '50%', transform: 'translate(-50%,-50%)',
          }}
        />
      ))}

      {/* Cute fixed emoji accents at corners */}
      {[
        { emoji:'🎈', pos:{ top:'12%', left:'8%' }, delay:0,    rot:[-8,8] },
        { emoji:'🌸', pos:{ top:'15%', right:'8%' }, delay:0.6,  rot:[5,-5] },
        { emoji:'🎀', pos:{ bottom:'20%', left:'5%' }, delay:1.2, rot:[-5,5] },
        { emoji:'💕', pos:{ bottom:'18%', right:'6%' }, delay:0.3, rot:[6,-6] },
      ].map((item, i) => (
        <motion.span key={i}
          className="desktop-only"
          animate={{ y: [0, -12, 0], rotate: item.rot }}
          transition={{ duration: 3.5 + i * 0.4, delay: item.delay, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            position: 'absolute', ...item.pos, zIndex: 3,
            fontSize: 'clamp(1.6rem,3vw,2.4rem)',
            filter: 'drop-shadow(0 4px 12px rgba(232,141,150,0.4))',
            pointerEvents: 'none', display: 'block',
            lineHeight: 1,
          }}
        >
          {item.emoji}
        </motion.span>
      ))}

      {/* Soft pink vignette overlay */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none',
        background: 'radial-gradient(ellipse at center, rgba(255,245,247,0.05) 0%, rgba(255,245,247,0.6) 75%, var(--pink-50) 100%)',
      }} />

      {/* Hero text block — liquid glass card */}
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.94 }}
        animate={ready ? { opacity: 1, y: 0, scale: 1 } : {}}
        transition={{ duration: 1.2, ease: [0.16,1,0.3,1], delay: 0.5 }}
        style={{ 
          position: 'relative', 
          zIndex: 10, 
          textAlign: 'center', 
          padding: 'clamp(2rem, 8vw, 5rem)', 
          maxWidth: 760, 
          width: '90%',
          aspectRatio: '1/1',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '50%',
          border: '1.5px solid rgba(232, 141, 150, 0.2)',
          boxShadow: 'inset 0 0 50px rgba(255, 255, 255, 0.5), 0 30px 60px rgba(232, 141, 150, 0.15)',
          background: 'rgba(255, 255, 255, 0.35)',
          backdropFilter: 'blur(10px)',
        }}
      >
        <MobileGyroParallax strength={15}>
          <div className="glint-effect" style={{ borderRadius: '30px', padding: '1rem' }}>
        {/* Script label */}
        <motion.p initial={{ opacity: 0, y: 10 }} animate={ready ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.8, duration: 0.8 }}
          style={{ fontFamily: 'var(--script)', fontSize: 'clamp(1.1rem,2.5vw,1.5rem)', color: 'var(--rose)', marginBottom: '0.5rem', display: 'block' }}>
          From Vanshika — with everything
        </motion.p>

        {/* Main heading */}
        <motion.h1 initial={{ opacity: 0, scale: 0.95 }} animate={ready ? { opacity: 1, scale: 1 } : {}} transition={{ delay: 0.6, duration: 1.4, type: 'spring', stiffness: 40 }}
          className="display-1" style={{ marginBottom: '0.2rem', color: 'var(--text-dark)' }}>
          Happy Birthday
        </motion.h1>

        {/* Gold gradient "Mama" */}
        <motion.span initial={{ opacity: 0, scale: 0.88 }} animate={ready ? { opacity: 1, scale: 1 } : {}} transition={{ delay: 0.9, duration: 1.4, type: 'spring', stiffness: 35 }}
          style={{
            display: 'block', fontFamily: 'var(--serif)', fontStyle: 'italic', fontWeight: 300,
            fontSize: 'clamp(4rem,12vw,10rem)', lineHeight: 1,
            background: 'linear-gradient(135deg,var(--gold) 0%,var(--rose) 55%,#C8A8E9 100%)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            letterSpacing: '-0.03em', marginBottom: '2rem',
          }}>
          Mama
        </motion.span>

        {/* Liquid glass subtitle card */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={ready ? { opacity: 1, y: 0 } : {}} transition={{ delay: 1.2, duration: 0.9 }}
          className="liquid-glass" style={{ borderRadius: 20, padding: 'clamp(1rem,2.5vw,1.5rem) clamp(1.5rem,4vw,2.5rem)', maxWidth: 500, margin: '0 auto 2.5rem', display: 'inline-block' }}>
          <p className="body-serif" style={{ margin: 0, fontSize: 'clamp(0.95rem,1.8vw,1.15rem)' }}>
            Celebrating the wonderful person you are on this special day
          </p>
        </motion.div>

        {/* CTA */}
        <motion.div initial={{ opacity: 0 }} animate={ready ? { opacity: 1 } : {}} transition={{ delay: 1.5, duration: 0.7 }}>
          <button className="btn-rose" onClick={() => document.getElementById('why')?.scrollIntoView({ behavior: 'smooth' })}>
            ✦ Begin the journey
          </button>
        </motion.div>
        </div>
        </MobileGyroParallax>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div initial={{ opacity: 0 }} animate={ready ? { opacity: 1 } : {}} transition={{ delay: 2.2 }}
        style={{ position: 'absolute', bottom: '2.5rem', left: '50%', transform: 'translateX(-50%)', zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
        <p className="mono-label">Scroll to explore</p>
        <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          style={{ width: 1, height: 40, background: 'linear-gradient(to bottom,var(--rose),transparent)' }} />
      </motion.div>

      {/* Bottom fade */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '30%', background: 'linear-gradient(to top,var(--pink-50),transparent)', zIndex: 2, pointerEvents: 'none' }} />
    </section>
  );
}

// ── Section wrapper with gold divider ──────────────────────────────────────────
function Divider({ label }: { label: string }) {
  return (
    <motion.div initial={{ opacity: 0, scaleX: 0 }} whileInView={{ opacity: 1, scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 1 }}
      style={{ padding: '0 2rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', height: 80 }}>
      <div style={{ flex: 1, maxWidth: 160, height: 1, background: 'linear-gradient(90deg,transparent,var(--gold-dim))' }} />
      <p className="mono-label" style={{ color: 'rgba(212,175,55,0.6)', whiteSpace: 'nowrap' }}>{label}</p>
      <div style={{ flex: 1, maxWidth: 160, height: 1, background: 'linear-gradient(90deg,var(--gold-dim),transparent)' }} />
    </motion.div>
  );
}


// ── Root ───────────────────────────────────────────────────────────────────────
export default function Home() {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      <AnimatePresence>
        {!loaded && <LoadingScreen onDone={() => setLoaded(true)} />}
      </AnimatePresence>

      {loaded && (
        <main style={{ background: 'var(--pink-50)', position: 'relative', zIndex: 1 }}>
          <BirthdayBackground />
          <GlobalBlessingOrb />
          <SparkleTrail />
          <InteractiveDecorations />
          <MusicPlayer />

          {/* Hero */}
          <Hero />

          {/* Why Special */}
          <Divider label="why she is extraordinary" />
          <MobileGyroParallax strength={8}>
            <ZoomSection id="why" className="bg-soft">
              <WhySpecial />
            </ZoomSection>
          </MobileGyroParallax>

          {/* Memories */}
          <Divider label="the chapters that shaped us" />
          <MobileGyroParallax strength={5}>
            <ZoomSection className="bg-blush">
              <Memories />
            </ZoomSection>
          </MobileGyroParallax>



          {/* Cake */}
          <Divider label="close your eyes & wish" />
          <ZoomSection className="bg-soft">
            <InteractiveCake />
          </ZoomSection>

          {/* Secret Letter */}
          <Divider label="something just for you" />
          <ZoomSection className="bg-blush">
            <SecretLetterPopup />
          </ZoomSection>

          {/* Blessings */}
          <Divider label="from Vanshika's heart" />
          <ZoomSection className="bg-cream">
            <BlessingsSection />
          </ZoomSection>

          {/* Footer / Closing Section */}
          <footer style={{ 
            padding: 'clamp(5rem, 12vw, 10rem) 2rem', 
            textAlign: 'center', 
            background: 'linear-gradient(to top, rgba(255,209,214,0.4), transparent)',
            position: 'relative',
            overflow: 'hidden'
          }}>
            {/* Ambient decorative particles */}
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                animate={{ 
                  y: [0, -30, 0], 
                  opacity: [0.2, 0.5, 0.2],
                  rotate: [0, 20, -20, 0] 
                }}
                transition={{ 
                  duration: 4 + i, 
                  repeat: Infinity, 
                  delay: i * 0.5 
                }}
                style={{
                  position: 'absolute',
                  left: `${15 + i * 15}%`,
                  bottom: `${10 + (i % 3) * 15}%`,
                  fontSize: '1.5rem',
                  pointerEvents: 'none',
                  opacity: 0.3
                }}
              >
                {['🌸', '✨', '💕', '🎀', '🎈', '🌟'][i]}
              </motion.div>
            ))}

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2 }}
              style={{ maxWidth: 700, margin: '0 auto', position: 'relative', zIndex: 1 }}
            >
              <div className="ornament-divider" style={{ maxWidth: 200, margin: '0 auto 3rem' }}>
                <span style={{ fontFamily: 'var(--serif)', fontSize: '1.5rem', color: 'var(--gold)', opacity: 0.6 }}>✦ ✦ ✦</span>
              </div>
              
              <p style={{ 
                fontFamily: 'var(--script)', 
                fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', 
                color: 'var(--rose)', 
                marginBottom: '1.5rem' 
              }}>
                You are my home.
              </p>
              
              <p style={{ 
                fontFamily: 'var(--serif)', 
                fontSize: 'clamp(1.1rem, 2.2vw, 1.4rem)', 
                color: 'var(--text-dark)', 
                fontStyle: 'italic', 
                lineHeight: 1.8, 
                opacity: 0.85,
                marginBottom: '3.5rem'
              }}>
                Long before I knew what love was, I felt it — in your presence, in your voice, and in the way you have always looked at me. 
                Today, I hope you feel even a fraction of that love returned to you.
              </p>

              <div style={{ marginTop: '2rem' }}>
                <p style={{ 
                  fontFamily: 'var(--script)', 
                  fontSize: 'clamp(2.5rem, 6vw, 4rem)', 
                  color: 'var(--gold)',
                  textShadow: '0 0 30px rgba(212, 175, 55, 0.3)',
                  marginBottom: '0.5rem'
                }}>
                  Happy Birthday, Mama.
                </p>
                <p style={{ 
                  fontFamily: 'var(--script)', 
                  fontSize: 'clamp(1.2rem, 2.5vw, 1.8rem)', 
                  color: 'var(--rose)',
                  opacity: 0.9
                }}>
                  — with all my love, Vanshika 🌸
                </p>
              </div>

              <p className="mono-label" style={{ marginTop: '5rem', opacity: 0.2, letterSpacing: '4px' }}>
                A BIRTHDAY UNIVERSE MADE JUST FOR YOU
              </p>
            </motion.div>
          </footer>
        </main>
      )}
    </>
  );
}
