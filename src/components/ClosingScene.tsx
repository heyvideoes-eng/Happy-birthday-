"use client";

import { motion } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';

const WISHES = [
  { text:"May every morning feel as warm as your smile", icon:"🌅", col:"#D4AF37" },
  { text:"May you always know how completely you are loved", icon:"💕", col:"#E88D96" },
  { text:"May your heart rest as deeply as it has given", icon:"🕊️", col:"#C8A8E9" },
  { text:"May every dream you hold find its way to you", icon:"✨", col:"#D4AF37" },
  { text:"May this birthday feel like the gentlest gift", icon:"🎀", col:"#FFB89E" },
  { text:"May you feel celebrated, cherished, and truly seen", icon:"🌟", col:"#E88D96" },
];

// Interactive birthday cake
function CinematicCake() {
  const [lit, setLit] = useState([true,true,true,true,true]);
  const [done, setDone] = useState(false);

  const blow = (i: number) => {
    if (!lit[i]) return;
    const next = [...lit]; next[i] = false; setLit(next);
    if (next.every(v => !v)) {
      setTimeout(() => setDone(true), 600);
      // confetti-style burst via CSS
    }
  };

  const colors = ['#D4AF37','#E88D96','#C8A8E9','#FFB89E','#D4AF37'];

  return (
    <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:'1.5rem' }}>
      <p className="hud-label" style={{ color:'var(--gold)', textAlign:'center' }}>
        {done ? 'Your wish is released into the universe' : 'Tap each candle — make your wish, Mama'}
      </p>

      <div style={{ position:'relative', width:'clamp(220px,40vw,320px)' }}>
        {/* Candles */}
        <div style={{ display:'flex', justifyContent:'center', gap:'clamp(10px,2.5vw,20px)', marginBottom:'-4px', position:'relative', zIndex:5 }}>
          {lit.map((isLit, i) => (
            <motion.div key={i} onClick={() => blow(i)}
              whileHover={isLit?{scale:1.1,y:-4}:{}}
              style={{ position:'relative', width:'clamp(8px,1.5vw,14px)', height:'clamp(45px,8vw,75px)',
                       background:`linear-gradient(to bottom,${colors[i]}88,${colors[i]})`,
                       borderRadius:'4px 4px 0 0', cursor:isLit?'pointer':'default',
                       boxShadow: isLit ? `0 0 16px ${colors[i]}66` : 'none',
                       transition:'box-shadow 0.5s ease' }}
            >
              {isLit && (
                <motion.div style={{ position:'absolute', top:'-22px', left:'50%', transform:'translateX(-50%)', fontSize:'1.1rem' }}
                  animate={{ scaleY:[1,1.2,0.9,1.1,1], rotate:[-3,3,-2,2,-3] }}
                  transition={{ duration:1.2, repeat:Infinity, repeatType:'mirror' }}>
                  🔥
                </motion.div>
              )}
              {!isLit && (
                <motion.div style={{ position:'absolute', top:'-8px', left:'-2px', right:'-2px', height:'8px',
                                     background:'rgba(180,170,160,0.4)', borderRadius:'50%', filter:'blur(4px)' }}
                  animate={{ opacity:[0,0.5,0], y:[0,-25,0] }}
                  transition={{ duration:2, ease:'easeOut' }} />
              )}
            </motion.div>
          ))}
        </div>

        {/* Cake tiers */}
        {/* Tier 2 */}
        <div style={{ width:'65%', margin:'0 auto', height:'clamp(40px,7vw,60px)',
                      background:'linear-gradient(to bottom,var(--color-blush),var(--color-champagne))',
                      borderRadius:'6px 6px 0 0', border:'1px solid rgba(212,175,55,0.3)',
                      borderBottom:'none', position:'relative', overflow:'hidden' }}>
          <div style={{ position:'absolute', top:0, left:0, right:0, height:'8px',
                        background:'linear-gradient(to bottom,rgba(232,141,150,0.5),transparent)' }} />
          {['20%','45%','70%'].map((l,i) => <span key={i} style={{ position:'absolute', bottom:'6px', left:l, fontSize:'10px', opacity:0.5 }}>✦</span>)}
        </div>
        {/* Tier 1 */}
        <div style={{ width:'82%', margin:'0 auto', height:'clamp(48px,8vw,70px)',
                      background:'linear-gradient(to bottom,#1E0D4A,#120838)',
                      border:'1px solid rgba(212,175,55,0.2)', borderBottom:'none',
                      position:'relative', overflow:'hidden', display:'flex', alignItems:'center', justifyContent:'center' }}>
          <div style={{ position:'absolute', top:0, left:0, right:0, height:'10px',
                        background:'linear-gradient(to bottom,rgba(212,175,55,0.35),transparent)' }} />
          <span style={{ fontFamily:'var(--font-script)', fontSize:'clamp(0.65rem,1.5vw,0.85rem)', color:'rgba(212,175,55,0.6)' }}>
            Happy Birthday ♡
          </span>
        </div>
        {/* Base */}
        <div style={{ width:'100%', height:'clamp(52px,9vw,80px)',
                      background:'linear-gradient(to bottom,#251260,#0D0924)',
                      borderRadius:'0 0 8px 8px', border:'1px solid rgba(212,175,55,0.2)',
                      position:'relative', overflow:'hidden' }}>
          <div style={{ position:'absolute', top:0, left:0, right:0, height:'12px',
                        background:'linear-gradient(to bottom,rgba(232,141,150,0.3),transparent)' }} />
        </div>
        {/* Plate */}
        <div style={{ width:'110%', marginLeft:'-5%', height:'12px', marginTop:'-2px',
                      background:'linear-gradient(to bottom,rgba(212,175,55,0.2),rgba(212,175,55,0.05))',
                      borderRadius:'50%', boxShadow:'0 6px 20px rgba(0,0,0,0.3)' }} />
      </div>

      {done && (
        <motion.div initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} transition={{duration:0.8}}
          className="hud-frame" style={{ padding:'1rem 2rem', textAlign:'center', borderColor:'rgba(212,175,55,0.4)' }}>
          <p style={{ fontFamily:'var(--font-script)', fontSize:'1.3rem', color:'var(--gold)' }}>
            May every wish come true 🌸
          </p>
        </motion.div>
      )}
    </div>
  );
}

