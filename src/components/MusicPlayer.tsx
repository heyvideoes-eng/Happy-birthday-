"use client";

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Music2, Pause, Play, Volume2 } from 'lucide-react';

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showLabel, setShowLabel] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // A sweet music-box version of Happy Birthday
    audioRef.current = new Audio('https://cdn.pixabay.com/download/audio/2021/11/24/audio_3320c24233.mp3?filename=happy-birthday-music-box-12154.mp3');
    audioRef.current.loop = true;
    audioRef.current.volume = 0.35;

    const startMusic = () => {
      if (audioRef.current && !isPlaying) {
        audioRef.current.play().then(() => {
          setIsPlaying(true);
        }).catch(() => {});
      }
    };

    // Global interaction listener to bypass browser restrictions
    window.addEventListener('click', startMusic, { once: true });
    window.addEventListener('touchstart', startMusic, { once: true });

    // Hide label after 6s
    const t = setTimeout(() => setShowLabel(false), 6000);

    return () => {
      clearTimeout(t);
      window.removeEventListener('click', startMusic);
      window.removeEventListener('touchstart', startMusic);
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [isPlaying]);

  const togglePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(() => {});
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 60 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 2.2, duration: 1, ease: [0.16, 1, 0.3, 1] }}
      style={{
        position: 'fixed',
        bottom: 'clamp(1.5rem, 3vw, 2rem)',
        right: 'clamp(1.5rem, 3vw, 2rem)',
        zIndex: 999,
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
      }}
    >
      {/* Floating label */}
      <AnimatePresence>
        {showLabel && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20, scale: 0.9 }}
            transition={{ duration: 0.5 }}
            style={{
              background: 'rgba(255,255,255,0.85)',
              backdropFilter: 'blur(12px)',
              border: '1px solid rgba(212,175,55,0.3)',
              borderRadius: '30px',
              padding: '0.5rem 1.1rem',
              boxShadow: '0 8px 24px rgba(0,0,0,0.08)',
            }}
          >
            <p style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '0.85rem',
              color: 'var(--color-text-mid)',
              fontStyle: 'italic',
              whiteSpace: 'nowrap',
            }}>
              Play the magic ✦
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Button */}
      <motion.button
        onClick={togglePlay}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        style={{
          width: 'clamp(50px, 7vw, 62px)',
          height: 'clamp(50px, 7vw, 62px)',
          borderRadius: '50%',
          background: isPlaying
            ? 'linear-gradient(135deg, var(--color-sunset), var(--color-rose))'
            : 'rgba(255,255,255,0.9)',
          border: '1.5px solid rgba(212,175,55,0.4)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: isPlaying
            ? '0 12px 30px rgba(232,141,150,0.5)'
            : '0 8px 24px rgba(0,0,0,0.1)',
          cursor: 'pointer',
          backdropFilter: 'blur(12px)',
          transition: 'background 0.4s ease, box-shadow 0.4s ease',
          position: 'relative',
        }}
      >
        {/* Pulse ring when playing */}
        {isPlaying && (
          <>
            <motion.div
              style={{
                position: 'absolute',
                inset: -3,
                borderRadius: '50%',
                border: '1.5px solid rgba(232,141,150,0.5)',
              }}
              animate={{ scale: [1, 1.6, 1], opacity: [0.7, 0, 0.7] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeOut' }}
            />
            <motion.div
              style={{
                position: 'absolute',
                inset: -3,
                borderRadius: '50%',
                border: '1.5px solid rgba(232,141,150,0.3)',
              }}
              animate={{ scale: [1, 1.9, 1], opacity: [0.5, 0, 0.5] }}
              transition={{ duration: 2, delay: 0.5, repeat: Infinity, ease: 'easeOut' }}
            />
          </>
        )}

        {/* Spinning vinyl when playing */}
        <motion.div
          animate={isPlaying ? { rotate: 360 } : { rotate: 0 }}
          transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
        >
          {isPlaying
            ? <Music2 size={22} color="white" />
            : <Play size={22} color="var(--color-dark-gold)" />
          }
        </motion.div>
      </motion.button>
    </motion.div>
  );
}
