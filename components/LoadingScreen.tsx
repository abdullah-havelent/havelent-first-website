"use client";

type Props = {
  show: boolean;
};

export default function LoadingScreen({ show }: Props) {
  if (!show) return null;

  return (
    <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-[#050505]">
      <div className="absolute h-[300px] w-[300px] rounded-full bg-orange-500/20 blur-[120px]" />

      <img
        src="/logos/logo.svg"
        alt="Havelent"
        draggable={false}
        className="relative w-[220px] md:w-[360px] h-auto"
      />
    </div>
  );
}