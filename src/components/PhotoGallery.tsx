"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const photos = [
  {
    url: "https://images.unsplash.com/photo-1511895426328-dc8714191300?q=80&w=2070&auto=format&fit=crop",
    caption: "The golden hours that shaped our earliest adventures together.",
    subcaption: "Where every sunset was a story you told just for me.",
    date: "The Early Days",
    rotate: -2,
  },
  {
    url: "https://images.unsplash.com/photo-1490578474895-699bc4e3f44f?q=80&w=2071&auto=format&fit=crop",
    caption: "Every celebration was magic because you made it so.",
    subcaption: "Your laughter was the soundtrack of every beautiful moment.",
    date: "The Joyful Years",
    rotate: 1.5,
  },
  {
    url: "https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2?q=80&w=1915&auto=format&fit=crop",
    caption: "Quiet moments of grace and endless, patient support.",
    subcaption: "You never asked for thanks. That made me even more grateful.",
    date: "The Quiet Times",
    rotate: -1,
  },
  {
    url: "https://images.unsplash.com/photo-1516081143896-189f36f32e2c?q=80&w=2070&auto=format&fit=crop",
    caption: "Looking forward to a thousand more sunsets by your side.",
    subcaption: "No matter where life takes me, home will always be you.",
    date: "Today & Always",
    rotate: 2,
  }
];

