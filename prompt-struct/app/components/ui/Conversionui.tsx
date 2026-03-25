"use client";

import { useState, useEffect, useRef } from "react";
import { useSession, signIn } from "next-auth/react";

// ─── Loading steps that mirror the real pipeline ──────────────────────────────
const LOADING_STEPS = [
  { label: "Parsing your prompt…", detail: "Extracting intent & entities" },
  { label: "Running inference…", detail: "Model is processing your input" },
  { label: "Structuring output…", detail: "Mapping fields to JSON schema" },
  { label: "Validating schema…", detail: "Checking types & confidence scores" },
  { label: "Almost there…", detail: "Finishing up" },
];

// ─── Animated loading overlay ─────────────────────────────────────────────────
function LoadingMask() {
  const [stepIndex, setStepIndex] = useState(0);
  const [dots, setDots] = useState("");
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Advance steps every ~1.4 s, loop back on last
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setStepIndex((prev) => (prev + 1) % LOADING_STEPS.length);
    }, 1400);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  // Animate trailing dots
  useEffect(() => {
    const tid = setInterval(() => {
      setDots((d) => (d.length >= 3 ? "" : d + "."));
    }, 380);
    return () => clearInterval(tid);
  }, []);

  const step = LOADING_STEPS[stepIndex];

  return (
    <div className="absolute inset-0 z-10 rounded-2xl overflow-hidden flex flex-col items-center justify-center gap-5 bg-white/90 backdrop-blur-[2px]">
      {/* Animated background shimmer */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          background:
            "repeating-linear-gradient(90deg, #326DF5 0px, transparent 1px, transparent 60px)",
          animation: "shimmer-slide 2s linear infinite",
        }}
      />

      {/* Pulsing icon ring */}
      <div className="relative flex items-center justify-center">
        <span
          className="absolute h-16 w-16 rounded-full bg-blue-100 opacity-60"
          style={{ animation: "ping-slow 1.6s ease-out infinite" }}
        />
        <span
          className="absolute h-12 w-12 rounded-full bg-blue-200 opacity-40"
          style={{ animation: "ping-slow 1.6s ease-out 0.4s infinite" }}
        />
        <div className="relative flex h-10 w-10 items-center justify-center rounded-full bg-blue-500 shadow-md">
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ animation: "spin-slow 2s linear infinite" }}
          >
            <path d="M21 12a9 9 0 1 1-6.219-8.56" />
          </svg>
        </div>
      </div>

      {/* Step text */}
      <div className="text-center px-6">
        <p className="text-sm font-semibold text-zinc-800 tracking-tight transition-all duration-500">
          {step.label}
          <span className="inline-block w-5 text-left text-blue-500">
            {dots}
          </span>
        </p>
        <p className="text-xs text-zinc-400 mt-0.5 transition-all duration-500">
          {step.detail}
        </p>
      </div>

      {/* Step progress pills */}
      <div className="flex items-center gap-1.5">
        {LOADING_STEPS.map((_, i) => (
          <span
            key={i}
            className="rounded-full transition-all duration-500"
            style={{
              width: i === stepIndex ? "20px" : "6px",
              height: "6px",
              background: i === stepIndex ? "#326DF5" : "#e4e4e7",
            }}
          />
        ))}
      </div>

      {/* Inline keyframes */}
      <style>{`
        @keyframes ping-slow {
          0%   { transform: scale(1);   opacity: 0.5; }
          80%  { transform: scale(1.8); opacity: 0; }
          100% { transform: scale(1.8); opacity: 0; }
        }
        @keyframes spin-slow {
          to { transform: rotate(360deg); }
        }
        @keyframes shimmer-slide {
          from { background-position: 0 0; }
          to   { background-position: 60px 0; }
        }
      `}</style>
    </div>
  );
}

