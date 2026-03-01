"use client";

import { useState } from "react";

type Props = {
  data: unknown;
};

export function JsonOutput({ data }: Props) {
  const [copied, setCopied] = useState(false);

  const pretty = data ? JSON.stringify(data, null, 2) : "";

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(pretty);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy JSON:", err);
    }
  }

  if (!data) {
    return (
      <div className="flex h-full min-h-[220px] items-center justify-center rounded-2xl border border-dashed border-zinc-200 bg-zinc-50 px-4 text-center text-sm text-zinc-500">
        Your structured JSON output will appear here.
      </div>
    );
  }

  return (
    <div className="relative h-full min-h-[260px] rounded-2xl border border-zinc-200 bg-zinc-950 text-xs text-zinc-50">
      <div className="flex items-center justify-between border-b border-zinc-800 px-3 py-2">
        <span className="font-mono text-[11px] uppercase tracking-wide text-zinc-400">
          JSON Output
        </span>
        <button
          type="button"
          onClick={handleCopy}
          className="rounded-full border border-zinc-700 px-2 py-0.5 text-[11px] text-zinc-200 hover:bg-zinc-800"
        >
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <pre className="scrollbar-thin h-[220px] overflow-auto p-3 font-mono text-[11px] leading-relaxed">
        <code>{pretty}</code>
      </pre>
    </div>
  );
}

