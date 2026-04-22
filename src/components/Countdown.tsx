"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const TARGET_DATE = new Date('2026-04-23T00:00:00').getTime();

const units = ['days', 'hours', 'minutes', 'seconds'] as const;
const unitColors = {
  days: 'var(--color-sunset)',
  hours: 'var(--color-gold)',
  minutes: 'var(--color-rose)',
  seconds: 'var(--color-lavender)',
};

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isBirthday, setIsBirthday] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [prevTime, setPrevTime] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    setMounted(true);
    const update = () => {
      const now = Date.now();
      const distance = TARGET_DATE - now;
      if (distance <= 0) {
        setIsBirthday(true);
        return;
      }
      const next = {
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      };
      setPrevTime(timeLeft);
      setTimeLeft(next);
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  if (!mounted) return null;

  if (isBirthday) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, type: 'spring' }}
        style={{
          fontFamily: 'var(--font-script)',
          fontSize: 'clamp(1.8rem, 5vw, 3rem)',
          color: 'var(--color-gold)',
          textAlign: 'center',
          textShadow: '0 0 30px rgba(212,175,55,0.5)',
          lineHeight: 1.4,
        }}
      >
        Today is your day, Mom 🌸<br />
        <span style={{ fontSize: '70%', fontFamily: 'var(--font-serif)', fontStyle: 'italic', color: 'var(--color-rose)' }}>
          Happy Birthday
        </span>
      </motion.div>
    );
  }

  return (
    <div style={{
      display: 'flex',
      gap: 'clamp(0.6rem, 2vw, 1.5rem)',
      justifyContent: 'center',
      flexWrap: 'wrap',
    }}>
      {units.map((unit) => {
        const value = timeLeft[unit];
        const changed = value !== prevTime[unit];
        return (
          <motion.div
            key={unit}
            initial={{ y: 20, opacity: 0, scale: 0.9 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              width: 'clamp(70px, 12vw, 110px)',
              height: 'clamp(88px, 14vw, 128px)',
              background: 'rgba(255,255,255,0.5)',
              backdropFilter: 'blur(16px)',
              border: `1px solid rgba(255,255,255,0.7)`,
              borderRadius: 'clamp(12px, 2vw, 18px)',
              boxShadow: `0 10px 30px ${unitColors[unit]}26, 0 2px 8px rgba(0,0,0,0.05)`,
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {/* Accent top bar */}
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '2px',
              background: `linear-gradient(90deg, transparent, ${unitColors[unit]}, transparent)`,
              opacity: 0.6,
            }} />

            <AnimatePresence mode="popLayout">
              <motion.span
                key={value}
                initial={changed ? { y: -18, opacity: 0 } : {}}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 18, opacity: 0 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: 'clamp(1.8rem, 3.5vw, 3rem)',
                  color: unitColors[unit],
                  lineHeight: 1,
                  fontWeight: 500,
                }}
              >
                {value.toString().padStart(2, '0')}
              </motion.span>
            </AnimatePresence>

            <span style={{
              fontSize: 'clamp(0.55rem, 0.9vw, 0.75rem)',
              textTransform: 'uppercase',
              letterSpacing: '2px',
              marginTop: '0.5rem',
              color: 'var(--color-text-dark)',
              opacity: 0.55,
              fontFamily: 'var(--font-sans)',
              fontWeight: 500,
            }}>
              {unit}
            </span>
          </motion.div>
        );
      })}
    </div>
  );
}