export default function PhotoGallery() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  const navigate = (dir: 1 | -1) => {
    setDirection(dir);
    setCurrentIndex((prev) => {
      if (dir === 1) return (prev + 1) % photos.length;
      return prev === 0 ? photos.length - 1 : prev - 1;
    });
  };

  const photo = photos[currentIndex];

  return (
    <section className="section container" style={{ position: 'relative', perspective: '1400px' }}>
      {/* Ambient glow */}
      <div style={{
        position: 'absolute',
        top: '15%',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '80%',
        height: '50%',
        background: 'radial-gradient(ellipse, rgba(255,184,158,0.12) 0%, transparent 70%)',
        filter: 'blur(60px)',
        pointerEvents: 'none',
        zIndex: 0,
      }} />

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        style={{ textAlign: 'center', marginBottom: 'clamp(2.5rem, 6vw, 5rem)', position: 'relative', zIndex: 1 }}
      >
        <p className="section-intro">our story, captured in light</p>
        <h2 className="section-title">The Memory Vault</h2>
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
          Flip through the chapters of our beautifully imperfect, perfectly loving life together.
        </p>
      </motion.div>

      {/* Gallery */}
      <div style={{
        position: 'relative',
        width: '100%',
        maxWidth: '860px',
        margin: '0 auto',
        zIndex: 1,
      }}>

        {/* Photo Stack Container */}
        <div style={{
          position: 'relative',
          width: '100%',
          paddingBottom: '70%',
        }}>
          {/* Stacked background frames */}
          <div style={{
            position: 'absolute',
            inset: 0,
            transform: `rotate(${(photo.rotate ?? 0) * -1.5}deg) scale(0.96) translateY(12px)`,
            background: 'white',
            borderRadius: '4px',
            boxShadow: '0 10px 40px rgba(0,0,0,0.08)',
            transition: 'transform 0.6s ease',
            border: '12px solid white',
            borderBottom: '40px solid white',
          }} />
          <div style={{
            position: 'absolute',
            inset: 0,
            transform: `rotate(${(photo.rotate ?? 0) * 0.8}deg) scale(0.98) translateY(6px)`,
            background: 'white',
            borderRadius: '4px',
            boxShadow: '0 12px 40px rgba(0,0,0,0.1)',
            transition: 'transform 0.6s ease',
            border: '12px solid white',
            borderBottom: '40px solid white',
          }} />

          {/* Main photo frame */}
          <AnimatePresence mode="popLayout" custom={direction}>
            <motion.div
              key={currentIndex}
              custom={direction}
              initial={{ opacity: 0, x: direction * 60, rotate: direction * 3, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, rotate: photo.rotate ?? 0, scale: 1 }}
              exit={{ opacity: 0, x: direction * -60, rotate: direction * -3, scale: 0.95 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              style={{
                position: 'absolute',
                inset: 0,
                background: 'white',
                borderRadius: '4px',
                border: '12px solid white',
                borderBottom: '50px solid white',
                boxShadow: '0 25px 60px rgba(0,0,0,0.16), 0 6px 20px rgba(0,0,0,0.08)',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
              }}
              whileHover={{ scale: 1.015, rotate: (photo.rotate ?? 0) * 0.5 }}
            >
              {/* Image */}
              <div style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
                <motion.img
                  src={photo.url}
                  alt={photo.caption}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                  whileHover={{ scale: 1.04 }}
                  transition={{ duration: 1, ease: 'easeOut' }}
                />
                {/* Subtle overlay */}
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to bottom, transparent 60%, rgba(0,0,0,0.08))',
                  pointerEvents: 'none',
                }} />
              </div>

              {/* Caption area */}
              <div style={{
                padding: 'clamp(0.6rem, 2vw, 1rem) clamp(0.5rem, 2vw, 1rem)',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.25rem',
                alignItems: 'center',
                background: 'white',
              }}>
                <p style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: 'clamp(0.85rem, 1.5vw, 1.1rem)',
                  color: 'var(--color-text-dark)',
                  fontStyle: 'italic',
                  margin: 0,
                  textAlign: 'center',
                  lineHeight: 1.4,
                }}>
                  {photo.caption}
                </p>
                <span style={{
                  fontFamily: 'var(--font-script)',
                  fontSize: 'clamp(0.75rem, 1.2vw, 0.9rem)',
                  color: 'var(--color-dark-gold)',
                  opacity: 0.8,
                }}>
                  {photo.date}
                </span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Subcaption */}
        <AnimatePresence mode="wait">
          <motion.p
            key={currentIndex}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5 }}
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(0.9rem, 1.8vw, 1.1rem)',
              color: 'var(--color-text-mid)',
              fontStyle: 'italic',
              textAlign: 'center',
              marginTop: 'clamp(1.5rem, 3vw, 2.5rem)',
              opacity: 0.7,
            }}
          >
            {photo.subcaption}
          </motion.p>
        </AnimatePresence>

        {/* Navigation */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '1.5rem',
          marginTop: 'clamp(1.5rem, 3vw, 2.5rem)',
        }}>
          <motion.button
            onClick={() => navigate(-1)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            style={{
              width: 'clamp(44px, 7vw, 56px)',
              height: 'clamp(44px, 7vw, 56px)',
              borderRadius: '50%',
              background: 'rgba(255,255,255,0.8)',
              border: '1.5px solid rgba(212, 175, 55, 0.4)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 8px 24px rgba(0,0,0,0.08)',
              cursor: 'pointer',
              backdropFilter: 'blur(10px)',
            }}
          >
            <ChevronLeft size={20} color="var(--color-dark-gold)" />
          </motion.button>

          {/* Dots */}
          <div style={{ display: 'flex', gap: '0.6rem' }}>
            {photos.map((_, i) => (
              <motion.button
                key={i}
                onClick={() => { setDirection(i > currentIndex ? 1 : -1); setCurrentIndex(i); }}
                animate={{
                  width: i === currentIndex ? 24 : 8,
                  background: i === currentIndex ? 'rgba(212,175,55,1)' : 'rgba(212,175,55,0.3)',
                }}
                transition={{ duration: 0.3 }}
                style={{
                  height: '8px',
                  borderRadius: '4px',
                  border: 'none',
                  cursor: 'pointer',
                }}
              />
            ))}
          </div>

          <motion.button
            onClick={() => navigate(1)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            style={{
              width: 'clamp(44px, 7vw, 56px)',
              height: 'clamp(44px, 7vw, 56px)',
              borderRadius: '50%',
              background: 'rgba(255,255,255,0.8)',
              border: '1.5px solid rgba(212, 175, 55, 0.4)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 8px 24px rgba(0,0,0,0.08)',
              cursor: 'pointer',
              backdropFilter: 'blur(10px)',
            }}
          >
            <ChevronRight size={20} color="var(--color-dark-gold)" />
          </motion.button>
        </div>
      </div>
    </section>
  );
}
