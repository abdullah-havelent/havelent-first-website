import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://havelent.com';

  const paths = [
    '',
    '/founder',
    '/our-work',
    '/our-work/designs',
    '/our-work/social-performance',
    '/our-work/campaign-results',
    '/blog',
    '/services/video-editing',
    '/services/graphic-design',
    '/services/digital-marketing',
    '/services/social-media-management',
    '/services/web-development',
  ];

  return paths.map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
  }));
}
