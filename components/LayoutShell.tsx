'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';

const navLinks = [
  { label: 'Train', href: '/train' },
  { label: 'Clone', href: '/clone' },
];

export default function LayoutShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

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
                className={`block py-2 px-3 rounded ${
                  pathname === href ? 'bg-[#444]' : 'bg-[#2a2a2a]'
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
            <div className="flex items-center justify-between bg-[#2a2a2a] p-2 rounded">
              <span>+</span>
            </div>
          </div>
        </div>

        <div className="text-center text-xl">⌄</div>
      </aside>

      <main className="flex-1 p-10">{children}</main>
    </div>
  );
}
