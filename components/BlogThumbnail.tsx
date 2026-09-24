type BlogThumbnailProps = {
  type: 'video' | 'design' | 'marketing' | 'social' | 'web';
};

const ChromeDots = () => (
  <div className="flex items-center gap-1.5">
    <span className="h-1.5 w-1.5 rounded-full bg-brand-orange" />
    <span className="h-1.5 w-1.5 rounded-full bg-orange-200/45" />
    <span className="h-1.5 w-1.5 rounded-full bg-white/20" />
  </div>
);

export default function BlogThumbnail({ type }: BlogThumbnailProps) {
  return (
    <div
      aria-hidden="true"
      className="relative aspect-[16/9] overflow-hidden bg-[#080808]"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_18%,rgba(249,115,22,0.20),transparent_34%),linear-gradient(135deg,#1a0d07_0%,#090909_48%,#140906_100%)]" />
      <div className="absolute inset-0 opacity-45 [background-image:linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] [background-size:24px_24px]" />

      {type === 'video' && (
        <div className="absolute inset-x-[7%] bottom-[9%] top-[10%] rotate-[-1.5deg] overflow-hidden rounded-xl border border-white/10 bg-[#0b0b0c] shadow-[0_24px_55px_rgba(0,0,0,0.6),0_0_35px_rgba(249,115,22,0.10)]">
          <div className="flex h-[13%] items-center justify-between border-b border-white/[0.07] bg-white/[0.035] px-3">
            <ChromeDots />
            <div className="h-1.5 w-[24%] rounded-full bg-white/10" />
          </div>
          <div className="grid h-[52%] grid-cols-[1fr_27%] gap-1.5 p-2">
            <div className="relative overflow-hidden rounded-md bg-[linear-gradient(145deg,#35160c,#0b0b0c_55%,#281007)]">
              <div className="absolute inset-[12%] rounded-full bg-brand-orange/15 blur-xl" />
              <div className="absolute left-[12%] top-[16%] h-[68%] w-[76%] overflow-hidden rounded border border-white/10 bg-black/25">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_66%_40%,rgba(255,160,80,0.65),transparent_13%),linear-gradient(150deg,transparent_40%,rgba(249,115,22,0.28)_41%,transparent_66%)]" />
                <span className="absolute left-1/2 top-1/2 flex h-7 w-7 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/40 bg-black/40"><span className="ml-0.5 h-0 w-0 border-y-[4px] border-l-[7px] border-y-transparent border-l-white/90" /></span>
              </div>
            </div>
            <div className="space-y-1.5 rounded-md border border-white/[0.06] bg-white/[0.025] p-2">
              {[75, 46, 82, 58].map((width, index) => (
                <div key={width} className="space-y-1">
                  <div className="h-1 rounded-full bg-white/10" style={{ width: `${width}%` }} />
                  <div className="h-1.5 rounded-sm bg-brand-orange/20" style={{ width: `${90 - index * 12}%` }} />
                </div>
              ))}
            </div>
          </div>
          <div className="relative h-[35%] border-t border-white/[0.07] bg-[#080809] px-2 pb-2 pt-1.5">
            <div className="absolute bottom-2 left-[43%] top-0 w-px bg-brand-orange shadow-[0_0_10px_rgba(249,115,22,0.9)]" />
            <div className="grid h-full grid-rows-3 gap-1">
              <div className="flex gap-1"><span className="w-[18%] rounded-sm bg-orange-400/45" /><span className="w-[31%] rounded-sm bg-orange-500/25" /><span className="w-[21%] rounded-sm bg-orange-300/35" /><span className="flex-1 rounded-sm bg-orange-500/20" /></div>
              <div className="flex gap-1"><span className="w-[28%] rounded-sm bg-white/12" /><span className="w-[17%] rounded-sm bg-white/7" /><span className="w-[38%] rounded-sm bg-white/10" /></div>
              <div className="relative overflow-hidden rounded-sm bg-white/[0.04]"><div className="absolute inset-y-0 left-0 w-[78%] bg-[repeating-linear-gradient(90deg,rgba(249,115,22,0.35)_0_2px,transparent_2px_5px)]" /></div>
            </div>
          </div>
        </div>
      )}

      {type === 'design' && (
        <div className="absolute inset-x-[8%] bottom-[8%] top-[9%] rotate-[1.5deg] rounded-xl border border-white/10 bg-[#11100f] p-3 shadow-[0_22px_55px_rgba(0,0,0,0.58)]">
          <div className="grid h-full grid-cols-[1.05fr_0.95fr] gap-2">
            <div className="relative overflow-hidden rounded-lg border border-white/[0.07] bg-[#ede4d8]">
              <div className="absolute left-[10%] top-[10%] h-[23%] w-[38%] rounded bg-[#1b1714] shadow-md">
                <div className="m-2 h-5 w-5 rounded-full border-[5px] border-brand-orange" />
              </div>
              <div className="absolute right-[9%] top-[10%] h-[45%] w-[36%] rotate-3 rounded bg-[#c46b32] shadow-lg">
                <div className="absolute inset-x-2 bottom-2 space-y-1"><div className="h-1 w-3/4 bg-white/65" /><div className="h-1 w-1/2 bg-white/40" /></div>
              </div>
              <div className="absolute bottom-[12%] left-[10%] right-[9%] space-y-2">
                <div className="h-3 w-[72%] rounded-sm bg-[#241a15]" />
                <div className="h-1.5 w-[88%] rounded-full bg-[#493c34]/35" />
                <div className="h-1.5 w-[60%] rounded-full bg-[#493c34]/25" />
              </div>
            </div>
            <div className="grid grid-rows-[1fr_auto] gap-2">
              <div className="relative overflow-hidden rounded-lg border border-white/[0.07] bg-[#18130f]">
                <div className="absolute left-[12%] top-[14%] h-[57%] w-[42%] rounded-t-[48%] bg-gradient-to-b from-brand-orange to-[#52200c]" />
                <div className="absolute right-[12%] top-[18%] h-14 w-14 rounded-full border-[9px] border-[#e7d7c7]/80" />
                <div className="absolute bottom-3 left-3 h-1.5 w-[65%] rounded-full bg-white/15" />
              </div>
              <div className="flex h-9 items-center justify-around rounded-lg border border-white/[0.07] bg-black/25 px-2">
                {['#f97316', '#d8c4ae', '#55200d', '#19130f'].map((color) => (
                  <span key={color} className="h-4 w-4 rounded-full border border-white/15 shadow-sm" style={{ backgroundColor: color }} />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {type === 'marketing' && (
        <div className="absolute inset-x-[7%] bottom-[9%] top-[10%] rotate-[-1deg] overflow-hidden rounded-xl border border-white/10 bg-[#0c0d0d] shadow-[0_24px_58px_rgba(0,0,0,0.62)]">
          <div className="flex h-[14%] items-center justify-between border-b border-white/[0.07] bg-white/[0.025] px-3"><ChromeDots /><div className="h-1.5 w-[26%] rounded-full bg-white/10" /></div>
          <div className="grid h-[86%] grid-cols-[30%_1fr] gap-2 p-2">
            <div className="grid grid-rows-3 gap-2">
              {[72, 48, 85].map((value, index) => (
                <div key={value} className="rounded-md border border-white/[0.06] bg-white/[0.025] p-2">
                  <div className="h-1 w-1/2 rounded-full bg-white/12" />
                  <div className="mt-1.5 h-2.5 rounded-sm bg-gradient-to-r from-brand-orange/75 to-orange-300/50" style={{ width: `${value}%` }} />
                  <div className="mt-1 h-1 w-1/3 rounded-full bg-white/7" />
                </div>
              ))}
            </div>
            <div className="grid grid-rows-[1fr_37%] gap-2">
              <div className="relative overflow-hidden rounded-md border border-white/[0.06] bg-white/[0.02]">
                <div className="absolute inset-3 opacity-60 [background-image:linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:22px_18px]" />
                <svg className="absolute inset-3 h-[calc(100%-1.5rem)] w-[calc(100%-1.5rem)]" viewBox="0 0 180 75" preserveAspectRatio="none">
                  <defs><linearGradient id="growthFill" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#f97316" stopOpacity=".45" /><stop offset="100%" stopColor="#f97316" stopOpacity="0" /></linearGradient></defs>
                  <path d="M0 66 C28 64 33 51 54 52 S80 43 94 37 S116 41 132 22 S156 18 180 5 L180 75 L0 75 Z" fill="url(#growthFill)" />
                  <path d="M0 66 C28 64 33 51 54 52 S80 43 94 37 S116 41 132 22 S156 18 180 5" fill="none" stroke="#fb8a32" strokeWidth="2.2" />
                  {[['54','52'],['94','37'],['132','22'],['180','5']].map(([cx,cy]) => <circle key={cx} cx={cx} cy={cy} r="3" fill="#ffb078" />)}
                </svg>
              </div>
              <div className="grid grid-cols-[1fr_1fr] gap-2">
                <div className="flex items-end gap-1 rounded-md border border-white/[0.06] bg-white/[0.02] p-2">{[28,50,38,72,60].map((height,index)=><span key={index} className="flex-1 rounded-t-sm bg-brand-orange/50" style={{height:`${height}%`}} />)}</div>
                <div className="flex items-center justify-center rounded-md border border-white/[0.06] bg-white/[0.02]"><div className="h-11 w-11 rounded-full border-[8px] border-brand-orange/55 border-r-orange-200/25" /></div>
              </div>
            </div>
          </div>
        </div>
      )}

      {type === 'social' && (
        <div className="absolute inset-x-[8%] bottom-[7%] top-[8%]">
          <div className="absolute bottom-0 left-[6%] top-[5%] w-[39%] -rotate-[4deg] overflow-hidden rounded-[14px] border border-white/12 bg-[#101010] shadow-[0_24px_50px_rgba(0,0,0,0.58)]">
            <div className="mx-auto mt-1.5 h-1 w-8 rounded-full bg-white/15" />
            <div className="mx-2 mt-2 grid aspect-square grid-cols-2 gap-1 overflow-hidden rounded-md">
              {['from-orange-500/70 to-[#2b1008]','from-[#c9a37d]/60 to-black','from-[#54200d] to-orange-400/60','from-orange-200/45 to-[#311109]'].map((gradient,index)=><div key={index} className={`relative bg-gradient-to-br ${gradient}`}><span className="absolute bottom-1 left-1 h-1 w-2/3 rounded bg-white/35" /></div>)}
            </div>
            <div className="mx-2 mt-2 flex justify-between"><span className="h-2 w-2 rounded-full bg-brand-orange" /><span className="h-1.5 w-10 rounded-full bg-white/12" /></div>
          </div>
          <div className="absolute bottom-[5%] right-[3%] top-0 w-[59%] rotate-[2deg] rounded-xl border border-white/10 bg-[#13100e] p-2 shadow-[0_20px_48px_rgba(0,0,0,0.5)]">
            <div className="flex items-center justify-between"><div className="h-1.5 w-[38%] rounded-full bg-white/15" /><div className="h-4 w-4 rounded-full bg-brand-orange/70" /></div>
            <div className="mt-2 grid grid-cols-3 gap-1">
              {Array.from({length:9},(_,index)=><div key={index} className={`aspect-square rounded-sm border border-white/[0.05] ${index===4 || index===7 ? 'bg-brand-orange/45' : 'bg-white/[0.045]'}`}><span className="m-1 block h-1 w-1 rounded-full bg-orange-200/50" /></div>)}
            </div>
            <div className="mt-2 flex items-center gap-1.5"><span className="h-4 w-4 rounded-full border border-brand-orange/45" /><div className="space-y-1"><div className="h-1 w-12 rounded-full bg-white/15" /><div className="h-1 w-8 rounded-full bg-white/8" /></div></div>
          </div>
          <span className="absolute right-0 top-[12%] h-3 w-3 rounded-full bg-brand-orange shadow-[0_0_14px_rgba(249,115,22,0.9)]" />
        </div>
      )}

      {type === 'web' && (
        <div className="absolute inset-x-[7%] bottom-[8%] top-[9%]">
          <div className="absolute bottom-[8%] left-0 right-[13%] top-0 overflow-hidden rounded-xl border border-white/10 bg-[#0d0e0f] shadow-[0_24px_58px_rgba(0,0,0,0.62)]">
            <div className="flex h-[14%] items-center justify-between border-b border-white/[0.07] px-3"><ChromeDots /><div className="h-1.5 w-[34%] rounded-full bg-white/10" /></div>
            <div className="relative h-[86%] overflow-hidden p-3">
              <div className="absolute right-[8%] top-[10%] h-20 w-20 rounded-full bg-brand-orange/20 blur-2xl" />
              <div className="relative grid h-full grid-cols-[1.1fr_0.9fr] gap-3">
                <div className="flex flex-col justify-center">
                  <div className="h-2 w-[28%] rounded-full bg-brand-orange/75" />
                  <div className="mt-2 h-3 w-[86%] rounded-sm bg-white/75" />
                  <div className="mt-1.5 h-3 w-[62%] rounded-sm bg-white/55" />
                  <div className="mt-2 space-y-1"><div className="h-1 w-[78%] bg-white/12" /><div className="h-1 w-[65%] bg-white/8" /></div>
                  <div className="mt-3 h-5 w-[38%] rounded-full bg-brand-orange/75" />
                </div>
                <div className="relative my-2 overflow-hidden rounded-lg border border-white/10 bg-gradient-to-br from-brand-orange/35 via-[#35150b] to-black"><div className="absolute inset-[15%] rounded-full border border-orange-200/25" /><div className="absolute bottom-[12%] left-[12%] right-[12%] h-1 rounded-full bg-white/18" /></div>
              </div>
            </div>
          </div>
          <div className="absolute bottom-0 right-0 top-[26%] w-[27%] overflow-hidden rounded-[12px] border border-brand-orange/40 bg-[#111214] shadow-[0_18px_38px_rgba(0,0,0,0.65)]">
            <div className="mx-auto mt-1.5 h-1 w-7 rounded-full bg-white/15" />
            <div className="mx-1.5 mt-2 h-1.5 w-[48%] rounded-full bg-brand-orange/70" />
            <div className="mx-1.5 mt-1.5 h-2 w-[80%] rounded-sm bg-white/55" />
            <div className="mx-1.5 mt-1 h-1 w-[62%] rounded-full bg-white/12" />
            <div className="mx-1.5 mt-2 h-[44%] rounded bg-gradient-to-br from-brand-orange/35 to-black" />
            <div className="mx-1.5 mt-1.5 h-3 rounded-full bg-brand-orange/65" />
          </div>
        </div>
      )}

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-white/[0.035]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-brand-orange/45 to-transparent" />
    </div>
  );
}
