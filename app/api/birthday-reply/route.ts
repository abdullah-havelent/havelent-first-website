import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { z } from 'zod';
import { PRIVATE_ACCESS_COOKIE,validToken } from '@/lib/privateAccess';

const schema=z.object({name:z.string().trim().min(1).max(100),message:z.string().trim().min(1).max(5000)});
const escapeHtml=(text:string)=>text.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#039;');

export async function POST(request:Request){
  if(!validToken(cookies().get(PRIVATE_ACCESS_COOKIE)?.value))return NextResponse.json({message:'Private access required.'},{status:401});
  const parsed=schema.safeParse(await request.json().catch(()=>null));
  if(!parsed.success)return NextResponse.json({message:'Please enter your name and reply.'},{status:400});
  if(!process.env.RESEND_API_KEY)return NextResponse.json({message:'Reply service is temporarily unavailable.'},{status:503});
  const resend=new Resend(process.env.RESEND_API_KEY);
  const {name,message}=parsed.data;
  const result=await resend.emails.send({
    from:'Birthday Reply | Havelent <abdullah@havelent.com>',
    to:'abdullah@havelent.com',
    subject:`Birthday page reply from ${name}`,
    html:`<div style="font-family:Arial,sans-serif;line-height:1.7;color:#222;max-width:650px;margin:auto"><h2>Birthday Page Reply</h2><p><strong>From:</strong> ${escapeHtml(name)}</p><div style="white-space:pre-wrap;background:#fff4f8;border:1px solid #fbcfe8;padding:20px;border-radius:12px">${escapeHtml(message)}</div><p style="font-size:12px;color:#888;margin-top:20px">Sent securely from the private birthday page.</p></div>`,
  });
  if(result.error)return NextResponse.json({message:'Your reply could not be sent. Please try again.'},{status:502});
  return NextResponse.json({success:true});
}
