export type Review = {
  id: number;
  name: string;
  role: string;
  review: string;
  rating: number;
  mainService: string;
  subService: string;
  createdAt: string;
};

export const services = [
  {
    name: 'Video Editing',
    subServices: [
      'YouTube Video Editing',
      'Commercial & Ads Editing',
      'Podcast Editing',
      'Shorts & Reels Editing',
      'Documentary Editing',
      'Motion Graphics',
    ],
  },
  {
    name: 'Graphic Design',
    subServices: [
      'Logo Design',
      'Poster Design',
      'Business Card Design',
      'Invitation Card Design',
      'Brand Identity',
      'Social Media Design',
    ],
  },
  {
    name: 'Digital Marketing',
    subServices: [
      'YouTube Ads',
      'Facebook Ads',
      'Instagram Ads',
      'TikTok Ads',
      'Campaign Strategy',
      'Performance Analytics',
    ],
  },
  {
    name: 'Social Media Management',
    subServices: [
      'Content Strategy',
      'Content Creation',
      'Account Management',
      'Community Management',
      'Social Media Advertising',
      'Analytics & Reporting',
    ],
  },
  {
    name: 'Web Development',
    subServices: [
      'Custom Websites',
      'Responsive Design',
      'Modern Web Design',
      'Conversion Design',
      'Performance',
      'Ready Websites',
    ],
  },];

export const reviews: Review[] = [];