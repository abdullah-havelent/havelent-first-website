import Contact from '@/components/Contact';
import Link from 'next/link';
import { ArrowUpRight, BookOpen, Clock3 } from 'lucide-react';
import BlogThumbnail from '@/components/BlogThumbnail';
import Footer from '@/components/Footer';
import { BLOG_ARTICLES } from '@/lib/blogArticles';

export default function BlogPage() {
  const blogSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    '@id': 'https://havelent.com/blog#webpage',
    name: 'Havelent Insights',
    description:
      'Practical insights on video editing, graphic design, digital marketing, social media management, and web development.',
    url: 'https://havelent.com/blog',
    publisher: {
      '@type': 'Organization',
      '@id': 'https://havelent.com/#organization',
      name: 'Havelent',
      url: 'https://havelent.com',
    },
    about: BLOG_ARTICLES.map((article) => article.category),
  };

  return (
    <main className="relative overflow-hidden bg-brand-dark text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(blogSchema),
        }}
      />

      <section className="relative overflow-hidden px-6 pb-20 pt-36 sm:pb-28 sm:pt-44">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-32 top-8 h-80 w-80 rounded-full bg-brand-orange/20 blur-[150px]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-40 top-0 h-[30rem] w-[30rem] rounded-full bg-brand-orange/10 blur-[180px]"
        />
        <div aria-hidden="true" className="bg-grid absolute inset-0 opacity-[0.06]" />

        <div className="relative mx-auto max-w-7xl">
          <span className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.22em] text-brand-orange">
            <BookOpen size={14} />
            Havelent Insights
          </span>

          <h1 className="mt-6 max-w-4xl font-display text-[clamp(3rem,7vw,6.25rem)] font-semibold leading-[0.98] tracking-tight">
            Ideas that help brands
            <span className="text-gradient-orange"> move forward.</span>
          </h1>

          <p className="mt-7 max-w-2xl text-base leading-8 text-white/60 sm:text-lg">
            Practical perspectives on video editing, graphic design, digital
            marketing, social media management, and web development for brands
            building with intention.
          </p>

          <div className="mt-10 flex flex-wrap gap-3">
            {BLOG_ARTICLES.map((article) => (
              <Link
                key={article.slug}
                href={`/blog/${article.slug}`}
                className="rounded-full border border-white/10 bg-white/[0.035] px-4 py-2 text-sm text-white/65 md:transition-colors md:duration-300 md:hover:border-brand-orange/40 md:hover:text-brand-orange"
              >
                {article.category}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="relative px-6 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-5 md:grid-cols-2">
            {BLOG_ARTICLES.map((article) => (
              <Link
                key={article.slug}
                href={`/blog/${article.slug}`}
                className="group flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/[0.03] md:transition-all md:duration-500 md:hover:-translate-y-1 md:hover:border-brand-orange/45 md:hover:bg-[#1b130d]"
              >
                <BlogThumbnail type={article.type} />

                <div className="relative flex flex-1 flex-col p-7 sm:p-9">
                  <div className="flex items-start justify-between gap-6">
                    <span className="font-display text-sm text-brand-orange/75">
                      {article.number}
                    </span>
                    <ArrowUpRight
                      size={20}
                      className="text-white/35 md:transition-all md:duration-300 md:group-hover:-translate-y-1 md:group-hover:translate-x-1 md:group-hover:text-brand-orange"
                    />
                  </div>

                  <p className="mt-9 text-xs font-medium uppercase tracking-[0.18em] text-brand-orange">
                    {article.category}
                  </p>
                  <h2 className="mt-4 max-w-md font-display text-3xl font-semibold leading-tight text-white">
                    {article.title}
                  </h2>
                  <p className="mt-4 max-w-lg leading-7 text-white/55">
                    {article.description}
                  </p>

                  <span className="mt-auto inline-flex items-center gap-2 pt-7 text-sm text-white/45">
                    <Clock3 size={14} />
                    {article.readTime}
                  </span>
                </div>
              </Link>
            ))}
          </div>
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
