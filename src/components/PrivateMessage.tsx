"use client";

import { useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Lock, Unlock, Heart } from 'lucide-react';

export default function PrivateMessage() {
  const [phrase, setPhrase] = useState('');
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const rotateY = useTransform(scrollYProgress, [0, 1], [-20, 20]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1, 0.9]);

  const handleUnlock = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(false);

    try {
      const res = await fetch('/api/message', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'verify', phrase })
      });
      const data = await res.json();

      if (data.success) {
        setMessage(data.message);
        setIsUnlocked(true);
      } else {
        setError(true);
      }
    } catch (err) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section ref={containerRef} className="section container" style={{ 
      minHeight: '80vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      paddingBottom: '10rem',
      perspective: '1500px'
    }}>
      <AnimatePresence mode="wait">
        {!isUnlocked ? (
          <motion.div
            key="locked"
            initial={{ opacity: 0, scale: 0.8, rotateX: 30 }}
            animate={{ opacity: 1, scale: 1, rotateX: 0 }}
            exit={{ opacity: 0, scale: 1.2, filter: 'blur(20px)', rotateY: 90 }}
            transition={{ duration: 0.8, type: "spring" }}
            className="glass-card"
            style={{
              padding: '5rem',
              textAlign: 'center',
              maxWidth: '500px',
              width: '100%',
              rotateY,
              scale,
              transformStyle: 'preserve-3d',
              background: 'linear-gradient(135deg, rgba(255,255,255,0.7), rgba(255,255,255,0.3))'
            }}
          >
            {/* Inner 3D container */}
            <motion.div style={{ translateZ: '40px' }}>
              <div style={{
                width: '100px',
                height: '100px',
                margin: '0 auto 2rem',
                background: 'linear-gradient(135deg, var(--color-gold), var(--color-sunset))',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 10px 30px rgba(212, 175, 55, 0.4)'
              }}>
                <Lock size={40} color="white" />
              </div>
              
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '3rem', marginBottom: '1rem', color: 'var(--color-dark-gold)' }}>
                A Private Note
              </h2>
              <p style={{ opacity: 0.8, marginBottom: '3rem', fontSize: '1.1rem' }}>
                Enter your special phrase to unlock a secret message just for you.
              </p>

              <form onSubmit={handleUnlock} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <input 
                  type="text" 
                  value={phrase}
                  onChange={(e) => setPhrase(e.target.value)}
                  placeholder="Enter secret phrase..." 
                  style={{
                    padding: '1.2rem',
                    borderRadius: '15px',
                    border: error ? '2px solid red' : '2px solid rgba(212, 175, 55, 0.3)',
                    background: 'rgba(255, 255, 255, 0.8)',
                    fontFamily: 'var(--font-sans)',
                    fontSize: '1.1rem',
                    outline: 'none',
                    textAlign: 'center',
                    boxShadow: 'inset 0 2px 5px rgba(0,0,0,0.05)',
                    transition: 'all 0.3s ease'
                  }}
                  onFocus={(e) => e.target.style.borderColor = 'var(--color-sunset)'}
                  onBlur={(e) => e.target.style.borderColor = error ? 'red' : 'rgba(212, 175, 55, 0.3)'}
                />
                {error && <motion.span initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} style={{ color: 'var(--color-rose)', fontSize: '0.95rem', fontWeight: 600 }}>Incorrect phrase. Hint: it is 4 words.</motion.span>}
                
                <button 
                  type="submit" 
                  className="btn-primary" 
                  disabled={loading}
                  style={{ marginTop: '1rem', padding: '1.2rem' }}
                >
                  {loading ? 'Unlocking Magic...' : 'Unlock Message'}
                </button>
              </form>
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            key="unlocked"
            initial={{ opacity: 0, scale: 0.8, rotateY: -90, translateZ: '-500px' }}
            animate={{ opacity: 1, scale: 1, rotateY: 0, translateZ: '0px' }}
            transition={{ duration: 1.5, type: "spring", bounce: 0.5 }}
            className="glass-card"
            style={{
              padding: '6rem 4rem',
              maxWidth: '800px',
              width: '100%',
              background: 'linear-gradient(135deg, var(--color-cream), var(--color-blush))',
              position: 'relative',
              transformStyle: 'preserve-3d',
              boxShadow: '0 50px 100px rgba(232, 141, 150, 0.3)'
            }}
          >
            <motion.div 
              style={{ translateZ: '80px' }}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
            >
              <div style={{
                position: 'absolute',
                top: '-40px',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '80px',
                height: '80px',
                background: 'linear-gradient(135deg, var(--color-sunset), var(--color-rose))',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 10px 30px rgba(255, 142, 114, 0.5)'
              }}>
                <Heart size={40} color="white" fill="white" />
              </div>
              
              <h3 style={{ 
                fontFamily: 'var(--font-serif)', 
                fontSize: '4rem', 
                color: 'var(--color-dark-gold)',
                marginBottom: '3rem',
                textAlign: 'center',
                textShadow: '0 5px 15px rgba(0,0,0,0.1)'
              }}>
                For You, Mom
              </h3>
              
              <p style={{ 
                fontFamily: 'var(--font-serif)', 
                fontSize: '1.8rem', 
                lineHeight: 1.8,
                color: 'var(--color-text-dark)',
                whiteSpace: 'pre-line',
                textAlign: 'center',
                background: 'rgba(255,255,255,0.6)',
                padding: '2rem',
                borderRadius: '20px',
                boxShadow: '0 10px 30px rgba(0,0,0,0.05)'
              }}>
                {message}
              </p>

              <div style={{ textAlign: 'center', marginTop: '4rem', opacity: 0.3 }}>
                <Unlock size={32} />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
