import { NextResponse } from 'next/server';
import { PRIVATE_ACCESS_COOKIE,PRIVATE_ENTRY_COOKIE,accessToken,configured,entryToken,passwordMatches } from '@/lib/privateAccess';
import { PRIVATE_VAULT_PATH } from '@/lib/privateVaultPath';
import { birthdayFeatureEnabled } from '@/lib/birthdayFeature';
export const runtime='nodejs';
export const dynamic='force-dynamic';

export async function GET(){
  return NextResponse.json({enabled:birthdayFeatureEnabled()},{headers:{'Cache-Control':'no-store, max-age=0'}});
}

export async function POST(request:Request){
  if(!birthdayFeatureEnabled())return NextResponse.json({message:'Not found.'},{status:404});
  if(!configured())return NextResponse.json({message:'Private access is not configured yet.'},{status:503});
  let password='';try{const body=await request.json();password=typeof body.password==='string'?body.password:''}catch{return NextResponse.json({message:'Invalid request.'},{status:400})}
  if(!passwordMatches(password))return NextResponse.json({message:'Incorrect password.'},{status:401});
  const response=NextResponse.json({ok:true,destination:PRIVATE_VAULT_PATH});
  const cookieOptions={httpOnly:true,secure:process.env.NODE_ENV==='production',sameSite:'strict' as const,path:'/'};
  response.cookies.set(PRIVATE_ACCESS_COOKIE,accessToken(),{...cookieOptions,maxAge:1800});
  response.cookies.set(PRIVATE_ENTRY_COOKIE,entryToken(),{...cookieOptions,maxAge:20});
  return response;
}

export async function DELETE(){
  const response=NextResponse.json({ok:true});
  response.cookies.set(PRIVATE_ENTRY_COOKIE,'',{httpOnly:true,secure:process.env.NODE_ENV==='production',sameSite:'strict',path:'/',maxAge:0});
  return response;
}
