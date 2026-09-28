import { NextResponse } from 'next/server';

export const dynamic='force-dynamic';

export async function GET(){
  try{
    const response=await fetch('https://timeapi.io/api/Time/current/zone?timeZone=Asia%2FKarachi',{cache:'no-store',signal:AbortSignal.timeout(7000)});
    if(!response.ok)throw new Error('Time service unavailable');
    const data=await response.json() as {year?:number;month?:number;day?:number;hour?:number;minute?:number;seconds?:number;milliSeconds?:number};
    if([data.year,data.month,data.day,data.hour,data.minute,data.seconds].some(value=>typeof value!=='number'))throw new Error('Invalid time response');
    const nowMs=Date.UTC(data.year!,data.month!-1,data.day!,data.hour!-5,data.minute!,data.seconds!,data.milliSeconds||0);
    return NextResponse.json({nowMs,source:'TimeAPI Asia/Karachi'},{headers:{'Cache-Control':'no-store, max-age=0'}});
  }catch{
    return NextResponse.json({message:'Pakistan time sync unavailable'},{status:503,headers:{'Cache-Control':'no-store, max-age=0'}});
  }
}
