"use client";

import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import confetti from 'canvas-confetti';
import { X, Heart } from 'lucide-react';

export default function SecretLetterPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [envelopeOpen, setEnvelopeOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const fireConfetti = () => {
    const colors = ['#FFD1D6', '#D4AF37', '#FFB89E', '#E88D96', '#D8B4E2'];

    confetti({
      particleCount: 50,
      angle: 60,
      spread: 70,
      origin: { x: 0.1, y: 0.75 },
      colors,
      shapes: ['circle'],
    });
    confetti({
      particleCount: 50,
      angle: 120,
      spread: 70,
      origin: { x: 0.9, y: 0.75 },
      colors,
      shapes: ['circle'],
    });
  };

  const handleOpen = () => {
    setEnvelopeOpen(true);
    fireConfetti();
    setTimeout(() => {
      setIsOpen(true);
      document.body.style.overflow = 'hidden';
    }, 700);
  };

  const handleClose = () => {
    setIsOpen(false);
    setEnvelopeOpen(false);
    document.body.style.overflow = 'unset';
  };

  // 3D tilt for trigger card
  const xTrigger = useMotionValue(0);
  const yTrigger = useMotionValue(0);
  const xSpring = useSpring(xTrigger, { stiffness: 120, damping: 22 });
  const ySpring = useSpring(yTrigger, { stiffness: 120, damping: 22 });
  const rotateXTrigger = useTransform(ySpring, [-0.5, 0.5], ['14deg', '-14deg']);
  const rotateYTrigger = useTransform(xSpring, [-0.5, 0.5], ['-14deg', '14deg']);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    xTrigger.set((e.clientX - rect.left) / rect.width - 0.5);
    yTrigger.set((e.clientY - rect.top) / rect.height - 0.5);
  };
  const handleMouseLeave = () => {
    xTrigger.set(0);
    yTrigger.set(0);
  };

  // Modal subtle tilt
  const xModal = useMotionValue(0);
  const yModal = useMotionValue(0);
  const xSpringModal = useSpring(xModal, { stiffness: 40, damping: 30 });
  const ySpringModal = useSpring(yModal, { stiffness: 40, damping: 30 });
  const rotateXModal = useTransform(ySpringModal, [-0.5, 0.5], ['4deg', '-4deg']);
  const rotateYModal = useTransform(xSpringModal, [-0.5, 0.5], ['-4deg', '4deg']);

  const handleMouseMoveModal = (e: React.MouseEvent) => {
    if (!isOpen) return;
    xModal.set(e.clientX / window.innerWidth - 0.5);
    yModal.set(e.clientY / window.innerHeight - 0.5);
  };

  return (
    <>
      <section
        className="section container"
        style={{
          minHeight: '80vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
        }}
      >
        {/* Ambient */}
        <div style={{
          position: 'absolute',
          top: '40%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '500px',
          height: '500px',
          background: 'radial-gradient(circle, rgba(255,184,158,0.18) 0%, rgba(212,175,55,0.07) 50%, transparent 70%)',
          filter: 'blur(70px)',
          pointerEvents: 'none',
        }} />

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          style={{ textAlign: 'center', marginBottom: 'clamp(2rem, 5vw, 4rem)', position: 'relative', zIndex: 1 }}
        >
          <p className="section-intro">written just for you, Mama</p>
          <h2 className="section-title">A Secret Letter</h2>
        </motion.div>

        {/* Envelope Card */}
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          style={{ position: 'relative', perspective: '1200px', width: '100%', maxWidth: '460px', zIndex: 1 }}
        >
          {/* Glow */}
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '120%',
            height: '120%',
            background: 'radial-gradient(circle, rgba(255,184,158,0.25) 0%, transparent 65%)',
            filter: 'blur(20px)',
            pointerEvents: 'none',
            zIndex: 0,
          }} />

          {/* Trigger card */}
          <motion.div
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onClick={handleOpen}
            style={{
              rotateX: rotateXTrigger,
              rotateY: rotateYTrigger,
              transformStyle: 'preserve-3d',
              cursor: 'pointer',
              position: 'relative',
              zIndex: 1,
            }}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
          >
            <div
              className="glass-card"
              style={{
                padding: 'clamp(2.5rem, 5vw, 4rem) clamp(2rem, 4vw, 3rem)',
                textAlign: 'center',
                background: 'linear-gradient(145deg, rgba(255,255,255,0.92), rgba(253,251,247,0.75))',
                borderRadius: 'inherit',
                border: '1px solid rgba(255,255,255,0.85)',
                boxShadow: '0 30px 70px rgba(232,141,150,0.2), inset 0 0 30px rgba(255,255,255,0.5)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '1rem',
                transform: 'translateZ(20px)',
              }}
            >
              {/* Envelope illustration */}
              <motion.div
                animate={envelopeOpen ? { rotateX: -180, y: -20 } : { rotateX: 0, y: 0 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  width: 'clamp(60px, 12vw, 90px)',
                  height: 'clamp(44px, 9vw, 65px)',
                  background: 'linear-gradient(135deg, var(--color-blush), var(--color-champagne))',
                  borderRadius: '4px',
                  position: 'relative',
                  boxShadow: '0 8px 24px rgba(232,141,150,0.3)',
                  transformStyle: 'preserve-3d',
                  border: '1.5px solid rgba(255,255,255,0.8)',
                }}
              >
                {/* Envelope flap */}
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: '60%',
                  clipPath: 'polygon(0 0, 100% 0, 50% 65%)',
                  background: 'linear-gradient(180deg, var(--color-rose) 0%, var(--color-blush) 100%)',
                  opacity: 0.7,
                }} />
                {/* Seal */}
                <div style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: '22px',
                  height: '22px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, var(--color-gold), var(--color-sunset))',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 2px 8px rgba(212,175,55,0.5)',
                  zIndex: 2,
                }}>
                  <span style={{ fontSize: '10px', color: 'white' }}>♡</span>
                </div>
              </motion.div>

              <div>
                <h3 style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: 'clamp(1.6rem, 3.5vw, 2.2rem)',
                  color: 'var(--color-dark-gold)',
                  fontStyle: 'italic',
                  marginBottom: '0.4rem',
                }}>
                  A Letter From My Heart
                </h3>
                <p style={{
                  fontFamily: 'var(--font-script)',
                  fontSize: 'clamp(0.9rem, 1.8vw, 1.1rem)',
                  color: 'var(--color-rose)',
                  opacity: 0.8,
                }}>
                  tap to open your letter
                </p>
              </div>

              {/* Pulse dots */}
              <div style={{ display: 'flex', gap: '6px', marginTop: '0.5rem' }}>
                {[0,1,2].map(i => (
                  <motion.div
                    key={i}
                    animate={{ scale: [1, 1.4, 1], opacity: [0.4, 1, 0.4] }}
                    transition={{ duration: 1.5, delay: i * 0.25, repeat: Infinity, ease: 'easeInOut' }}
                    style={{
                      width: '6px',
                      height: '6px',
                      borderRadius: '50%',
                      background: 'var(--color-rose)',
                    }}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Modal */}
      {mounted && createPortal(
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, backdropFilter: 'blur(20px)' }}
              exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              style={{
                position: 'fixed',
                inset: 0,
                zIndex: 999999,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'rgba(253,251,247,0.65)',
                perspective: '1600px',
                padding: 'clamp(1rem, 5vw, 2rem)',
              }}
              onMouseMove={handleMouseMoveModal}
              onClick={(e) => { if (e.target === e.currentTarget) handleClose(); }}
            >
              <motion.div
                initial={{ scale: 0.85, opacity: 0, y: 40, rotateX: 15 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.88, opacity: 0, y: 30 }}
                transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  rotateX: rotateXModal,
                  rotateY: rotateYModal,
                  width: '100%',
                  maxWidth: '820px',
                  maxHeight: '90vh',
                  overflowY: 'auto',
                  background: 'linear-gradient(180deg, #fffef9 0%, #fffbf0 100%)',
                  borderRadius: 'clamp(16px, 3vw, 24px)',
                  padding: 'clamp(2.5rem, 6vw, 5rem)',
                  position: 'relative',
                  boxShadow: '0 50px 120px rgba(212,175,55,0.25), 0 12px 40px rgba(0,0,0,0.12)',
                  transformStyle: 'preserve-3d',
                  border: '1px solid rgba(212,175,55,0.15)',
                }}
              >
                {/* Close button */}
                <motion.button
                  onClick={handleClose}
                  whileHover={{ scale: 1.1, background: 'rgba(212,175,55,0.18)' }}
                  whileTap={{ scale: 0.95 }}
                  style={{
                    position: 'absolute',
                    top: 'clamp(1rem, 3vw, 1.5rem)',
                    right: 'clamp(1rem, 3vw, 1.5rem)',
                    width: 'clamp(36px, 5vw, 44px)',
                    height: 'clamp(36px, 5vw, 44px)',
                    borderRadius: '50%',
                    background: 'rgba(212,175,55,0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    border: '1px solid rgba(212,175,55,0.2)',
                    transition: 'background 0.3s ease',
                  }}
                >
                  <X size={18} color="var(--color-dark-gold)" />
                </motion.button>

                {/* Letter paper lines */}
                {[...Array(18)].map((_, i) => (
                  <div key={i} className="letter-paper-line" style={{ top: `${60 + i * 2.8}rem` }} />
                ))}

                {/* Heart icon */}
                <motion.div
                  initial={{ scale: 0, rotate: -20 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.4, duration: 0.8, type: 'spring' }}
                  style={{
                    width: 'clamp(50px, 8vw, 70px)',
                    height: 'clamp(50px, 8vw, 70px)',
                    background: 'linear-gradient(135deg, var(--color-sunset), var(--color-rose))',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto clamp(1.5rem, 3vw, 2.5rem)',
                    boxShadow: '0 10px 30px rgba(232,141,150,0.5)',
                  }}
                >
                  <Heart size={28} color="white" fill="white" />
                </motion.div>

                {/* Letter content */}
                <div style={{ position: 'relative', zIndex: 1 }}>
                  <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                    style={{
                      fontFamily: 'var(--font-script)',
                      fontSize: 'clamp(2.5rem, 6vw, 3.5rem)',
                      color: 'var(--color-sunset)',
                      marginBottom: 'clamp(1rem, 3vw, 2rem)',
                      textAlign: 'center',
                    }}
                  >
                    Dear Mama,
                  </motion.h2>

                  {[
                    "There are no words grand enough for what I want to say to you today. But I will try — because you deserve every attempt.",
                    "You have been my safe place since before I had words for safety. You were there in the moments I was too small to remember, and in all the ones I will carry for the rest of my life. Your love has been the most consistent, most beautiful thing in my world.",
                    "I know I do not always say it. I know there are days I forget to show it. But Mom — you are everything. The way you love without keeping score, the way you sacrifice without making it feel like sacrifice, the way you show up even when you are tired — these are the things that shaped me into whoever I am becoming.",
                    "On your birthday, I want you to know that I see you. Not just as my mother, but as a whole, beautiful, extraordinary person who deserves to be celebrated. You deserve softness. You deserve rest. You deserve someone to take care of you the way you have always taken care of everyone else.",
                    "Thank you for choosing me every single day. Thank you for the late nights, the quiet reassurances, the meals made with love, and the hugs that made hard things easier. Thank you for being exactly who you are.",
                    "I love you more than I will ever be able to say. And I hope this little world I have made for you today — even if only for a moment — makes you feel as loved as you truly are.",
                  ].map((para, i) => (
                    <motion.p
                      key={i}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 + i * 0.1, duration: 0.8 }}
                      style={{
                        fontFamily: 'var(--font-serif)',
                        fontSize: 'clamp(1rem, 1.8vw, 1.25rem)',
                        lineHeight: 2,
                        color: 'var(--color-text-dark)',
                        marginBottom: '1.4rem',
                        opacity: 0.88,
                        letterSpacing: '0.2px',
                      }}
                    >
                      {para}
                    </motion.p>
                  ))}

                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.4, duration: 0.8 }}
                    style={{ marginTop: 'clamp(1.5rem, 3vw, 2.5rem)', textAlign: 'right' }}
                  >
                    <p style={{
                      fontFamily: 'var(--font-script)',
                      fontSize: 'clamp(1.5rem, 3.5vw, 2.2rem)',
                      color: 'var(--color-dark-gold)',
                    }}>
                      Always and forever yours,
                    </p>
                    <p style={{
                      fontFamily: 'var(--font-script)',
                      fontSize: 'clamp(1.8rem, 4vw, 2.6rem)',
                      color: 'var(--color-rose)',
                      marginTop: '0.25rem',
                    }}>
                      your daughter 🌸
                    </p>
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  );
}
