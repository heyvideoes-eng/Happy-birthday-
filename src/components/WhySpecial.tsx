"use client";

import { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

const CARDS = [
  {
    icon: "🌸",
    title: "You are unconditional love",
    body: "You have never once made me feel like I had to earn your love. It was always just there — steady, warm, and endlessly generous.",
    accent: "var(--rose)",
  },
  {
    icon: "🕊️",
    title: "You are quiet strength",
    body: "You have carried storms with such grace that I barely knew there was a storm at all. That is a kind of strength I am still learning to understand.",
    accent: "#C8A8E9",
  },
  {
    icon: "💛",
    title: "You are my safe place",
    body: "No matter where life has taken me, knowing you are there has made everything feel manageable. You have always been my home.",
    accent: "var(--gold)",
  },
  {
    icon: "✨",
    title: "You make ordinary magical",
    body: "The everyday things — a meal, a hug, a quiet evening — always felt significant with you. You have a gift for making life feel worth celebrating.",
    accent: "var(--rose)",
  },
  {
    icon: "🌿",
    title: "You shaped who I am",
    body: "Every good thing in me — my empathy, my resilience, my ability to love — traces back to you. You built that, one small moment at a time.",
    accent: "#90C8A0",
  },
  {
    icon: "🎀",
    title: "You deserve the world",
    body: "You have always given so much and asked for so little. Today, I want you to feel even a fraction of the joy you have given everyone around you.",
    accent: "var(--peach)",
  },
];

function TiltCard({ card, idx }: { card: typeof CARDS[0]; idx: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [12, -12]), { stiffness: 120, damping: 20 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-12, 12]), { stiffness: 120, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };
  const handleLeave = () => { mouseX.set(0); mouseY.set(0); setHovered(false); };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.92 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.8, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
      style={{ perspective: 1000 }}
    >
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={handleLeave}
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
      >
        <motion.div
          animate={{ scale: hovered ? 1.035 : 1 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        >
        <div
          className="liquid-glass glass-card"
          style={{
            padding: 'clamp(1.8rem,3vw,2.5rem)',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            transform: 'translateZ(0)',
          }}
        >
          {/* Accent bar */}
          <div style={{
            position: 'absolute',
            top: 0, left: '2rem', right: '2rem', height: 2,
            background: `linear-gradient(90deg,transparent,${card.accent},transparent)`,
            borderRadius: '0 0 2px 2px',
            opacity: hovered ? 0.8 : 0.4,
            transition: 'opacity 0.4s ease',
          }} />

          {/* Icon */}
          <motion.span
            animate={hovered ? { scale: [1, 1.25, 1], rotate: [0, 8, -5, 0] } : { scale: 1 }}
            transition={{ duration: 0.6 }}
            style={{ fontSize: 'clamp(2rem,3.5vw,2.8rem)', display: 'block', lineHeight: 1 }}
          >
            {card.icon}
          </motion.span>

          {/* Title */}
          <h3 style={{
            fontFamily: 'var(--serif)',
            fontSize: 'clamp(1.3rem,2.2vw,1.7rem)',
            color: 'var(--text-dark)',
            fontStyle: 'italic',
            lineHeight: 1.25,
          }}>
            {card.title}
          </h3>

          {/* Body */}
          <p style={{
            fontFamily: 'var(--sans)',
            fontSize: 'clamp(0.85rem,1.3vw,0.95rem)',
            color: 'var(--text-mid)',
            lineHeight: 1.75,
            opacity: 0.85,
          }}>
            {card.body}
          </p>

          {/* Bottom accent */}
          <div style={{
            marginTop: 'auto',
            paddingTop: '1rem',
            borderTop: '1px solid rgba(232,141,150,0.15)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
          }}>
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: card.accent, opacity: 0.7 }} />
            <p style={{ fontFamily: 'var(--sans)', fontSize: '0.6rem', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--text-soft)' }}>
              from Vanshika's heart
            </p>
          </div>
        </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export default function WhySpecial() {
  return (
    <section className="section" style={{ padding: 'clamp(4rem,10vw,8rem) clamp(1.5rem,5vw,4rem)' }}>
      <div className="container">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          transition={{ duration: 0.9 }} style={{ textAlign: 'center', marginBottom: 'clamp(3rem,7vw,6rem)' }}>
          <p className="section-eyebrow">why you are irreplaceable</p>
          <h2 className="section-heading">Six Reasons You Are<br/>
            <em style={{ background: 'linear-gradient(135deg,var(--gold),var(--rose))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Extraordinary
            </em>
          </h2>
          <p className="body-serif" style={{ maxWidth: 540, margin: '0 auto' }}>
            There are a thousand more — but these six live at the centre of everything I feel for you.
          </p>
        </motion.div>

        {/* Cards grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit,minmax(clamp(240px,28vw,320px),1fr))',
          gap: 'clamp(1rem,2.5vw,2rem)',
        }}>
          {CARDS.map((card, i) => (
            <TiltCard key={i} card={card} idx={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
