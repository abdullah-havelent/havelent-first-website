'use client';

import { FormEvent, useEffect, useRef, useState } from 'react';
import { MotionConfig, motion } from 'framer-motion';
import { ArrowUp, CakeSlice, CalendarDays, Heart, Loader2, MessageCircleHeart, PartyPopper, Quote, Reply, RotateCcw, Send, Sparkles, Star } from 'lucide-react';
import PartyConfettiCanvas from './PartyConfettiCanvas';
import BirthdayAgeTimer from './BirthdayAgeTimer';
import EmojiText from './EmojiText';
import BirthdayScrollCandles from './BirthdayScrollCandles';

const CONFETTI = Array.from({ length: 28 }, (_, index) => ({
  left: (index * 37) % 100,
  delay: (index % 9) * 0.18,
  duration: 3.8 + (index % 5) * 0.55,
  color: ['#fb923c', '#f472b6', '#facc15', '#a78bfa', '#67e8f9'][index % 5],
}));

const BALLOONS = [
  { left: '7%', color: '#fb7185', delay: 0.1, size: 72 },
  { left: '20%', color: '#fb923c', delay: 0.7, size: 56 },
  { left: '76%', color: '#a78bfa', delay: 0.35, size: 64 },
  { left: '89%', color: '#38bdf8', delay: 1, size: 52 },
];

const BIRTHDAY_MESSAGE = [
  'Happy Birthday! ❤️🎂🥳',
  'I hope this year brings you the kind of happiness you don’t even have to ask for. May you always have reasons to smile, people who genuinely care about you. 🫶🏻',
  'Stay happy, stay blessed, and never lose that beautiful part of you. ❤️✨',
  'Thank you for supporting me in my bad times, mere saath loyal rehne ke liye, even jab main aapka kuch lagta bhi nahi tha. Phir bhi aapne mujhe apno jaisa treat kiya. 🥹❤️',
  'Mujhe feel hota hai, shayad main galat bhi hoon, lekin mujhe feel hota hai ke main kisi ke liye, ya meri mental health, kisi ke liye important hai.',
  'Main logon se umeed chhor chuka tha. Jis tarah aap mujhe feel karwati hain, waise mujhe kisi ne feel nahi karwaya. ❤️‍🩹',
  'Main aapko kuch kehna toh chahta hoon, lekin woh bohat hi ajeeb ho jayega 😂',
  'But I just love your company. ❤️',
  'Aur jo jo bhi mujhse galtiyan hui hain, chahe jaan kar ya galti se, sab ke liye sorry. 🥺',
  '(Aapke kaan pakar ke 😂)',
  'Baakiyon ka nahi pata, lekin meri life mein kuch khushiyan lane ke liye shukriya. 🥹❤️',
  'Main kabhi itna emotional nahi hua. Thank you so much, (Motoo) Mam. ❤️🫶🏻',
  "You don't even know ke main andar se kis had tak mar chuka hua tha. 🥺",
  'Main khush hoon ke aap mere saath kaam karti hain. ❤️',
  'Mein nhi janta ka ya sub apko kesa lagy ga ya shayd ap muja cheap bhi samjy lkin mein bhut sari baty hmasha dill ma hi rkehi han kabhi kisi ko batyi nhi.',
  'Mery pas koi asa banda nhi ha jis ma is tere ka special treatment do.',
  'Ya sochty hi mery zehin ma agr koi ata ha wo ik 30 saal ki aunty han 🤣🤣🤣',
  '(Ya likhty mery sa haasi nhi rok rehi 😂)',
  'Mein aj tak bas apny ik dost ko bola ha pehli dafa kisi dusry inssan ko bol reha ho.',
  '(Ap meri jaan bhi mangy gi toh hatli pa rekh k do ga) 😂❤️',
  'Aur honestly, aapko pata bhi nahi hai ke aapki ek normal si baat mera mood kitna change kar deti hai.',
  'Isliye please apni importance itni bhi mat barhaiye… already bohat zyada hai. 😂❤️',
  'Waise ek baat bataun?',
  'Aapke saath baat karte hue mujhe kabhi kabhi samajh nahi aata ke main kaam ke ilawa aur baaty kyun karta hoon.',
  'Waise insaan sirf udhar hi comfortable hota hai jahan usse lage ke woh bina judge hue apni baat keh sakta ha.',
  'Pata nahi kyun, aapke saath baat karte hue mujhe lagta hai ke mujhe har cheez explain karne ki zaroorat nahi hoti ap samj jeti han. ❤️',
  '“Aur honestly, muja nhi pata apko meri ye baaty kitni ajeeb lagy gi, lekin kuch log life mein explain nahi hote” 🥹',
  'Thank You so much for everything! ❤️',
  'Aur ga-ao ma kia chal reha ha? 😂',
  'Aapko wish karne ki bajaye apni saari dastan hi likh di hai 😂🥹 Mujhe likhte hue samajh hi nahi aya ke main kya kya likhta ja raha hoon.',
  'Again woi baat ha agr apko kuch bhi bura laga toh I am so soo sorry, dill ma mat rekhyia ga muja reply keryia-ga zurur. 🥺❤️',
  'Muja apsa kuch shakiyty bhi ha🤧 ik toh status nhi dekhti pely ma status hi lagna laga tha fir yaad aya k apny toh dekhan hi nhi ha 😾😒 kyu nhi dekhti wesy?',
  'And once again, Happy Birthday. ❤️🎂',
  'Chly ab jaan choryy. 😂',
  'Babyee ❤️',
];

