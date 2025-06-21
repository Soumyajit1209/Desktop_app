import type { Metadata } from 'next';
import './globals.css';
import LayoutShell from '@/components/LayoutShell'; 
import { Urbanist } from 'next/font/google';

const urbanist = Urbanist({
  subsets: ['latin'],
  display: 'swap',
  preload: true,
  fallback: ['system-ui', 'arial'],
  adjustFontFallback: true
});
// adjust path if needed


export const metadata: Metadata = {
  title: 'Azmth',
  description: 'Add life to your clone with synthetic AI',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body
        className={`${urbanist.className} antialiased bg-black text-white`}
      >
        <LayoutShell>{children}</LayoutShell>
      </body>
    </html>
  );
}
