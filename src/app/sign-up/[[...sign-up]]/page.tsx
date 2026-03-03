import { SignUp } from '@clerk/nextjs';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function SignUpPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="p-6">
        <Link 
          href="/" 
          className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to home
        </Link>
      </div>
      
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <Link href="/" className="inline-block">
              <span className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                WaitlistPro
              </span>
            </Link>
            <p className="mt-2 text-gray-600">Create an account to start building your waitlist.</p>
          </div>
          
          <SignUp 
            appearance={{
              elements: {
                rootBox: "mx-auto",
                card: "bg-white shadow-xl border-0 rounded-2xl",
                headerTitle: "text-gray-900",
                headerSubtitle: "text-gray-600",
                socialButtonsBlockButton: "border-gray-300 hover:bg-gray-50",
                formFieldLabel: "text-gray-700",
                formFieldInput: "border-gray-300 focus:border-indigo-500 focus:ring-indigo-500",
                formButtonPrimary: "bg-indigo-600 hover:bg-indigo-700 text-white",
                footerActionLink: "text-indigo-600 hover:text-indigo-700",
                identityPreviewEditButton: "text-indigo-600",
              },
            }}
            signInUrl="/sign-in"
            redirectUrl="/dashboard"
          />
        </div>
      </div>
    </div>
  );
}
