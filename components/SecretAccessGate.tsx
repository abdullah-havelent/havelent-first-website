'use client';
import { FormEvent, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, LockKeyhole } from 'lucide-react';
const TRIGGER = '0106';
export default function SecretAccessGate() {
  const router = useRouter(), buffer = useRef(''), timer = useRef<number>();
  const [open,setOpen]=useState(false), [password,setPassword]=useState(''), [showPassword,setShowPassword]=useState(false), [error,setError]=useState(''), [busy,setBusy]=useState(false);
  const close=()=>{setOpen(false);setPassword('');setShowPassword(false);setError('')};
  const requestOpen=async()=>{
    try{
      const response=await fetch('/api/private-access',{method:'GET',cache:'no-store'});
      const data=await response.json();
      if(!response.ok||!data.enabled)return;
      setPassword('');setShowPassword(false);setError('');setOpen(true);
    }catch{}
  };
  useEffect(()=>{
    const url=new URL(window.location.href);
    if(url.searchParams.get('private-access')!=='required')return;
    url.searchParams.delete('private-access');
    window.history.replaceState({},'',`${url.pathname}${url.search}${url.hash}`);
    void requestOpen();
  },[]);
  useEffect(()=>{ const onKey=(e:KeyboardEvent)=>{ const el=e.target as HTMLElement|null;
    if(open||el?.isContentEditable||['INPUT','TEXTAREA','SELECT'].includes(el?.tagName||'')) return;
    if(!/^\d$/.test(e.key)){
      buffer.current='';
      if(timer.current){clearTimeout(timer.current);timer.current=undefined}
      return;
    }
    if(buffer.current===''){
      if(timer.current) clearTimeout(timer.current);
      timer.current=window.setTimeout(()=>{
        buffer.current='';
        timer.current=undefined;
      },3000);
    }
    buffer.current=(buffer.current+e.key).slice(-4);
    if(buffer.current===TRIGGER){
      e.preventDefault();
      e.stopPropagation();
      buffer.current='';
      if(timer.current){clearTimeout(timer.current);timer.current=undefined}
      window.setTimeout(()=>void requestOpen(),0);
    }
  }; window.addEventListener('keydown',onKey); return()=>{window.removeEventListener('keydown',onKey);if(timer.current)clearTimeout(timer.current)}},[open]);
  async function submit(e:FormEvent){e.preventDefault();if(!password||busy)return;setBusy(true);setError('');
    try{const r=await fetch('/api/private-access',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({password})});const d=await r.json();if(!r.ok){setError(d.message||'Access denied.');return}close();router.push(d.destination);router.refresh()}catch{setError('Unable to verify access right now.')}finally{setBusy(false)}}
  if(!open)return null;
  return <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/80 px-4 backdrop-blur-md" role="dialog" aria-modal="true" onMouseDown={e=>e.target===e.currentTarget&&close()}>
    <form onSubmit={submit} autoComplete="off" className="relative w-full max-w-md rounded-3xl border border-white/10 bg-[#111] p-7 text-white shadow-2xl">
      <button type="button" onClick={close} className="absolute right-5 top-4 text-2xl text-white/50 hover:text-white" aria-label="Close">×</button>
      <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl border border-orange-400/20 bg-gradient-to-br from-orange-500/20 to-orange-500/5 text-orange-400 shadow-[0_0_24px_rgba(249,115,22,0.12)]">
        <LockKeyhole size={23} strokeWidth={1.8}/>
      </div>
      <h2 className="text-2xl font-semibold">Private access</h2><p className="mt-2 text-sm text-white/55">Enter the password to access the private vault.</p>
      <div className="relative mt-6">
        <input autoFocus name="vault-access-code" autoComplete="one-time-code" data-lpignore="true" data-1p-ignore="true" data-bwignore="true" spellCheck={false} type={showPassword?'text':'password'} value={password} onChange={e=>setPassword(e.target.value)} placeholder="Password" className="w-full rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-3.5 pr-12 outline-none focus:border-orange-500/70"/>
        <button type="button" onClick={()=>setShowPassword(value=>!value)} className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-1.5 text-white/50 hover:text-white" aria-label={showPassword?'Hide password':'Show password'}>{showPassword?<EyeOff size={19}/>:<Eye size={19}/>}</button>
      </div>
      {error&&<p className="mt-3 text-sm text-red-400">{error}</p>}
      <button disabled={!password||busy} className="mt-5 w-full rounded-2xl bg-gradient-to-r from-brand-accent to-brand-orange px-5 py-3.5 font-semibold disabled:opacity-40">{busy?'Checking…':'Continue'}</button>
    </form></div>;
}
