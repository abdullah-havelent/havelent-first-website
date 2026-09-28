'use client';

import { CakeSlice, CalendarDays, Home, MessageCircleHeart, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function BirthdayNavbar() {
  const router = useRouter();
  const [active,setActive]=useState('birthday-top');
  const [progress,setProgress]=useState(0);
  const scrollTo = (id: string) => {
    setActive(id);
    if (id === 'birthday-top') window.scrollTo({ top: 0, behavior: 'smooth' });
    else document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(()=>{
    const sections=['birthday-top','birthday-cake','birthday-message'];
    const observer=new IntersectionObserver(entries=>{
      const visible=entries.filter(entry=>entry.isIntersecting).sort((a,b)=>b.intersectionRatio-a.intersectionRatio)[0];
      if(visible)setActive(visible.target.id);
    },{threshold:[.25,.45,.65]});
    sections.forEach(id=>{const element=document.getElementById(id);if(element)observer.observe(element)});
    const update=()=>{const max=document.documentElement.scrollHeight-innerHeight;setProgress(max>0?Math.min(1,scrollY/max):0)};
    update();window.addEventListener('scroll',update,{passive:true});
    return()=>{observer.disconnect();window.removeEventListener('scroll',update)};
  },[]);

  const links=[
    {id:'birthday-top',label:'Celebration',icon:Sparkles},
    {id:'birthday-cake',label:'Cake',icon:CakeSlice},
    {id:'birthday-message',label:'Message',icon:MessageCircleHeart},
  ];

  return (
    <motion.header
      initial={{ y: -70, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 top-3 z-[200] flex justify-center px-3 sm:top-4 sm:px-4"
    >
      <nav className="relative flex w-full max-w-4xl items-center justify-between gap-1 overflow-hidden rounded-2xl border border-white/15 bg-[#100e14]/85 px-2.5 py-2 shadow-[0_18px_60px_rgba(0,0,0,.5),0_0_32px_rgba(236,72,153,.045)] backdrop-blur-xl sm:rounded-[1.35rem] sm:px-3">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_50%,rgba(249,115,22,.08),transparent_25%),radial-gradient(circle_at_75%_50%,rgba(236,72,153,.07),transparent_32%)]"/>
        <motion.div className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-orange-400 via-pink-500 to-violet-500 shadow-[0_0_8px_rgba(236,72,153,.6)]" animate={{width:`${progress*100}%`}}/>
        <button onClick={()=>scrollTo('birthday-top')} className="group flex min-w-0 items-center gap-2 rounded-xl px-1.5 py-1 text-left sm:gap-3 sm:px-2">
          <motion.span animate={{rotate:[-4,4,-4]}} transition={{duration:3.5,repeat:Infinity}} className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-orange-300/25 bg-gradient-to-br from-orange-400/20 to-pink-500/10 text-orange-300 shadow-[0_0_18px_rgba(249,115,22,.1)] sm:h-10 sm:w-10">
            <CakeSlice size={20} strokeWidth={1.8}/><Sparkles size={9} className="absolute -right-1 -top-1 text-yellow-200"/>
          </motion.span>
          <span className="hidden sm:block">
            <span className="block text-[10px] font-semibold uppercase tracking-[.2em] text-orange-300/75">A special</span>
            <span className="block text-sm font-semibold text-white">Birthday</span>
          </span>
        </button>

        <div className="relative z-10 flex items-center gap-0.5 rounded-2xl border border-white/[.06] bg-black/15 p-1">
          {links.map(({id,label,icon:Icon})=><button key={id} onClick={()=>scrollTo(id)} aria-label={label} className={`relative flex h-9 items-center justify-center gap-1.5 rounded-xl px-2.5 text-xs font-medium transition sm:px-3.5 sm:text-sm ${active===id?'text-white':'text-white/50 hover:text-white/80'}`}>
            {active===id&&<motion.span layoutId="birthday-nav-active" className="absolute inset-0 rounded-xl border border-pink-300/15 bg-gradient-to-r from-orange-400/15 via-pink-400/15 to-violet-400/15 shadow-[0_0_16px_rgba(236,72,153,.08)]"/>}
            <Icon size={15} className={`relative ${active===id?'text-pink-200':'text-white/45'}`}/><span className="relative hidden sm:inline">{label}</span>
          </button>)}
        </div>

        <div className="flex items-center gap-2">
          <div className="relative z-10 hidden items-center gap-2 rounded-xl border border-pink-200/10 bg-gradient-to-r from-orange-400/[.06] to-pink-400/[.06] px-3 py-2 text-xs font-semibold tracking-[.1em] text-white/65 md:flex">
            <CalendarDays size={14} className="text-pink-300"/> 27 SEP 1996
          </div>
          <button onClick={()=>router.push('/')} aria-label="Back to home" className="relative z-10 flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 text-white/55 transition hover:border-pink-300/30 hover:bg-pink-400/10 hover:text-pink-200 sm:h-10 sm:w-10">
            <Home size={17}/>
          </button>
        </div>
      </nav>
    </motion.header>
  );
}
