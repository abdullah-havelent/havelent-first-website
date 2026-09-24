import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

type Props = {
  title: string;
  accent: string;
  description: string;
  related: { href: string; label: string }[];
};

export default function ServiceWhyChooseIntro({ title, accent, description, related }: Props) {
  return (
    <div className="lg:sticky lg:top-32 lg:self-start">
      <p className="text-sm uppercase tracking-[0.25em] text-white/30">The Havelent Standard</p>
      <h2 className="mt-5 max-w-md font-display text-5xl font-semibold leading-[1.05] text-white md:text-6xl lg:text-7xl">
        {title}{' '}<span className="text-gradient-orange">{accent}</span>
      </h2>
      <p className="mt-7 max-w-md text-base leading-8 text-white/45 md:text-lg">{description}</p>
      <p className="mt-6 max-w-md text-sm leading-7 text-white/40">
        Support your wider project with{' '}
        {related.map((link, index) => (
          <span key={link.href}>
            {index > 0 && ' or '}
            <Link href={link.href} className="text-white/70 underline decoration-brand-orange/60 underline-offset-4 md:transition-colors md:hover:text-brand-orange">{link.label}</Link>
          </span>
        ))}.
      </p>
      <Link href="#contact" className="group mt-10 inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-3 text-sm font-medium text-white md:transition-colors md:hover:border-brand-orange md:hover:text-brand-orange">
        Discuss Your Project <ArrowRight size={16} className="md:transition-transform md:duration-300 md:group-hover:translate-x-1" />
      </Link>
    </div>
  );
}