export default function ClosingScene() {
  return (
    <section className="scene-section" id="closing" style={{ background:'linear-gradient(160deg,var(--color-cream) 0%,rgba(255,209,214,0.3) 50%,var(--color-champagne) 100%)' }}>
      {/* Star-like background dots */}
      <div style={{ position:'absolute', inset:0, overflow:'hidden', pointerEvents:'none' }}>
        {[...Array(40)].map((_,i) => (
          <motion.div key={i}
            animate={{ opacity:[0.15,0.5,0.15] }}
            transition={{ duration:2+Math.random()*3, delay:Math.random()*4, repeat:Infinity }}
            style={{ position:'absolute', width:3, height:3, borderRadius:'50%',
                     background: i%2===0 ? 'rgba(212,175,55,0.6)' : 'rgba(232,141,150,0.5)',
                     left:`${Math.random()*100}%`, top:`${Math.random()*100}%` }} />
        ))}
      </div>

      <div className="container" style={{ position:'relative', zIndex:1 }}>

        {/* Birthday wishes grid */}
        <motion.p className="cinematic-eyebrow" style={{justifyContent:'center', marginBottom:'1rem'}}
          initial={{opacity:0}} whileInView={{opacity:1}} viewport={{once:true}}>
          From Vanshika · birthday wishes
        </motion.p>
        <motion.h2 className="cinematic-title" style={{textAlign:'center', marginBottom:'3.5rem', fontSize:'clamp(2rem,5vw,3.5rem)'}}
          initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:0.8}}>
          For You, Mama —<br/>
          <span style={{fontStyle:'italic', color:'var(--rose)'}}>Every Wish I Have</span>
        </motion.h2>

        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(260px,1fr))', gap:'1rem', marginBottom:'5rem' }}>
          {WISHES.map((w, i) => (
            <motion.div key={i} className="hud-frame"
              initial={{opacity:0,y:30,scale:0.95}} whileInView={{opacity:1,y:0,scale:1}}
              viewport={{once:true}} transition={{duration:0.6,delay:i*0.1}}
              whileHover={{y:-6, borderColor:`${w.col}44`}}
              style={{ padding:'1.25rem 1.5rem', display:'flex', gap:'0.85rem', alignItems:'flex-start',
                       cursor:'default', transition:'all 0.4s ease' }}
            >
              <span style={{ fontSize:'1.4rem', flexShrink:0, marginTop:'2px' }}>{w.icon}</span>
              <p style={{ fontFamily:'var(--font-serif)', fontSize:'clamp(0.9rem,1.5vw,1rem)', color:'var(--cream-dim)', fontStyle:'italic', lineHeight:1.65 }}>
                {w.text}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Cake interaction */}
        <motion.div initial={{opacity:0,y:40}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:0.9}}
          style={{ marginBottom:'5rem' }}>
          <p className="cinematic-eyebrow" style={{justifyContent:'center', marginBottom:'2rem'}}>Interactive · make your wish</p>
          <CinematicCake />
        </motion.div>

        {/* Final emotional reveal */}
        <motion.div initial={{opacity:0,y:60}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:1.2}}
          style={{ textAlign:'center', maxWidth:'700px', margin:'0 auto' }}>

          <div style={{ width:'60px', height:'1px', background:'linear-gradient(90deg,transparent,var(--gold))', margin:'0 auto 3rem' }} />

          <p style={{ fontFamily:'var(--font-script)', fontSize:'clamp(1.5rem,4vw,2.5rem)', color:'var(--rose)', marginBottom:'1.5rem', opacity:0.9 }}>
            You are my home.
          </p>
          <p style={{ fontFamily:'var(--font-serif)', fontSize:'clamp(1rem,2vw,1.4rem)', color:'var(--cream-dim)', lineHeight:1.9, fontStyle:'italic', marginBottom:'2.5rem' }}>
            Long before I knew what love was, I felt it — in your presence, in your voice, in the way you looked at me like I was the most important thing you had ever seen.
            <br/><br/>
            That is still how you make me feel, Mama. On your birthday, I hope you feel the same. I hope this world — small and digital as it is — makes you feel the enormity of what you mean to me.
          </p>

          <p style={{ fontFamily:'var(--font-script)', fontSize:'clamp(1.8rem,5vw,3rem)', color:'var(--gold)',
                      textShadow:'0 0 40px rgba(212,175,55,0.4)', lineHeight:1.4 }}>
            Happy Birthday, Mama.
          </p>
          <p style={{ fontFamily:'var(--font-script)', fontSize:'clamp(1rem,2.5vw,1.5rem)', color:'var(--rose)', marginTop:'0.5rem', opacity:0.8 }}>
            — from Vanshika, with everything 🌸
          </p>

          <div style={{ width:'60px', height:'1px', background:'linear-gradient(90deg,var(--gold),transparent)', margin:'3rem auto 0' }} />
        </motion.div>
      </div>
    </section>
  );
}
