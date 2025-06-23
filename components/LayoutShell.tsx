"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { Plus } from "lucide-react";

const navLinks = [
  { label: "Train", href: "/train" },
  { label: "Clone", href: "/clone" },
  { label: "Add Life", href: "/add-life" },
];

export default function LayoutShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-[#1a1a1a] p-4 flex flex-col justify-between">
        <div>
          <h1 className="text-2xl font-semibold mb-6">azmth</h1>

          <nav className="space-y-2 mb-6">
            {navLinks.map(({ label, href }) => {
              const isActive = pathname === href || pathname.startsWith(`${href}/`);
              return (
                <Link
                  key={href}
                  href={href}
                  className={`block py-2 px-3 rounded ${
                    isActive
                      ? "bg-[#000] font-bold"
                      : "bg-[#2a2a2a] hover:bg-[#3a3a3a]"
                  }`}
                >
                  {label}
                </Link>
              );
            })}
          </nav>

          <div className="space-y-2">
            <button className="flex items-center justify-center w-full p-2 bg-[#2a2a2a] rounded hover:bg-[#3a3a3a]">
              <Plus className="w-4 h-4 text-white" />
            </button>
          </div>
        </div>

        <div className="text-center text-xl">⌄</div>
      </aside>

      <main className="flex-1 p-10">{children}</main>
    </div>
  );
}
