'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Navigation from '@/components/Navigation';
import { Waitlist } from '@/types';
import { Plus, ExternalLink, BarChart3, Users } from 'lucide-react';

export default function DashboardPage() {
  const [waitlists, setWaitlists] = useState<Waitlist[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Demo user ID - in production, this comes from auth
    const userId = 'demo-user-' + Date.now();
    
    // Load from local storage for demo
    const stored = localStorage.getItem('waitlists');
    if (stored) {
      setWaitlists(JSON.parse(stored));
    }
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <main className="max-w-7xl mx-auto px-4 py-8">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-gray-200 rounded w-1/4"></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-48 bg-gray-200 rounded-xl"></div>
              ))}
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold">Your Waitlists</h1>
            <p className="text-gray-600">Manage and track your waitlists</p>
          </div>
          
          <Link
            href="/dashboard/new"
            className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors"
          >
            <Plus className="w-5 h-5 mr-2" />
            New Waitlist
          </Link>
        </div>

        {waitlists.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-gray-200">
            <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Plus className="w-8 h-8 text-indigo-600" />
            </div>
            
            <h2 className="text-xl font-semibold mb-2">No waitlists yet</h2>
            <p className="text-gray-600 mb-6">Create your first waitlist to start building your audience.</p>
            
            <Link
              href="/dashboard/new"
              className="inline-flex items-center px-6 py-3 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 transition-colors"
            >
              Create Waitlist
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {waitlists.map((waitlist) => (
              <div
                key={waitlist.id}
                className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-start justify-between mb-4">
                  <div
                    className="w-12 h-12 rounded-lg flex items-center justify-center"
                    style={{
                      background: `linear-gradient(135deg, ${waitlist.branding.primaryColor}, ${waitlist.branding.secondaryColor})`,
                    }}
                  >
                    <span className="text-white font-bold text-lg">{waitlist.name[0]}</span>
                  </div>
                  
                  <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full capitalize">
                    {waitlist.template}
                  </span>
                </div>
                
                <h3 className="font-semibold text-lg mb-1">{waitlist.name}</h3>
                <p className="text-gray-500 text-sm mb-4 truncate">/{waitlist.slug}</p>
                
                <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                  <span className="flex items-center">
                    <Users className="w-4 h-4 mr-1" />
                    {waitlist.signups?.length || 0} signups
                  </span>
                </div>
                
                <div className="flex gap-2">
                  <Link
                    href={`/dashboard/waitlists/${waitlist.id}`}
                    className="flex-1 px-3 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors text-center"
                  >
                    <BarChart3 className="w-4 h-4 inline mr-1" />
                    Analytics
                  </Link>
                  
                  <Link
                    href={`/w/${waitlist.slug}`}
                    target="_blank"
                    className="flex-1 px-3 py-2 bg-indigo-50 text-indigo-600 rounded-lg text-sm font-medium hover:bg-indigo-100 transition-colors text-center"
                  >
                    <ExternalLink className="w-4 h-4 inline mr-1" />
                    View
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
