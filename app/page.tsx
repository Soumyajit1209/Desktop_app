'use client';

import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function LandingPage() {
  const { isAuthenticated, isLoading, signInWithBrowser, signInDemo } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/chat');
    }
  }, [isAuthenticated, router]);

  if (isLoading) {
    return (
      <main className="flex items-center justify-center min-h-screen bg-black text-white">
        <div className="text-center space-y-4">
          <div className="animate-spin w-8 h-8 border-2 border-white border-t-transparent rounded-full mx-auto"></div>
          <p className="text-lg">Loading...</p>
        </div>
      </main>
    );
  }

  if (!isAuthenticated) {
    return (
      <main className="flex items-center justify-center min-h-screen bg-black text-white">
        <div className="text-center space-y-8 max-w-md mx-auto px-6">
          <div className="space-y-4">
            <h1 className="text-4xl font-bold">Welcome to Azmth 🧠</h1>
            <p className="text-gray-300 text-lg">
              Add life to your clone with synthetic AI
            </p>
          </div>
          
          <div className="space-y-4">
            <button
              onClick={signInWithBrowser}
              className="w-full py-4 px-6 bg-white text-black font-semibold rounded-lg hover:bg-gray-100 transition-colors"
            >
              Sign In with Browser
            </button>
            
            {/* Demo button for testing */}
            <button
              onClick={signInDemo}
              className="w-full py-4 px-6 bg-gray-800 text-white font-semibold rounded-lg hover:bg-gray-700 transition-colors border border-gray-600"
            >
              Demo Sign In (Testing)
            </button>
            
            <p className="text-sm text-gray-400">
              You'll be redirected to your browser to complete authentication
            </p>
          </div>
        </div>
      </main>
    );
  }

  return null;
}