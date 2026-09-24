import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://havelent.com';

  const paths = [
    '',
    '/reviews',
    '/our-work',
    '/our-work/designs',
    '/our-work/social-performance',
    '/our-work/campaign-results',
    '/services/video-editing',
    '/services/graphic-design',
    '/services/digital-marketing',
    '/services/social-media-management',
    '/services/web-development',
    '/about',
    '/founder',
    '/blog',
    '/blog/video-editing',
    '/blog/graphic-design',
    '/blog/digital-marketing',
    '/blog/social-media-management',
    '/blog/web-development',
    '/contact',
  ];

  return paths.map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
  }));
}