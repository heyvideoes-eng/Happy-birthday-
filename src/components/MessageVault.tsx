"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const TARGET = new Date('2026-04-23T00:00:00').getTime();

const MESSAGES = [
  {
    id: 0, from:"TRANSMISSION 001", subject:"The Love That Made Me",
    body:[
      "Mama, there is a kind of love that does not announce itself. It simply shows up — in the meals you cooked before I woke, in the way you stayed up when I was sick, in the quiet pride you carried for me even when I could not carry it myself.",
      "That is your love. Constant. Generous. Silent. Beautiful.",
      "I do not think I have ever had the right words for it. But today, on your birthday, I want you to know: I see it. I have always seen it. And it is the most sacred thing in my life.",
    ],
    col:'#D4AF37',
  },
  {
    id: 1, from:"TRANSMISSION 002", subject:"Thank You",
    body:[
      "Thank you for every time you put me first. For every dream of yours you quietly set aside to make space for mine. For the patience you gave me when I did not deserve it.",
      "Thank you for never making me feel like a burden. For making home feel like the safest place on earth. For teaching me, without ever intending to, that love is an action, not just a word.",
      "I carry your sacrifices with me like a lantern, Mama. They light every room I walk into.",
    ],
    col:'#E88D96',
  },
  {
    id: 2, from:"TRANSMISSION 003", subject:"From Vanshika, With Everything",
    body:[
      "There is so much I want to give you on your birthday — more than this small screen can hold. I want to give you rest, joy, and the feeling of being completely, unconditionally adored.",
      "I want you to feel today the way you have made me feel every single day of my life: seen, loved, and absolutely enough.",
      "This little world — these words, these moments, this small digital universe — it is all yours. Made only for you. From your daughter, with every piece of love she has.",
    ],
    col:'#C8A8E9',
  },
];

function CountdownUnit({ label, value, col }: { label:string; value:number; col:string }) {
  return (
    <div className="hud-frame" style={{ padding:'1rem 1.2rem', textAlign:'center', minWidth:80 }}>
      <div style={{ fontFamily:'var(--font-serif)', fontSize:'clamp(1.8rem,4vw,2.8rem)', color:col, lineHeight:1, fontWeight:300 }}>
        {value.toString().padStart(2,'0')}
      </div>
      <div className="hud-label" style={{ marginTop:'0.4rem', fontSize:'0.55rem' }}>{label}</div>
    </div>
  );
}

