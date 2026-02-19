'use client';

import { useState } from 'react';
import { Waitlist, Template } from '@/types';
import { templates } from '@/lib/templates';
import SignupForm from './SignupForm';
import { Zap, Shield, Users, Star, Mail, Check } from 'lucide-react';

interface WaitlistPublicPageProps {
  waitlist: Waitlist;
  referralCode?: string;
}

const iconMap: Record<string, React.ReactNode> = {
  zap: <Zap className="w-6 h-6" />,
  shield: <Shield className="w-6 h-6" />,
  users: <Users className="w-6 h-6" />,
  star: <Star className="w-6 h-6" />,
  mail: <Mail className="w-6 h-6" />,
  check: <Check className="w-6 h-6" />,
};

export default function WaitlistPublicPage({ waitlist, referralCode }: WaitlistPublicPageProps) {
  const template = templates[waitlist.template];
  const { branding, settings } = waitlist;
  
  const [totalSignups, setTotalSignups] = useState(waitlist.signups?.length || 0);

  const handleSuccess = () => {
    setTotalSignups(prev => prev + 1);
  };

  return (
    <div
      className="min-h-screen"
      style={{
        fontFamily: branding.fontFamily || 'Inter, sans-serif',
        '--primary-color': branding.primaryColor,
        '--secondary-color': branding.secondaryColor,
      } as React.CSSProperties}
    >
      {/* Hero Section */}
      <section
        className="relative py-20 px-4"
        style={{
          background: `linear-gradient(135deg, ${branding.primaryColor}15, ${branding.secondaryColor}15)`,
        }}
      >
        <div className="max-w-4xl mx-auto text-center">
          {branding.logo && (
            <img src={branding.logo} alt="Logo" className="h-12 mx-auto mb-6" />
          )}
          
          <h1 className="text-4xl md:text-6xl font-bold mb-4" style={{ color: branding.primaryColor }}>
            {settings.title}
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            {settings.subtitle}
          </p>

          <div className="max-w-md mx-auto bg-white p-6 rounded-2xl shadow-lg">
            <SignupForm
              waitlistId={waitlist.id}
              settings={settings}
              referralCode={referralCode}
              primaryColor={branding.primaryColor}
              onSuccess={handleSuccess}
            />
          </div>

          <p className="mt-4 text-sm text-gray-500">
            {totalSignups.toLocaleString()} people have already joined
          </p>
        </div>
      </section>

      {/* Features Section */}
      {template.sections.find(s => s.type === 'features')?.visible && (
        <section className="py-16 px-4 bg-white">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">
              {template.sections.find(s => s.type === 'features')?.content.title || 'Features'}
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {template.sections.find(s => s.type === 'features')?.content.features?.map((feature: any, index: number) => (
                <div key={index} className="text-center p-6 rounded-xl bg-gray-50">
                  <div
                    className="w-12 h-12 rounded-lg mx-auto mb-4 flex items-center justify-center"
                    style={{ backgroundColor: `${branding.primaryColor}20`, color: branding.primaryColor }}
                  >
                    {iconMap[feature.icon] || <Star className="w-6 h-6" />}
                  </div>
                  <h3 className="font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-600 text-sm">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQ Section */}
      {template.sections.find(s => s.type === 'faq')?.visible && (
        <section className="py-16 px-4 bg-gray-50">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">
              {template.sections.find(s => s.type === 'faq')?.content.title || 'FAQ'}
            </h2>
            
            <div className="space-y-4">
              {template.sections.find(s => s.type === 'faq')?.content.items?.map((item: any, index: number) => (
                <div key={index} className="bg-white p-6 rounded-xl">
                  <h3 className="font-semibold mb-2" style={{ color: branding.primaryColor }}>
                    {item.question}
                  </h3>
                  <p className="text-gray-600">{item.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="py-8 px-4 bg-gray-900 text-gray-400 text-center">
        <p>Powered by WaitlistPro</p>
      </footer>
    </div>
  );
}
