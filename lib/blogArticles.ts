import { webDevelopmentSections } from './webDevelopmentContent';
import { socialMediaSections } from './socialMediaContent';
import { digitalMarketingSections } from './digitalMarketingContent';
import { graphicDesignSections } from './graphicDesignContent';
import { videoEditingSections } from './videoEditingContent';

export type BlogArticle = {
  slug:
    | 'video-editing'
    | 'graphic-design'
    | 'digital-marketing'
    | 'social-media-management'
    | 'web-development';
  number: string;
  category: string;
  type: 'video' | 'design' | 'marketing' | 'social' | 'web';
  title: string;
  description: string;
  readTime: string;
  keyPoints: string[];
  sections?: { question: string; paragraphs: string[] }[];
};

export const BLOG_ARTICLES: BlogArticle[] = [
  {
    slug: 'video-editing',
    sections: videoEditingSections,
    number: '01',
    category: 'Video Editing',
    type: 'video',
    title: 'How Better Editing Keeps Viewers Watching',
    description:
      'A strong edit is more than clean cuts. Pacing, structure, sound, and visual rhythm work together to make every second feel worth watching.',
    readTime: '4 min read',
    keyPoints: [
      'Start with a clear hook that gives viewers a reason to keep watching.',
      'Remove slow moments that do not move the story forward.',
      'Use sound, graphics, and pacing to support the message instead of distracting from it.',
    ],
  },
  {
    slug: 'graphic-design',
    sections: graphicDesignSections,
    number: '02',
    category: 'Graphic Design',
    type: 'design',
    title: 'What Makes a Brand Identity Feel Memorable',
    description:
      'A memorable visual identity comes from clarity and consistency. Every logo, color, type choice, and asset should make the brand easier to recognise.',
    readTime: '4 min read',
    keyPoints: [
      'Build from a clear brand position before choosing visual directions.',
      'Keep typography and color decisions consistent across every touchpoint.',
      'Design for recognition first, then add creative details with purpose.',
    ],
  },
  {
    slug: 'digital-marketing',
    sections: digitalMarketingSections,
    number: '03',
    category: 'Digital Marketing',
    type: 'marketing',
    title: 'How to Build Campaigns That Create Measurable Growth',
    description:
      'Effective marketing connects the right audience, a focused message, strong creative, and clear reporting. Every campaign needs a goal that can be measured.',
    readTime: '5 min read',
    keyPoints: [
      'Define one clear campaign goal before selecting a platform or budget.',
      'Match the creative message to the audience and stage of their journey.',
      'Review performance regularly and use the data to improve the next decision.',
    ],
  },
  {
    slug: 'social-media-management',
    sections: socialMediaSections,
    number: '04',
    category: 'Social Media Management',
    type: 'social',
    title: 'Why Consistency Is the Foundation of Social Growth',
    description:
      'Consistent social media is not simply posting more. It means having a clear content direction, dependable publishing, genuine engagement, and useful reporting.',
    readTime: '4 min read',
    keyPoints: [
      'Create content pillars that connect directly to your audience and business goals.',
      'Use a realistic publishing rhythm that your brand can maintain.',
      'Track engagement and audience behaviour to improve future content.',
    ],
  },
  {
    slug: 'web-development',
    sections: webDevelopmentSections,
    number: '05',
    category: 'Web Development',
    type: 'web',
    title: 'What Makes a Website Effective for Modern Brands',
    description:
      'An effective website combines clear structure, thoughtful design, reliable performance, and a focused user journey that supports real business goals.',
    readTime: '5 min read',
    keyPoints: [
      'Build every page around a clear purpose and an easy path for the visitor to follow.',
      'Prioritise responsive design, accessibility, and fast loading across devices.',
      'Use a flexible technical foundation that can support future content and business growth.',
    ],
  },
];

export function getBlogArticle(slug: string) {
  return BLOG_ARTICLES.find((article) => article.slug === slug);
}
