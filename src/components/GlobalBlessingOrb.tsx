"use client";

import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// ── Language data ─────────────────────────────────────────────────────────────
const BLESSINGS = [
  { lang:"English",    phrase:"Happy Birthday",                native:"Happy Birthday",             flag:"🇬🇧" },
  { lang:"Hindi",      phrase:"Janmadin Mubarak",              native:"जन्मदिन मुबारक",              flag:"🇮🇳" },
  { lang:"Urdu",       phrase:"Saalgirah Mubarak",             native:"سالگرہ مبارک",               flag:"🇵🇰" },
  { lang:"Bengali",    phrase:"Shubho Jonmodin",               native:"শুভ জন্মদিন",                flag:"🇧🇩" },
  { lang:"French",     phrase:"Joyeux Anniversaire",           native:"Joyeux Anniversaire",        flag:"🇫🇷" },
  { lang:"Spanish",    phrase:"Feliz Cumpleaños",              native:"Feliz Cumpleaños",           flag:"🇪🇸" },
  { lang:"Italian",    phrase:"Buon Compleanno",               native:"Buon Compleanno",            flag:"🇮🇹" },
  { lang:"Portuguese", phrase:"Feliz Aniversário",             native:"Feliz Aniversário",          flag:"🇧🇷" },
  { lang:"German",     phrase:"Alles Gute zum Geburtstag",     native:"Alles Gute zum Geburtstag", flag:"🇩🇪" },
  { lang:"Arabic",     phrase:"Eid Milad Saeid",               native:"عيد ميلاد سعيد",             flag:"🇸🇦" },
  { lang:"Japanese",   phrase:"Otanjōbi Omedetō",              native:"お誕生日おめでとう",          flag:"🇯🇵" },
  { lang:"Korean",     phrase:"Saeng-il Chukha Hamnida",       native:"생일 축하합니다",              flag:"🇰🇷" },
  { lang:"Mandarin",   phrase:"Shēngrì Kuàilè",                native:"生日快乐",                   flag:"🇨🇳" },
  { lang:"Russian",    phrase:"S Dnyom Rozhdeniya",            native:"С Днём Рождения",            flag:"🇷🇺" },
  { lang:"Turkish",    phrase:"Mutlu Yıllar",                  native:"Mutlu Yıllar",               flag:"🇹🇷" },
  { lang:"Swahili",    phrase:"Hongera siku yako ya kuzaliwa", native:"Hongera!",                   flag:"🌍" },
  { lang:"Greek",      phrase:"Chronia Polla",                 native:"Χρόνια Πολλά",               flag:"🇬🇷" },
  { lang:"Thai",       phrase:"Suk San Wan Koet",              native:"สุขสันต์วันเกิด",             flag:"🇹🇭" },
];

// Tiny sparkle particle burst (canvas-free, pure CSS divs)
function SparkBurst({ active }: { active: boolean }) {
  const sparks = [0,45,90,135,180,225,270,315];
  return (
    <AnimatePresence>
      {active && (
        <>
          {sparks.map((deg, i) => (
            <motion.div key={i}
              initial={{ x:0, y:0, opacity:1, scale:1 }}
              animate={{ x: Math.cos(deg*Math.PI/180)*28, y: Math.sin(deg*Math.PI/180)*28, opacity:0, scale:0 }}
              exit={{ opacity:0 }}
              transition={{ duration:0.55, ease:"easeOut", delay:i*0.018 }}
              style={{
                position:'absolute', top:'50%', left:'50%',
                width:5, height:5, borderRadius:'50%', pointerEvents:'none', zIndex:20,
                background: i%3===0 ? 'var(--gold)' : i%3===1 ? 'var(--rose)' : 'var(--color-peach)',
                marginTop:-2.5, marginLeft:-2.5,
              }}
            />
          ))}
        </>
      )}
    </AnimatePresence>
  );
}

