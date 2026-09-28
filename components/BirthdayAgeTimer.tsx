'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Clock3, Sparkles } from 'lucide-react';

type Age = { years:number; months:number; days:number; hours:number; minutes:number; seconds:number };
const BIRTH_YEAR=1996, BIRTH_MONTH=8, BIRTH_DAY=27;

function ageInPakistan(now=Date.now()):Age {
  const parts=new Intl.DateTimeFormat('en-GB',{timeZone:'Asia/Karachi',year:'numeric',month:'numeric',day:'numeric',hour:'numeric',minute:'numeric',second:'numeric',hourCycle:'h23'}).formatToParts(new Date(now));
  const value=(type:Intl.DateTimeFormatPartTypes)=>Number(parts.find(part=>part.type===type)?.value||0);
  const pakistanNow=new Date(Date.UTC(value('year'),value('month')-1,value('day'),value('hour'),value('minute'),value('second')));
  const nowMs=pakistanNow.getTime();
  let years=pakistanNow.getUTCFullYear()-BIRTH_YEAR;
  let anchor=Date.UTC(BIRTH_YEAR+years,BIRTH_MONTH,BIRTH_DAY);
  if(anchor>nowMs){years--;anchor=Date.UTC(BIRTH_YEAR+years,BIRTH_MONTH,BIRTH_DAY)}
  let months=0;
  while(months<11){
    const next=Date.UTC(BIRTH_YEAR+years,BIRTH_MONTH+months+1,BIRTH_DAY);
    if(next>nowMs)break;
    months++;anchor=next;
  }
  let remaining=nowMs-anchor;
  const days=Math.floor(remaining/86400000);remaining%=86400000;
  const hours=Math.floor(remaining/3600000);remaining%=3600000;
  const minutes=Math.floor(remaining/60000);
  const seconds=Math.floor((remaining%60000)/1000);
  return {years,months,days,hours,minutes,seconds};
}

export default function BirthdayAgeTimer(){
  const [age,setAge]=useState<Age|null>(null);
  const [clockOffset,setClockOffset]=useState(0);
  const [timeReady,setTimeReady]=useState(false);
  useEffect(()=>{
    let active=true;
    const sync=async()=>{try{const response=await fetch(`/api/pakistan-time?t=${Date.now()}`,{cache:'no-store'});if(!response.ok)return;const data=await response.json() as {nowMs?:number};if(active&&typeof data.nowMs==='number'){setClockOffset(data.nowMs-Date.now());setTimeReady(true)}}catch{}};
    sync();const resync=window.setInterval(sync,300000);
    return()=>{active=false;window.clearInterval(resync)};
  },[]);
  useEffect(()=>{if(!timeReady)return;setAge(ageInPakistan(Date.now()+clockOffset));const timer=window.setInterval(()=>setAge(ageInPakistan(Date.now()+clockOffset)),1000);return()=>window.clearInterval(timer)},[clockOffset,timeReady]);
  const units:[keyof Age,string][]=[['years','Years'],['months','Months'],['days','Days'],['hours','Hours'],['minutes','Minutes'],['seconds','Seconds']];
  if(!age)return null;
  return (
    <motion.div initial={{opacity:0,y:30,scale:.96}} animate={{opacity:1,y:0,scale:1}} transition={{delay:.4,duration:.7,ease:[.22,1,.36,1]}} className="relative mt-5 w-full max-w-3xl overflow-hidden rounded-3xl border border-white/10 bg-white/[.045] p-4 shadow-[0_20px_60px_rgba(0,0,0,.35)] backdrop-blur-md sm:p-6">
      <div className="absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-orange-300/60 to-transparent"/>
      <div className="mb-4 flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-[.18em] text-orange-300 sm:text-sm"><Clock3 size={16}/> Your beautiful journey <Sparkles size={15}/></div>
      <div className="grid grid-cols-3 gap-2 sm:grid-cols-6 sm:gap-3">
        {units.map(([key,label])=>(
          <div key={key} className="rounded-2xl border border-white/[.07] bg-black/20 px-2 py-3 sm:py-4">
            <motion.div key={age[key]} initial={{opacity:.45,y:-4}} animate={{opacity:1,y:0}} className="text-xl font-bold tabular-nums text-white sm:text-2xl md:text-3xl">{String(age[key]).padStart(2,'0')}</motion.div>
            <div className="mt-1 text-[9px] font-semibold uppercase tracking-[.12em] text-white/40 sm:text-[10px]">{label}</div>
          </div>
        ))}
      </div>
      <p className="mt-4 text-sm text-white/60 sm:text-base">You are <span className="font-medium text-white/85">{age.years} years, {age.months} months, {age.days} days, {age.hours} hours, {age.minutes} minutes and {age.seconds} seconds</span> old now.</p>
    </motion.div>
  );
}
