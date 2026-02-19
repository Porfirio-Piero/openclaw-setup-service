'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Navigation from '@/components/Navigation';
import AnalyticsDashboard from '@/components/AnalyticsDashboard';
import { Waitlist, Analytics } from '@/types';
import { ArrowLeft, Link as LinkIcon, Edit, Trash2 } from 'lucide-react';
import Link from 'next/link';

export default function WaitlistDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [waitlist, setWaitlist] = useState<Waitlist | null>(null);
  const [analytics, setAnalytics] = useState<Analytics | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'analytics' | 'settings' | 'signups'>('analytics');

  useEffect(() => {
    const loadWaitlist = () => {
      const stored = localStorage.getItem('waitlists');
      if (stored) {
        const waitlists: Waitlist[] = JSON.parse(stored);
        const found = waitlists.find(w => w.id === params.id);
        if (found) {
          setWaitlist(found);
          // Calculate simple analytics
          const signups = found.signups || [];
          const verified = signups.filter(s => s.verified);
          const referrals = signups.filter(s => s.referredBy);
          const dailyMap = new Map<string, number>();
          signups.forEach(s => {
            const date = s.createdAt.split('T')[0];
            dailyMap.set(date, (dailyMap.get(date) || 0) + 1);
          });
          
          setAnalytics({
            totalSignups: signups.length,
            verifiedSignups: verified.length,
            referralSignups: referrals.length,
            conversionRate: signups.length > 0 ? (verified.length / signups.length) * 100 : 0,
            topReferrers: signups
              .filter(s => s.referrals > 0)
              .sort((a, b) => b.referrals - a.referrals)
              .slice(0, 10)
              .map(s => ({ email: s.email, referrals: s.referrals })),
            dailySignups: Array.from(dailyMap.entries())
              .map(([date, count]) => ({ date, count }))
              .sort((a, b) => a.date.localeCompare(b.date)),
            trafficSources: [{ source: 'Direct', count: signups.length }],
          });
        }
      }
      setLoading(false);
    };

    loadWaitlist();
  }, [params.id]);

  const handleDelete = () => {
    if (confirm('Are you sure you want to delete this waitlist?')) {
      const stored = localStorage.getItem('waitlists');
      if (stored) {
        const waitlists: Waitlist[] = JSON.parse(stored);
        const filtered = waitlists.filter(w => w.id !== params.id);
        localStorage.setItem('waitlists', JSON.stringify(filtered));
      }
      router.push('/dashboard');
    }
  };

  const copyLink = () => {
    if (waitlist) {
      navigator.clipboard.writeText(`${window.location.origin}/w/${waitlist.slug}`);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <main className="max-w-6xl mx-auto px-4 py-8">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-gray-200 rounded w-1/4"></div>
            <div className="h-64 bg-gray-200 rounded-xl"></div>
          </div>
        </main>
      </div>
    );
  }

  if (!waitlist || !analytics) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <main className="max-w-6xl mx-auto px-4 py-8">
          <div className="text-center py-16">
            <h2 className="text-xl font-semibold">Waitlist not found</h2>
            <Link href="/dashboard" className="text-indigo-600 hover:underline mt-4 inline-block">
              Back to Dashboard
            </Link>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-6">
          <Link
            href="/dashboard"
            className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            Back to Dashboard
          </Link>
          
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center gap-4">
              <div
                className="w-14 h-14 rounded-xl flex items-center justify-center"
                style={{
                  background: `linear-gradient(135deg, ${waitlist.branding.primaryColor}, ${waitlist.branding.secondaryColor})`,
                }}
              >
                <span className="text-white font-bold text-xl">{waitlist.name[0]}</span>
              </div>
              
              <div>
                <h1 className="text-2xl font-bold">{waitlist.name}</h1>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <span>/{waitlist.slug}</span>
                  <button
                    onClick={copyLink}
                    className="p-1 hover:bg-gray-100 rounded"
                    title="Copy link"
                  >
                    <LinkIcon className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
            
            <div className="flex gap-2">
              <Link
                href={`/w/${waitlist.slug}`}
                target="_blank"
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors"
              >
                View Live Page
              </Link>
              
              <button
                onClick={handleDelete}
                className="px-4 py-2 border border-red-300 text-red-600 rounded-lg font-medium hover:bg-red-50 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 mb-6">
          <div className="flex gap-8">
            {(['analytics', 'signups', 'settings'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-4 text-sm font-medium capitalize ${
                  activeTab === tab
                    ? 'border-b-2 border-indigo-600 text-indigo-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'analytics' && (
          <AnalyticsDashboard analytics={analytics} waitlistId={waitlist.id} />
        )}

        {activeTab === 'signups' && (
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Position</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Referrals</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {waitlist.signups?.map((signup) => (
                    <tr key={signup.id}>
                      <td className="px-6 py-4 text-sm">{signup.email}</td>
                      <td className="px-6 py-4 text-sm">{signup.name || '-'}</td>
                      <td className="px-6 py-4 text-sm">#{signup.position}</td>
                      <td className="px-6 py-4 text-sm">{signup.referrals}</td>
                      <td className="px-6 py-4 text-sm">
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          signup.verified
                            ? 'bg-green-100 text-green-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {signup.verified ? 'Verified' : 'Pending'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {new Date(signup.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  )) || (
                    <tr>
                      <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                        No signups yet. Share your waitlist to get started!
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="bg-white p-6 rounded-xl border border-gray-200 space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">Page Title</label>
              <input
                type="text"
                defaultValue={waitlist.settings.title}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Subtitle</label>
              <textarea
                defaultValue={waitlist.settings.subtitle}
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">CTA Button Text</label>
              <input
                type="text"
                defaultValue={waitlist.settings.ctaText}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              />
            </div>
            
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="referrals"
                defaultChecked={waitlist.settings.enableReferrals}
                className="w-4 h-4"
              />
              <label htmlFor="referrals" className="text-sm">Enable referral tracking</label>
            </div>
            
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="verification"
                defaultChecked={waitlist.settings.requireVerification}
                className="w-4 h-4"
              />
              <label htmlFor="verification" className="text-sm">Require email verification</label>
            </div>
            
            <div className="pt-4 border-t">
              <button className="px-6 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors">
                Save Changes
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
