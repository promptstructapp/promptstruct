"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

// Replace with your actual LoginButton import
// import { LoginButton } from "@/app/components/auth/LoginButton";

export function Navbar() {
  const pathname = usePathname();

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Examples", href: "/examples" },
    { label: "Gallery", href: "/gallery" },
    { label: "Pricing", href: "/pricing" },
  ];

  return (
    <header className="border-b border-zinc-200 bg-white backdrop-blur-sm">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3 sm:px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-blue-600 text-white">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="16 18 22 12 16 6" />
              <polyline points="8 6 2 12 8 18" />
            </svg>
          </span>
          <span className="text-base font-bold text-zinc-900 tracking-tight">
            PromptStruct
          </span>
        </Link>

        {/* Center Nav */}
        <nav className="flex items-center gap-1 rounded-full bg-zinc-100 px-1.5 py-1.5">
          {navLinks.map(({ label, href }) => {
            const isActive = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-white text-zinc-900 shadow-sm"
                    : "text-zinc-500 hover:text-zinc-800"
                }`}
              >
                {label}
              </Link>
            );
          })}
        </nav>

        {/* Right: Dashboard Button */}
        <Link
          href="/dashboard"
          className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 transition-colors"
        >
          Dashboard
        </Link>

        {/* Uncomment when you want auth button instead: */}
        {/* <LoginButton /> */}
      </div>
    </header>
  );
}
