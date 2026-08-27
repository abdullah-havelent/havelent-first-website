import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://havelent.com";

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/founder`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/our-work`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/services/video-editing`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/services/graphic-design`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/services/digitalmarketing`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/services/social-media-management`,
      lastModified: new Date(),
    },
  ];
}