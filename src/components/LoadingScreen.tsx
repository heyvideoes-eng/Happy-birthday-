"use client";

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function LoadingScreen() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const duration = 1800;
    const start = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - start;
      const pct = Math.min(100, Math.round((elapsed / duration) * 100));
      setProgress(pct);
      if (pct >= 100) {
        clearInterval(interval);
        setTimeout(() => setLoading(false), 300);
      }
    }, 20);
    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.03 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 99999,
            background: 'var(--color-cream)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '2.5rem',
          }}
        >
          {/* Bloom glow */}
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '500px',
            height: '500px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(255,184,158,0.3) 0%, transparent 70%)',
            filter: 'blur(60px)',
            pointerEvents: 'none',
          }} />

          <motion.div
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}
          >
            <p style={{
              fontFamily: 'var(--font-script)',
              fontSize: 'clamp(1.4rem, 4vw, 2.2rem)',
              color: 'var(--color-rose)',
              marginBottom: '0.25rem',
              opacity: 0.8,
            }}>
              with all my love,
            </p>
            <p style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(2rem, 6vw, 3.5rem)',
              color: 'var(--color-text-dark)',
              fontStyle: 'italic',
              letterSpacing: '1px',
            }}>
              For You, Mom
            </p>
          </motion.div>

          {/* Petal dots */}
          <div style={{ display: 'flex', gap: '0.6rem', position: 'relative', zIndex: 1 }}>
            {[0,1,2,3,4].map(i => (
              <span key={i} className="loading-petal" />
            ))}
          </div>

          {/* Progress bar */}
          <div style={{
            width: 'clamp(180px, 30vw, 260px)',
            height: '2px',
            background: 'rgba(212, 175, 55, 0.15)',
            borderRadius: '2px',
            overflow: 'hidden',
            position: 'relative',
            zIndex: 1,
          }}>
            <motion.div
              style={{
                height: '100%',
                background: 'linear-gradient(90deg, var(--color-rose), var(--color-gold))',
                borderRadius: '2px',
              }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.1, ease: 'linear' }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
