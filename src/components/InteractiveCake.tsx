"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Flame } from 'lucide-react';

const NUM_CANDLES = 5;

export default function InteractiveCake() {
  const [candlesLit, setCandlesLit] = useState(Array(NUM_CANDLES).fill(true));
  const [blownOut, setBlownOut] = useState(false);
  const [wishRevealed, setWishRevealed] = useState(false);

  const blowOutCandle = (index: number) => {
    if (!candlesLit[index]) return;

    const newCandles = [...candlesLit];
    newCandles[index] = false;
    setCandlesLit(newCandles);

    if (newCandles.every(c => !c)) {
      setBlownOut(true);

      const colors = ['#FF8E72', '#D8B4E2', '#D4AF37', '#FFD1D6', '#FFB89E'];
      setTimeout(() => {
        confetti({
          particleCount: 80,
          spread: 100,
          origin: { y: 0.55 },
          colors,
          shapes: ['circle'],
        });
        setTimeout(() => {
          confetti({
            particleCount: 60,
            angle: 60,
            spread: 80,
            origin: { x: 0, y: 0.65 },
            colors,
          });
          confetti({
            particleCount: 60,
            angle: 120,
            spread: 80,
            origin: { x: 1, y: 0.65 },
            colors,
          });
        }, 300);
        setTimeout(() => setWishRevealed(true), 1200);
      }, 500);
    }
  };

  const candleColors = ['#FFB89E', '#FFD1D6', '#D8B4E2', '#D4AF37', '#FF8E72'];

  return (
    <section className="section container" style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      minHeight: 'clamp(50vh, 60vh, 70vh)',
      perspective: '1200px',
      position: 'relative',
    }}>
      {/* Ambient glow */}
      <div style={{
        position: 'absolute',
        bottom: '10%',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '60%',
        height: '200px',
        background: 'radial-gradient(ellipse, rgba(255,142,114,0.2) 0%, transparent 70%)',
        filter: 'blur(50px)',
        pointerEvents: 'none',
      }} />

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        style={{ textAlign: 'center', marginBottom: 'clamp(2rem, 5vw, 4rem)', position: 'relative', zIndex: 1 }}
      >
        <p className="section-intro">close your eyes and breathe</p>
        <h2 className="section-title" style={{ marginBottom: '1rem' }}>Make a Wish, Mom</h2>
        <p style={{
          fontSize: 'clamp(1rem, 2vw, 1.2rem)',
          color: 'var(--color-text-mid)',
          fontFamily: 'var(--font-serif)',
          fontStyle: 'italic',
          opacity: 0.85,
          maxWidth: '500px',
          margin: '0 auto',
        }}>
          {blownOut
            ? wishRevealed ? "Your wish is already on its way to the universe 💛" : "Releasing your wish..."
            : "Tap each candle to blow it out and make your wish."}
        </p>
      </motion.div>

      {/* Cake Scene */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.2 }}
        style={{
          position: 'relative',
          width: 'clamp(280px, 45vw, 420px)',
          transformStyle: 'preserve-3d',
        }}
        whileHover={{ rotateY: 8, rotateX: 12 }}
        transition={{ type: 'spring', stiffness: 60 } as never}
      >
        {/* Candles */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: 'clamp(12px, 3vw, 22px)',
          marginBottom: '-8px',
          position: 'relative',
          zIndex: 5,
          transform: 'translateZ(20px)',
        }}>
          {candlesLit.map((isLit, i) => (
            <motion.div
              key={i}
              onClick={() => blowOutCandle(i)}
              whileHover={isLit ? { scale: 1.15, y: -6 } : {}}
              whileTap={isLit ? { scale: 0.95 } : {}}
              style={{
                position: 'relative',
                width: 'clamp(10px, 1.8vw, 16px)',
                height: 'clamp(55px, 9vw, 90px)',
                background: `linear-gradient(to right, ${candleColors[i]}99, ${candleColors[i]}, ${candleColors[i]}99)`,
                borderRadius: '6px 6px 2px 2px',
                cursor: isLit ? 'pointer' : 'default',
                boxShadow: isLit
                  ? `0 0 20px 4px ${candleColors[i]}66, 2px 2px 8px rgba(0,0,0,0.15)`
                  : '2px 2px 5px rgba(0,0,0,0.15)',
                transition: 'box-shadow 0.5s ease',
              }}
            >
              {/* Candle stripe texture */}
              <div style={{
                position: 'absolute',
                inset: 0,
                background: 'repeating-linear-gradient(90deg, transparent, transparent 40%, rgba(255,255,255,0.3) 40%, rgba(255,255,255,0.3) 60%)',
                borderRadius: 'inherit',
              }} />

              {/* Flame */}
              <AnimatePresence>
                {isLit && (
                  <motion.div
                    key="flame"
                    initial={{ opacity: 0, scale: 0, y: 10 }}
                    animate={{
                      opacity: 1,
                      scale: [1, 1.15, 0.95, 1.1, 1],
                      rotate: [-3, 3, -2, 2, -3],
                      y: 0,
                    }}
                    exit={{ opacity: 0, scale: 0, y: -20, filter: 'blur(8px)' }}
                    transition={{
                      opacity: { duration: 0.3 },
                      scale: { duration: 1.2, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' },
                      rotate: { duration: 1, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' },
                    }}
                    style={{
                      position: 'absolute',
                      top: 'clamp(-28px, -5vw, -38px)',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      filter: `drop-shadow(0 0 10px ${candleColors[i]}) drop-shadow(0 0 20px var(--color-gold))`,
                    }}
                  >
                    <Flame
                      size={28}
                      fill={candleColors[i]}
                      color="var(--color-gold)"
                      strokeWidth={0.5}
                      style={{ transform: 'translateX(-50%)' }}
                    />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Smoke */}
              <AnimatePresence>
                {!isLit && (
                  <motion.div
                    key="smoke"
                    initial={{ opacity: 0, y: 0, scaleX: 0.3 }}
                    animate={{ opacity: [0, 0.4, 0.2, 0], y: -40, scaleX: 1.5 }}
                    transition={{ duration: 2.5, ease: 'easeOut' }}
                    style={{
                      position: 'absolute',
                      top: '-8px',
                      left: '-4px',
                      right: '-4px',
                      height: '12px',
                      background: 'rgba(150,140,130,0.6)',
                      borderRadius: '50%',
                      filter: 'blur(6px)',
                    }}
                  />
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* Cake tiers */}
        <div style={{ position: 'relative' }}>
          {/* Top Tier */}
          <div style={{
            width: '65%',
            margin: '0 auto',
            height: 'clamp(50px, 8vw, 75px)',
            background: 'linear-gradient(to bottom, #FFF8F5, var(--color-champagne))',
            borderRadius: '16px 16px 0 0',
            boxShadow: 'inset 0 -8px 16px rgba(212, 175, 55, 0.15), 0 4px 12px rgba(0,0,0,0.08)',
            border: '1.5px solid rgba(255,255,255,0.9)',
            position: 'relative',
            overflow: 'hidden',
          }}>
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '12px',
              background: 'linear-gradient(to bottom, var(--color-blush), transparent)',
              borderRadius: '16px 16px 0 0',
            }} />
            {/* Rose decor */}
            {['15%','35%','55%','75%'].map((left, i) => (
              <span key={i} style={{
                position: 'absolute',
                bottom: '8px',
                left,
                fontSize: '14px',
                opacity: 0.7,
              }}>🌸</span>
            ))}
          </div>

          {/* Mid Tier */}
          <div style={{
            width: '82%',
            margin: '0 auto',
            height: 'clamp(55px, 9vw, 85px)',
            background: 'linear-gradient(to bottom, #FDF6F0, var(--color-champagne-deep))',
            boxShadow: 'inset 0 -8px 20px rgba(212, 175, 55, 0.1), 0 4px 12px rgba(0,0,0,0.08)',
            border: '1.5px solid rgba(255,255,255,0.8)',
            position: 'relative',
            overflow: 'hidden',
          }}>
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '14px',
              background: 'linear-gradient(to bottom, var(--color-peach), transparent)',
            }} />
            <div style={{
              position: 'absolute',
              bottom: '8px',
              left: '50%',
              transform: 'translateX(-50%)',
              fontFamily: 'var(--font-script)',
              fontSize: 'clamp(0.8rem, 1.5vw, 1.1rem)',
              color: 'var(--color-rose)',
              whiteSpace: 'nowrap',
              opacity: 0.8,
            }}>
              Happy Birthday ♡
            </div>
          </div>

          {/* Base Tier */}
          <div style={{
            width: '100%',
            height: 'clamp(60px, 10vw, 95px)',
            background: 'linear-gradient(to bottom, #FDFBF7, var(--color-champagne))',
            borderRadius: '0 0 20px 20px',
            boxShadow: '0 20px 40px rgba(0,0,0,0.1), inset 0 -10px 20px rgba(212, 175, 55, 0.12)',
            border: '1.5px solid rgba(255,255,255,0.8)',
            position: 'relative',
            overflow: 'hidden',
          }}>
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '16px',
              background: 'linear-gradient(to bottom, var(--color-blush-deep), transparent)',
            }} />
          </div>

          {/* Plate */}
          <div style={{
            width: '115%',
            margin: '-8px auto 0',
            height: 'clamp(12px, 2vw, 18px)',
            background: 'linear-gradient(to bottom, rgba(212,175,55,0.3), rgba(212,175,55,0.1))',
            borderRadius: '50%',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            marginLeft: '-7.5%',
          }} />
        </div>
      </motion.div>

      {/* Wish Reveal */}
      <AnimatePresence>
        {wishRevealed && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="quote-card"
            style={{
              marginTop: 'clamp(2.5rem, 5vw, 4rem)',
              maxWidth: '560px',
              textAlign: 'center',
              position: 'relative',
              zIndex: 2,
            }}
          >
            <p style={{
              fontFamily: 'var(--font-script)',
              fontSize: 'clamp(1.3rem, 3vw, 1.8rem)',
              color: 'var(--color-rose)',
              marginBottom: '0.75rem',
            }}>
              Your wish is in the universe now ✨
            </p>
            <p style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(1rem, 1.8vw, 1.2rem)',
              color: 'var(--color-text-mid)',
              fontStyle: 'italic',
              lineHeight: 1.7,
              opacity: 0.85,
            }}>
              May every wish your heart has ever quietly held come true — because, Mom, you deserve every single one.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