export default function MessageVault() {
  const [open, setOpen] = useState<number|null>(null);
  const [time, setTime] = useState({ d:0, h:0, m:0, s:0 });
  const [isBday, setIsBday] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const tick = () => {
      const dist = TARGET - Date.now();
      if (dist <= 0) { setIsBday(true); return; }
      setTime({
        d: Math.floor(dist / 86400000),
        h: Math.floor(dist / 3600000) % 24,
        m: Math.floor(dist / 60000) % 60,
        s: Math.floor(dist / 1000) % 60,
      });
    };
    tick();
    const iv = setInterval(tick, 1000);
    return () => clearInterval(iv);
  }, []);

  return (
    <section className="scene-section" id="messages" style={{ background:'linear-gradient(140deg,var(--color-cream) 0%,rgba(216,180,226,0.2) 60%,var(--color-champagne) 100%)' }}>
      <div className="container">

        {/* Countdown / Birthday state */}
        {mounted && (
          <motion.div initial={{opacity:0,y:30}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:0.9}}
            style={{ marginBottom:'5rem', textAlign:'center' }}
          >
            <p className="cinematic-eyebrow" style={{ justifyContent:'center' }}>Mission Clock</p>
            {isBday ? (
              <motion.div initial={{scale:0.7,opacity:0}} animate={{scale:1,opacity:1}} transition={{duration:1.5,type:'spring'}}>
                <h2 style={{ fontFamily:'var(--font-script)', fontSize:'clamp(2.5rem,7vw,5rem)', color:'var(--gold)', textShadow:'0 0 40px rgba(212,175,55,0.5)' }}>
                  Today is Your Day, Mama ✦
                </h2>
              </motion.div>
            ) : (
              <div>
                <h2 className="cinematic-title" style={{ fontSize:'clamp(1.5rem,4vw,2.5rem)', marginBottom:'2rem', opacity:0.7 }}>
                  Until Your Birthday
                </h2>
                <div style={{ display:'flex', gap:'1rem', justifyContent:'center', flexWrap:'wrap' }}>
                  <CountdownUnit label="Days"    value={time.d} col="var(--gold)" />
                  <CountdownUnit label="Hours"   value={time.h} col="var(--rose)" />
                  <CountdownUnit label="Minutes" value={time.m} col="var(--lavender)" />
                  <CountdownUnit label="Seconds" value={time.s} col="var(--peach)" />
                </div>
              </div>
            )}
          </motion.div>
        )}

        {/* Transmissions */}
        <motion.p className="cinematic-eyebrow" style={{justifyContent:'center', marginBottom:'1rem'}}
          initial={{opacity:0}} whileInView={{opacity:1}} viewport={{once:true}}>
          Encrypted emotional transmissions
        </motion.p>
        <motion.h2 className="cinematic-title" style={{textAlign:'center', marginBottom:'3.5rem', fontSize:'clamp(2rem,5vw,3.5rem)'}}
          initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:0.8}}>
          Letters From<br/>
          <span style={{fontStyle:'italic',color:'var(--rose)'}}>Vanshika's Heart</span>
        </motion.h2>

        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(280px,1fr))', gap:'1.5rem' }}>
          {MESSAGES.map((msg, i) => (
            <motion.div key={msg.id}
              initial={{opacity:0,y:40}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:0.7,delay:i*0.12}}>

              {/* Vault tile */}
              <motion.div
                className="memory-card"
                onClick={() => setOpen(open===msg.id?null:msg.id)}
                whileHover={{borderColor:`${msg.col}55`}}
                style={{ cursor:'pointer', borderColor: open===msg.id ? `${msg.col}44`:'var(--hud-border)' }}
              >
                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:'1.5rem' }}>
                  <div>
                    <p className="hud-label" style={{ color:msg.col, marginBottom:'0.3rem' }}>{msg.from}</p>
                    <h3 style={{ fontFamily:'var(--font-serif)', fontSize:'clamp(1.1rem,2vw,1.4rem)', color:'var(--cream)', fontStyle:'italic' }}>
                      {msg.subject}
                    </h3>
                  </div>
                  <motion.div
                    animate={{ rotate: open===msg.id ? 45 : 0 }}
                    style={{ width:30, height:30, border:`1px solid ${msg.col}55`, borderRadius:'50%',
                             display:'flex', alignItems:'center', justifyContent:'center',
                             color:msg.col, fontSize:'1.2rem', flexShrink:0, marginLeft:'1rem' }}
                  >
                    ✦
                  </motion.div>
                </div>

                <p style={{ fontFamily:'var(--font-serif)', fontSize:'0.95rem', color:'var(--cream-dim)', fontStyle:'italic', lineHeight:1.7 }}>
                  {open===msg.id ? '...' : `"${msg.body[0].slice(0,80)}..."`}
                </p>

                <div style={{ marginTop:'1.25rem', height:'1px', background:`linear-gradient(90deg,transparent,${msg.col}33,transparent)` }} />
                <p style={{ marginTop:'0.75rem', fontSize:'0.6rem', letterSpacing:'2px', color:`${msg.col}88`, textTransform:'uppercase', fontFamily:'var(--font-sans)' }}>
                  {open===msg.id ? '▲ close transmission' : '▼ open transmission'}
                </p>
              </motion.div>

              {/* Expanded letter */}
              <AnimatePresence>
                {open===msg.id && (
                  <motion.div
                    initial={{height:0,opacity:0}} animate={{height:'auto',opacity:1}} exit={{height:0,opacity:0}}
                    transition={{duration:0.6,ease:[0.16,1,0.3,1]}}
                    style={{ overflow:'hidden' }}
                  >
                    <div className="hud-frame" style={{ margin:'0.5rem 0 0', padding:'2rem 2.5rem', borderColor:`${msg.col}33`, background:'rgba(5,2,18,0.6)' }}>
                      {msg.body.map((p, pi) => (
                        <motion.p key={pi}
                          initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} transition={{delay:pi*0.12,duration:0.5}}
                          style={{ fontFamily:'var(--font-serif)', fontSize:'clamp(0.95rem,1.5vw,1.1rem)', color:'var(--cream-dim)', lineHeight:1.9, fontStyle:'italic', marginBottom: pi<msg.body.length-1?'1.2rem':0 }}>
                          {p}
                        </motion.p>
                      ))}
                      <div style={{ marginTop:'2rem', display:'flex', justifyContent:'flex-end' }}>
                        <p style={{ fontFamily:'var(--font-script)', fontSize:'1.5rem', color:msg.col }}>Vanshika 🌸</p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
