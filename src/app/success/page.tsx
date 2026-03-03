'use client';

import { useState } from 'react';
import { CheckCircle, ArrowRight, Shield, Clock, Users } from 'lucide-react';
import Link from 'next/link';

export default function SuccessPage() {
  const [email, setEmail] = useState('');
  const [downloaded, setDownloaded] = useState(false);

  const handleDownload = (os: string) => {
    setDownloaded(true);
    // In production, this would trigger the actual script download
    console.log(`Downloading setup script for ${os}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white py-12">
      <div className="max-w-4xl mx-auto px-4">
        {/* Success Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-green-100 text-green-700 rounded-full text-lg font-medium mb-6">
            <CheckCircle className="w-6 h-6" />
            Payment Successful!
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Welcome to Your OpenClaw Setup! 🎉</h1>
          <p className="text-xl text-gray-600 mb-8">
            Your purchase is confirmed. Let's get your AI assistant running in 15 minutes.
          </p>
        </div>

        {/* What's Next */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">What's Next?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">1. Download Setup Script</h3>
              <p className="text-gray-600 mb-4">
                Download the automated installation script for your operating system.
              </p>
              <div className="space-y-3">
                <button
                  onClick={() => handleDownload('windows')}
                  className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Download for Windows (.ps1)
                </button>
                <button
                  onClick={() => handleDownload('mac')}
                  className="w-full px-4 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                >
                  Download for Mac (.sh)
                </button>
                <button
                  onClick={() => handleDownload('linux')}
                  className="w-full px-4 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
                >
                  Download for Linux (.sh)
                </button>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-4">2. Quick Setup Guide</h3>
              <div className="space-y-3 text-sm text-gray-600">
                <div className="flex items-center">
                  <span className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold mr-3">1</span>
                  <span>Right-click the downloaded file and "Run with PowerShell" (Windows)</span>
                </div>
                <div className="flex items-center">
                  <span className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold mr-3">2</span>
                  <span>Or run in Terminal: <code className="bg-gray-100 px-1">./script.sh</code> (Mac/Linux)</span>
                </div>
                <div className="flex items-center">
                  <span className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold mr-3">3</span>
                  <span>Follow the automated prompts</span>
                </div>
                <div className="flex items-center">
                  <span className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold mr-3">4</span>
                  <span>Your dashboard opens at <code className="bg-gray-100 px-1">localhost:3001</code></span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl">
            <h3 className="font-semibold text-gray-900 mb-4">What You're Getting:</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" /> Complete OpenClaw installation</li>
                <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" /> Planner Pro & Marketing Mark agents</li>
                <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" /> All integrations configured</li>
                <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" /> 5 workflow templates</li>
              </ul>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" /> Personal knowledge base</li>
                <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" /> Communication channels</li>
                <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" /> 30-day optimization</li>
                <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" /> Priority support</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Support Section */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Need Help?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-blue-50 rounded-xl">
              <Clock className="w-8 h-8 text-blue-600 mx-auto mb-4" />
              <h3 className="font-semibold text-gray-900 mb-2">Average Setup Time</h3>
              <p className="text-2xl font-bold text-blue-600">12 minutes</p>
              <p className="text-sm text-gray-600">Most customers complete in under 15 minutes</p>
            </div>
            
            <div className="text-center p-6 bg-green-50 rounded-xl">
              <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-4" />
              <h3 className="font-semibold text-gray-900 mb-2">Success Rate</h3>
              <p className="text-2xl font-bold text-green-600">95%</p>
              <p className="text-sm text-gray-600">Automated setup completes successfully</p>
            </div>
            
            <div className="text-center p-6 bg-purple-50 rounded-xl">
              <Users className="w-8 h-8 text-purple-600 mx-auto mb-4" />
              <h3 className="font-semibold text-gray-900 mb-2">Support Available</h3>
              <p className="text-2xl font-bold text-purple-600">24/7</p>
              <p className="text-sm text-gray-600">Priority support for first 20 customers</p>
            </div>
          </div>

          <div className="mt-8 p-6 bg-yellow-50 border border-yellow-200 rounded-xl">
            <div className="flex items-start">
              <Shield className="w-5 h-5 text-yellow-600 mr-3 mt-0.5" />
              <div>
                <h4 className="font-semibold text-yellow-800 mb-2">30-Day Money-Back Guarantee</h4>
                <p className="text-sm text-yellow-700">
                  If your setup doesn't work as promised, we'll refund your $50 and provide manual assistance to get it working.
                </p>
              </div>
            </div>
          </div>

          <div className="text-center mt-8">
            <p className="text-gray-600 mb-4">
              Questions about your setup? We're here to help!
            </p>
            <Link 
              href="mailto:support@openclaw-setup.ai"
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Contact Support
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}