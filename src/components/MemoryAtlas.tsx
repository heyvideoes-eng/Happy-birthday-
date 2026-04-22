"use client";

import { motion } from 'framer-motion';

const STATS = [
  { label:"Years of Unconditional Love",  value:"∞",   unit:"",   desc:"Love that never ran out, not even once.", col:"#D4AF37" },
  { label:"Sacrifices Made in Silence",   value:"1000",unit:"+",  desc:"Things given up so I could have more.", col:"#E88D96" },
  { label:"Late Nights She Stayed Awake", value:"365", unit:"×",  desc:"Per year, every year of my childhood.", col:"#C8A8E9" },
  { label:"Times She Believed in Me",     value:"∞",   unit:"",   desc:"Even when I didn't believe in myself.", col:"#FFB89E" },
  { label:"Meals Made With Love",         value:"10K", unit:"+",  desc:"Every plate a small act of devotion.", col:"#D4AF37" },
  { label:"Reasons I Am Grateful",        value:"∞",   unit:"",   desc:"I'll spend a lifetime counting them.", col:"#E88D96" },
];

const MILESTONES = [
  { year:"The Beginning", text:"She became a mother — and the world became warmer.", icon:"🌸" },
  { year:"The Shaping",   text:"She poured herself into raising something beautiful.", icon:"🌿" },
  { year:"The Growing",   text:"She watched, guided, and quietly let go.", icon:"✦" },
  { year:"Today",         text:"She is celebrated. She is loved. She is home.", icon:"💛" },
];

export default function MemoryAtlas() {
  return (
    <section className="scene-section" id="atlas" style={{ background:'linear-gradient(160deg,var(--color-champagne) 0%,rgba(255,184,158,0.15) 50%,var(--color-cream) 100%)' }}>
      <div className="container">

        {/* Header */}
        <motion.div initial={{opacity:0,y:30}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:0.9}}
          style={{ textAlign:'center', marginBottom:'5rem' }}>
          <p className="cinematic-eyebrow" style={{justifyContent:'center'}}>Emotional atlas · data of love</p>
          <h2 className="cinematic-title" style={{ marginBottom:'1rem', fontSize:'clamp(2rem,5vw,4rem)' }}>
            A Life Mapped in<br/>
            <span style={{fontStyle:'italic', color:'var(--gold)'}}>Love & Light</span>
          </h2>
          <p className="cinematic-subtitle" style={{margin:'0 auto', textAlign:'center'}}>
            If we could chart every act of love you have ever given, it would fill the universe several times over.
          </p>
        </motion.div>

        {/* Stat grid */}
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(220px,1fr))', gap:'1.2rem', marginBottom:'5rem' }}>
          {STATS.map((stat, i) => (
            <motion.div key={i} className="hud-frame"
              initial={{opacity:0,y:40,scale:0.95}} whileInView={{opacity:1,y:0,scale:1}}
              viewport={{once:true}} transition={{duration:0.6,delay:i*0.08}}
              whileHover={{borderColor:`${stat.col}55`, y:-5}}
              style={{ padding:'1.5rem 1.75rem', cursor:'default', transition:'all 0.4s ease' }}
            >
              <div style={{ display:'flex', alignItems:'baseline', gap:'0.2rem', marginBottom:'0.5rem' }}>
                <span style={{ fontFamily:'var(--font-serif)', fontSize:'clamp(2rem,4vw,3rem)', color:stat.col, lineHeight:1, fontWeight:300 }}>
                  {stat.value}
                </span>
                <span style={{ fontFamily:'var(--font-serif)', fontSize:'1.2rem', color:`${stat.col}99` }}>{stat.unit}</span>
              </div>
              <p className="hud-label" style={{ marginBottom:'0.5rem' }}>{stat.label}</p>
              <p style={{ fontFamily:'var(--font-serif)', fontSize:'0.85rem', color:'var(--cream-dim)', fontStyle:'italic', lineHeight:1.5 }}>
                {stat.desc}
              </p>
              <div style={{ marginTop:'1rem', height:'1px', background:`linear-gradient(90deg,${stat.col}33,transparent)` }} />
            </motion.div>
          ))}
        </div>

        {/* Timeline */}
        <motion.p className="cinematic-eyebrow" style={{justifyContent:'center', marginBottom:'3rem'}}
          initial={{opacity:0}} whileInView={{opacity:1}} viewport={{once:true}}>
          Timeline of a beautiful life
        </motion.p>

        <div style={{ position:'relative', maxWidth:'800px', margin:'0 auto' }}>
          {/* Vertical line */}
          <div style={{ position:'absolute', left:'50%', top:0, bottom:0, width:'1px',
                        background:'linear-gradient(to bottom,transparent,var(--gold-dim) 20%,var(--rose) 80%,transparent)',
                        transform:'translateX(-50%)' }} className="desktop-only" />

          {MILESTONES.map((m, i) => {
            const isLeft = i % 2 === 0;
            return (
              <motion.div key={i}
                initial={{opacity:0, x: isLeft ? -40 : 40}} whileInView={{opacity:1,x:0}}
                viewport={{once:true}} transition={{duration:0.8,delay:i*0.15}}
                style={{
                  display:'grid', gridTemplateColumns:'1fr 1fr',
                  gap:'3rem', marginBottom:'3rem', alignItems:'center',
                }}
              >
                <div style={{ textAlign: isLeft ? 'right' : 'left', order: isLeft ? 0 : 1 }} className="desktop-only">
                  <p className="hud-label" style={{ color:'var(--gold)', marginBottom:'0.4rem' }}>{m.year}</p>
                  <p style={{ fontFamily:'var(--font-serif)', fontSize:'clamp(1rem,1.8vw,1.2rem)', color:'var(--cream-dim)', fontStyle:'italic', lineHeight:1.7 }}>
                    {m.text}
                  </p>
                </div>

                {/* Center dot */}
                <div style={{ display:'flex', justifyContent: isLeft ? 'flex-start' : 'flex-end', order: isLeft ? 1 : 0, position:'relative' }} className="desktop-only">
                  <div style={{ width:44, height:44, borderRadius:'50%',
                    background:'radial-gradient(circle,rgba(212,175,55,0.2),rgba(5,2,18,0.9))',
                    border:'1px solid var(--gold-border)', display:'flex', alignItems:'center',
                    justifyContent:'center', fontSize:'1.3rem',
                    boxShadow:'0 0 20px rgba(212,175,55,0.2)' }}>
                    {m.icon}
                  </div>
                </div>

                {/* Mobile: full width */}
                <div className="mobile-only" style={{ gridColumn:'1/-1' }}>
                  <div style={{ display:'flex', gap:'1rem', alignItems:'flex-start' }}>
                    <div style={{ fontSize:'1.5rem', flexShrink:0 }}>{m.icon}</div>
                    <div>
                      <p className="hud-label" style={{ color:'var(--gold)', marginBottom:'0.3rem' }}>{m.year}</p>
                      <p style={{ fontFamily:'var(--font-serif)', fontSize:'1rem', color:'var(--cream-dim)', fontStyle:'italic', lineHeight:1.7 }}>
                        {m.text}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
