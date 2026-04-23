"use client";

import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// ── Language data ─────────────────────────────────────────────────────────────
const BLESSINGS = [
  { lang:"English",    phrase:"Happy Birthday",                native:"Happy Birthday",             flag:"🇬🇧" },
  { lang:"Hindi",      phrase:"Janmadin Mubarak",              native:"जन्मदिन मुबारक",              flag:"🇮🇳" },
  { lang:"Urdu",       phrase:"Saalgirah Mubarak",             native:"سالگرہ मुबारक",               flag:"🇵🇰" },
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
  const [count, setCount]       = useState(0);
  const lastIdx  = useRef(-1);
  const cooldown = useRef(false);
  const autoHide = useRef<ReturnType<typeof setTimeout>>(undefined);

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
    
    // Haptic feedback for premium feel
    if (typeof navigator !== 'undefined' && navigator.vibrate) {
      navigator.vibrate(10);
    }
    
    setTimeout(() => setBurst(false), 600);
    autoHide.current = setTimeout(() => setVisible(false), 4200);
  }, []);

  const handleClick = useCallback(() => {
    show(pick());
    setCount(c => c + 1);
  }, [show, pick]);

  useEffect(() => {
    const THRESHOLDS = [0.12, 0.30, 0.50, 0.68, 0.88];
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
        initial={{ opacity:0, scale:0, y:30 }}
        animate={{ opacity:1, scale:1, y:0 }}
        transition={{ delay:1.2, type:'spring', stiffness:120, damping:20 }}
        style={{
          position:'fixed', bottom:'clamp(1.5rem,3vw,2rem)', left:'clamp(1.5rem,3vw,2rem)',
          zIndex:9990, userSelect:'none',
        }}
      >
        {/* Organic Breath Ambient pulse ring */}
        <motion.div
          animate={{ scale:[1,1.4,1], opacity:[0.4,0,0.4] }}
          transition={{ duration:3, repeat:Infinity, ease:'easeInOut' }}
          style={{
            position:'absolute', inset:-8, borderRadius:'50%',
            border:'2px solid rgba(232,141,150,0.3)',
            pointerEvents:'none',
          }}
        />
        <div className="hidden md:block">
          <motion.div
            animate={{ scale:[1,2,1], opacity:[0.2,0,0.2] }}
            transition={{ duration:3, delay:0.5, repeat:Infinity, ease:'easeInOut' }}
            style={{
              position:'absolute', inset:-8, borderRadius:'50%',
              border:'1.5px solid rgba(212,175,55,0.2)',
              pointerEvents:'none',
            }}
          />
        </div>

        {/* Orb button */}
        <motion.button
          onClick={handleClick}
          whileHover={{ scale:1.1, rotate:5 }}
          whileTap={{ scale:0.95, rotate:-5 }}
          aria-label="Birthday blessings from around the world"
          style={{
            width:60, height:60, borderRadius:'50%',
            background:'linear-gradient(135deg,var(--color-sunset),var(--rose),var(--color-lavender))',
            border:'2px solid rgba(255,255,255,0.8)',
            display:'flex', alignItems:'center', justifyContent:'center',
            boxShadow:'0 12px 35px rgba(232,141,150,0.45), 0 4px 10px rgba(0,0,0,0.1), inset 0 2px 2px rgba(255,255,255,0.5)',
            cursor:'pointer', position:'relative', overflow:'hidden',
            willChange: 'transform'
          }}
          transition={{ type:'spring', stiffness:500, damping:25 }}
        >
          {/* Shimmer sweep */}
          <motion.div
            animate={{ x:['-150%','150%'] }}
            transition={{ duration:3, repeat:Infinity, ease:'easeInOut', repeatDelay:2 }}
            style={{
              position:'absolute', top:0, bottom:0, width:'50%',
              background:'linear-gradient(90deg,transparent,rgba(255,255,255,0.4),transparent)',
              pointerEvents:'none',
            }}
          />
          <motion.span
            animate={{ rotate:[0,15,-15,0] }}
            transition={{ duration:5, repeat:Infinity, ease:'easeInOut' }}
            style={{ fontSize:'1.75rem', lineHeight:1, position:'relative', zIndex:1 }}
          >
            🌸
          </motion.span>
        </motion.button>

        <div style={{ position:'absolute', top:'50%', left:'50%', pointerEvents:'none' }}>
          <SparkBurst active={burst} />
        </div>
      </motion.div>

      {/* ── Popup blessing card ── */}
      <AnimatePresence mode="wait">
        {visible && current && (
          <motion.div
            key={count}
            initial={{ opacity:0, scale:0.7, y:40, rotate:-4 }}
            animate={{ opacity:1, scale:1,    y:0,  rotate:0 }}
            exit={{   opacity:0, scale:0.8,   y:20, rotate:2 }}
            transition={{ type:'spring', stiffness:180, damping:20 }}
            style={{
              position:'fixed',
              bottom:'calc(clamp(1.2rem,3vw,2rem) + 75px)',
              left:'clamp(1.2rem,3vw,2rem)',
              zIndex:9991,
              width:'calc(100% - 2.4rem)',
              maxWidth:'300px',
              perspective:1000,
              willChange: 'transform, opacity'
            }}
          >
            <motion.div
              animate={{ y:[0,-6,0] }}
              transition={{ duration:4, repeat:Infinity, ease:'easeInOut' }}
              style={{
                background:'rgba(255,255,255,0.95)',
                backdropFilter:'blur(20px)',
                WebkitBackdropFilter:'blur(20px)',
                border:'1px solid rgba(255,255,255,1)',
                borderRadius:20,
                padding:'1.5rem 1.75rem',
                boxShadow:'0 25px 60px rgba(232,141,150,0.25), 0 10px 25px rgba(0,0,0,0.05)',
                position:'relative',
                overflow:'hidden',
              }}
            >
              <div style={{
                position:'absolute', top:0, left:0, right:0, height:3,
                background:'linear-gradient(90deg,var(--color-peach),var(--gold),var(--rose),var(--color-lavender))',
              }} />

              <button
                onClick={() => setVisible(false)}
                aria-label="Close"
                style={{
                  position:'absolute', top:'0.75rem', right:'0.75rem',
                  width:24, height:24, borderRadius:'50%',
                  background:'rgba(212,175,55,0.1)',
                  border:'none', cursor:'pointer', display:'flex',
                  alignItems:'center', justifyContent:'center',
                  fontSize:'0.75rem', color:'var(--gold)',
                  lineHeight:1, transition: '0.2s'
                }}
                onMouseOver={e => (e.currentTarget.style.background='rgba(212,175,55,0.2)')}
                onMouseOut={e  => (e.currentTarget.style.background='rgba(212,175,55,0.1)')}
              >
                ✕
              </button>

              <div style={{ display:'flex', alignItems:'center', gap:'0.6rem', marginBottom:'0.8rem' }}>
                <span style={{ fontSize:'1.2rem' }}>{current.flag}</span>
                <span style={{
                  fontFamily:'var(--font-sans)', fontSize:'0.65rem',
                  letterSpacing:'3px', textTransform:'uppercase',
                  color:'var(--gold)', fontWeight:700, opacity:0.9,
                }}>
                  {current.lang}
                </span>
              </div>

              <motion.p
                initial={{ opacity:0, x:-10 }} animate={{ opacity:1, x:0 }} transition={{ delay:0.1 }}
                style={{
                  fontFamily:'var(--font-serif)', fontStyle:'italic',
                  fontSize:'clamp(1.2rem,2.8vw,1.5rem)',
                  color:'var(--text-dark)',
                  lineHeight:1.2, marginBottom:'0.5rem',
                  letterSpacing:'-0.2px', fontWeight:500
                }}
              >
                {current.native}
              </motion.p>

              {current.native !== current.phrase && (
                <motion.p
                  initial={{ opacity:0 }} animate={{ opacity:0.6 }} transition={{ delay:0.2 }}
                  style={{
                    fontFamily:'var(--font-sans)', fontSize:'0.8rem',
                    color:'var(--text-mid)',
                    letterSpacing:'0.4px', marginBottom:'0.75rem',
                  }}
                >
                  {current.phrase}
                </motion.p>
              )}

              <motion.p
                initial={{ opacity:0 }} animate={{ opacity:0.7 }} transition={{ delay:0.3 }}
                style={{
                  fontFamily:'var(--font-script)', fontSize:'1rem',
                  color:'var(--rose)',
                }}
              >
                Love speaks every language 🌸
              </motion.p>

              <motion.div
                initial={{ width:'100%' }} animate={{ width:'0%' }}
                transition={{ duration:4.2, ease:'linear' }}
                style={{
                  position:'absolute', bottom:0, left:0, height:3,
                  background:'linear-gradient(90deg,var(--rose),var(--gold))',
                }}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
