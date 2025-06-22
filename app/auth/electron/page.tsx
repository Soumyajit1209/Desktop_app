'use client';

import { useEffect } from 'react';
import { useAuth } from '@clerk/nextjs';

export default function ElectronAuthPage() {
  const { isSignedIn, user, getToken } = useAuth();

  useEffect(() => {
    const handleAuth = async () => {
      if (isSignedIn && user) {
        try {
          // Get the session token
          const token = await getToken();
          
          // Redirect back to electron app with token
          const callbackUrl = `azmth://auth/callback?token=${token}`;
          window.location.href = callbackUrl;
          
          // Also show a message to manually open the app if needed
          setTimeout(() => {
            document.getElementById('manual-link')?.click();
          }, 1000);
        } catch (error) {
          console.error('Error getting token:', error);
          window.location.href = 'azmth://auth/callback?error=token_error';
        }
      }
    };

    handleAuth();
  }, [isSignedIn, user, getToken]);

  if (!isSignedIn) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center space-y-6 max-w-md mx-auto px-6">
          <h1 className="text-3xl font-bold">Sign in to Azmth</h1>
          <p className="text-gray-300">
            Please sign in to continue to your desktop app
          </p>
          
          <div className="space-y-4">
            <button
              onClick={() => window.location.href = '/sign-in'}
              className="w-full py-3 px-6 bg-white text-black font-semibold rounded-lg hover:bg-gray-100 transition-colors"
            >
              Sign In
            </button>
            
            <button
              onClick={() => window.location.href = '/sign-up'}
              className="w-full py-3 px-6 bg-transparent border border-white text-white font-semibold rounded-lg hover:bg-white hover:text-black transition-colors"
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="text-center space-y-6 max-w-md mx-auto px-6">
        <div className="animate-spin w-12 h-12 border-2 border-white border-t-transparent rounded-full mx-auto"></div>
        <h1 className="text-2xl font-bold">Redirecting to Azmth...</h1>
        <p className="text-gray-300">
          You should be redirected to the desktop app automatically.
        </p>
        
        <div className="space-y-4">
          <a
            id="manual-link"
            href="azmth://auth/callback"
            className="inline-block py-3 px-6 bg-white text-black font-semibold rounded-lg hover:bg-gray-100 transition-colors"
          >
            Open Desktop App Manually
          </a>
          
          <p className="text-sm text-gray-400">
            If the app doesn&#39;t open automatically, click the button above
          </p>
        </div>
      </div>
    </div>
  );
}