import Contact from '@/components/Contact';
import Link from 'next/link';
import { ArrowLeft, ArrowUpRight, Clock3 } from 'lucide-react';
import type { BlogArticle } from '@/lib/blogArticles';

import Footer from './Footer';

type BlogArticlePageProps = {
  article: BlogArticle;
};

export default function BlogArticlePage({
  article,
}: BlogArticlePageProps) {
  return (
    <main className="relative overflow-hidden bg-brand-dark text-white">
      <section className="relative overflow-hidden px-6 pb-20 pt-36 sm:pb-28 sm:pt-44">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-32 top-8 h-80 w-80 rounded-full bg-brand-orange/20 blur-[150px]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-40 top-0 h-[30rem] w-[30rem] rounded-full bg-brand-orange/10 blur-[180px]"
        />
        <div
          aria-hidden="true"
          className="bg-grid absolute inset-0 opacity-[0.06]"
        />

        <div className="relative mx-auto max-w-4xl">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-white/55 md:transition-colors md:duration-300 md:hover:text-brand-orange"
          >
            <ArrowLeft size={16} />
            Back to Insights
          </Link>

          <div className="mt-12 flex flex-wrap items-center gap-4 text-xs font-medium uppercase tracking-[0.2em] text-brand-orange">
            <span>{article.category}</span>
            <span className="h-1 w-1 rounded-full bg-brand-orange/60" />
            <span className="inline-flex items-center gap-2 text-white/50">
              <Clock3 size={14} />
              {article.readTime}
            </span>
          </div>

          <h1 className="mt-6 font-display text-[clamp(3rem,7vw,6.25rem)] font-semibold leading-[0.98] tracking-tight">
            {article.title}
          </h1>

          <p className="mt-7 max-w-3xl text-lg leading-8 text-white/60 sm:text-xl">
            {article.description}
          </p>
        </div>
      </section>

{article.sections && (
        <article className="px-6 pb-20 sm:pb-28" aria-label={`${article.category} questions and answers`}>
          <div className="mx-auto max-w-3xl space-y-14">
            {article.sections.map((section, index) => (
              <section key={section.question} aria-labelledby={`question-${index + 1}`}>
                <h2 id={`question-${index + 1}`} className="font-display text-3xl font-semibold leading-tight text-gradient-orange sm:text-4xl">
                  {section.question}
                </h2>
                <div className="mt-6 space-y-5 text-base leading-8 text-white/70 sm:text-lg">
                  {section.paragraphs.map((paragraph, paragraphIndex) => (
                    <p key={paragraphIndex}>
                      {paragraph.split(/(\*\*.*?\*\*)/g).map((part, partIndex) =>
                        part.startsWith('**') && part.endsWith('**') ? (
                          <strong key={partIndex} className="font-semibold text-white/90">{part.slice(2, -2)}</strong>
                        ) : part
                      )}
                    </p>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </article>
      )}
      <section className="border-t border-white/10 bg-white/[0.015] px-6 py-20 sm:py-28">
        <div className="mx-auto max-w-3xl">
          <span className="text-xs font-medium uppercase tracking-[0.2em] text-brand-orange">
            Key Takeaways
          </span>

          <h2 className="mt-5 font-display text-4xl font-semibold leading-tight text-white sm:text-5xl">
            A strong foundation for better decisions.
          </h2>

          <ul className="mt-10 space-y-4">
            {article.keyPoints.map((point, index) => (
              <li
                key={point}
                className="flex gap-4 border-t border-white/10 pt-5 text-base leading-7 text-white/60 sm:text-lg"
              >
                <span className="font-display text-sm text-brand-orange">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="relative overflow-hidden px-6 py-24 sm:py-32">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-orange/15 blur-[130px]"
        />

        <div className="relative mx-auto max-w-4xl rounded-[2rem] border border-white/10 bg-white/[0.03] px-7 py-12 text-center sm:px-12 sm:py-16">
          <span className="text-xs font-medium uppercase tracking-[0.2em] text-brand-orange">
            Let&apos;s Work Together
          </span>
          <h2 className="mt-5 font-display text-4xl font-semibold leading-tight text-white sm:text-5xl">
            Ready to turn ideas into meaningful work?
          </h2>
          <p className="mx-auto mt-5 max-w-2xl leading-7 text-white/55">
            Tell us what you are building. We will help you find the right
            creative and digital direction.
          </p>

          <Link
            href="#contact"
            className="group mt-9 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-brand-accent to-brand-orange px-6 py-3.5 text-sm font-semibold text-white md:transition-transform md:duration-300 md:hover:scale-[1.03]"
            style={{ boxShadow: '0 0 30px -8px rgba(249,115,22,0.6)' }}
          >
            Start a Project
            <ArrowUpRight
              size={16}
              className="md:transition-transform md:duration-300 md:group-hover:-translate-y-0.5 md:group-hover:translate-x-0.5"
            />
          </Link>
        </div>
      </section>

      <Contact />
      <Footer />
    </main>
  );
}
