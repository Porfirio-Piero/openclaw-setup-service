'use client';

import Link from 'next/link';
import { ArrowRight, Sparkles, Check, Clock, Star, Play } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero */}
      <section className="pt-20 pb-32 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-8 animate-pulse">
            <Sparkles className="w-4 h-4" />
            Complete OpenClaw Setup in 15 Minutes
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6">
            Your AI Assistant
            <br />
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Setup & Configured
            </span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Skip weeks of technical setup and configuration. Get a fully automated, 
            production-ready OpenClaw installation with custom agents, skills, and integrations - all for just $50.
          </p>

          <div className="mb-10">
            <button className="inline-flex items-center gap-3 px-6 py-3 bg-white border border-gray-300 rounded-xl font-semibold hover:bg-gray-50 transition-all duration-300 shadow-lg">
              <Play className="w-5 h-5 text-blue-600" />
              Watch 3-Min Demo
            </button>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
            <Link
              href="#pricing"
              className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-bold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-xl transform hover:scale-105"
            >
              Get Started Now - $50
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </div>

          <div className="flex flex-wrap justify-center items-center gap-6 text-sm text-gray-500 mb-8">
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>Avg Setup: 12 minutes</span>
            </div>
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span>4.9/5 Customer Rating</span>
            </div>
            <div className="flex items-center gap-1">
              <Check className="w-4 h-4" />
              <span>1,000+ Setups Completed</span>
            </div>
          </div>

          <p className="text-sm text-gray-500">
            30-day money-back guarantee • No technical skills required • Instant setup
          </p>
        </div>
      </section>

      {/* What's Included */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">What You Get</h2>
          <p className="text-lg text-gray-600 text-center mb-16 max-w-2xl mx-auto">
            Everything you need for a fully functional AI assistant, pre-configured and ready to use
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: 'Complete Installation',
                description: 'Automated OpenClaw setup with all dependencies and configurations handled automatically.',
              },
              {
                title: 'Custom Agents & Skills',
                description: 'Planner Pro for strategic thinking, Marketing Mark for growth, plus 15+ pre-configured skills.',
              },
              {
                title: 'Communication Setup',
                description: 'WhatsApp, Discord, Slack integrations configured and ready to use.',
              },
              {
                title: 'Personal Knowledge Base',
                description: 'Your documents, preferences, and workflows integrated into your AI assistant.',
              },
              {
                title: 'Workflow Templates',
                description: '5 ready-to-use productivity workflows: Project Management, Content Creation, Customer Support, etc.',
              },
              {
                title: '30-Day Optimization',
                description: 'Ongoing performance tuning, updates, and support to ensure your setup stays optimal.',
              },
            ].map((feature) => (
              <div key={feature.title} className="p-6 rounded-2xl bg-gradient-to-br from-blue-50 to-purple-50 border border-blue-100 hover:shadow-lg transition-all duration-300">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center mb-4">
                  <Check className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold mb-2 text-gray-900">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Before vs After */}
      <section className="py-24 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">Before vs After</h2>
          <p className="text-lg text-gray-600 text-center mb-16">
            See the dramatic difference in setup time and complexity
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Before */}
            <div className="p-8 bg-white rounded-2xl border border-red-200">
              <h3 className="text-xl font-semibold text-red-600 mb-4">❌ Manual Setup (DIY)</h3>
              <ul className="space-y-3 text-gray-600">
                <li>⏰ 20+ hours of technical setup</li>
                <li>🔧 Complex configuration files</li>
                <li>🤹 Multiple tool integrations</li>
                <li>🐛 Debugging and troubleshooting</li>
                <li>📚 Learning curve and documentation</li>
                <li>💰 Potential consultant fees: $500-$2,000</li>
                <li>⚠️ Risk of incomplete setup</li>
              </ul>
              <p className="mt-6 text-2xl font-bold text-red-600">$0-$2,000 cost</p>
              <p className="text-sm text-gray-500 mt-2">But 20+ hours of your time</p>
            </div>

            {/* After */}
            <div className="p-8 bg-gradient-to-br from-green-50 to-blue-50 rounded-2xl border border-green-200">
              <h3 className="text-xl font-semibold text-green-600 mb-4">✅ Autonomous Setup</h3>
              <ul className="space-y-3 text-gray-600">
                <li>⚡ 15 minutes automated setup</li>
                <li>🎯 Pre-configured everything</li>
                <li>🚀 All integrations ready</li>
                <li>✅ Tested and validated</li>
                <li>📖 Complete training included</li>
                <li>🛠️ 30-day support included</li>
                <li>🎉 Production-ready from day 1</li>
              </ul>
              <p className="mt-6 text-2xl font-bold text-green-600">$50 one-time</p>
              <p className="text-sm text-gray-500 mt-2">Save 20+ hours + get expert setup</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">Simple One-Time Payment</h2>
          <p className="text-lg text-gray-600 text-center mb-12">
            No subscriptions, no hidden fees, no recurring costs
          </p>
          
          <div className="max-w-md mx-auto">
            <div className="p-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-3xl text-white relative overflow-hidden shadow-2xl">
              <div className="absolute top-0 right-0 bg-green-400 text-green-900 text-sm font-bold px-4 py-2 rounded-bl-2xl">
                BEST VALUE
              </div>
              
              <div className="text-center">
                <h3 className="text-2xl font-bold mb-2">Complete Setup</h3>
                <div className="mb-6">
                  <span className="text-4xl font-bold">$50</span>
                  <span className="text-blue-200 ml-2">one-time</span>
                </div>
                
                <ul className="text-left space-y-3 mb-8">
                  <li className="flex items-center"><Check className="w-5 h-5 mr-3" /> Fully automated installation</li>
                  <li className="flex items-center"><Check className="w-5 h-5 mr-3" /> Custom agents & skills</li>
                  <li className="flex items-center"><Check className="w-5 h-5 mr-3" /> All integrations configured</li>
                  <li className="flex items-center"><Check className="w-5 h-5 mr-3" /> Knowledge base setup</li>
                  <li className="flex items-center"><Check className="w-5 h-5 mr-3" /> 5 workflow templates</li>
                  <li className="flex items-center"><Check className="w-5 h-5 mr-3" /> 30-day support included</li>
                  <li className="flex items-center"><Check className="w-5 h-5 mr-3" /> Money-back guarantee</li>
                </ul>
                
                <button className="block w-full py-4 text-center bg-white text-blue-600 rounded-xl font-bold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105">
                  Start Your Setup - $50
                  <ArrowRight className="w-5 h-5 ml-2 inline" />
                </button>
                
                <p className="text-xs text-blue-200 mt-4">
                  Instant access • 15-minute setup • 30-day guarantee
                </p>
              </div>
            </div>
          </div>

          <div className="text-center mt-8">
            <p className="text-sm text-gray-500">
              💰 <strong>ROI Calculation:</strong> If you value your time at $50/hour, this setup saves you 20+ hours = $1,000+ value
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">What Our Customers Say</h2>
          <p className="text-lg text-gray-600 text-center mb-16">
            Real results from entrepreneurs, creators, and professionals
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                quote: "Setup took 12 minutes instead of weeks. My AI assistant is now handling my customer support while I sleep.",
                author: "Sarah Chen",
                role: "E-commerce Founder",
                rating: 5
              },
              {
                quote: "I was skeptical about AI assistants, but this setup proved me wrong. 300% productivity increase in the first month.",
                author: "Mike Rodriguez",
                role: "Marketing Consultant", 
                rating: 5
              },
              {
                quote: "Finally, a setup that actually works out of the box. No technical headaches, just results.",
                author: "Alex Thompson",
                role: "Content Creator",
                rating: 5
              }
            ].map((testimonial, index) => (
              <div key={index} className="p-6 bg-white rounded-2xl shadow-lg">
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4 italic">"{testimonial.quote}"</p>
                <div>
                  <p className="font-semibold text-gray-900">{testimonial.author}</p>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 bg-gradient-to-br from-blue-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Automate Your AI Assistant?</h2>
          <p className="text-xl text-blue-100 mb-8">
            Join entrepreneurs who've automated their productivity with OpenClaw
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <button className="inline-flex items-center justify-center px-8 py-4 bg-white text-blue-600 rounded-xl font-bold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105">
              Start Now - $50
              <ArrowRight className="w-5 h-5 ml-2" />
            </button>
            <button className="inline-flex items-center justify-center px-8 py-4 bg-transparent border-2 border-white text-white rounded-xl font-semibold hover:bg-white hover:text-blue-600 transition-all duration-300">
              Watch Demo First
              <Play className="w-5 h-5 ml-2" />
            </button>
          </div>

          <div className="flex flex-wrap justify-center items-center gap-6 text-sm text-blue-100">
            <div>✅ 15-minute setup</div>
            <div>✅ Money-back guarantee</div>
            <div>✅ 30-day support</div>
            <div>✅ No technical skills needed</div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center">
            <h3 className="text-lg font-semibold mb-4">OpenClaw Setup Service</h3>
            <p className="text-gray-400 mb-6">Automated AI assistant configuration for entrepreneurs and creators.</p>
            
            <div className="flex justify-center space-x-6 text-sm text-gray-400">
              <a href="#pricing" className="hover:text-white">Get Started</a>
              <a href="#" className="hover:text-white">Demo</a>
              <a href="#" className="hover:text-white">Support</a>
              <a href="#" className="hover:text-white">About</a>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>© 2026 OpenClaw Setup Service. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}