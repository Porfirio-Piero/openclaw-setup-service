import Link from 'next/link';
import { ArrowRight, Sparkles, Zap, Shield } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Hero */}
      <section className="pt-20 pb-32 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-50 text-indigo-600 rounded-full text-sm font-medium mb-8">
            <Sparkles className="w-4 h-4" />
            Launch your product with confidence
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6">
            Beautiful Waitlists
            <br />
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              That Convert
            </span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
            Create stunning waitlist pages in minutes. Capture emails, track referrals,
            and launch your product with a built-in audience.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/dashboard/new"
              className="inline-flex items-center justify-center px-8 py-4 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 transition-colors"
            >
              Create Free Waitlist
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
            <Link
              href="/pricing"
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-gray-700 border border-gray-300 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
            >
              View Pricing
            </Link>
          </div>
          
          <p className="mt-4 text-sm text-gray-500">
            Free forever for your first waitlist • No credit card required
          </p>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-16">Everything You Need to Launch</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Zap,
                title: '5 Beautiful Templates',
                description: 'Choose from SaaS, App, Course, Newsletter, and Physical Product templates.',
              },
              {
                icon: Shield,
                title: 'Referral Tracking',
                description: 'Built-in viral loops. Users share to move up in line or unlock rewards.',
              },
              {
                icon: Sparkles,
                title: 'Analytics Dashboard',
                description: 'Track signups, conversion rates, referrals, and export your data.',
              },
            ].map((feature) => (
              <div key={feature.title} className="p-6 rounded-2xl bg-gray-50">
                <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-indigo-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-16">Simple Pricing</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            <div className="p-8 bg-white rounded-2xl border border-gray-200">
              <h3 className="text-xl font-semibold">Free</h3>
              <p className="text-4xl font-bold mt-4">$0</p>
              <p className="text-gray-500">Forever free</p>
              
              <ul className="mt-6 space-y-3">
                <li className="flex items-center"><Check className="w-5 h-5 text-green-500 mr-2" /> 1 waitlist</li>
                <li className="flex items-center"><Check className="w-5 h-5 text-green-500 mr-2" /> 100 signups</li>
                <li className="flex items-center"><Check className="w-5 h-5 text-green-500 mr-2" /> All templates</li>
                <li className="flex items-center"><Check className="w-5 h-5 text-green-500 mr-2" /> Basic analytics</li>
              </ul>
              
              <Link
                href="/dashboard/new"
                className="block w-full mt-8 py-3 text-center border border-gray-300 rounded-xl font-medium hover:bg-gray-50 transition-colors"
              >
                Get Started
              </Link>
            </div>
            
            <div className="p-8 bg-indigo-600 rounded-2xl text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-green-400 text-green-900 text-xs font-bold px-3 py-1 rounded-bl-lg">
                BEST VALUE
              </div>
              
              <h3 className="text-xl font-semibold">Pro</h3>
              <p className="text-4xl font-bold mt-4">$15</p>
              <p className="text-indigo-200">per month</p>
              
              <ul className="mt-6 space-y-3">
                <li className="flex items-center"><Check className="w-5 h-5 mr-2" /> Unlimited waitlists</li>
                <li className="flex items-center"><Check className="w-5 h-5 mr-2" /> Unlimited signups</li>
                <li className="flex items-center"><Check className="w-5 h-5 mr-2" /> Custom domain</li>
                <li className="flex items-center"><Check className="w-5 h-5 mr-2" /> Priority support</li>
              </ul>
              
              <Link
                href="/dashboard/new"
                className="block w-full mt-8 py-3 text-center bg-white text-indigo-600 rounded-xl font-medium hover:bg-gray-100 transition-colors"
              >
                Upgrade to Pro
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Launch?</h2>
          <p className="text-xl text-gray-600 mb-8">
            Join thousands of creators who use WaitlistPro to build their audience.
          </p>
          
          <Link
            href="/dashboard/new"
            className="inline-flex items-center px-8 py-4 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 transition-colors"
          >
            Create Your Waitlist
            <ArrowRight className="w-5 h-5 ml-2" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 text-center text-gray-500">
          <p>© 2026 WaitlistPro. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

import { Check } from 'lucide-react';
