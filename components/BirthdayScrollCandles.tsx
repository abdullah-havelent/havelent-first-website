'use client';
import { useEffect, useState } from 'react';

function GradientSlider({progress,thumbPercent=25}:{progress:number;thumbPercent?:number}){
  const travel=100-thumbPercent;
  return <div className="absolute inset-0 rounded-full border border-white/[.06] bg-white/[.035] shadow-inner">
    <div className="absolute left-0.5 right-0.5 rounded-full bg-gradient-to-b from-pink-400 via-fuchsia-500 to-violet-500 shadow-[0_0_12px_rgba(217,70,239,.55)]" style={{height:`${thumbPercent}%`,top:`${Math.max(0,Math.min(1,progress))*travel}%`}}/>
  </div>;
}

export default function BirthdayScrollCandles(){
  const [page,setPage]=useState(0);
  useEffect(()=>{
    document.documentElement.classList.add('birthday-custom-gradient-scrollbars');
    const updatePage=()=>{const max=document.documentElement.scrollHeight-innerHeight;setPage(max>0?scrollY/max:0)};
    updatePage();window.addEventListener('scroll',updatePage,{passive:true});window.addEventListener('resize',updatePage);
    return()=>{document.documentElement.classList.remove('birthday-custom-gradient-scrollbars');window.removeEventListener('scroll',updatePage);window.removeEventListener('resize',updatePage)};
  },[]);
  return <>
    <div aria-hidden="true" className="pointer-events-none fixed bottom-3 right-1.5 top-3 z-[190] hidden w-2 md:block"><GradientSlider progress={page} thumbPercent={24}/></div>
  </>;
}
