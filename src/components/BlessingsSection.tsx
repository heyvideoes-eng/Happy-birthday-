"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { useRef, useEffect } from 'react';

const wishes = [
  { text: "May every morning feel as warm as your smile", icon: "🌅", delay: 0 },
  { text: "May you always know how deeply you are loved", icon: "💕", delay: 0.15 },
  { text: "May your heart feel full on this beautiful day", icon: "🌸", delay: 0.3 },
  { text: "May every dream you hold gently be realized", icon: "✨", delay: 0.45 },
  { text: "May you rest as deeply as you have cared for us", icon: "🕊️", delay: 0.6 },
  { text: "May this birthday be the gentlest gift", icon: "🎀", delay: 0.75 },
  { text: "May you feel celebrated, cherished, and seen", icon: "🌟", delay: 0.9 },
  { text: "May every year ahead be richer than the last", icon: "🌹", delay: 1.05 },
];

export default function BlessingsSection() {
  return (
    <section className="section container" style={{ position: 'relative' }}>
      {/* Ambient glow */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '80%',
        height: '80%',
        background: 'radial-gradient(ellipse, rgba(255,209,214,0.2) 0%, rgba(212,175,55,0.05) 50%, transparent 70%)',
        filter: 'blur(80px)',
        pointerEvents: 'none',
        zIndex: 0,
      }} />

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        style={{ textAlign: 'center', position: 'relative', zIndex: 1, marginBottom: 'clamp(3rem, 7vw, 6rem)' }}
      >
        <p className="section-intro">sent with all the love I have</p>
        <h2 className="section-title">Birthday Wishes for You</h2>
        <p style={{
          fontFamily: 'var(--font-serif)',
          fontSize: 'clamp(1rem, 2vw, 1.2rem)',
          color: 'var(--color-text-mid)',
          maxWidth: '580px',
          margin: '0 auto',
          fontStyle: 'italic',
          opacity: 0.8,
          lineHeight: 1.75,
        }}>
          If I could wrap every wish I have ever made into one moment, I would give it to you on this day, Mom.
        </p>
      </motion.div>

      {/* Wishes grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(clamp(220px, 28vw, 300px), 1fr))',
        gap: 'clamp(1rem, 2.5vw, 1.8rem)',
        width: '100%',
        maxWidth: '1100px',
        position: 'relative',
        zIndex: 1,
      }}>
        {wishes.map((wish, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 40, scale: 0.92 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.8, delay: wish.delay, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{
              y: -8,
              scale: 1.03,
              transition: { duration: 0.3 },
            }}
            className="wish-bubble"
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '0.75rem',
              padding: 'clamp(1rem, 2.5vw, 1.5rem)',
              borderRadius: '20px',
              background: 'rgba(255,255,255,0.65)',
              backdropFilter: 'blur(16px)',
              border: '1px solid rgba(255,255,255,0.8)',
              boxShadow: '0 10px 30px rgba(232, 141, 150, 0.12), 0 2px 8px rgba(0,0,0,0.04)',
              cursor: 'default',
            }}
          >
            <span style={{ fontSize: 'clamp(1.4rem, 2.5vw, 1.8rem)', flexShrink: 0, marginTop: '2px' }}>
              {wish.icon}
            </span>
            <p style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(0.9rem, 1.6vw, 1.05rem)',
              color: 'var(--color-text-dark)',
              fontStyle: 'italic',
              lineHeight: 1.6,
              margin: 0,
            }}>
              {wish.text}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Central blessing statement */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, delay: 0.3 }}
        style={{
          marginTop: 'clamp(4rem, 8vw, 7rem)',
          textAlign: 'center',
          position: 'relative',
          zIndex: 1,
          maxWidth: '700px',
        }}
      >
        {/* Ornamental divider */}
        <div className="divider-ornament" style={{ marginBottom: 'clamp(2rem, 4vw, 3rem)' }}>
          <span style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(1.5rem, 3vw, 2rem)',
            color: 'var(--color-gold)',
            opacity: 0.6,
          }}>
            ✦ ✦ ✦
          </span>
        </div>

        <p style={{
          fontFamily: 'var(--font-script)',
          fontSize: 'clamp(1.6rem, 4vw, 2.8rem)',
          color: 'var(--color-rose)',
          lineHeight: 1.5,
          marginBottom: '1.5rem',
        }}>
          Happy Birthday, Mama.
        </p>
        <p style={{
          fontFamily: 'var(--font-serif)',
          fontSize: 'clamp(1.1rem, 2.2vw, 1.5rem)',
          color: 'var(--color-text-dark)',
          fontStyle: 'italic',
          lineHeight: 1.8,
          opacity: 0.85,
        }}>
          You have given me the world without ever asking for anything in return.<br />
          Today, I give you all of this — every word, every wish, every piece of love I have — just for you.
        </p>
        <p style={{
          fontFamily: 'var(--font-script)',
          fontSize: 'clamp(1rem, 2vw, 1.3rem)',
          color: 'var(--color-dark-gold)',
          marginTop: '1.5rem',
          opacity: 0.8,
        }}>
          — always and forever, your daughter 🌸
        </p>
      </motion.div>
    </section>
  );
}
