"use client";

import { motion, useReducedMotion } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';

const ELEMENTS = [
  { emoji: '🎈', label: 'balloon' },
  { emoji: '🎁', label: 'gift' },
  { emoji: '🎂', label: 'cake' },
  { emoji: '👑', label: 'crown' },
  { emoji: '🪄', label: 'wand' },
  { emoji: '✨', label: 'sparkle' },
  { emoji: '🌟', label: 'star' },
  { emoji: '💕', label: 'heart' },
  { emoji: '🎵', label: 'music' },
  { emoji: '☁️', label: 'cloud' },
  { emoji: '🎀', label: 'ribbon' },
  { emoji: '🎊', label: 'popper' },
  { emoji: '🧁', label: 'cupcake' },
  { emoji: '🍭', label: 'lollipop' },
  { emoji: '🌸', label: 'flower' },
  { emoji: '💎', label: 'diamond' },
  { emoji: '🌻', label: 'sunflower' },
  { emoji: '🦋', label: 'butterfly' },
  { emoji: '🌈', label: 'rainbow' },
  { emoji: '🧸', label: 'bear' },
  { emoji: '🕯️', label: 'candle' },
  { emoji: '🍬', label: 'candy' }
];

interface FloatingItem {
  id: number;
  emoji: string;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  rotation: number;
}

export default function InteractiveDecorations() {
  const shouldReduceMotion = useReducedMotion();
  const [items, setItems] = useState<FloatingItem[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const newItems: FloatingItem[] = Array.from({ length: 22 }).map((_, i) => ({
      id: i,
      emoji: ELEMENTS[i % ELEMENTS.length].emoji,
      x: Math.random() * 90 + 5, // 5% to 95%
      y: Math.random() * 90 + 5,
      size: Math.random() * (40 - 20) + 20,
      duration: Math.random() * (15 - 8) + 8,
      delay: Math.random() * 5,
      rotation: Math.random() * 360
    }));
    setItems(newItems);
  }, []);

  const handlePopperClick = (e: React.MouseEvent | React.TouchEvent) => {
    const x = 'clientX' in e ? e.clientX / window.innerWidth : e.touches[0].clientX / window.innerWidth;
    const y = 'clientY' in e ? e.clientY / window.innerHeight : e.touches[0].clientY / window.innerHeight;

    confetti({
      particleCount: 100,
      spread: 70,
      origin: { x, y },
      colors: ['#FF8E72', '#D8B4E2', '#D4AF37', '#FFD1D6', '#FFB89E'],
      shapes: ['circle', 'square'],
      scalar: 1.2
    });
  };

  if (shouldReduceMotion) return null;

  return (
    <div 
      ref={containerRef}
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 100,
        overflow: 'hidden'
      }}
    >
      {items.map((item) => (
        <motion.div
          key={item.id}
          drag
          dragConstraints={containerRef}
          whileDrag={{ scale: 1.2, zIndex: 110 }}
          onDragStart={() => {
            // Optional: add visual feedback when grabbed
          }}
          style={{
            position: 'absolute',
            left: `${item.x}%`,
            top: `${item.y}%`,
            fontSize: `${item.size}px`,
            pointerEvents: 'auto',
            cursor: 'grab',
            userSelect: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '60px',
            height: '60px',
            touchAction: 'none'
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0.4, 0.8, 0.4],
            scale: [1, 1.1, 1],
            rotate: [item.rotation, item.rotation + 20, item.rotation - 20, item.rotation],
            y: [0, -40, 0, 40, 0],
            x: [0, 30, 0, -30, 0]
          }}
          transition={{
            opacity: { duration: item.duration, repeat: Infinity, ease: "easeInOut" },
            scale: { duration: item.duration * 0.8, repeat: Infinity, ease: "easeInOut" },
            rotate: { duration: item.duration * 1.2, repeat: Infinity, ease: "easeInOut" },
            y: { duration: item.duration, repeat: Infinity, ease: "easeInOut" },
            x: { duration: item.duration * 1.5, repeat: Infinity, ease: "easeInOut" },
            delay: item.delay
          }}
          whileHover={{ scale: 1.3, rotate: 15 }}
          whileTap={{ scale: 0.8, rotate: -15 }}
          onClick={(e) => {
            if (item.emoji === '🎊') {
              handlePopperClick(e);
            }
          }}
        >
          <span style={{ filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.15))' }}>
            {item.emoji}
          </span>
        </motion.div>
      ))}

      {/* Static popper hint */}
      <motion.div
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 3, duration: 1 }}
        style={{
          position: 'fixed',
          bottom: '100px',
          right: '20px',
          pointerEvents: 'auto',
          zIndex: 1000
        }}
      >
        <motion.button
          onClick={handlePopperClick}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="liquid-glass"
          style={{
            padding: '12px 20px',
            borderRadius: '25px',
            border: '1.5px solid var(--rose)',
            color: 'var(--rose)',
            background: 'rgba(255,255,255,0.8)',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: '0.9rem',
            fontWeight: 500,
            cursor: 'pointer',
            boxShadow: '0 8px 32px rgba(232,141,150,0.2)'
          }}
        >
          <span>Tap for Magic!</span>
          <span style={{ fontSize: '1.2rem' }}>🎊</span>
        </motion.button>
      </motion.div>
    </div>
  );
}
