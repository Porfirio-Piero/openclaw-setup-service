export interface Waitlist {
  id: string;
  name: string;
  slug: string;
  description: string;
  template: TemplateType;
  branding: BrandingConfig;
  settings: WaitlistSettings;
  signups: Signup[];
  createdAt: string;
  updatedAt: string;
  userId: string;
  plan: 'free' | 'pro';
}

export interface Signup {
  id: string;
  email: string;
  name?: string;
  referralCode: string;
  referredBy?: string;
  referrals: number;
  position: number;
  verified: boolean;
  verifiedAt?: string;
  createdAt: string;
  metadata?: Record<string, any>;
}

export interface BrandingConfig {
  logo?: string;
  primaryColor: string;
  secondaryColor: string;
  fontFamily: string;
  customCSS?: string;
}

export interface WaitlistSettings {
  title: string;
  subtitle: string;
  ctaText: string;
  successMessage: string;
  referralMessage: string;
  enableReferrals: boolean;
  maxSignups?: number;
  requireVerification: boolean;
  customDomain?: string;
  seoTitle?: string;
  seoDescription?: string;
  socialImage?: string;
}

export type TemplateType = 'saas' | 'app' | 'course' | 'newsletter' | 'physical';

export interface Template {
  id: TemplateType;
  name: string;
  description: string;
  thumbnail: string;
  defaultBranding: BrandingConfig;
  defaultSettings: WaitlistSettings;
  sections: Section[];
}

export interface Section {
  id: string;
  type: 'hero' | 'features' | 'faq' | 'social-proof' | 'footer';
  content: any;
  visible: boolean;
  order: number;
}

export interface Analytics {
  totalSignups: number;
  verifiedSignups: number;
  referralSignups: number;
  conversionRate: number;
  topReferrers: { email: string; referrals: number }[];
  dailySignups: { date: string; count: number }[];
  trafficSources: { source: string; count: number }[];
}

export interface User {
  id: string;
  email: string;
  name?: string;
  plan: 'free' | 'pro';
  stripeCustomerId?: string;
  stripeSubscriptionId?: string;
  waitlists: string[];
  maxWaitlists: number;
  maxSignupsPerWaitlist: number;
  createdAt: string;
}
