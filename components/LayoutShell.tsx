// components/LayoutShell.tsx
'use client';

import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import { useEffect } from 'react';

const navLinks = [
  { label: 'Train', href: '/train' },
  { label: 'Chat', href: '/chat' },
];

export default function LayoutShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { isAuthenticated, user, signOut, isLoading } = useAuth();

  useEffect(() => {
    // Redirect to landing page if not authenticated (except for auth pages)
    if (!isLoading && !isAuthenticated && pathname !== '/') {
      router.push('/');
    }
  }, [isAuthenticated, isLoading, pathname, router]);

  // Don't show layout on landing page
  if (pathname === '/') {
    return <>{children}</>;
  }

  // Show loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black text-white">
        <div className="animate-spin w-8 h-8 border-2 border-white border-t-transparent rounded-full"></div>
      </div>
    );
  }

  // Don't show layout if not authenticated
  if (!isAuthenticated) {
    return <>{children}</>;
  }

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-[#1a1a1a] p-4 flex flex-col justify-between">
        <div>
          <h1 className="text-2xl font-semibold mb-6">azmth</h1>

          <nav className="space-y-2 mb-6">
            {navLinks.map(({ label, href }) => (
              <Link
                key={href}
                href={href}
                className={`block py-2 px-3 rounded transition-colors ${
                  pathname === href 
                    ? 'bg-[#444] text-white' 
                    : 'bg-[#2a2a2a] text-gray-300 hover:bg-[#333]'
                }`}
              >
                {label}
              </Link>
            ))}
          </nav>

          <div className="space-y-2">
            {['Vappi', 'Echo', 'azmth'].map((name) => (
              <div
                key={name}
                className="flex items-center justify-between bg-[#2a2a2a] p-2 rounded"
              >
                <span>{name}</span>
                <div className="w-4 h-4 bg-green-500 rounded-full" />
              </div>
            ))}
            <div className="flex items-center justify-between bg-[#2a2a2a] p-2 rounded cursor-pointer hover:bg-[#333]">
              <span>+</span>
            </div>
          </div>
        </div>

        {/* User section */}
        <div className="border-t border-gray-700 pt-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center">
                <span className="text-sm font-medium">
                  {user?.firstName?.[0] || user?.email?.[0] || 'U'}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">
                  {user?.firstName || 'User'}
                </p>
                <p className="text-xs text-gray-400 truncate">
                  {user?.email}
                </p>
              </div>
            </div>
          </div>
          
          <button
            onClick={signOut}
            className="w-full py-2 px-3 text-sm bg-[#2a2a2a] hover:bg-red-600 rounded transition-colors"
          >
            Sign Out
          </button>
          
          <div className="text-center text-xl mt-2">⌄</div>
        </div>
      </aside>

      <main className="flex-1 p-10">{children}</main>
    </div>
  );
}