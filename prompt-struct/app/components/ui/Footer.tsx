"use client";

import Link from "next/link";

const footerLinks = {
  "We're live on": [
    { label: "ProductHunt", href: "#" },
    { label: "Peerlist", href: "#" },
    { label: "Reddit", href: "#" },
    { label: "Hacker news", href: "#" },
  ],
  Product: [
    { label: "Converter", href: "#convert" },
    { label: "Pricing", href: "/pricing" },
    { label: "Example", href: "/examples" },
    { label: "Gallery", href: "/gallery" },
  ],
  Legal: [
    { label: "Privacy policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
    { label: "License", href: "/license" },
    { label: "LLM.txt", href: "/llm.txt" },
  ],
};

function GithubIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}
function LinkedInIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7H8V9h4v2a6 6 0 0 1 4-3zM2 9h4v12H2z" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}
function MailIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  );
}
function XIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.736-8.857L1.254 2.25H8.08l4.253 5.622 5.912-5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

export function Footer() {
  return (
    <footer className="w-full">
      {/* ── Wordmark hero zone ── */}
      <div
        className="relative w-full overflow-hidden bg-white"
        style={{ height: "220px" }}
      >
        <div
          style={{
            position: "absolute",
            top: "10px",
            left: "45%",
            width: "300px",
            height: "200px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(147,197,253,0.2) 0%, transparent 70%)",
            filter: "blur(35px)",
          }}
        />

        {/* The wordmark — sized to fit nicely, not overflow */}
        <div className="absolute inset-0 flex items-center justify-center select-none pointer-events-none">
          <span
            style={{
              fontSize: "clamp(64px, 10vw, 140px)",
              fontWeight: 900,
              letterSpacing: "-0.03em",
              lineHeight: 1,
              whiteSpace: "nowrap",
              background: " #326DF5",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            PromptStruct
          </span>
        </div>

        {/* Glass morphism panel floating over the bottom half */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "105px",
            backdropFilter: "blur(6px)",
            WebkitBackdropFilter: "blur(6px)",
            background:
              "linear-gradient(to bottom, rgba(255,255,255,0.01) 0%, rgba(255,255,255,0.7) 40%, rgba(249,250,251,1) 100%)",
            borderTop: "1px solid rgba(255,255,255,0.6)",
          }}
        />
      </div>

      {/* ── Main footer content ── */}
      <div className="border-t border-zinc-200 bg-zinc-50 w-full">
        <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
          <div className="flex flex-col sm:flex-row gap-10 justify-between">
            {/* Left */}
            <div className="flex flex-col gap-4 max-w-xs">
              <Link href="/" className="flex items-center gap-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-blue-600 text-white">
                  <svg
                    width="14"
                    height="14"
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
                <span className="text-base font-bold text-zinc-900">
                  PromptStruct
                </span>
              </Link>
              <p className="text-sm text-zinc-500 leading-relaxed">
                Paste your natural language description and get structured JSON
                instantly.
              </p>
              <div className="flex items-center gap-4 text-zinc-400">
                <a href="#" className="hover:text-zinc-700 transition-colors">
                  <GithubIcon />
                </a>
                <a href="#" className="hover:text-zinc-700 transition-colors">
                  <LinkedInIcon />
                </a>
                <a href="#" className="hover:text-zinc-700 transition-colors">
                  <MailIcon />
                </a>
                <a href="#" className="hover:text-zinc-700 transition-colors">
                  <XIcon />
                </a>
              </div>
            </div>

            {/* Right — link columns */}
            <div className="flex flex-wrap gap-10">
              {Object.entries(footerLinks).map(([heading, links]) => (
                <div
                  key={heading}
                  className="flex flex-col gap-3 min-w-[120px]"
                >
                  <h4 className="text-sm font-semibold text-zinc-900">
                    {heading}
                  </h4>
                  {links.map((link) => (
                    <Link
                      key={link.label}
                      href={link.href}
                      className="text-sm text-zinc-500 hover:text-zinc-800 transition-colors"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-zinc-200 bg-zinc-50">
        <div className="mx-auto max-w-5xl px-4 py-5 sm:px-6 text-center flex flex-col gap-1">
          <p className="text-xs text-zinc-400">
            © 2026 PromptStruct | All rights Reserved
          </p>
          <p className="text-xs text-zinc-400">
            No data Collection | MIT license | GDPR Compliant
          </p>
        </div>
      </div>
    </footer>
  );
}
