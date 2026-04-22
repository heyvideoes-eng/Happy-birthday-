"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const NODES = [
  {
    id: 0, angle: 0, label: "First Memory",
    title: "You were my first home",
    body: "Before I knew the world, I knew you. Your voice, your warmth, your arms — they were the first beautiful things I ever understood. Every safety I have ever felt started with you.",
    icon: "🌸", col: '#D4AF37',
  },
  {
    id: 1, angle: 72, label: "Sacrifices",
    title: "The things you never said",
    body: "You gave up so much in silence. I never heard you complain. I only saw you show up — again and again — with love that asked nothing in return. I see it now, Mama, and I am endlessly grateful.",
    icon: "🕊️", col: '#E88D96',
  },
  {
    id: 2, angle: 144, label: "Strength",
    title: "The strength you carried quietly",
    body: "You faced storms that would have broken most people. You stood through all of it with a grace I am still learning to understand. You are the most quietly powerful person I know.",
    icon: "✦", col: '#C8A8E9',
  },
  {
    id: 3, angle: 216, label: "Joy",
    title: "Your laughter is my favourite sound",
    body: "There is nothing in this world that feels as warm as hearing you laugh. It fills every room. It is the sound I think of when I think of home — real, full, joyful home.",
    icon: "💛", col: '#FFB89E',
  },
  {
    id: 4, angle: 288, label: "Wisdom",
    title: "Everything I know, I learned from you",
    body: "How to love. How to endure. How to forgive. How to be kind even when it is hard. You have been teaching me all of this, every single day, without a single lesson plan.",
    icon: "🌿", col: '#D4AF37',
  },
];