// ─── JSON renderer ────────────────────────────────────────────────────────────
function JsonLine({
  text,
  indent = 0,
  color = "text-zinc-600",
}: {
  text: string;
  indent?: number;
  color?: string;
}) {
  return (
    <div
      className={`${color} font-mono text-xs leading-6`}
      style={{ paddingLeft: `${indent * 16}px` }}
    >
      {text}
    </div>
  );
}

function JsonOutput({ json }: { json: object }) {
  const lines: { text: string; indent: number; color: string }[] = [];

  function walk(obj: Record<string, unknown>, depth: number) {
    const keys = Object.keys(obj);
    keys.forEach((key, i) => {
      const val = obj[key];
      const isLast = i === keys.length - 1;
      if (typeof val === "object" && val !== null) {
        lines.push({
          text: `"${key}": {`,
          indent: depth,
          color: "text-blue-400",
        });
        walk(val as Record<string, unknown>, depth + 1);
        lines.push({
          text: isLast ? "}" : "},",
          indent: depth,
          color: "text-zinc-500",
        });
      } else {
        const formatted =
          typeof val === "string"
            ? `"${key}": "${val}"${isLast ? "" : ","}`
            : `"${key}": ${val}${isLast ? "" : ","}`;
        lines.push({
          text: formatted,
          indent: depth,
          color:
            typeof val === "string" ? "text-emerald-500" : "text-orange-400",
        });
      }
    });
  }

  lines.push({ text: "{", indent: 0, color: "text-zinc-500" });
  walk(json as Record<string, unknown>, 1);
  lines.push({ text: "}", indent: 0, color: "text-zinc-500" });

  return (
    <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-4 overflow-auto max-h-80">
      {lines.map((l, i) => (
        <JsonLine key={i} text={l.text} indent={l.indent} color={l.color} />
      ))}
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────
export function ConversionUI() {
  const { data: session } = useSession();
  const [prompt, setPrompt] = useState("");
  const [output, setOutput] = useState<object | null>(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [remaining, setRemaining] = useState<number | null>(null);
  const [quotaLoading, setQuotaLoading] = useState(false);

  const isQuotaExceeded = remaining !== null && remaining <= 0;

  useEffect(() => {
    if (!session?.user?.email) return;

    async function fetchQuota() {
      setQuotaLoading(true);
      try {
        const res = await fetch("/api/user/usage");
        if (res.ok) {
          const data = await res.json();
          setRemaining(data.quota?.remaining ?? null);
        }
      } catch (err) {
        console.error("Failed to fetch quota:", err);
      } finally {
        setQuotaLoading(false);
      }
    }

    fetchQuota();
  }, [session]);

  const charCount = prompt.length;
  const isValid = charCount >= 10 && charCount <= 1000;

  async function handleGenerate() {
    if (!isValid) return;

    if (!session) {
      setShowAuthModal(true);
      return;
    }

    setLoading(true);
    setError("");
    setOutput(null);

    try {
      const res = await fetch("/api/parse", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });
      const rawText = await res.text();
      console.log("[/api/parse] status:", res.status);
      console.log("[/api/parse] raw:", rawText.slice(0, 300));
      let data: {
        error?: string;
        result?: object;
        quota?: { plan: string; remaining: number };
      };
      try {
        data = JSON.parse(rawText);
      } catch {
        const preview = rawText
          .slice(0, 120)
          .replace(/<[^>]+>/g, " ")
          .trim();
        throw new Error(`Non-JSON response (${res.status}): ${preview}`);
      }
      if (!res.ok) throw new Error(data.error || "Something went wrong");
      setOutput(data.result ?? null);
      if (data.quota?.remaining !== undefined) {
        setRemaining(data.quota.remaining);
      }
    } catch (err: unknown) {
      const message =
        err instanceof Error
          ? err.message
          : "Failed to generate. Please try again.";
      setError(message);
    } finally {
      setLoading(false);
    }
  }

  function handleCopy() {
    if (!output) return;
    navigator.clipboard.writeText(JSON.stringify(output, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  function handleDownload() {
    if (!output) return;
    const blob = new Blob([JSON.stringify(output, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "prompt-struct.json";
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <section id="convert" className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
      {/* Badge */}
      <div className="flex justify-center mb-6">
        <span className="flex items-center gap-2 rounded-full bg-blue-50 px-4 py-1.5 text-sm text-blue-500 font-medium">
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 3l1.88 5.76a1 1 0 00.95.69h6.07l-4.91 3.57a1 1 0 00-.36 1.12L17.41 20l-4.91-3.57a1 1 0 00-1.18 0L6.41 20l1.88-5.86a1 1 0 00-.36-1.12L3.02 9.45h6.07a1 1 0 00.95-.69L12 3z" />
          </svg>
          AI-Powered Conversion
        </span>
      </div>

      {/* Heading */}
      <div className="text-center mb-10">
        <h2 className="font-serif italic text-4xl sm:text-5xl text-zinc-900 mb-3">
          Convert your Prompt
        </h2>
        <p className="text-zinc-500 text-sm">
          Paste your natural language description and get structured JSON
          instantly.
        </p>
      </div>

      {/* Two-panel layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {/* LEFT — Input panel */}
        <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm flex flex-col gap-4">
          {/* Panel header */}
          <div className="flex items-center gap-2 pb-3 border-b border-zinc-100">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-50 text-blue-500">
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 19l7-7 3 3-7 7-3-3z" />
                <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />
                <path d="M2 2l7.586 7.586" />
                <circle cx="11" cy="11" r="2" />
              </svg>
            </div>
            <span className="text-sm font-semibold text-zinc-800">
              Natural input
            </span>
          </div>

          {/* Textarea */}
          <div className="flex flex-col gap-1.5 flex-1">
            <label className="text-xs text-zinc-400">Your Prompt</label>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="A serene cat sleeping on a windowsill in soft morning light, cozy atmosphere."
              rows={8}
              className="w-full resize-none rounded-xl border border-zinc-200 bg-zinc-50 p-3 text-sm text-zinc-700 placeholder-zinc-300 outline-none focus:border-blue-300 focus:ring-2 focus:ring-blue-50 transition-all"
            />
            <div className="flex justify-between text-xs">
              <span
                className={
                  charCount > 0 && !isValid ? "text-red-400" : "text-zinc-400"
                }
              >
                {charCount < 10 && charCount > 0 ? "Minimum 10 characters" : ""}
                {charCount > 1000
                  ? `${charCount - 1000} characters over limit`
                  : ""}
              </span>
              <span
                className={charCount > 1000 ? "text-red-400" : "text-zinc-400"}
              >
                {charCount}/1000
              </span>
            </div>
          </div>

          {/* Generate button */}
          <button
            onClick={handleGenerate}
            disabled={!isValid || loading || quotaLoading || isQuotaExceeded}
            className="w-full flex items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? (
              <>
                <svg
                  className="animate-spin"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                </svg>
                Generating…
              </>
            ) : isQuotaExceeded ? (
              "Monthly limit reached — Upgrade to Pro"
            ) : (
              <>
                Generate Prompt
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 3l1.88 5.76a1 1 0 00.95.69h6.07l-4.91 3.57a1 1 0 00-.36 1.12L17.41 20l-4.91-3.57a1 1 0 00-1.18 0L6.41 20l1.88-5.86a1 1 0 00-.36-1.12L3.02 9.45h6.07a1 1 0 00.95-.69L12 3z" />
                </svg>
              </>
            )}
          </button>
          {session && remaining !== null && !isQuotaExceeded && (
            <p className="text-xs text-zinc-400 text-center">
              {remaining} conversion{remaining !== 1 ? "s" : ""} remaining this
              month
            </p>
          )}
          {isQuotaExceeded && (
            <p className="text-xs text-red-400 text-center">
              Monthly limit reached.{" "}
              <a href="/pricing" className="underline hover:text-red-600">
                Upgrade to Pro
              </a>{" "}
              for 1000 conversions/month.
            </p>
          )}
          {error && <p className="text-xs text-red-400 text-center">{error}</p>}
        </div>

        {/* RIGHT — Output panel (relative for overlay positioning) */}
        <div className="relative rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm flex flex-col gap-4">
          {/* Loading mask — sits above the panel content */}
          {loading && <LoadingMask />}

          {/* Panel header */}
          <div className="flex items-center gap-2 pb-3 border-b border-zinc-100">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-50 text-blue-500 font-bold text-xs">
              {"{ }"}
            </div>
            <span className="text-sm font-semibold text-zinc-800">
              Structured JSON output
            </span>
          </div>

          {/* Output area */}
          <div className="flex flex-col gap-1.5 flex-1">
            <label className="text-xs text-zinc-400">
              Structured Prompt for AI image generation
            </label>

            {output ? (
              <JsonOutput json={output} />
            ) : (
              <div className="rounded-xl border border-dashed border-zinc-200 bg-zinc-50 flex flex-col items-center justify-center gap-2 p-10 text-center min-h-[200px]">
                <div className="text-2xl text-zinc-300 font-mono">{"{ }"}</div>
                <p className="text-xs text-zinc-400">
                  Your structured JSON will appear here
                </p>
              </div>
            )}
          </div>

          {/* Action buttons */}
          <div className="flex gap-3">
            <button
              onClick={handleCopy}
              disabled={!output}
              className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-zinc-200 px-4 py-2.5 text-sm font-medium text-blue-500 hover:bg-blue-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              {copied ? (
                <>
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
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  Copied!
                </>
              ) : (
                <>
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                  </svg>
                  Copy Prompt
                </>
              )}
            </button>
            <button
              onClick={handleDownload}
              disabled={!output}
              className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-zinc-200 px-4 py-2.5 text-sm font-medium text-blue-500 hover:bg-blue-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              Download
            </button>
          </div>
        </div>
      </div>

      {/* Google Sign-in Modal */}
      {showAuthModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={() => setShowAuthModal(false)}
        >
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
          <div
            className="relative w-full max-w-sm rounded-2xl bg-white shadow-2xl p-8 flex flex-col items-center gap-6"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowAuthModal(false)}
              className="absolute top-4 right-4 flex h-7 w-7 items-center justify-center rounded-full text-zinc-400 hover:bg-zinc-100 hover:text-zinc-600 transition-colors"
            >
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
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-500">
              <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 3l1.88 5.76a1 1 0 00.95.69h6.07l-4.91 3.57a1 1 0 00-.36 1.12L17.41 20l-4.91-3.57a1 1 0 00-1.18 0L6.41 20l1.88-5.86a1 1 0 00-.36-1.12L3.02 9.45h6.07a1 1 0 00.95-.69L12 3z" />
              </svg>
            </div>

            <div className="text-center">
              <h3 className="text-lg font-bold text-zinc-900 mb-1">
                Sign in to generate
              </h3>
              <p className="text-sm text-zinc-500 leading-relaxed">
                Create a free account to convert prompts into structured JSON.
                10 free conversions per month, no credit card needed.
              </p>
            </div>

            <button
              onClick={() => signIn("google")}
              className="w-full flex items-center justify-center gap-3 rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm font-semibold text-zinc-700 hover:bg-zinc-50 transition-colors shadow-sm"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              Continue with Google
            </button>

            <p className="text-xs text-zinc-400 text-center">
              By signing in, you agree to our{" "}
              <a href="/terms" className="underline hover:text-zinc-600">
                Terms
              </a>{" "}
              and{" "}
              <a href="/privacy" className="underline hover:text-zinc-600">
                Privacy Policy
              </a>
              .
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