// ── Main component ─────────────────────────────────────────────────────────────
export default function GlobalBlessingOrb() {
  const [current, setCurrent] = useState<typeof BLESSINGS[0] | null>(null);
  const [visible, setVisible]   = useState(false);
  const [burst, setBurst]       = useState(false);
  const [count, setCount]       = useState(0);          // forces re-trigger
  const lastIdx  = useRef(-1);
  const cooldown = useRef(false);
  const autoHide = useRef<ReturnType<typeof setTimeout>>();

  // Smart pick: avoid immediate repeat
  const pick = useCallback(() => {
    let idx: number;
    do { idx = Math.floor(Math.random() * BLESSINGS.length); }
    while (idx === lastIdx.current);
    lastIdx.current = idx;
    return BLESSINGS[idx];
  }, []);

  const show = useCallback((blessing: typeof BLESSINGS[0]) => {
    if (autoHide.current) clearTimeout(autoHide.current);
    setCurrent(blessing);
    setVisible(true);
    setBurst(true);
    setTimeout(() => setBurst(false), 600);
    autoHide.current = setTimeout(() => setVisible(false), 4200);
  }, []);

  // Click handler
  const handleClick = useCallback(() => {
    show(pick());
    setCount(c => c + 1);
  }, [show, pick]);

  // Scroll-milestone trigger (fires once per major section, 10s cooldown)
  useEffect(() => {
    const THRESHOLDS = [0.12, 0.30, 0.50, 0.68, 0.88]; // % of page height
    let triggered = new Set<number>();

    const onScroll = () => {
      if (cooldown.current) return;
      const scrolled = window.scrollY / (document.body.scrollHeight - window.innerHeight);
      for (const t of THRESHOLDS) {
        if (scrolled >= t && !triggered.has(t)) {
          triggered.add(t);
          cooldown.current = true;
          show(pick());
          setTimeout(() => { cooldown.current = false; }, 10000);
          break;
        }
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => { window.removeEventListener('scroll', onScroll); if (autoHide.current) clearTimeout(autoHide.current); };
  }, [show, pick]);

  return (
    <>
      {/* ── Floating orb button ── */}
      <motion.div
        initial={{ opacity:0, scale:0, y:20 }}
        animate={{ opacity:1, scale:1, y:0 }}
        transition={{ delay:1.5, duration:0.8, type:'spring', stiffness:60 }}
        style={{
          position:'fixed', bottom:'clamp(1.5rem,3vw,2rem)', left:'clamp(1.5rem,3vw,2rem)',
          zIndex:9990, userSelect:'none',
        }}
      >
        {/* Ambient pulse ring */}
        <motion.div
          animate={{ scale:[1,1.7,1], opacity:[0.5,0,0.5] }}
          transition={{ duration:3.5, repeat:Infinity, ease:'easeOut' }}
          style={{
            position:'absolute', inset:-6, borderRadius:'50%',
            border:'1.5px solid rgba(232,141,150,0.45)',
            pointerEvents:'none',
          }}
        />
        <motion.div
          animate={{ scale:[1,2.2,1], opacity:[0.3,0,0.3] }}
          transition={{ duration:3.5, delay:1, repeat:Infinity, ease:'easeOut' }}
          style={{
            position:'absolute', inset:-6, borderRadius:'50%',
            border:'1px solid rgba(212,175,55,0.3)',
            pointerEvents:'none',
          }}
        />

        {/* Orb button */}
        <motion.button
          onClick={handleClick}
          whileHover={{ scale:1.12 }}
          whileTap={{ scale:0.92 }}
          aria-label="Birthday blessings from around the world"
          style={{
            width:56, height:56, borderRadius:'50%',
            background:'linear-gradient(135deg,var(--color-sunset),var(--rose),var(--color-lavender))',
            border:'2px solid rgba(255,255,255,0.55)',
            display:'flex', alignItems:'center', justifyContent:'center',
            boxShadow:'0 8px 30px rgba(232,141,150,0.5), 0 2px 8px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.4)',
            cursor:'pointer', position:'relative', overflow:'hidden',
          }}
          transition={{ type:'spring', stiffness:400, damping:20 }}
        >
          {/* Shimmer sweep */}
          <motion.div
            animate={{ x:['-120%','120%'] }}
            transition={{ duration:2.5, repeat:Infinity, ease:'easeInOut', repeatDelay:1.5 }}
            style={{
              position:'absolute', top:0, bottom:0, width:'40%',
              background:'linear-gradient(90deg,transparent,rgba(255,255,255,0.35),transparent)',
              pointerEvents:'none',
            }}
          />
          {/* Icon — rotating world / birthday charm */}
          <motion.span
            animate={{ rotate:[0,10,-10,0] }}
            transition={{ duration:4, repeat:Infinity, ease:'easeInOut' }}
            style={{ fontSize:'1.5rem', lineHeight:1, position:'relative', zIndex:1 }}
          >
            🌸
          </motion.span>
        </motion.button>

        {/* Spark burst */}
        <div style={{ position:'absolute', top:'50%', left:'50%', pointerEvents:'none' }}>
          <SparkBurst active={burst} />
        </div>
      </motion.div>

      {/* ── Popup blessing card ── */}
      <AnimatePresence>
        {visible && current && (
          <motion.div
            key={count}
            initial={{ opacity:0, scale:0.82, y:16, filter:'blur(6px)' }}
            animate={{ opacity:1, scale:1,    y:0,  filter:'blur(0px)' }}
            exit={{   opacity:0, scale:0.9,   y:8,  filter:'blur(4px)' }}
            transition={{ duration:0.55, ease:[0.16,1,0.3,1] }}
            style={{
              position:'fixed',
              bottom:'calc(clamp(1.2rem,3vw,2rem) + 65px)',
              left:'clamp(1.2rem,3vw,2rem)',
              zIndex:9991,
              width:'calc(100% - 2.4rem)',
              maxWidth:'280px',
              perspective:800,
            }}
          >
            <motion.div
              animate={{ y:[0,-4,0] }}
              transition={{ duration:3.5, repeat:Infinity, ease:'easeInOut' }}
              style={{
                background:'rgba(253,251,247,0.92)',
                backdropFilter:'blur(24px)',
                WebkitBackdropFilter:'blur(24px)',
                border:'1px solid rgba(255,255,255,0.85)',
                borderRadius:16,
                padding:'1.25rem 1.5rem',
                boxShadow:'0 20px 60px rgba(232,141,150,0.25), 0 6px 20px rgba(0,0,0,0.08), 0 0 0 1px rgba(255,255,255,0.6)',
                position:'relative',
                overflow:'hidden',
              }}
            >
              {/* Gold top accent bar */}
              <div style={{
                position:'absolute', top:0, left:0, right:0, height:2,
                background:'linear-gradient(90deg,transparent,var(--gold),var(--rose),transparent)',
              }} />

              {/* Close dot */}
              <button
                onClick={() => setVisible(false)}
                aria-label="Close"
                style={{
                  position:'absolute', top:'0.6rem', right:'0.6rem',
                  width:20, height:20, borderRadius:'50%',
                  background:'rgba(212,175,55,0.12)',
                  border:'none', cursor:'pointer', display:'flex',
                  alignItems:'center', justifyContent:'center',
                  fontSize:'0.65rem', color:'var(--gold)',
                  lineHeight:1,
                }}
                onMouseOver={e => (e.currentTarget.style.background='rgba(212,175,55,0.25)')}
                onMouseOut={e  => (e.currentTarget.style.background='rgba(212,175,55,0.12)')}
              >
                ✕
              </button>

              {/* Flag + language label */}
              <div style={{ display:'flex', alignItems:'center', gap:'0.5rem', marginBottom:'0.6rem' }}>
                <span style={{ fontSize:'1rem' }}>{current.flag}</span>
                <span style={{
                  fontFamily:'var(--font-sans)', fontSize:'0.58rem',
                  letterSpacing:'2.5px', textTransform:'uppercase',
                  color:'var(--gold)', fontWeight:600, opacity:0.8,
                }}>
                  {current.lang}
                </span>
              </div>

              {/* Native script phrase */}
              <motion.p
                initial={{ opacity:0, y:8 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.1, duration:0.5 }}
                style={{
                  fontFamily:'var(--font-serif)', fontStyle:'italic',
                  fontSize:'clamp(1.1rem,2.5vw,1.35rem)',
                  color:'var(--text-dark)',
                  lineHeight:1.3, marginBottom:'0.35rem',
                  letterSpacing:'0.2px',
                }}
              >
                {current.native}
              </motion.p>

              {/* Romanised phrase */}
              {current.native !== current.phrase && (
                <motion.p
                  initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.2, duration:0.5 }}
                  style={{
                    fontFamily:'var(--font-sans)', fontSize:'0.72rem',
                    color:'var(--text-mid)', opacity:0.65,
                    letterSpacing:'0.5px', marginBottom:'0.6rem',
                  }}
                >
                  {current.phrase}
                </motion.p>
              )}

              {/* Subtitle */}
              <motion.p
                initial={{ opacity:0 }} animate={{ opacity:0.55 }} transition={{ delay:0.3, duration:0.5 }}
                style={{
                  fontFamily:'var(--font-script)', fontSize:'0.85rem',
                  color:'var(--rose)',
                }}
              >
                Love speaks every language 🌸
              </motion.p>

              {/* Progress bar auto-dismiss */}
              <motion.div
                initial={{ width:'100%' }} animate={{ width:'0%' }}
                transition={{ duration:4.2, ease:'linear' }}
                style={{
                  position:'absolute', bottom:0, left:0, height:2,
                  background:'linear-gradient(90deg,var(--rose),var(--gold))',
                  borderRadius:'0 0 16px 16px',
                }}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
