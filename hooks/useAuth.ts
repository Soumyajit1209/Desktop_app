'use client';

import { useState, useEffect } from 'react';

// Extend the Window interface to include electronAPI
declare global {
  interface Window {
    electronAPI?: {
      onAuthSuccess: (callback: (userData: User) => void) => void;
      onAuthError: (callback: (error: string) => void) => void;
      openAuthBrowser: () => void;
    };
  }
}

interface User {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
}

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  isLoading: boolean;
}

export function useAuth() {
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    user: null,
    isLoading: true,
  });

  useEffect(() => {
    // Check for existing session on mount
    checkAuthStatus();

    // Listen for auth events from main process (only in Electron)
    if (typeof window !== 'undefined' && window.electronAPI) {
      window.electronAPI.onAuthSuccess((userData: User) => {
        console.log('Auth success received:', userData);
        setAuthState({
          isAuthenticated: true,
          user: userData,
          isLoading: false,
        });
        // Store session data
        try {
          localStorage.setItem('azmth_user', JSON.stringify(userData));
          localStorage.setItem('azmth_session', Date.now().toString());
        } catch (error) {
          console.error('Error storing auth data:', error);
        }
      });

      window.electronAPI.onAuthError((error: string) => {
        console.error('Auth error received:', error);
        setAuthState({
          isAuthenticated: false,
          user: null,
          isLoading: false,
        });
      });
    }
  }, []);

  const checkAuthStatus = () => {
    try {
      const storedUser = localStorage.getItem('azmth_user');
      const sessionTime = localStorage.getItem('azmth_session');
      
      if (storedUser && sessionTime) {
        const sessionAge = Date.now() - parseInt(sessionTime);
        const maxAge = 24 * 60 * 60 * 1000; // 24 hours
        
        if (sessionAge < maxAge) {
          setAuthState({
            isAuthenticated: true,
            user: JSON.parse(storedUser),
            isLoading: false,
          });
          return;
        } else {
          // Session expired, clear storage
          localStorage.removeItem('azmth_user');
          localStorage.removeItem('azmth_session');
        }
      }
      
      setAuthState({
        isAuthenticated: false,
        user: null,
        isLoading: false,
      });
    } catch (error) {
      console.error('Error checking auth status:', error);
      setAuthState({
        isAuthenticated: false,
        user: null,
        isLoading: false,
      });
    }
  };

  const signInWithBrowser = () => {
    console.log('Sign in with browser clicked');
    
    if (typeof window !== 'undefined' && window.electronAPI) {
      // In Electron app
      console.log('Opening auth browser via Electron...');
      window.electronAPI.openAuthBrowser();
    } else {
      // Fallback for web (development testing)
      console.log('Opening auth in same window (web fallback)...');
      window.location.href = '/auth/electron';
    }
  };

  const signOut = () => {
    console.log('Signing out...');
    try {
      localStorage.removeItem('azmth_user');
      localStorage.removeItem('azmth_session');
    } catch (error) {
      console.error('Error clearing auth data:', error);
    }
    
    setAuthState({
      isAuthenticated: false,
      user: null,
      isLoading: false,
    });
  };

  // Demo function for testing without full Clerk setup
  const signInDemo = () => {
    const demoUser = {
      id: 'demo-user-123',
      email: 'demo@example.com',
      firstName: 'Demo',
      lastName: 'User'
    };
    
    setAuthState({
      isAuthenticated: true,
      user: demoUser,
      isLoading: false,
    });
    
    try {
      localStorage.setItem('azmth_user', JSON.stringify(demoUser));
      localStorage.setItem('azmth_session', Date.now().toString());
    } catch (error) {
      console.error('Error storing demo auth data:', error);
    }
  };

  return {
    ...authState,
    signInWithBrowser,
    signOut,
    signInDemo, // For testing
  };
}
