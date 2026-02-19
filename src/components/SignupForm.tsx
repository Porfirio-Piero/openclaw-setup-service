'use client';

import { useState } from 'react';
import { validateEmail } from '@/lib/utils';

interface SignupFormProps {
  waitlistId: string;
  settings: {
    ctaText: string;
    successMessage: string;
    referralMessage: string;
    enableReferrals: boolean;
    requireVerification: boolean;
  };
  referralCode?: string;
  primaryColor: string;
  onSuccess?: (data: { position: number; referralCode: string }) => void;
}

export default function SignupForm({
  waitlistId,
  settings,
  referralCode,
  primaryColor,
  onSuccess,
}: SignupFormProps) {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [signupData, setSignupData] = useState<{ position: number; referralCode: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`/api/waitlists/${waitlistId}/signups`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          name: name || undefined,
          referralCode,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to join waitlist');
      }

      setSuccess(true);
      setSignupData(data.signup);
      onSuccess?.(data.signup);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (success && signupData) {
    return (
      <div className="text-center space-y-4">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4">
          <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        
        <h3 className="text-xl font-semibold">{settings.successMessage}</h3>
        
        <div className="bg-gray-50 rounded-lg p-4 mt-4">
          <p className="text-2xl font-bold" style={{ color: primaryColor }}>
            You're #{signupData.position} in line!
          </p>
        </div>

        {settings.enableReferrals && (
          <div className="mt-6 space-y-3">
            <p className="text-gray-600">{settings.referralMessage}</p>
            <div className="flex items-center gap-2">
              <input
                type="text"
                readOnly
                value={`${typeof window !== 'undefined' ? window.location.origin : ''}/w/${waitlistId}?ref=${signupData.referralCode}`}
                className="flex-1 px-4 py-2 border rounded-lg text-sm bg-gray-50"
              />
              <button
                onClick={() => {
                  navigator.clipboard.writeText(`${window.location.origin}/w/${waitlistId}?ref=${signupData.referralCode}`);
                }}
                className="px-4 py-2 text-white rounded-lg text-sm font-medium transition-colors"
                style={{ backgroundColor: primaryColor }}
              >
                Copy
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="p-3 bg-red-50 text-red-600 rounded-lg text-sm">{error}</div>
      )}

      <div>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-offset-2 focus:outline-none transition-all"
          style={{ '--tw-ring-color': primaryColor } as React.CSSProperties}
          required
        />
      </div>

      <div>
        <input
          type="text"
          placeholder="Your name (optional)"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-offset-2 focus:outline-none transition-all"
          style={{ '--tw-ring-color': primaryColor } as React.CSSProperties}
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full px-6 py-3 text-white rounded-lg font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90"
        style={{ backgroundColor: primaryColor }}
      >
        {loading ? 'Joining...' : settings.ctaText}
      </button>
    </form>
  );
}
