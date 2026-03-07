"use client";

import { useState } from "react";

const examples = [
  {
    title: "Mountain Landscape",
    natural:
      "A breathtaking mountain landscape at golden hour, with snow-capped peaks reflecting in a crystal-clear alpine lake, surrounded by pine forests and wildflowers in the foreground.",
    structured: `{
  "scene": {
    "type": "landscape",
    "setting": "mountain alpine lake",
    "time_of_day": "golden hour"
  },
  "elements": {
    "primary": ["snow-capped peaks", "alpine lake"],
    "secondary": ["pine forests", "wildflowers"],
    "details": "peaks reflecting in water, foreground flora"
  },
  "style": {
    "artist": null,
    "movement": "photorealism",
    "technique": "natural light photography"
  },
  "mood": "breathtaking, serene, majestic"
}`,
  },
  {
    title: "Cyberpunk City",
    natural:
      "A neon-soaked cyberpunk cityscape at midnight, rain-slicked streets reflecting glowing advertisements, towering megastructures with holographic displays, a lone figure with an umbrella in the foreground.",
    structured: `{
  "scene": {
    "type": "cityscape",
    "setting": "cyberpunk metropolis",
    "time_of_day": "midnight"
  },
  "elements": {
    "primary": ["neon signs", "rain-slicked streets"],
    "secondary": ["megastructures", "holographic displays"],
    "details": "lone figure with umbrella, reflective puddles"
  },
  "style": {
    "artist": "Syd Mead",
    "movement": "cyberpunk",
    "technique": "digital matte painting"
  },
  "mood": "atmospheric, dystopian, electric"
}`,
  },
  {
    title: "Cozy Café Interior",
    natural:
      "A warm cozy café interior on a rainy afternoon, soft diffused light through fogged windows, wooden tables with steaming coffee cups, bookshelves lining the walls, a tabby cat sleeping on a cushioned window seat.",
    structured: `{
  "scene": {
    "type": "interior",
    "setting": "cozy café",
    "time_of_day": "rainy afternoon"
  },
  "elements": {
    "primary": ["wooden tables", "steaming coffee cups"],
    "secondary": ["bookshelves", "fogged windows"],
    "details": "tabby cat on window seat, soft diffused light"
  },
  "style": {
    "artist": null,
    "movement": "warm realism",
    "technique": "soft natural lighting"
  },
  "mood": "cozy, intimate, nostalgic"
}`,
  },
];

function CopyIcon() {
  return (
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
      <rect x="9" y="9" width="13" height="13" rx="2" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
  );
}

function DownloadIcon() {
  return (
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
  );
}

function ExampleCard({ example }: { example: (typeof examples)[0] }) {
  const [copied, setCopied] = useState(false);

  function handleCopy() {
    navigator.clipboard.writeText(example.structured);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  function handleDownload() {
    const blob = new Blob([example.structured], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${example.title.toLowerCase().replace(/\s+/g, "-")}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="rounded-2xl border border-zinc-200 bg-white flex flex-col shadow-sm overflow-hidden">
      {/* Header */}
      <div className="px-5 pt-5 pb-4">
        <h3 className="text-base font-semibold text-zinc-900 mb-3">
          {example.title}
        </h3>
        <hr className="border-zinc-100" />
      </div>

      {/* Natural prompt */}
      <div className="px-5 pb-4 flex flex-col gap-2 h-[20vh]">
        <p className="text-[10px] font-semibold tracking-widest text-zinc-400 uppercase">
          Natural Prompts
        </p>
        <p className="text-sm text-zinc-600 leading-relaxed">
          {example.natural}
        </p>
      </div>

      {/* Structured prompt */}
      <div className="px-5 pb-4 flex flex-col gap-2 flex-1">
        <p className="text-[10px] font-semibold tracking-widest text-zinc-400 uppercase">
          Structured Prompts
        </p>
        <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-3 flex-1">
          <pre className="text-xs text-zinc-600 leading-relaxed whitespace-pre-wrap font-mono">
            {example.structured}
          </pre>
        </div>
      </div>

      {/* Actions */}
      <div className="px-5 pb-5 flex gap-3">
        <button
          onClick={handleCopy}
          className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-blue-200 px-4 py-2.5 text-sm font-medium text-blue-500 hover:bg-blue-50 transition-colors"
        >
          <CopyIcon />
          {copied ? "Copied!" : "Copy Prompt"}
        </button>
        <button
          onClick={handleDownload}
          className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-blue-200 px-4 py-2.5 text-sm font-medium text-blue-500 hover:bg-blue-50 transition-colors"
        >
          <DownloadIcon />
          Download
        </button>
      </div>
    </div>
  );
}

export function ExamplePage() {
  return (
    <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
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
            <rect x="3" y="3" width="7" height="7" rx="1" />
            <rect x="14" y="3" width="7" height="7" rx="1" />
            <rect x="3" y="14" width="7" height="7" rx="1" />
            <rect x="14" y="14" width="7" height="7" rx="1" />
          </svg>
          Examples
        </span>
      </div>

      {/* Heading */}
      <div className="text-center mb-12">
        <h2 className="font-serif italic text-4xl sm:text-5xl text-zinc-900 mb-3">
          Example Prompts
        </h2>
        <p className="text-zinc-400 text-sm">
          See How PromptStruct transforms natural AI prompts to structured JSON
        </p>
      </div>

      {/* Cards grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        {examples.map((example) => (
          <ExampleCard key={example.title} example={example} />
        ))}
      </div>
    </section>
  );
}