const ADDITIONAL_MESSAGE = [
  "And also, thank you so much for working 6 days a week for me, and tolerating my all nonsense 😂 plus also dealing with your family problems, and also with your health, and girls' personal health problems, and all that pain. ❤️‍🩹",
  'Pagal hain log jo kehte hain aurat kuch nahi kar sakti… ap sab kar sakti hain. ❤️ Ap himat wali hain. 🫶🏻',
  'Wesy bhi, moty bando ki bhut himat hoti ha 😂🤣',
];

const FULL_BIRTHDAY_MESSAGE = BIRTHDAY_MESSAGE.flatMap((paragraph) =>
  paragraph.includes('ga-ao')
    ? [paragraph, ...ADDITIONAL_MESSAGE]
    : [paragraph],
);

export default function BirthdayCelebration() {
  const cakeRef = useRef<HTMLElement>(null);
  const [cakeStarted, setCakeStarted] = useState(false);
  const [countdown, setCountdown] = useState(9);
  const [candlesBlown, setCandlesBlown] = useState(false);
  const [partyBurst, setPartyBurst] = useState(false);
  const [messageTab,setMessageTab]=useState<'message'|'reply'>('message');
  const [replyName,setReplyName]=useState('');
  const [replyText,setReplyText]=useState('');
  const [replyStatus,setReplyStatus]=useState<'idle'|'sending'|'sent'|'error'>('idle');
  const [replyError,setReplyError]=useState('');

  const sendReply=async(event:FormEvent)=>{
    event.preventDefault();if(!replyName.trim()||!replyText.trim()||replyStatus==='sending')return;
    setReplyStatus('sending');setReplyError('');
    try{const response=await fetch('/api/birthday-reply',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({name:replyName,message:replyText})});const data=await response.json();if(!response.ok){setReplyStatus('error');setReplyError(data.message||'Reply could not be sent.');return}setReplyStatus('sent');setReplyText('')}
    catch{setReplyStatus('error');setReplyError('Reply could not be sent. Please try again.')}
  };

  const replayCelebration=()=>{
    setPartyBurst(false);setCandlesBlown(false);setCountdown(9);setCakeStarted(false);
    document.getElementById('birthday-cake')?.scrollIntoView({behavior:'smooth'});
  };

  useEffect(() => {
    const cake = cakeRef.current;
    if (!cake) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setCakeStarted(true);
    }, { threshold: 0.45 });
    observer.observe(cake);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!cakeStarted || candlesBlown) return;
    if (countdown === 0) {
      const finish = window.setTimeout(() => setCandlesBlown(true), 350);
      return () => window.clearTimeout(finish);
    }
    const timer = window.setTimeout(() => setCountdown(value => value - 1), 1000);
    return () => window.clearTimeout(timer);
  }, [cakeStarted, countdown, candlesBlown]);

  useEffect(() => {
    if (!candlesBlown) return;
    const show = window.setTimeout(() => setPartyBurst(true), 650);
    const hide = window.setTimeout(() => setPartyBurst(false), 4300);
    return () => { window.clearTimeout(show); window.clearTimeout(hide); };
  }, [candlesBlown]);

  return (
    <MotionConfig reducedMotion="user">
    <main className="relative overflow-hidden bg-[#08070b] text-white">
    <BirthdayScrollCandles/>
    <section id="birthday-top" className="birthday-hero relative flex min-h-[100svh] scroll-mt-24 items-center justify-center overflow-hidden px-4 pb-28 pt-36 sm:px-6 sm:pb-32 sm:pt-40">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(249,115,22,0.18),transparent_42%),radial-gradient(circle_at_15%_75%,rgba(168,85,247,0.12),transparent_30%),radial-gradient(circle_at_85%_80%,rgba(236,72,153,0.12),transparent_30%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-28 z-[1] hidden justify-center gap-1 lg:flex" aria-hidden="true">
        {['#fb923c','#f472b6','#a78bfa','#38bdf8','#facc15','#fb7185','#fb923c','#a78bfa','#38bdf8'].map((color,index)=>(
          <motion.div key={index} initial={{y:-30,opacity:0}} animate={{y:0,opacity:1}} transition={{delay:0.06*index}} className="relative h-16 w-16 md:h-20 md:w-20">
            <div className="absolute left-0 right-0 top-0 h-px bg-white/20" />
            <div className="mx-auto h-10 w-8 origin-top" style={{backgroundColor:color,clipPath:'polygon(0 0,100% 0,50% 100%)',opacity:.72}} />
          </motion.div>
        ))}
      </div>

      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        {CONFETTI.map((piece, index) => (
          <motion.span
            key={index}
            className="absolute -top-8 h-3 w-1.5 rounded-full"
            style={{ left: `${piece.left}%`, backgroundColor: piece.color }}
            initial={{ y: '-10vh', rotate: 0, opacity: 0 }}
            animate={{ y: '115vh', rotate: 720, opacity: [0, 1, 1, 0] }}
            transition={{ duration: piece.duration, delay: piece.delay, repeat: Infinity, ease: 'linear' }}
          />
        ))}
        {BALLOONS.map((balloon, index) => (
          <motion.div
            key={index}
            className="absolute bottom-[-140px] hidden sm:block"
            style={{ left: balloon.left }}
            animate={{ y: [0, '-125vh'], x: [0, index % 2 ? 26 : -26, 0] }}
            transition={{ duration: 9 + index, delay: balloon.delay, repeat: Infinity, ease: 'linear' }}
          >
            <div className="rounded-[50%] opacity-75 shadow-2xl" style={{ width: balloon.size, height: balloon.size * 1.18, background: `radial-gradient(circle at 32% 28%, #fff8, ${balloon.color} 40%, ${balloon.color}99)` }} />
            <div className="mx-auto h-28 w-px bg-white/25" />
          </motion.div>
        ))}
      </div>

      <motion.section
        initial={{ opacity: 0, scale: 0.9, y: 28 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="birthday-card relative z-10 w-full max-w-3xl overflow-hidden rounded-[1.6rem] border border-white/15 bg-white/[0.06] px-5 py-8 text-center shadow-[0_30px_100px_rgba(0,0,0,0.55),0_0_70px_rgba(249,115,22,0.08)] backdrop-blur-xl sm:rounded-[2rem] sm:px-10 sm:py-11 md:px-14 md:py-12"
      >
        <div className="pointer-events-none absolute inset-[7px] rounded-[1.65rem] border border-dashed border-orange-200/10" />
        <motion.div animate={{rotate:[-8,8,-8],scale:[1,1.08,1]}} transition={{duration:3,repeat:Infinity}} className="absolute -left-3 top-4 hidden text-orange-300/70 sm:block"><PartyPopper size={44}/></motion.div>
        <motion.div animate={{rotate:[8,-8,8],scale:[1,1.08,1]}} transition={{duration:3,repeat:Infinity,delay:.4}} className="absolute -right-3 top-4 hidden -scale-x-100 text-pink-300/70 sm:block"><PartyPopper size={44}/></motion.div>
        <Star className="absolute bottom-8 left-8 h-4 w-4 fill-yellow-300 text-yellow-300 opacity-60" />
        <Star className="absolute right-9 top-1/2 h-3 w-3 fill-pink-300 text-pink-300 opacity-60" />
        <motion.div
          initial={{ scale: 0, rotate: -20 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 0.35, type: 'spring', stiffness: 180 }}
          className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-orange-300/20 bg-gradient-to-br from-orange-400/25 to-pink-500/10 text-orange-300 shadow-[0_0_35px_rgba(249,115,22,0.2)] sm:h-20 sm:w-20"
        >
          <CakeSlice className="h-8 w-8 sm:h-10 sm:w-10" strokeWidth={1.7} />
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.65 }}>
          <div className="mt-7 flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-[0.28em] text-orange-300 sm:text-sm">
            <Sparkles size={15} /> A special day <Sparkles size={15} />
          </div>
          <h1 className="mt-4 bg-gradient-to-r from-orange-200 via-white to-pink-200 bg-clip-text text-4xl font-bold leading-tight text-transparent sm:text-6xl md:text-7xl">
            Happy Birthday!
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-white/65 sm:text-base md:text-lg">
            Today is all about celebrating someone truly special.
          </p>
        </motion.div>

        <motion.div initial={{opacity:0,y:15}} animate={{opacity:1,y:0}} transition={{delay:.9}} className="mx-auto mt-7 flex w-fit items-center gap-3 rounded-full border border-white/10 bg-black/20 px-4 py-2 text-xs text-white/60 sm:text-sm">
          <CalendarDays className="h-4 w-4 text-orange-300"/>
          <time dateTime="1996-09-27" className="font-semibold tracking-[0.16em] text-white/75">27 • SEPTEMBER • 1996</time>
          <Sparkles className="hidden h-4 w-4 text-yellow-300 sm:block"/>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.05 }}
          className="mt-8 flex items-center justify-center gap-2 text-pink-300"
        >
          <Heart className="h-5 w-5 fill-current" />
          <span className="text-sm text-white/70">Made especially for you</span>
          <Heart className="h-5 w-5 fill-current" />
        </motion.div>
      </motion.section>
    </section>

    <section ref={cakeRef} id="birthday-cake" className="relative flex min-h-[100svh] scroll-mt-24 items-center justify-center overflow-hidden px-4 py-24 sm:px-6 sm:py-28">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_48%,rgba(249,115,22,.18),transparent_32%),radial-gradient(circle_at_25%_75%,rgba(168,85,247,.11),transparent_28%)]"/>
      <div className="pointer-events-none absolute left-1/2 top-[58%] h-[430px] w-[430px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-orange-300/10 bg-orange-400/[.025] shadow-[0_0_90px_rgba(249,115,22,.08)] sm:h-[560px] sm:w-[560px]"/>
      {[['12%','30%','#f472b6'],['18%','70%','#facc15'],['83%','26%','#a78bfa'],['88%','72%','#fb923c']].map(([left,top,color],index)=>(
        <motion.div key={left} aria-hidden="true" className="pointer-events-none absolute hidden md:block" style={{left,top,color}} animate={{y:[0,-12,0],rotate:[0,index%2?14:-14,0],scale:[1,1.15,1]}} transition={{duration:3+index*.45,repeat:Infinity}}>
          {index%2 ? <Heart size={20} className="fill-current opacity-45"/> : <Star size={22} className="fill-current opacity-50"/>}
        </motion.div>
      ))}
      <motion.div aria-hidden="true" animate={{rotate:[-12,8,-12]}} transition={{duration:3.2,repeat:Infinity}} className="pointer-events-none absolute left-[7%] top-1/2 hidden text-orange-300/55 lg:block"><PartyPopper size={58}/></motion.div>
      <motion.div aria-hidden="true" animate={{rotate:[12,-8,12]}} transition={{duration:3.2,repeat:Infinity,delay:.4}} className="pointer-events-none absolute right-[7%] top-1/2 hidden -scale-x-100 text-pink-300/55 lg:block"><PartyPopper size={58}/></motion.div>
      <div className="relative z-10 flex w-full max-w-3xl flex-col items-center pb-20 text-center lg:pb-0">
        <motion.div initial={{opacity:0,y:24}} whileInView={{opacity:1,y:0}} viewport={{once:true,amount:.4}}>
          <p className="text-xs font-semibold uppercase tracking-[.28em] text-orange-300">Make a wish</p>
          <h2 className="mt-3 text-3xl font-bold sm:text-5xl">Your Birthday Cake</h2>
          <p className="mx-auto mt-3 max-w-lg text-sm leading-7 text-white/55 sm:text-base">The candles are ready. Take a breath, make a wish, and let the magic begin.</p>
        </motion.div>

        <motion.div initial={{opacity:0,scale:.85,y:30}} whileInView={{opacity:1,scale:1,y:0}} viewport={{once:true,amount:.35}} transition={{delay:.15,duration:.7}} className="relative mt-5 h-[390px] w-full max-w-md sm:h-[470px]">
          <motion.div animate={{scale:[1,1.04,1],opacity:[.45,.75,.45]}} transition={{duration:2.4,repeat:Infinity}} className="absolute bottom-8 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-orange-400/10 blur-3xl sm:h-80 sm:w-80"/>
          <img src="/images/birthday-cake-realistic.png" alt="A realistic two-tier birthday cake" className="absolute inset-0 z-10 h-full w-full object-contain drop-shadow-[0_28px_30px_rgba(0,0,0,.45)]" draggable={false}/>
          <div className="absolute left-1/2 top-[17%] z-0 flex -translate-x-1/2 items-end gap-4 sm:gap-6">
            {[0,1,2,3,4].map((candle)=>(
              <div key={candle} className="relative w-3 rounded-[5px_5px_3px_3px] border border-orange-100/45 shadow-[inset_2px_0_3px_rgba(255,255,255,.65),inset_-2px_0_3px_rgba(154,52,18,.2),0_4px_8px_rgba(0,0,0,.38)]" style={{height:`${50+(candle%3)*4}px`,transform:`rotate(${[-2,1,-1,2,-1][candle]}deg)`,background:'linear-gradient(90deg,#f7a05a 0%,#ffd1a3 28%,#fff0da 48%,#f59a50 72%,#c96028 100%)'}}>
                <span className="absolute -top-1 left-1/2 h-2 w-[11px] -translate-x-1/2 rounded-[50%] border border-orange-100/60 bg-gradient-to-b from-[#fff0dc] to-[#e98a48] shadow-sm"/>
                <span className="absolute left-[2px] top-2 h-3 w-1 rounded-b-full bg-orange-200/80"/>
                <span className="absolute -top-[7px] left-1/2 h-2.5 w-[1.5px] -translate-x-1/2 rounded-full bg-gradient-to-t from-black to-stone-500"/>
                {cakeStarted && !candlesBlown && <motion.span initial={{opacity:0,scale:0}} animate={{opacity:1,scale:[1,1.12,.94,1],x:[0,.7,-.7,0],rotate:[-2,2,-1,-2]}} transition={{opacity:{duration:.25},scale:{duration:.6,repeat:Infinity},x:{duration:.5,repeat:Infinity},rotate:{duration:.7,repeat:Infinity}}} className="absolute -top-[29px] left-1/2 h-6 w-3.5 origin-bottom -translate-x-1/2 rounded-[60%_45%_55%_45%] bg-gradient-to-t from-orange-600 via-amber-300 to-[#fff8cf] shadow-[0_0_10px_3px_rgba(251,146,60,.6),0_0_22px_8px_rgba(251,191,36,.2)]"><span className="absolute bottom-1 left-1/2 h-2.5 w-1.5 -translate-x-1/2 rounded-full bg-white/90 blur-[.3px]"/></motion.span>}
                {candlesBlown && <motion.span initial={{opacity:.7,y:0,scale:.7}} animate={{opacity:0,y:-40,scale:1.5,x:candle%2?10:-10}} transition={{duration:1.8}} className="absolute -top-6 left-1/2 h-5 w-2 -translate-x-1/2 rounded-full bg-white/40 blur-sm"/>}
              </div>
            ))}
          </div>
        </motion.div>

        {candlesBlown && <BirthdayAgeTimer/>}

        {cakeStarted && !candlesBlown && (
          <motion.div initial={{opacity:0,y:-10,scale:.9}} animate={{opacity:1,y:0,scale:1}} exit={{opacity:0}} className="pointer-events-none absolute bottom-0 left-1/2 z-20 w-[180px] -translate-x-1/2 lg:bottom-auto lg:left-[calc(50%+245px)] lg:top-[52%] lg:w-[200px] lg:-translate-y-1/2 lg:translate-x-0">
            <div className="rounded-2xl border border-orange-200/20 bg-[#151117]/95 px-4 py-3.5 shadow-[0_16px_45px_rgba(0,0,0,.5),0_0_28px_rgba(249,115,22,.1)]">
              <p className="text-[10px] font-semibold uppercase tracking-[.18em] text-orange-300 sm:text-[11px]">Blow the candles in</p>
              <motion.div key={countdown} initial={{scale:.55,opacity:0}} animate={{scale:1,opacity:1}} className="mt-1 bg-gradient-to-b from-white to-orange-300 bg-clip-text text-4xl font-bold leading-none text-transparent sm:text-5xl">{String(Math.max(countdown,1)).padStart(2,'0')}</motion.div>
              <p className="mt-1.5 text-xs text-white/45">Make your wish!</p>
            </div>
          </motion.div>
        )}
        {partyBurst && (
          <div className="pointer-events-none fixed inset-0 z-[180] overflow-hidden" aria-hidden="true">
            <PartyConfettiCanvas/>
            <motion.div initial={{x:-70,y:35,rotate:-40,scale:.4,opacity:0}} animate={{x:0,y:0,rotate:-18,scale:1,opacity:1}} className="absolute bottom-[13%] left-[2%] text-orange-300"><PartyPopper className="h-16 w-16 sm:h-24 sm:w-24"/></motion.div>
            <motion.div initial={{x:70,y:35,rotate:40,scale:.4,opacity:0}} animate={{x:0,y:0,rotate:18,scale:1,opacity:1}} className="absolute bottom-[13%] right-[2%] -scale-x-100 text-pink-300"><PartyPopper className="h-16 w-16 sm:h-24 sm:w-24"/></motion.div>
          </div>
        )}
      </div>
    </section>

    <section id="birthday-message" className="relative flex min-h-[100svh] scroll-mt-24 items-center justify-center px-4 py-24 sm:px-6 sm:py-28">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(145deg,#08070b_0%,#100916_45%,#0b080d_100%)]"/>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_28%,rgba(236,72,153,0.18),transparent_28%),radial-gradient(circle_at_82%_68%,rgba(249,115,22,0.18),transparent_30%),radial-gradient(circle_at_52%_45%,rgba(139,92,246,0.11),transparent_38%)]"/>
      <div className="pointer-events-none absolute inset-0 opacity-[.035] [background-image:linear-gradient(rgba(255,255,255,.8)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.8)_1px,transparent_1px)] [background-size:48px_48px]"/>
      <div className="pointer-events-none absolute inset-x-0 top-0 h-44 bg-gradient-to-b from-orange-400/[.035] to-transparent"/>
      <motion.div aria-hidden="true" animate={{x:[-18,22,-18],y:[0,-18,0],scale:[1,1.12,1]}} transition={{duration:9,repeat:Infinity,ease:'easeInOut'}} className="pointer-events-none absolute left-[5%] top-[18%] h-48 w-48 rounded-full bg-pink-500/10 blur-3xl sm:h-72 sm:w-72"/>
      <motion.div aria-hidden="true" animate={{x:[15,-25,15],y:[0,24,0],scale:[1.08,.95,1.08]}} transition={{duration:11,repeat:Infinity,ease:'easeInOut'}} className="pointer-events-none absolute bottom-[12%] right-[3%] h-56 w-56 rounded-full bg-orange-500/10 blur-3xl sm:h-80 sm:w-80"/>
      <div className="pointer-events-none absolute left-[4%] top-[15%] hidden font-serif text-[11rem] leading-none text-white/[.025] lg:block">“</div>
      <div className="pointer-events-none absolute bottom-[8%] right-[4%] hidden rotate-180 font-serif text-[11rem] leading-none text-white/[.025] lg:block">“</div>
      {Array.from({length:16},(_,index)=>(
        <motion.span key={index} aria-hidden="true" className="pointer-events-none absolute h-1 w-1 rounded-full bg-orange-200/60 shadow-[0_0_8px_rgba(253,186,116,.6)]" style={{left:`${6+(index*31)%88}%`,top:`${8+(index*47)%84}%`}} animate={{opacity:[.15,.9,.15],scale:[.7,1.5,.7]}} transition={{duration:2.4+(index%4)*.6,delay:(index%6)*.35,repeat:Infinity}}/>
      ))}
      <motion.article
        initial={{opacity:0,y:45}}
        whileInView={{opacity:1,y:0}}
        viewport={{once:true,amount:.3}}
        transition={{duration:.8,ease:[.22,1,.36,1]}}
        className="relative w-full max-w-4xl overflow-hidden rounded-[2rem] border border-white/15 bg-gradient-to-br from-white/[.075] via-white/[.045] to-orange-400/[.025] p-6 shadow-[0_35px_110px_rgba(0,0,0,.55),0_0_70px_rgba(236,72,153,.055)] backdrop-blur-xl sm:p-10 md:p-14"
      >
        <div className="pointer-events-none absolute inset-[7px] rounded-[1.65rem] border border-dashed border-white/[.055]"/>
        <div className="pointer-events-none absolute inset-x-16 top-0 h-px bg-gradient-to-r from-transparent via-pink-200/50 to-transparent"/>
        <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-pink-500/10 blur-2xl"/>
        <div className="absolute -bottom-16 -left-12 h-44 w-44 rounded-full bg-orange-500/10 blur-2xl"/>
        <div className="relative">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl border border-pink-300/20 bg-pink-400/10 text-pink-300"><Quote size={21}/></span>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[.24em] text-orange-300">A message for you</p>
              <h2 className="mt-1 text-2xl font-semibold sm:text-3xl">On your special day</h2>
            </div>
            </div>
            <div className="flex w-fit items-center gap-1 rounded-2xl border border-white/10 bg-black/20 p-1">
              <button type="button" onClick={()=>setMessageTab('message')} className={`flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-semibold transition sm:px-4 ${messageTab==='message'?'bg-gradient-to-r from-pink-500/25 to-fuchsia-500/20 text-pink-200 shadow-sm':'text-white/45 hover:text-white/75'}`}><MessageCircleHeart size={16}/> Message</button>
              <button type="button" onClick={()=>setMessageTab('reply')} className={`flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-semibold transition sm:px-4 ${messageTab==='reply'?'bg-gradient-to-r from-fuchsia-500/25 to-violet-500/20 text-purple-200 shadow-sm':'text-white/45 hover:text-white/75'}`}><Reply size={16}/> Reply</button>
            </div>
          </div>
          <div className="my-7 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent"/>
          {messageTab==='message'?<>
          <div id="birthday-letter-scroll" className="birthday-letter-scroll space-y-5 text-left text-[15px] leading-7 text-white/72 sm:text-base sm:leading-8 md:max-h-[68svh] md:overflow-y-auto md:pr-8">
            {FULL_BIRTHDAY_MESSAGE.map((paragraph,index)=>(
              <motion.p key={index} initial={{opacity:0,y:10}} whileInView={{opacity:1,y:0}} viewport={{once:true,amount:.2}} transition={{duration:.45,delay:Math.min(index*.025,.35)}} className={index===0?'bg-gradient-to-r from-orange-200 via-white to-pink-200 bg-clip-text text-center text-2xl font-bold text-transparent sm:text-3xl':index===FULL_BIRTHDAY_MESSAGE.length-1?'text-center text-xl font-semibold text-pink-200':undefined}>
                <EmojiText text={paragraph}/>
              </motion.p>
            ))}
          </div>
          <div className="mt-10 flex items-center justify-center gap-3 text-sm text-pink-300">
            <Heart className="h-5 w-5 fill-current"/>
            <span className="font-medium text-white/65">With lots of love and warm wishes</span>
          </div>
          </>:(
            <motion.form initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} onSubmit={sendReply} className="mx-auto max-w-2xl">
              {replyStatus==='sent'?(
                <div className="rounded-3xl border border-pink-300/15 bg-pink-400/[.06] px-6 py-14 text-center">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-pink-400/10 text-pink-300"><Heart className="h-7 w-7 fill-current"/></div>
                  <h3 className="mt-5 text-2xl font-semibold">Reply sent with love!</h3>
                  <p className="mt-2 text-sm text-white/55">Your message has been delivered successfully.</p>
                  <button type="button" onClick={()=>setReplyStatus('idle')} className="mt-6 text-sm font-medium text-pink-300 hover:text-pink-200">Send another reply</button>
                </div>
              ):<>
                <div className="mb-6 text-center">
                  <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl border border-purple-300/15 bg-purple-400/10 text-purple-300"><Reply size={22}/></span>
                  <h3 className="mt-4 text-xl font-semibold sm:text-2xl">Write your reply</h3>
                  <p className="mt-2 text-sm text-white/50">Your reply will be sent privately and securely.</p>
                </div>
                <label className="mb-2 block text-xs font-semibold uppercase tracking-[.15em] text-white/45" htmlFor="birthday-reply-name">Your name</label>
                <input id="birthday-reply-name" value={replyName} onChange={event=>setReplyName(event.target.value)} maxLength={100} placeholder="Your name" className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3.5 text-white outline-none transition placeholder:text-white/25 focus:border-pink-400/50 focus:ring-2 focus:ring-pink-400/10"/>
                <label className="mb-2 mt-5 block text-xs font-semibold uppercase tracking-[.15em] text-white/45" htmlFor="birthday-reply-message">Your message</label>
                <textarea id="birthday-reply-message" value={replyText} onChange={event=>setReplyText(event.target.value)} maxLength={5000} rows={7} placeholder="Write what you feel…" className="w-full resize-y rounded-2xl border border-white/10 bg-black/20 px-4 py-3.5 leading-7 text-white outline-none transition placeholder:text-white/25 focus:border-purple-400/50 focus:ring-2 focus:ring-purple-400/10"/>
                <div className="mt-2 text-right text-xs text-white/25">{replyText.length} / 5000</div>
                {replyError&&<p className="mt-3 text-sm text-red-300">{replyError}</p>}
                <button type="submit" disabled={!replyName.trim()||!replyText.trim()||replyStatus==='sending'} className="mt-5 flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-pink-500 via-fuchsia-500 to-violet-500 px-5 py-3.5 font-semibold text-white shadow-[0_12px_35px_rgba(217,70,239,.2)] transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-40">
                  {replyStatus==='sending'?<><Loader2 size={18} className="animate-spin"/> Sending…</>:<><Send size={18}/> Send private reply</>}
                </button>
              </>}
            </motion.form>
          )}
        </div>
      </motion.article>
    </section>

    <footer className="relative overflow-hidden border-t border-white/[.06] px-4 py-20 sm:px-6 sm:py-24">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(145deg,#08070b_0%,#130a17_48%,#09070c_100%)]"/>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_25%,rgba(236,72,153,.2),transparent_36%),radial-gradient(circle_at_15%_80%,rgba(249,115,22,.14),transparent_30%),radial-gradient(circle_at_88%_72%,rgba(139,92,246,.16),transparent_30%)]"/>
      <div className="pointer-events-none absolute inset-x-0 top-0 hidden w-full items-start sm:flex" aria-hidden="true">
        {Array.from({length:24},(_,index)=>['#fb7185','#fb923c','#facc15','#a78bfa','#38bdf8','#f472b6'][index%6]).map((color,index)=>(
          <motion.span
            key={index}
            initial={{y:-50,opacity:0}}
            whileInView={{y:0,opacity:1}}
            viewport={{once:true}}
            transition={{delay:index*.025,duration:.55,ease:'easeOut'}}
            className="relative h-24 min-w-0 flex-1 origin-top [perspective:180px]"
          >
            <span className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-white/10 via-white/35 to-white/10 shadow-[0_1px_8px_rgba(255,255,255,.12)]"/>
            <motion.span
              className="mx-auto block h-14 w-[72%] max-w-12 origin-top shadow-[0_10px_18px_rgba(0,0,0,.2)] md:h-16"
              style={{background:`linear-gradient(145deg, ${color}, color-mix(in srgb, ${color} 58%, #391534))`,clipPath:'polygon(0 0,100% 0,50% 100%)'}}
              animate={{rotateY:[-14,12,-9,-14],rotateZ:[-1.5,1.5,-1.5],scaleY:[1,.92,1],x:[-1.5,1.5,-1.5]}}
              transition={{duration:2.4+(index%5)*.18,delay:index*.07,repeat:Infinity,ease:'easeInOut'}}
            />
          </motion.span>
        ))}
      </div>
      {[0,1].map(index=>(
        <motion.div key={index} aria-hidden="true" className={`pointer-events-none absolute bottom-[12%] hidden sm:block ${index?'right-[7%]':'left-[7%]'}`} animate={{y:[0,-16,0],rotate:[index?-3:3,index?3:-3,index?-3:3]}} transition={{duration:4.5+index,repeat:Infinity,ease:'easeInOut'}}>
          <div className={`h-24 w-20 rounded-[50%] border border-white/10 shadow-2xl ${index?'bg-gradient-to-br from-purple-200/80 via-violet-400/75 to-purple-700/70':'bg-gradient-to-br from-pink-200/85 via-pink-400/75 to-rose-700/70'}`}><span className="ml-4 mt-3 block h-7 w-3 rotate-[28deg] rounded-full bg-white/25 blur-[2px]"/></div>
          <div className="mx-auto h-36 w-px bg-white/20"/>
        </motion.div>
      ))}
      {Array.from({length:28},(_,index)=>(
        <motion.span key={index} aria-hidden="true" className="pointer-events-none absolute h-2.5 w-1.5 rounded-full" style={{left:`${3+(index*37)%94}%`,top:`${8+(index*29)%84}%`,backgroundColor:['#fb7185','#fb923c','#facc15','#a78bfa','#38bdf8'][index%5]}} animate={{y:[-8,14,-8],rotate:[0,180,360],opacity:[.2,.8,.2]}} transition={{duration:3+(index%5)*.5,delay:(index%8)*.25,repeat:Infinity}}/>
      ))}
      {Array.from({length:72},(_,index)=>(
        <motion.span
          key={`footer-heart-${index}`}
          aria-hidden="true"
          className="pointer-events-none absolute"
          style={{
            left:`${2+(index*43)%96}%`,
            top:`${5+(index*67)%90}%`,
            color:['#fb7185','#f472b6','#c084fc','#fb923c','#f9a8d4'][index%5],
          }}
          animate={{
            y:[0,-7-(index%4)*2,0],
            x:[0,index%2?4:-4,0],
            opacity:[.1,.38+(index%3)*.08,.1],
            scale:[.75,1.08,.75],
            rotate:[-8,8,-8],
          }}
          transition={{duration:3.2+(index%7)*.45,delay:(index%12)*.18,repeat:Infinity,ease:'easeInOut'}}
        >
          <Heart size={6+(index%5)*2} className="fill-current"/>
        </motion.span>
      ))}
      {[0,1,2,3,4,5].map(index=>(
        <motion.span key={index} aria-hidden="true" className={`pointer-events-none absolute ${index%2?'text-pink-300/30':'text-orange-300/30'}`} style={{left:`${8+(index*17)%84}%`,top:`${14+(index*23)%72}%`}} animate={{y:[0,-12,0],rotate:[-8,8,-8],scale:[.9,1.12,.9]}} transition={{duration:3.5+index*.4,repeat:Infinity,delay:index*.25}}>
          {index%2?<Heart size={14+index} className="fill-current"/>:<Star size={14+index} className="fill-current"/>}
        </motion.span>
      ))}
      <motion.div initial={{opacity:0,y:35}} whileInView={{opacity:1,y:0}} viewport={{once:true,amount:.25}} transition={{duration:.8,ease:[.22,1,.36,1]}} className="relative mx-auto max-w-3xl overflow-hidden rounded-[2rem] border border-white/15 bg-gradient-to-br from-white/[.075] via-pink-400/[.035] to-violet-400/[.035] px-6 py-10 text-center shadow-[0_30px_100px_rgba(0,0,0,.5),0_0_65px_rgba(236,72,153,.08)] backdrop-blur-xl sm:px-10 sm:py-12">
        <div className="pointer-events-none absolute inset-[7px] rounded-[1.65rem] border border-dashed border-pink-200/[.08]"/>
        <div className="pointer-events-none absolute -left-12 -top-12 h-36 w-36 rounded-full bg-pink-500/10 blur-3xl"/><div className="pointer-events-none absolute -bottom-14 -right-12 h-40 w-40 rounded-full bg-violet-500/10 blur-3xl"/>
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl border border-pink-300/15 bg-pink-400/10 text-pink-300"><Heart className="h-6 w-6 fill-current"/></div>
        <p className="mt-6 text-xs font-semibold uppercase tracking-[.25em] text-orange-300">One last thing…</p>
        <h2 className="mx-auto mt-4 max-w-2xl text-2xl font-semibold leading-relaxed text-white sm:text-3xl">
          Some people quietly become a beautiful part of our lives.
        </h2>
        <p className="mt-3 text-base text-white/55 sm:text-lg">Thank you for being one of them. ❤️</p>
        <p className="mt-6 font-serif text-xl italic text-pink-200/90">— Abdullah</p>

        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <button type="button" onClick={replayCelebration} className="flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-pink-500 via-fuchsia-500 to-violet-500 px-6 py-3.5 text-sm font-semibold text-white shadow-[0_12px_32px_rgba(217,70,239,.2)] transition hover:scale-[1.02] hover:brightness-110 active:scale-[.98]"><RotateCcw size={17}/> Replay Celebration</button>
          <button type="button" onClick={()=>document.getElementById('birthday-top')?.scrollIntoView({behavior:'smooth'})} className="flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/[.04] px-6 py-3.5 text-sm font-semibold text-white/70 transition hover:border-pink-300/25 hover:bg-white/[.07] hover:text-white"><ArrowUp size={17}/> Back to Top</button>
        </div>

        <div className="mx-auto my-8 h-px max-w-sm bg-gradient-to-r from-transparent via-white/15 to-transparent"/>
        <div className="flex items-center justify-center gap-2 text-xs font-semibold tracking-[.15em] text-white/40"><CalendarDays size={15} className="text-orange-300"/> 27 • SEPTEMBER • 1996</div>
        <p className="mt-5 text-sm text-white/40">Made especially for <span className="font-medium text-pink-200/80">Motoo Mam Hira</span> ❤️</p>
      </motion.div>
    </footer>
    <style jsx global>{`
      .birthday-letter-scroll {
        scrollbar-width: thin;
        scrollbar-color: #c058e8 rgba(255,255,255,.04);
      }
      .birthday-letter-scroll::-webkit-scrollbar {
        width: 11px;
      }
      .birthday-letter-scroll::-webkit-scrollbar-track {
        margin-block: 6px;
        border-radius: 999px;
        background: rgba(255,255,255,.035);
        box-shadow: inset 0 0 0 1px rgba(255,255,255,.045);
      }
      .birthday-letter-scroll::-webkit-scrollbar-thumb {
        min-height: 54px;
        border: 2px solid #211720;
        border-radius: 999px;
        background: linear-gradient(180deg,#f472b6 0%,#d946ef 48%,#8b5cf6 100%);
        box-shadow: 0 0 13px rgba(192,88,232,.4);
      }
      .birthday-letter-scroll::-webkit-scrollbar-thumb:hover {
        box-shadow: 0 0 18px rgba(168,85,247,.55);
        filter: brightness(1.08);
      }
      @media (min-width: 768px) {
        html.birthday-custom-gradient-scrollbars {
          scrollbar-width: none;
        }
        html.birthday-custom-gradient-scrollbars::-webkit-scrollbar,
        .birthday-custom-gradient-scrollbars body::-webkit-scrollbar {
          display: none;
          width: 0;
        }
      }
      @media (min-width: 1024px) and (max-height: 760px) {
        .birthday-hero {
          padding-top: 7rem;
          padding-bottom: 5.5rem;
        }
        .birthday-card {
          padding-top: 2rem;
          padding-bottom: 2rem;
        }
        .birthday-card h1 {
          font-size: 3.5rem;
        }
        .birthday-card > div:nth-of-type(5) {
          margin-top: 1.25rem;
        }
      }
      @media (max-width: 420px) {
        .birthday-hero {
          padding-top: 7.5rem;
          padding-bottom: 6.5rem;
        }
        .birthday-card h1 {
          font-size: 2.35rem;
        }
      }
    `}</style>
    </main>
    </MotionConfig>
  );
}
