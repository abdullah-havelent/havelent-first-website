'use client';
import { useEffect } from 'react';

export default function VaultEntryConsumer(){
  useEffect(()=>{
    const timer=window.setTimeout(()=>{
      void fetch('/api/private-access',{method:'DELETE',cache:'no-store'});
    },1200);
    return()=>window.clearTimeout(timer);
  },[]);
  return null;
}
