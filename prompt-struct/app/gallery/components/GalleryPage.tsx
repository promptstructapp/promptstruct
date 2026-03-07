"use client";

import { useState } from "react";

const galleryItems = [
  {
    title: "Black Hoodie Vibes",
    image:
      "https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?w=600&q=80",
    json: `{
  "subject": {
    "identity": "keep the facial features unchanged as uploaded image",
    "style": "modern, stylish",
    "build": "proportional"
  },
  "environment": {
    "setting": "outdoor driveway",
    "vehicle": "black luxury sedan"
  },
  "lighting": { "type": "natural daylight" },
  "mood": "confident, street style"
}`,
  },
  {
    title: "Street Style 911",
    image:
      "https://images.unsplash.com/photo-1583267746897-2cf415887172?w=600&q=80",
    json: `{
  "subject": {
    "identity": "keep the facial features unchanged as uploaded image",
    "style": "modern, stylish",
    "build": "proportional"
  },
  "environment": {
    "setting": "urban street",
    "vehicle": "sports car"
  },
  "lighting": { "type": "warm afternoon" },
  "mood": "urban, cool, editorial"
}`,
  },
  {
    title: "Whey X Energy",
    image:
      "https://images.unsplash.com/photo-1593095948071-474c5cc2989d?w=600&q=80",
    json: `{
  "subject": {
    "identity": "keep the facial features unchanged as uploaded image",
    "style": "modern, stylish",
    "build": "proportional"
  },
  "environment": {
    "setting": "dark studio",
    "props": "protein tub with powder explosion"
  },
  "lighting": { "type": "dramatic backlight" },
  "mood": "powerful, energetic, bold"
}`,
  },
  {
    title: "Black Hoodie Vibes",
    image:
      "https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?w=600&q=80",
    json: `{
  "subject": {
    "identity": "keep the facial features unchanged as uploaded image",
    "style": "modern, stylish",
    "build": "proportional"
  },
  "environment": {
    "setting": "outdoor driveway",
    "vehicle": "black luxury sedan"
  },
  "lighting": { "type": "natural daylight" },
  "mood": "confident, street style"
}`,
  },
  {
    title: "Street Style 911",
    image:
      "https://images.unsplash.com/photo-1583267746897-2cf415887172?w=600&q=80",
    json: `{
  "subject": {
    "identity": "keep the facial features unchanged as uploaded image",
    "style": "modern, stylish",
    "build": "proportional"
  },
  "environment": {
    "setting": "urban street",
    "vehicle": "sports car"
  },
  "lighting": { "type": "warm afternoon" },
  "mood": "urban, cool, editorial"
}`,
  },
];

function GalleryCard({ item }: { item: (typeof galleryItems)[0] }) {
  const [copied, setCopied] = useState(false);

  function handleCopy() {
    navigator.clipboard.writeText(item.json);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="rounded-2xl border border-zinc-200 bg-white overflow-hidden shadow-sm flex flex-col">
      {/* Image */}
      <div className="w-full aspect-[4/3] overflow-hidden">
        <img
          src={item.image}
          alt={item.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Body */}
      <div className="p-4 flex flex-col gap-3 flex-1">
        {/* Title */}
        <h3 className="text-sm font-semibold text-zinc-900">{item.title}</h3>

        {/* JSON box with copy icon inside top-right */}
        <div className="relative rounded-xl border border-zinc-200 bg-white p-3 flex-1">
          {/* Copy button — top right corner inside the box */}
          <button
            onClick={handleCopy}
            className="absolute top-2.5 right-2.5 text-zinc-400 hover:text-zinc-700 transition-colors"
            title="Copy JSON"
          >
            {copied ? (
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#22c55e"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
            ) : (
              <svg
                width="15"
                height="15"
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
            )}
          </button>

          <pre
            className="text-[11px] text-zinc-500 font-mono leading-relaxed whitespace-pre-wrap overflow-hidden pr-6"
            style={{ maxHeight: "140px" }}
          >
            {item.json}
          </pre>
        </div>
      </div>
    </div>
  );
}

export function GalleryPage() {
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
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <circle cx="8.5" cy="8.5" r="1.5" />
            <polyline points="21 15 16 10 5 21" />
          </svg>
          Gallery
        </span>
      </div>

      {/* Heading */}
      <div className="text-center mb-12">
        <h2 className="font-serif italic text-4xl sm:text-5xl text-zinc-900 mb-3">
          Prompts Gallery
        </h2>
        <p className="text-zinc-400 text-sm">
          Real prompts structured by PromptStruct — copy and use instantly
        </p>
      </div>

      {/* Top row — 3 cols */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-5">
        {galleryItems.map((item) => (
          <GalleryCard key={item.title} item={item} />
        ))}
      </div>
    </section>
  );
}