export default function OrbitalMemories() {
  const [active, setActive] = useState<number | null>(null);
  const activeNode = active !== null ? NODES[active] : null;

  // Orbit params
  const orbitRx = 220;
  const orbitRy = 80;

  return (
    <section className="scene-section" id="orbit" style={{ background: 'linear-gradient(160deg,var(--color-cream) 0%,rgba(255,209,214,0.25) 50%,var(--color-champagne) 100%)' }}>
      {/* Ambient rings */}
      {[340, 500, 680].map((s, i) => (
        <div key={i} className="orbit-ring desktop-only" style={{
          width: s, height: s * 0.37,
          top: '50%', left: '50%',
          transform: `translate(-50%,-50%) rotateX(75deg)`,
          borderColor: `rgba(212,175,55,${0.08 - i * 0.02})`,
          position:'absolute',
        }} />
      ))}

      <div className="container" style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'4rem', alignItems:'center' }}>

        {/* Left: Orbit visual */}
        <div className="desktop-only" style={{ position:'relative', height:'500px', display:'flex', alignItems:'center', justifyContent:'center' }}>
          {/* Orbit path */}
          <div style={{
            position:'absolute', width: orbitRx*2, height: orbitRy*2,
            borderRadius:'50%', border:'1px solid rgba(212,175,55,0.18)',
            top:'50%', left:'50%', transform:'translate(-50%,-50%)',
          }} />

          {/* Orbit nodes */}
          {NODES.map((node) => {
            const rad = (node.angle - 90) * Math.PI / 180;
            const x = Math.cos(rad) * orbitRx;
            const y = Math.sin(rad) * orbitRy;
            const isActive = active === node.id;
            return (
              <motion.button
                key={node.id}
                onClick={() => setActive(isActive ? null : node.id)}
                style={{
                  position:'absolute',
                  top:'50%', left:'50%',
                  transform:`translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
                  zIndex: isActive ? 20 : 10,
                }}
                animate={{ scale: isActive ? 1.25 : 1 }}
                whileHover={{ scale: 1.15 }}
                transition={{ duration: 0.3 }}
              >
                <div style={{
                  width:46, height:46, borderRadius:'50%',
                  border: `2px solid ${isActive ? node.col : 'rgba(212,175,55,0.3)'}`,
                  background: isActive ? `${node.col}22` : 'rgba(18,8,56,0.8)',
                  display:'flex', alignItems:'center', justifyContent:'center',
                  fontSize:'1.2rem',
                  boxShadow: isActive ? `0 0 20px ${node.col}55` : 'none',
                  transition:'all 0.4s ease',
                  backdropFilter:'blur(10px)',
                }}>
                  {node.icon}
                </div>
                {/* Pulse ring when active */}
                {isActive && (
                  <motion.div
                    style={{ position:'absolute', inset:-6, borderRadius:'50%', border:`1px solid ${node.col}66` }}
                    animate={{ scale:[1,1.8], opacity:[0.8,0] }}
                    transition={{ duration:1.4, repeat:Infinity }}
                  />
                )}
                {/* Label */}
                <div style={{
                  position:'absolute', top:'calc(100% + 8px)', left:'50%', transform:'translateX(-50%)',
                  whiteSpace:'nowrap', fontSize:'0.55rem', letterSpacing:'2px',
                  textTransform:'uppercase', color:'rgba(212,175,55,0.6)',
                  fontFamily:'var(--font-sans)', pointerEvents:'none',
                }}>
                  {node.label}
                </div>
              </motion.button>
            );
          })}

          {/* Center dot */}
          <div style={{
            width:12, height:12, borderRadius:'50%',
            background:'radial-gradient(circle,var(--gold),transparent)',
            border:'1px solid rgba(212,175,55,0.5)',
            boxShadow:'0 0 20px rgba(212,175,55,0.4)',
            zIndex:5, position:'relative',
          }} />
        </div>

        {/* Right: Content */}
        <div>
          <p className="cinematic-eyebrow">Vanshika's emotional orbit</p>
          <h2 className="cinematic-title" style={{ marginBottom:'1.5rem', fontSize:'clamp(2rem,5vw,4rem)' }}>
            Every memory<br/>
            <span style={{ fontStyle:'italic', background:'linear-gradient(135deg,var(--gold),var(--rose))', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>
              revolves around you
            </span>
          </h2>
          <p className="cinematic-subtitle" style={{ marginBottom:'2.5rem' }}>
            {active === null
              ? "Five fragments of my heart orbit the most important person in my universe. Tap a node to open each one."
              : ""}
          </p>

          {/* Mobile node list */}
          <div className="mobile-only" style={{ display:'flex', flexWrap:'wrap', gap:'0.75rem', marginBottom:'2rem' }}>
            {NODES.map(n => (
              <button key={n.id} onClick={() => setActive(active===n.id?null:n.id)}
                style={{
                  padding:'0.5rem 1rem', border:`1px solid ${active===n.id?n.col:'rgba(212,175,55,0.2)'}`,
                  borderRadius:'2px', background:`rgba(18,8,56,${active===n.id?0.9:0.4})`,
                  color: active===n.id?n.col:'var(--cream-dim)', fontSize:'0.7rem',
                  letterSpacing:'2px', textTransform:'uppercase', cursor:'pointer',
                  fontFamily:'var(--font-sans)',
                }}>
                {n.icon} {n.label}
              </button>
            ))}
          </div>

          {/* Panel */}
          <AnimatePresence mode="wait">
            {activeNode ? (
              <motion.div key={activeNode.id}
                initial={{ opacity:0, y:20, scale:0.97 }}
                animate={{ opacity:1, y:0, scale:1 }}
                exit={{ opacity:0, y:-10, scale:0.97 }}
                transition={{ duration:0.5, ease:[0.16,1,0.3,1] }}
                className="hud-frame"
                style={{ padding:'2rem 2.5rem', borderColor:`${activeNode.col}44` }}
              >
                <div style={{ display:'flex', gap:'1rem', alignItems:'flex-start', marginBottom:'1.25rem' }}>
                  <span style={{ fontSize:'2rem' }}>{activeNode.icon}</span>
                  <div>
                    <p className="hud-label" style={{ color:activeNode.col, marginBottom:'0.3rem' }}>{activeNode.label}</p>
                    <h3 style={{ fontFamily:'var(--font-serif)', fontSize:'clamp(1.3rem,2.5vw,1.8rem)', color:'var(--cream)', fontStyle:'italic' }}>
                      {activeNode.title}
                    </h3>
                  </div>
                </div>
                <p style={{ fontFamily:'var(--font-serif)', fontSize:'clamp(0.95rem,1.5vw,1.1rem)', color:'var(--cream-dim)', lineHeight:1.85, fontStyle:'italic' }}>
                  {activeNode.body}
                </p>
                <div style={{ marginTop:'1.5rem', height:'1px', background:`linear-gradient(90deg,transparent,${activeNode.col}44,transparent)` }} />
                <p style={{ marginTop:'1rem', fontFamily:'var(--font-script)', fontSize:'1.1rem', color:activeNode.col, opacity:0.7 }}>
                  — Vanshika 🌸
                </p>
              </motion.div>
            ) : (
              <motion.div key="placeholder"
                initial={{ opacity:0 }} animate={{ opacity:1 }}
                className="hud-frame"
                style={{ padding:'2rem 2.5rem', opacity:0.4 }}
              >
                <p className="hud-label" style={{ textAlign:'center' }}>Select a memory node to begin</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
