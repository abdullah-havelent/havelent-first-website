import { Fragment } from 'react';

const EMOJIS:Record<string,string>={
  '❤️‍🩹':'2764-fe0f-200d-1fa79',
  '🫶🏻':'1faf6-1f3fb',
  '❤️':'2764',
  '🎂':'1f382',
  '🥳':'1f973',
  '✨':'2728',
  '🥹':'1f979',
  '😂':'1f602',
  '🥺':'1f97a',
  '🤣':'1f923',
};
const pattern=/(❤️‍🩹|🫶🏻|❤️|🎂|🥳|✨|🥹|😂|🥺|🤣)/gu;

export default function EmojiText({text}:{text:string}){
  return <>{text.split(pattern).filter(Boolean).map((part,index)=>{
    const file=EMOJIS[part];
    return file?<img key={index} src={`/twemoji/${file}.svg`} alt={part} draggable={false} className="mx-[.08em] inline-block h-[1.12em] w-[1.12em] align-[-.16em]"/>:<Fragment key={index}>{part}</Fragment>;
  })}</>;
}
