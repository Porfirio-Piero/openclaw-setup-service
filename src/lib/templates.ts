import { Template, TemplateType } from '@/types';

export const templates: Record<TemplateType, Template> = {
  saas: {
    id: 'saas',
    name: 'SaaS Launch',
    description: 'Perfect for software products and B2B tools',
    thumbnail: '/templates/saas.png',
    defaultBranding: {
      primaryColor: '#6366f1',
      secondaryColor: '#8b5cf6',
      fontFamily: 'Inter',
    },
    defaultSettings: {
      title: 'Join the Future of Work',
      subtitle: 'Be the first to experience our revolutionary platform. Early access members get 50% off forever.',
      ctaText: 'Get Early Access',
      successMessage: 'You\'re on the list! Check your email for confirmation.',
      referralMessage: 'Share your unique link to move up in line!',
      enableReferrals: true,
      requireVerification: true,
      seoTitle: 'Join the Waitlist - Revolutionary SaaS Platform',
      seoDescription: 'Be the first to experience the future of work. Sign up for early access.',
    },
    sections: [
      {
        id: 'hero',
        type: 'hero',
        visible: true,
        order: 1,
        content: {
          headline: 'The All-in-One Platform You\'ve Been Waiting For',
          subheadline: 'Streamline your workflow, boost productivity, and scale your business with our AI-powered solution.',
          image: '/hero-saas.jpg',
        },
      },
      {
        id: 'features',
        type: 'features',
        visible: true,
        order: 2,
        content: {
          title: 'Why Choose Us?',
          features: [
            { icon: 'zap', title: 'Lightning Fast', description: '10x faster than competitors' },
            { icon: 'shield', title: 'Enterprise Security', description: 'SOC 2 Type II certified' },
            { icon: 'users', title: 'Team Collaboration', description: 'Real-time collaboration features' },
            { icon: 'ai', title: 'AI-Powered', description: 'Smart automation built-in' },
          ],
        },
      },
      {
        id: 'social-proof',
        type: 'social-proof',
        visible: true,
        order: 3,
        content: {
          testimonials: [
            { name: 'Sarah Chen', role: 'CEO at TechStart', quote: 'This platform transformed our workflow.' },
            { name: 'Mike Ross', role: 'CTO at ScaleUp', quote: 'Best investment we made this year.' },
          ],
          logos: ['Company A', 'Company B', 'Company C'],
        },
      },
      {
        id: 'faq',
        type: 'faq',
        visible: true,
        order: 4,
        content: {
          title: 'Frequently Asked Questions',
          items: [
            { question: 'When will you launch?', answer: 'We\'re launching Q2 2026. Waitlist members get first access.' },
            { question: 'Is there a free trial?', answer: 'Yes! All early access members get 60 days free.' },
            { question: 'Can I invite my team?', answer: 'Absolutely. Each signup can add up to 5 team members.' },
          ],
        },
      },
    ],
  },
  app: {
    id: 'app',
    name: 'Mobile App',
    description: 'Designed for iOS and Android app launches',
    thumbnail: '/templates/app.png',
    defaultBranding: {
      primaryColor: '#10b981',
      secondaryColor: '#3b82f6',
      fontFamily: 'SF Pro Display',
    },
    defaultSettings: {
      title: 'Get the App First',
      subtitle: 'Download our app before anyone else. Join thousands on the waitlist.',
      ctaText: 'Join Waitlist',
      successMessage: 'You\'re in! We\'ll send you the download link first.',
      referralMessage: 'Invite friends to get exclusive in-app rewards!',
      enableReferrals: true,
      requireVerification: true,
      seoTitle: 'Get Early Access to Our Mobile App',
      seoDescription: 'Be the first to download our revolutionary mobile app.',
    },
    sections: [
      {
        id: 'hero',
        type: 'hero',
        visible: true,
        order: 1,
        content: {
          headline: 'Your Pocket-Sized Superpower',
          subheadline: 'The app that makes everything easier, faster, and more fun.',
          image: '/hero-app.jpg',
          appStoreBadges: true,
        },
      },
      {
        id: 'features',
        type: 'features',
        visible: true,
        order: 2,
        content: {
          title: 'App Features',
          features: [
            { icon: 'mobile', title: 'Native Experience', description: 'Built for iOS & Android' },
            { icon: 'sync', title: 'Cloud Sync', description: 'Access anywhere, anytime' },
            { icon: 'offline', title: 'Works Offline', description: 'No internet required' },
            { icon: 'dark', title: 'Dark Mode', description: 'Easy on the eyes' },
          ],
        },
      },
      {
        id: 'social-proof',
        type: 'social-proof',
        visible: true,
        order: 3,
        content: {
          screenshots: ['/screenshot1.jpg', '/screenshot2.jpg', '/screenshot3.jpg'],
          appRating: '4.9',
        },
      },
    ],
  },
  course: {
    id: 'course',
    name: 'Online Course',
    description: 'Perfect for educators and course creators',
    thumbnail: '/templates/course.png',
    defaultBranding: {
      primaryColor: '#f59e0b',
      secondaryColor: '#ef4444',
      fontFamily: 'Georgia',
    },
    defaultSettings: {
      title: 'Masterclass Waitlist',
      subtitle: 'Join the waitlist for exclusive access to our premium course. Limited spots available.',
      ctaText: 'Reserve My Spot',
      successMessage: 'Your spot is reserved! Early birds save 40%.',
      referralMessage: 'Share with 3 friends to unlock bonus content!',
      enableReferrals: true,
      requireVerification: true,
      maxSignups: 500,
      seoTitle: 'Exclusive Course Waitlist - Limited Spots',
      seoDescription: 'Join the waitlist for our premium online course. Limited to 500 students.',
    },
    sections: [
      {
        id: 'hero',
        type: 'hero',
        visible: true,
        order: 1,
        content: {
          headline: 'Learn From the Best',
          subheadline: 'A comprehensive masterclass that takes you from beginner to expert.',
          instructor: {
            name: 'Jane Smith',
            title: 'Industry Expert',
            avatar: '/instructor.jpg',
          },
        },
      },
      {
        id: 'features',
        type: 'features',
        visible: true,
        order: 2,
        content: {
          title: 'What You\'ll Learn',
          features: [
            { icon: 'video', title: '50+ Video Lessons', description: 'HD quality, lifetime access' },
            { icon: 'community', title: 'Private Community', description: 'Learn with peers' },
            { icon: 'certificate', title: 'Certificate', description: 'Showcase your skills' },
            { icon: 'support', title: '1-on-1 Support', description: 'Get your questions answered' },
          ],
        },
      },
      {
        id: 'faq',
        type: 'faq',
        visible: true,
        order: 3,
        content: {
          title: 'Course FAQ',
          items: [
            { question: 'When does the course start?', answer: 'The course launches March 1st. Waitlist members get early access Feb 20th.' },
            { question: 'How long do I have access?', answer: 'Lifetime access! Including all future updates.' },
            { question: 'Is there a refund policy?', answer: 'Yes, 30-day money-back guarantee.' },
          ],
        },
      },
    ],
  },
  newsletter: {
    id: 'newsletter',
    name: 'Newsletter',
    description: 'For writers, journalists, and content creators',
    thumbnail: '/templates/newsletter.png',
    defaultBranding: {
      primaryColor: '#ec4899',
      secondaryColor: '#8b5cf6',
      fontFamily: 'Georgia',
    },
    defaultSettings: {
      title: 'Join 50,000+ Readers',
      subtitle: 'Get the smartest insights on tech, business, and the future. Delivered weekly.',
      ctaText: 'Subscribe Free',
      successMessage: 'Welcome! Check your inbox for the latest edition.',
      referralMessage: 'Share to unlock exclusive subscriber-only content!',
      enableReferrals: true,
      requireVerification: true,
      seoTitle: 'Subscribe to Our Weekly Newsletter',
      seoDescription: 'Join 50,000+ readers getting weekly insights on tech and business.',
    },
    sections: [
      {
        id: 'hero',
        type: 'hero',
        visible: true,
        order: 1,
        content: {
          headline: 'Insights That Matter',
          subheadline: 'Weekly analysis of tech trends, business strategies, and what comes next.',
          stats: [
            { label: 'Subscribers', value: '50K+' },
            { label: 'Open Rate', value: '45%' },
            { label: 'Issues', value: '150+' },
          ],
        },
      },
      {
        id: 'features',
        type: 'features',
        visible: true,
        order: 2,
        content: {
          title: 'What You Get',
          features: [
            { icon: 'inbox', title: 'Weekly Edition', description: 'Curated insights every Tuesday' },
            { icon: 'archive', title: 'Full Archive', description: 'Access all past issues' },
            { icon: 'podcast', title: 'Audio Version', description: 'Listen on the go' },
            { icon: 'community', title: 'Community', description: 'Join the discussion' },
          ],
        },
      },
      {
        id: 'social-proof',
        type: 'social-proof',
        visible: true,
        order: 3,
        content: {
          testimonials: [
            { name: 'David Park', role: 'Founder', quote: 'The only newsletter I actually read every week.' },
            { name: 'Lisa Wong', role: 'Investor', quote: 'Has helped me make better investment decisions.' },
          ],
        },
      },
    ],
  },
  physical: {
    id: 'physical',
    name: 'Physical Product',
    description: 'For hardware, gadgets, and physical goods',
    thumbnail: '/templates/physical.png',
    defaultBranding: {
      primaryColor: '#06b6d4',
      secondaryColor: '#10b981',
      fontFamily: 'Inter',
    },
    defaultSettings: {
      title: 'Reserve Yours Now',
      subtitle: 'Limited first batch. Join the waitlist to secure your spot and get early bird pricing.',
      ctaText: 'Reserve Now',
      successMessage: 'You\'re reserved! We\'ll notify you when it\'s ready to ship.',
      referralMessage: 'Share to unlock exclusive accessories!',
      enableReferrals: true,
      requireVerification: true,
      maxSignups: 1000,
      seoTitle: 'Reserve Your Product - Limited First Batch',
      seoDescription: 'Join the waitlist for our revolutionary physical product. Limited quantities available.',
    },
    sections: [
      {
        id: 'hero',
        type: 'hero',
        visible: true,
        order: 1,
        content: {
          headline: 'The Product You\'ve Been Waiting For',
          subheadline: 'Beautifully designed, meticulously crafted, and built to last.',
          productImages: ['/product1.jpg', '/product2.jpg', '/product3.jpg'],
          price: '$299',
          originalPrice: '$399',
        },
      },
      {
        id: 'features',
        type: 'features',
        visible: true,
        order: 2,
        content: {
          title: 'Product Highlights',
          features: [
            { icon: 'quality', title: 'Premium Materials', description: 'Aerospace-grade construction' },
            { icon: 'warranty', title: '5-Year Warranty', description: 'We stand behind our products' },
            { icon: 'shipping', title: 'Free Shipping', description: 'Worldwide delivery included' },
            { icon: 'support', title: '24/7 Support', description: 'We\'re here to help' },
          ],
        },
      },
      {
        id: 'faq',
        type: 'faq',
        visible: true,
        order: 3,
        content: {
          title: 'Product FAQ',
          items: [
            { question: 'When will it ship?', answer: 'First batch ships Q2 2026. Waitlist members get priority.' },
            { question: 'What\'s in the box?', answer: 'Product, charging cable, quick start guide, and carrying case.' },
            { question: 'Can I get a refund?', answer: 'Full refund anytime before shipping. 30-day return after delivery.' },
          ],
        },
      },
    ],
  },
};

export function getTemplate(type: TemplateType): Template {
  return templates[type];
}

export function getAllTemplates(): Template[] {
  return Object.values(templates);
}
