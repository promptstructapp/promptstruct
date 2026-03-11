"use client";

import Link from "next/link";

export function CTA() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-20 sm:px-6 text-center">
      <h2 className="font-serif italic text-4xl sm:text-5xl text-zinc-900 mb-4">
        Ready to stop wasting credits?
      </h2>
      <p className="text-zinc-400 text-sm mb-8">
        Join 1,286+ designers getting consistent AI outputs with structured JSON
        prompts.
      </p>
      <div className="flex items-center justify-center gap-3">
        <Link
          href="#convert"
          className="rounded-xl bg-primary px-6 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 transition-colors"
        >
          Try it free
        </Link>
        <Link
          href="/pricing"
          className="rounded-xl border border-zinc-300 px-6 py-2.5 text-sm font-medium text-blue-500 hover:bg-zinc-50 transition-colors"
        >
          View pricing →
        </Link>
      </div>
    </section>
  );
}
