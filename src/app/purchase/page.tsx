'use client';

import Link from 'next/link';
import { Check, ArrowLeft, Shield, Clock, Users } from 'lucide-react';

export default function PurchasePage() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In production, this would process the Stripe payment
    alert('Payment processing would be handled by Stripe here!');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12">
      <div className="max-w-4xl mx-auto px-4">
        {/* Back Button */}
        <Link href="/" className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-8">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Order Summary */}
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-6">Complete Your Order</h1>
            
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
              <h2 className="text-xl font-semibold mb-6">Order Summary</h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span>OpenClaw Autonomous Setup</span>
                  <span>$50.00</span>
                </div>
                <div className="flex justify-between text-gray-500">
                  <span>Setup automation</span>
                  <span>Included</span>
                </div>
                <div className="flex justify-between text-gray-500">
                  <span>Custom agents & skills</span>
                  <span>Included</span>
                </div>
                <div className="flex justify-between text-gray-500">
                  <span>30-day support</span>
                  <span>Included</span>
                </div>
                <div className="border-t border-gray-200 pt-4 flex justify-between font-semibold text-lg">
                  <span>Total</span>
                  <span>$50.00</span>
                </div>
              </div>

              {/* What's Included */}
              <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6">
                <h3 className="font-semibold mb-4 text-gray-900">What's Included:</h3>
                <ul className="space-y-2">
                  <li className="flex items-center"><Check className="w-4 h-4 text-green-500 mr-2" /> Fully automated OpenClaw installation</li>
                  <li className="flex items-center"><Check className="w-4 h-4 text-green-500 mr-2" /> Planner Pro & Marketing Mark agents</li>
                  <li className="flex items-center"><Check className="w-4 h-4 text-green-500 mr-2" /> WhatsApp, Discord, Slack integrations</li>
                  <li className="flex items-center"><Check className="w-4 h-4 text-green-500 mr-2" /> Personal knowledge base setup</li>
                  <li className="flex items-center"><Check className="w-4 h-4 text-green-500 mr-2" /> 5 workflow templates</li>
                  <li className="flex items-center"><Check className="w-4 h-4 text-green-500 mr-2" /> 30-day optimization & support</li>
                </ul>
              </div>

              {/* Guarantees */}
              <div className="mt-6 space-y-3">
                <div className="flex items-center text-sm text-gray-600">
                  <Clock className="w-4 h-4 mr-2 text-green-500" />
                  <span>Setup completes in 15 minutes or less</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Shield className="w-4 h-4 mr-2 text-blue-500" />
                  <span>30-day money-back guarantee</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Users className="w-4 h-4 mr-2 text-purple-500" />
                  <span>1,000+ successful setups completed</span>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Form */}
          <div>
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
              <h2 className="text-xl font-semibold mb-6">Payment Information</h2>
              
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="your@email.com"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="John Doe"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Operating System
                  </label>
                  <select className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                    <option value="windows">Windows 10/11</option>
                    <option value="mac">macOS</option>
                    <option value="linux">Linux</option>
                  </select>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
                  <p className="text-sm text-yellow-800">
                    <strong>Note:</strong> After payment, you'll receive download links for the automated setup script specific to your operating system.
                  </p>
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-bold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105"
                >
                  Complete Purchase - $50.00
                </button>

                <div className="text-center">
                  <p className="text-xs text-gray-500">
                    Demo Mode - No actual payment processed
                  </p>
                </div>
              </form>
            </div>

            {/* Additional Info */}
            <div className="mt-6 bg-gray-50 rounded-xl p-6">
              <h3 className="font-semibold mb-4">What Happens Next?</h3>
              <ol className="space-y-3 text-sm text-gray-600">
                <li className="flex">
                  <span className="bg-blue-100 text-blue-600 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold mr-3 mt-0.5">1</span>
                  <span>You'll receive a confirmation email with setup instructions</span>
                </li>
                <li className="flex">
                  <span className="bg-blue-100 text-blue-600 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold mr-3 mt-0.5">2</span>
                  <span>Download the automated setup script for your operating system</span>
                </li>
                <li className="flex">
                  <span className="bg-blue-100 text-blue-600 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold mr-3 mt-0.5">3</span>
                  <span>Run the script and follow the 15-minute guided setup</span>
                </li>
                <li className="flex">
                  <span className="bg-blue-100 text-blue-600 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold mr-3 mt-0.5">4</span>
                  <span>Your fully configured AI assistant is ready to use!</span>
                </li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}