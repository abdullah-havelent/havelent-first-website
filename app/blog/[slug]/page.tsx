import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import BlogArticlePage from '@/components/BlogArticlePage';
import {
  BLOG_ARTICLES,
  getBlogArticle,
} from '@/lib/blogArticles';

type BlogArticleRouteProps = {
  params: {
    slug: string;
  };
};

export function generateStaticParams() {
  return BLOG_ARTICLES.map((article) => ({
    slug: article.slug,
  }));
}

export function generateMetadata({
  params,
}: BlogArticleRouteProps): Metadata {
  const article = getBlogArticle(params.slug);

  if (!article) {
    return {};
  }

  return {
    title: `${article.title} | Havelent Insights`,
    description: article.description,
    alternates: {
      canonical: `/blog/${article.slug}`,
    },
    openGraph: {
      title: `${article.title} | Havelent Insights`,
      description: article.description,
      url: `https://havelent.com/blog/${article.slug}`,
      siteName: 'Havelent',
      type: 'article',
      images: [
        {
          url: '/og-image.png',
          width: 1200,
          height: 630,
          alt: article.title,
        },
      ],
    },
    robots: {
      index: false,
      follow: true,
    },
  };
}

export default function BlogArticleRoute({
  params,
}: BlogArticleRouteProps) {
  const article = getBlogArticle(params.slug);

  if (!article) {
    notFound();
  }

  return <BlogArticlePage article={article} />;
}
