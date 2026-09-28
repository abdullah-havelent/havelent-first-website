'use client';
import { useEffect, useRef } from 'react';

const COLORS=['#fb923c','#f472b6','#facc15','#a78bfa','#38bdf8','#ffffff'];

export default function PartyConfettiCanvas(){
  const ref=useRef<HTMLCanvasElement>(null);
  useEffect(()=>{
    const canvas=ref.current;if(!canvas)return;
    const context=canvas.getContext('2d');if(!context)return;
    let frame=0,start=performance.now(),width=0,height=0,dpr=1;
    const resize=()=>{dpr=Math.min(window.devicePixelRatio||1,2);width=innerWidth;height=innerHeight;canvas.width=width*dpr;canvas.height=height*dpr;canvas.style.width=`${width}px`;canvas.style.height=`${height}px`;context.setTransform(dpr,0,0,dpr,0,0)};
    resize();window.addEventListener('resize',resize);
    const pieces=Array.from({length:500},(_,index)=>{const left=index%2===0;return{x:left?-20:width+20,y:height*(.62+Math.random()*.25),vx:(left?1:-1)*(4+Math.random()*12),vy:-(5+Math.random()*16),gravity:.12+Math.random()*.1,rotation:Math.random()*Math.PI,spin:(Math.random()-.5)*.35,w:3+Math.random()*6,h:7+Math.random()*10,color:COLORS[index%COLORS.length],delay:Math.random()*700}});
    const draw=(time:number)=>{const elapsed=time-start;context.clearRect(0,0,width,height);
      for(const piece of pieces){if(elapsed<piece.delay)continue;piece.x+=piece.vx;piece.y+=piece.vy;piece.vy+=piece.gravity;piece.rotation+=piece.spin;context.save();context.translate(piece.x,piece.y);context.rotate(piece.rotation);context.fillStyle=piece.color;context.globalAlpha=Math.max(0,1-Math.max(0,elapsed-2600)/1100);context.fillRect(-piece.w/2,-piece.h/2,piece.w,piece.h);context.restore()}
      if(elapsed<3900)frame=requestAnimationFrame(draw);
    };
    frame=requestAnimationFrame(draw);
    return()=>{cancelAnimationFrame(frame);window.removeEventListener('resize',resize)};
  },[]);
  return <canvas ref={ref} aria-hidden="true" className="pointer-events-none fixed inset-0 z-[180]"/>;
}
