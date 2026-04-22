"use client";

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const memories = [
  {
    era: "The Beginning",
    year: "The Early Years",
    text: "You held my hand through every first — my first step, my first word, my first heartbreak. You made the whole world feel safe just by being in it.",
    detail: "I remember the warmth of your arms as my very first home.",
    color: "var(--color-peach)",
    accent: "var(--color-sunset)",
    icon: "🌷",
  },
  {
    era: "Growing Together",
    year: "The Growing Years",
    text: "The late-night conversations, the quiet reassurance, the way you believed in me even when I had stopped believing in myself. You were my compass.",
    detail: "Your voice was the gentlest thing I knew.",
    color: "var(--color-lavender)",
    accent: "var(--color-plum)",
    icon: "🌿",
  },
  {
    era: "Here & Always",
    year: "Today & Forever",
    text: "Watching you now — your grace, your laughter, your strength — I understand what I once could not put into words: you are irreplaceable, and I am so deeply proud to be your daughter.",
    detail: "There is no one like you. There never will be.",
    color: "var(--color-blush)",
    accent: "var(--color-rose)",
    icon: "💛",
  }
];

function MemoryCard({ mem, idx }: { mem: typeof memories[0]; idx: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"]
  });

  const rotateY = useTransform(scrollYProgress, [0, 0.5, 1], [idx % 2 === 0 ? 18 : -18, 0, idx % 2 === 0 ? -18 : 18]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.88, 1, 0.88]);
  const y = useTransform(scrollYProgress, [0, 1], [120, -120]);
  const photoRotate = useTransform(scrollYProgress, [0, 0.5, 1], [idx % 2 === 0 ? 12 : -12, 0, idx % 2 === 0 ? -12 : 12]);

  const isEven = idx % 2 === 0;

  return (
    <motion.div
      ref={cardRef}
      style={{
        width: '100%',
        maxWidth: '1000px',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        alignItems: 'center',
        gap: 'clamp(2rem, 5vw, 5rem)',
        perspective: '1600px',
        y,
      }}
    >
      {/* Visual panel */}
      <motion.div
        style={{
          rotateY: photoRotate,
          scale,
          transformStyle: 'preserve-3d',
          order: isEven ? 0 : 1,
        }}
      >
        <div
          className="glass-card"
          style={{
            aspectRatio: '4/3',
            background: `linear-gradient(135deg, ${mem.color}, rgba(255,255,255,0.6))`,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 'clamp(1.5rem, 4vw, 2.5rem)',
            border: 'clamp(8px, 2vw, 16px) solid rgba(255,255,255,0.85)',
            position: 'relative',
            overflow: 'hidden',
            boxShadow: '0 25px 60px rgba(0,0,0,0.12), 0 8px 20px rgba(0,0,0,0.06)',
          }}
        >
          {/* Background texture */}
          <div style={{
            position: 'absolute',
            inset: 0,
            background: `radial-gradient(circle at 30% 30%, rgba(255,255,255,0.5) 0%, transparent 60%)`,
            pointerEvents: 'none',
          }} />

          <motion.div
            style={{ transform: 'translateZ(50px)', textAlign: 'center', position: 'relative', zIndex: 1 }}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div style={{ fontSize: 'clamp(3rem, 7vw, 5rem)', marginBottom: '1rem' }}>
              {mem.icon}
            </div>
            <p style={{
              fontFamily: 'var(--font-script)',
              fontSize: 'clamp(1rem, 2.5vw, 1.5rem)',
              color: 'var(--color-text-dark)',
              opacity: 0.7,
              fontWeight: 600,
            }}>
              {mem.era}
            </p>
            <div style={{
              width: '50px',
              height: '1px',
              background: `linear-gradient(90deg, transparent, ${mem.accent}, transparent)`,
              margin: '0.75rem auto',
              opacity: 0.6,
            }} />
            <p style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(0.85rem, 1.5vw, 1rem)',
              color: 'var(--color-text-mid)',
              fontStyle: 'italic',
              opacity: 0.75,
            }}>
              {mem.detail}
            </p>
          </motion.div>
        </div>
      </motion.div>

      {/* Text panel */}
      <motion.div
        style={{
          rotateY: useTransform(rotateY, (v) => -v * 0.4),
          padding: 'clamp(1rem, 3vw, 2rem)',
          order: isEven ? 1 : 0,
        }}
      >
        <motion.p
          initial={{ opacity: 0, x: isEven ? -20 : 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{
            fontFamily: 'var(--font-script)',
            fontSize: 'clamp(0.9rem, 2vw, 1.1rem)',
            color: mem.accent,
            marginBottom: '0.5rem',
            letterSpacing: '0.5px',
          }}
        >
          {mem.era}
        </motion.p>

        <motion.h3
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)',
            color: 'var(--color-dark-gold)',
            marginBottom: 'clamp(1rem, 2vw, 1.5rem)',
            lineHeight: 1.1,
          }}
        >
          {mem.year}
        </motion.h3>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(1rem, 1.8vw, 1.25rem)',
            color: 'var(--color-text-dark)',
            lineHeight: 1.9,
            fontStyle: 'italic',
            background: 'rgba(255,255,255,0.55)',
            padding: 'clamp(1rem, 2.5vw, 1.8rem)',
            borderRadius: '16px',
            backdropFilter: 'blur(12px)',
            boxShadow: '0 8px 30px rgba(0,0,0,0.05)',
            borderLeft: `3px solid ${mem.accent}`,
          }}
        >
          {mem.text}
        </motion.p>
      </motion.div>
    </motion.div>
  );
}

export default function Memories() {
  return (
    <section className="section container" style={{ position: 'relative', perspective: '2000px' }}>
      {/* Ambient glow */}
      <div style={{
        position: 'absolute',
        top: '20%',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '80%',
        height: '300px',
        background: 'radial-gradient(ellipse, rgba(216,180,226,0.15) 0%, transparent 70%)',
        filter: 'blur(60px)',
        pointerEvents: 'none',
      }} />

      <motion.div
        initial={{ opacity: 0, y: 40, rotateX: 30 }}
        whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1.1, type: 'spring' }}
        style={{ textAlign: 'center' }}
      >
        <p className="section-intro">the chapters that made us</p>
        <h2 className="section-title">Our Memories</h2>
        <p style={{
          fontFamily: 'var(--font-serif)',
          fontSize: 'clamp(1rem, 2vw, 1.2rem)',
          color: 'var(--color-text-mid)',
          maxWidth: '600px',
          margin: '0 auto',
          fontStyle: 'italic',
          opacity: 0.8,
          lineHeight: 1.7,
        }}>
          Every chapter with you has been my favourite. Here are the ones I carry closest.
        </p>
      </motion.div>

      {/* Timeline */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 'clamp(5rem, 12vw, 10rem)',
        marginTop: 'clamp(4rem, 10vw, 8rem)',
        alignItems: 'center',
        width: '100%',
      }}>
        {memories.map((mem, idx) => (
          <MemoryCard key={idx} mem={mem} idx={idx} />
        ))}
      </div>
    </section>
  );
}
