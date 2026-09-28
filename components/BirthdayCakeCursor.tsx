'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function BirthdayCakeCursor() {
  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(false);
  const [pressed, setPressed] = useState(false);
  const [overButton, setOverButton] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const smoothX = useSpring(x, { damping: 30, stiffness: 650, mass: 0.18 });
  const smoothY = useSpring(y, { damping: 30, stiffness: 650, mass: 0.18 });
  const clickTimer = useRef<number>();

  useEffect(() => {
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    if (!finePointer) return;
    setEnabled(true);
    document.body.classList.add('birthday-cake-cursor');
    const move = (event: MouseEvent) => {
      x.set(event.clientX);
      y.set(event.clientY);
      setVisible(true);
      const target=event.target as HTMLElement|null;
      setOverButton(Boolean(target?.closest('button,a,[role="button"],input,textarea')));
    };
    const leave = () => setVisible(false);
    const enter = () => setVisible(true);
    const down = () => { setPressed(true); if(clickTimer.current) clearTimeout(clickTimer.current); };
    const up = () => { clickTimer.current=window.setTimeout(()=>setPressed(false),120); };
    window.addEventListener('mousemove',move); document.documentElement.addEventListener('mouseleave',leave);
    document.documentElement.addEventListener('mouseenter',enter); window.addEventListener('mousedown',down); window.addEventListener('mouseup',up);
    return()=>{document.body.classList.remove('birthday-cake-cursor');window.removeEventListener('mousemove',move);document.documentElement.removeEventListener('mouseleave',leave);document.documentElement.removeEventListener('mouseenter',enter);window.removeEventListener('mousedown',down);window.removeEventListener('mouseup',up);if(clickTimer.current)clearTimeout(clickTimer.current)};
  },[x,y]);

  if(!enabled) return null;
  return <>
    <motion.div aria-hidden="true" className="pointer-events-none fixed left-0 top-0 z-[999999]" style={{x:smoothX,y:smoothY,opacity:visible?1:0}}>
      <motion.div animate={{scale:pressed ? .82 : overButton ? 1.08 : 1,rotate:pressed ? -5 : 0}} transition={{type:'spring',stiffness:500,damping:22}} className="relative -translate-x-1/2 translate-y-4">
        <motion.span animate={{opacity:[.35,1,.35],scale:[.75,1.15,.75],rotate:[0,90,180]}} transition={{duration:1.7,repeat:Infinity}} className="absolute -right-4 -top-3 text-[11px] text-yellow-200">✦</motion.span>
        <motion.span animate={{opacity:[.8,.25,.8],y:[0,5,0]}} transition={{duration:1.4,repeat:Infinity}} className="absolute -left-3 top-5 h-1.5 w-1.5 rounded-full bg-pink-300 shadow-[0_0_7px_#f9a8d4]"/>
        <div className="relative left-1/2 h-7 w-2 -translate-x-1/2 rounded-sm bg-[repeating-linear-gradient(45deg,#fff_0_3px,#fb923c_3px_6px)] shadow-sm">
          <motion.div animate={{scale:overButton?[1.12,1.3,1.02,1.12]:[1,1.18,.9,1],x:[0,1,-1,0]}} transition={{duration:.5,repeat:Infinity}} className="absolute -top-4 left-1/2 h-4 w-2.5 -translate-x-1/2 rounded-[55%_55%_45%_45%] bg-gradient-to-t from-orange-500 via-yellow-300 to-white shadow-[0_0_10px_4px_rgba(251,146,60,.55)]"/>
        </div>
        <div className="relative h-7 w-11 rounded-[8px_8px_4px_4px] border border-orange-100/40 bg-gradient-to-b from-orange-100 via-orange-200 to-orange-400 shadow-[0_5px_14px_rgba(249,115,22,.28)]">
          <div className="absolute inset-x-0 top-0 h-2 rounded-t-[7px] bg-white/70"/>
          <span className="absolute bottom-1 left-2 h-1 w-1 rounded-full bg-pink-500"/><span className="absolute bottom-2 left-5 h-1 w-1.5 rotate-12 rounded-full bg-sky-400"/><span className="absolute bottom-1 right-2 h-1 w-1 rounded-full bg-purple-500"/>
        </div>
      </motion.div>
    </motion.div>
    <style jsx global>{`
      body.birthday-cake-cursor,
      body.birthday-cake-cursor * { cursor: none !important; }
    `}</style>
  </>;
}
