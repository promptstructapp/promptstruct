"use client";

import Link from "next/link";
import { useEffect } from "react";

export function HeroSection() {
  useEffect(() => {
    const font = getComputedStyle(document.documentElement).getPropertyValue(
      "--font-instrument-serif",
    );
    console.log(font);
  }, []);

  return (
    <section className="flex flex-col items-center text-center px-4 pt-16 pb-12">
      {/* Top Badge */}
      <div className="mb-6 flex items-center gap-2 rounded-full bg-blue-50 border border-blue-100 px-4 py-1.5 text-sm text-blue-600 font-medium">
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="shrink-0"
        >
          <path d="M12 3l1.88 5.76a1 1 0 00.95.69h6.07l-4.91 3.57a1 1 0 00-.36 1.12L17.41 20l-4.91-3.57a1 1 0 00-1.18 0L6.41 20l1.88-5.86a1 1 0 00-.36-1.12L3.02 9.45h6.07a1 1 0 00.95-.69L12 3z" />
        </svg>
        Free: 10 conversions/month &bull; No credit card
      </div>

      {/* Headline */}
      <h1 className="max-w-3xl text-5xl sm:text-6xl font-normal leading-tight tracking-tight text-zinc-900 mb-6 font-serif">
        Turn messy <span className="text-blue-500">AI prompts</span>
        <br />
        into <span className="text-blue-500">&#123;Structured JSON&#125;</span>
      </h1>

      {/* Subtitle */}
      <p className="max-w-md text-zinc-500 text-base leading-relaxed mb-8">
        Paste any natural language prompt and get a rich, semantic JSON
        breakdown for Midjourney, Stable Diffusion, DALL·E, ChatGPT,
        Nano-banana, All Image Generation tools.
      </p>

      {/* CTA Buttons */}
      <div className="flex items-center gap-3 mb-12">
        <Link
          href="#convert"
          className="rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 transition-colors"
        >
          Try it free
        </Link>
        <Link
          href="/examples"
          className="rounded-lg border border-zinc-300 px-6 py-2.5 text-sm font-semibold text-blue-600 hover:bg-zinc-50 transition-colors"
        >
          View Examples
        </Link>
      </div>

      {/* Social Proof */}
      <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-zinc-600">
        {[
          "1,200+ Designers Joined",
          "10,000+ Prompts converted",
          "MIT Licensed",
        ].map((stat) => (
          <div key={stat} className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-green-500 shrink-0" />
            {stat}
          </div>
        ))}
      </div>
    </section>
  );
}
