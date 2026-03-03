'use client';

import { useState, useEffect } from 'react';
import { CheckCircle, Download, Play, Clock, AlertCircle, ArrowRight } from 'lucide-react';

export default function SetupPage() {
  const [setupStep, setSetupStep] = useState(1);
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState(0);

  useEffect(() => {
    // Simulate setup progress
    const timer = setInterval(() => {
      setDownloadProgress(prev => {
        if (prev >= 100) return 100;
        return prev + 2;
      });
    }, 100);

    return () => clearInterval(timer);
  }, []);

  const handleDownload = async (os: string) => {
    setIsDownloading(true);
    // Simulate download
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsDownloading(false);
    setSetupStep(3);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-medium mb-4">
            <CheckCircle className="w-4 h-4" />
            Purchase Confirmed - Welcome!
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Your OpenClaw Setup</h1>
          <p className="text-lg text-gray-600">
            Let's get your AI assistant up and running in 15 minutes
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-12">
          <div className="flex justify-between mb-4">
            <span className="text-sm font-medium text-gray-500">Step {setupStep} of 4</span>
            <span className="text-sm font-medium text-gray-500">
              {setupStep === 1 ? 'Welcome' : setupStep === 2 ? 'Download' : setupStep === 3 ? 'Install' : 'Complete'}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${(setupStep / 4) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Step Content */}
        <div className="space-y-8">
          {/* Step 1: Welcome & Instructions */}
          {setupStep === 1 && (
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Welcome to Your Setup! 🎉</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="text-center p-4 bg-blue-50 rounded-xl">
                  <Clock className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                  <h3 className="font-semibold text-gray-900">15 Minutes</h3>
                  <p className="text-sm text-gray-600">Complete setup time</p>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-xl">
                  <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
                  <h3 className="font-semibold text-gray-900">Fully Automated</h3>
                  <p className="text-sm text-gray-600">No technical skills needed</p>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-xl">
                  <Play className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                  <h3 className="font-semibold text-gray-900">Ready to Use</h3>
                  <p className="text-sm text-gray-600">Production ready</p>
                </div>
              </div>

              <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 mb-8">
                <h3 className="font-semibold text-gray-900 mb-4">What You'll Get:</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" /> OpenClaw installation</li>
                    <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" /> Planner Pro agent</li>
                    <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" /> Marketing Mark agent</li>
                    <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" /> Communication setup</li>
                  </ul>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" /> Knowledge base integration</li>
                    <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" /> 5 workflow templates</li>
                    <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" /> Performance optimization</li>
                    <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" /> 30-day support</li>
                  </ul>
                </div>
              </div>

              <div className="text-center">
                <button
                  onClick={() => setSetupStep(2)}
                  className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-bold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105"
                >
                  Start Setup
                  <ArrowRight className="w-5 h-5 ml-2" />
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Download Scripts */}
          {setupStep === 2 && (
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Download Your Setup Script</h2>
              
              <div className="mb-8">
                <p className="text-gray-600 mb-6">
                  Download the automated setup script for your operating system. The script will handle everything automatically.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="border border-gray-200 rounded-xl p-6 hover:border-blue-300 transition-colors cursor-pointer"
                       onClick={() => handleDownload('windows')}>
                    <div className="text-center">
                      <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                        <Download className="w-8 h-8 text-blue-600" />
                      </div>
                      <h3 className="font-semibold text-gray-900 mb-2">Windows</h3>
                      <p className="text-sm text-gray-600 mb-4">Windows 10/11</p>
                      <button 
                        className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        disabled={isDownloading}
                      >
                        {isDownloading ? 'Preparing...' : 'Download .ps1'}
                      </button>
                    </div>
                  </div>

                  <div className="border border-gray-200 rounded-xl p-6 hover:border-blue-300 transition-colors cursor-pointer"
                       onClick={() => handleDownload('mac')}>
                    <div className="text-center">
                      <div className="w-16 h-16 bg-gray-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                        <Download className="w-8 h-8 text-gray-600" />
                      </div>
                      <h3 className="font-semibold text-gray-900 mb-2">macOS</h3>
                      <p className="text-sm text-gray-600 mb-4">All Mac versions</p>
                      <button 
                        className="w-full py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                        disabled={isDownloading}
                      >
                        {isDownloading ? 'Preparing...' : 'Download .sh'}
                      </button>
                    </div>
                  </div>

                  <div className="border border-gray-200 rounded-xl p-6 hover:border-blue-300 transition-colors cursor-pointer"
                       onClick={() => handleDownload('linux')}>
                    <div className="text-center">
                      <div className="w-16 h-16 bg-orange-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                        <Download className="w-8 h-8 text-orange-600" />
                      </div>
                      <h3 className="font-semibold text-gray-900 mb-2">Linux</h3>
                      <p className="text-sm text-gray-600 mb-4">Ubuntu, Debian, etc.</p>
                      <button 
                        className="w-full py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
                        disabled={isDownloading}
                      >
                        {isDownloading ? 'Preparing...' : 'Download .sh'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
                <div className="flex items-start">
                  <AlertCircle className="w-5 h-5 text-yellow-600 mr-3 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-yellow-800 mb-2">Important Security Notice</h4>
                    <p className="text-sm text-yellow-700">
                      These scripts are digitally signed and safe to run. They will prompt for administrative permissions to install OpenClaw. 
                      If you encounter any issues, contact our support team.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Installation Guide */}
          {setupStep === 3 && (
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Run the Setup Script</h2>
              
              <div className="mb-8">
                <h3 className="font-semibold text-gray-900 mb-4">For Windows:</h3>
                <div className="bg-gray-900 rounded-xl p-4 text-green-400 font-mono text-sm">
                  <p>1. Right-click on the downloaded .ps1 file</p>
                  <p>2. Select "Run with PowerShell" (choose "Yes" if asked about execution policy)</p>
                  <p>3. The script will automatically install everything you need</p>
                </div>

                <h3 className="font-semibold text-gray-900 mb-4 mt-6">For Mac/Linux:</h3>
                <div className="bg-gray-900 rounded-xl p-4 text-green-400 font-mono text-sm">
                  <p>1. Open Terminal</p>
                  <p>2. Navigate to the downloaded file: <code className="text-white">cd ~/Downloads</code></p>
                  <p>3. Make the script executable: <code className="text-white">chmod +x auto-openclaw-setup.sh</code></p>
                  <p>4. Run the script: <code className="text-white">./auto-openclaw-setup.sh</code></p>
                </div>
              </div>

              <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-6 mb-8">
                <h4 className="font-semibold text-gray-900 mb-4">What happens during setup:</h4>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold mr-3">1</div>
                    <span className="text-sm text-gray-700">Environment validation and dependency installation</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold mr-3">2</div>
                    <span className="text-sm text-gray-700">OpenClaw CLI download and configuration</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold mr-3">3</div>
                    <span className="text-sm text-gray-700">Custom agents and skills deployment</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold mr-3">4</div>
                    <span className="text-sm text-gray-700">Dashboard startup and testing</span>
                  </div>
                </div>
              </div>

              <div className="flex justify-center">
                <button
                  onClick={() => setSetupStep(4)}
                  className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-xl font-bold hover:from-green-700 hover:to-blue-700 transition-all duration-300"
                >
                  I've Run the Script
                  <ArrowRight className="w-5 h-5 ml-2" />
                </button>
              </div>
            </div>
          )}

          {/* Step 4: Completion */}
          {setupStep === 4 && (
            <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-2xl shadow-lg border border-green-200 p-8">
              <div className="text-center">
                <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-10 h-10 text-white" />
                </div>
                
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Setup Complete! 🎉</h2>
                <p className="text-lg text-gray-600 mb-8">
                  Your OpenClaw installation is ready and running
                </p>

                <div className="bg-white rounded-xl p-6 mb-8">
                  <h3 className="font-semibold text-gray-900 mb-4">What's Next:</h3>
                  <div className="space-y-3 text-left">
                    <div className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                      <span className="text-gray-700">Access your dashboard at <code className="bg-gray-100 px-2 py-1 rounded">http://localhost:3001</code></span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                      <span className="text-gray-700">Start a conversation with your AI assistant</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                      <span className="text-gray-700">Explore the Planner Pro and Marketing Mark agents</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                      <span className="text-gray-700">Set up your communication channels</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button className="px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors">
                    Access Dashboard
                  </button>
                  <button className="px-6 py-3 bg-white text-gray-700 border border-gray-300 rounded-xl font-semibold hover:bg-gray-50 transition-colors">
                    View Training Materials
                  </button>
                </div>

                <p className="text-sm text-gray-500 mt-6">
                  Need help? Contact support at support@openclaw.ai or visit our documentation.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}