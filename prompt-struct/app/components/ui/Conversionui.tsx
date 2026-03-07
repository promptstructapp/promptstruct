"use client";

import { useState } from "react";

const PLACEHOLDER_JSON = {
  subject: {
    main: "cat",
    action: "sleeping",
    confidence: 0.99,
  },
  environment: {
    setting: "windowsill",
    confidence: 0.98,
  },
  lighting: {
    type: "soft morning light",
    confidence: 0.95,
  },
  mood: {
    emotion: "cozy",
    confidence: 0.9,
  },
};

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

export function ConversionUI() {
  const [prompt, setPrompt] = useState("");
  const [output, setOutput] = useState<object | null>(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");

  const charCount = prompt.length;
  const isValid = charCount >= 10 && charCount <= 1000;

  async function handleGenerate() {
    if (!isValid) return;
    setLoading(true);
    setError("");
    setOutput(null);

    try {
      const res = await fetch("/api/parse", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong");
      setOutput(data.result);
    } catch (err: unknown) {
      // Show placeholder for demo if API not wired yet
      setOutput(PLACEHOLDER_JSON);
      if (err instanceof Error && err.message !== "Failed to fetch") {
        setError(err.message);
      }
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
            {/* Char counter */}
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
            disabled={!isValid || loading}
            className="w-full flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
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
                Generating...
              </>
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

          {error && <p className="text-xs text-red-400 text-center">{error}</p>}
        </div>

        {/* RIGHT — Output panel */}
        <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm flex flex-col gap-4">
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
              /* Empty state */
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
    </section>
  );
}
