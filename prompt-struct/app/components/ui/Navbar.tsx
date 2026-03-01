"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LoginButton } from "@/app/components/auth/LoginButton";

export function Navbar() {
  const pathname = usePathname();

  const isDashboard = pathname?.startsWith("/dashboard");

  return (
    <header className="border-b border-zinc-200 bg-white/70 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3 sm:px-6">
        <Link href="/" className="flex items-center gap-2">
          <span className="h-7 w-7 rounded-lg bg-zinc-900 text-center text-xs font-bold leading-7 text-white">
            PJ
          </span>
          <div className="hidden flex-col text-sm sm:flex">
            <span className="font-semibold text-zinc-900">
              Prompt → JSON Struct
            </span>
            <span className="text-xs text-zinc-500">
              Structured scenes from natural language
            </span>
          </div>
        </Link>

        <nav className="flex items-center gap-4">
          <Link
            href="/"
            className={`text-sm ${
              !isDashboard ? "text-zinc-900" : "text-zinc-500"
            } hover:text-zinc-900`}
          >
            Convert
          </Link>
          <Link
            href="/dashboard"
            className={`text-sm ${
              isDashboard ? "text-zinc-900" : "text-zinc-500"
            } hover:text-zinc-900`}
          >
            Dashboard
          </Link>
          <LoginButton />
        </nav>
      </div>
    </header>
  );
}

