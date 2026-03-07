"use client";

import { useState } from "react";
import Image from "next/image";

const socialReviews = [
  [
    {
      platform: "twitter",
      quote:
        "Separating scene, lighting, and style into editable fields makes iteration way faster.",
      handle: "@ui_workflow",
    },
    {
      platform: "linkedin",
      quote: "The biggest shift wasn't better images. It was better control.",
      handle: "@design_iteration",
    },
    {
      platform: "producthunt",
      quote:
        "Now I adjust lighting without touching composition. That alone saves retries.",
      handle: "@visual_systems",
    },
    {
      platform: "producthunt2",
      quote:
        "Structured prompts feel like layers in Figma — not paragraphs of text.",
      handle: "@productdesigner",
    },
    {
      platform: "reddit",
      quote:
        "Before this, prompt editing felt like rewriting CSS without variables.",
      handle: "@frontend_designer",
    },
    {
      platform: "other",
      quote: "I stopped guessing what to change. I change exactly what I need.",
      handle: "@creative_dev",
    },
  ],
  [
    {
      platform: "twitter",
      quote:
        "PromptStruct turned my chaotic creative process into something repeatable.",
      handle: "@motion_craft",
    },
    {
      platform: "linkedin",
      quote:
        "Sharing structured prompts with clients has completely changed my workflow.",
      handle: "@brand_studio",
    },
    {
      platform: "producthunt",
      quote:
        "Finally a tool that treats prompts like code — structured and versioned.",
      handle: "@ai_engineer",
    },
    {
      platform: "producthunt2",
      quote:
        "My whole team is aligned on visual style now. No more prompt drift.",
      handle: "@creative_lead",
    },
    {
      platform: "reddit",
      quote: "The JSON export alone is worth it for my automation pipelines.",
      handle: "@workflow_dev",
    },
    {
      platform: "other",
      quote: "Went from 20 iterations to 3. Structured prompts just work.",
      handle: "@illustration_co",
    },
  ],
  [
    {
      platform: "twitter",
      quote:
        "I use it before every Midjourney session now. It's become part of my ritual.",
      handle: "@mj_artist",
    },
    {
      platform: "linkedin",
      quote: "PromptStruct is the missing layer between ideas and AI outputs.",
      handle: "@product_thinker",
    },
    {
      platform: "producthunt",
      quote: "Clear structure = clear results. It's that simple.",
      handle: "@sd_creator",
    },
    {
      platform: "producthunt2",
      quote:
        "Our design sprints are so much faster. No more prompt archaeology.",
      handle: "@design_ops",
    },
    {
      platform: "reddit",
      quote: "It's like having a prompt engineer on your team 24/7.",
      handle: "@indie_maker",
    },
    {
      platform: "other",
      quote:
        "Best tool I've found for keeping AI outputs consistent across a campaign.",
      handle: "@art_director",
    },
  ],
  [
    {
      platform: "twitter",
      quote:
        "I teach prompt engineering and now I recommend PromptStruct to every student.",
      handle: "@ai_educator",
    },
    {
      platform: "linkedin",
      quote:
        "The structured output has saved us hours of back-and-forth with clients.",
      handle: "@agency_lead",
    },
    {
      platform: "producthunt",
      quote: "Once you see prompts as structured data, you can't go back.",
      handle: "@data_creative",
    },
    {
      platform: "producthunt2",
      quote: "Copy, tweak one field, regenerate. It's surgical.",
      handle: "@iteration_fan",
    },
    {
      platform: "reddit",
      quote: "Honestly shocked this wasn't built sooner. Essential tool.",
      handle: "@longtime_user",
    },
    {
      platform: "other",
      quote: "My Stable Diffusion outputs finally look like what I imagined.",
      handle: "@sd_enthusiast",
    },
  ],
];

function PlatformIcon({ platform }: { platform: string }) {
  const cls = "text-zinc-500";
  if (platform === "twitter")
    return (
      <svg
        className={cls}
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.736-8.857L1.254 2.25H8.08l4.253 5.622 5.912-5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    );
  if (platform === "linkedin")
    return (
      <svg
        className={cls}
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    );
  if (platform === "reddit")
    return (
      <svg
        className={cls}
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <circle cx="12" cy="12" r="10" />
        <path
          fill="white"
          d="M20 12a2 2 0 0 0-2-2 2 2 0 0 0-1.3.5A9.6 9.6 0 0 0 12.5 9l.9-3.9 2.7.6a1.5 1.5 0 1 0 .2-.9l-3-.7L12 8a9.6 9.6 0 0 0-4.2 1.5A2 2 0 1 0 6 12a3.7 3.7 0 0 0 0 .5c0 2.5 2.7 4.5 6 4.5s6-2 6-4.5a3.7 3.7 0 0 0 0-.5zm-10 1a1 1 0 1 1 2 0 1 1 0 0 1-2 0zm5.5 2.8a3.8 3.8 0 0 1-3 .7 3.8 3.8 0 0 1-3-.7.3.3 0 0 1 .4-.4 3.3 3.3 0 0 0 2.6.6 3.3 3.3 0 0 0 2.6-.6.3.3 0 0 1 .4.4zm-.5-1.8a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"
        />
      </svg>
    );
  if (platform === "producthunt" || platform === "producthunt2")
    return (
      <svg
        className={cls}
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <circle cx="12" cy="12" r="10" />
        <path
          fill="white"
          d="M13 12h-3V9h3a1.5 1.5 0 0 1 0 3zm0-5h-5v10h2v-3h3a3.5 3.5 0 0 0 0-7z"
        />
      </svg>
    );
  // default
  return (
    <svg
      className={cls}
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M9 9h6M9 13h4" />
    </svg>
  );
}

export function Reviews() {
  const [page, setPage] = useState(0);
  const currentReviews = socialReviews[page];

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
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
          </svg>
          Reviews
        </span>
      </div>

      {/* Heading */}
      <div className="text-center mb-10">
        <h2 className="font-serif italic text-4xl sm:text-5xl text-zinc-900 mb-3">
          Trusted by 1,286+ designers worldwide
        </h2>
        <p className="text-zinc-500 text-sm">
          PromptStruct was created after wasting dozens of credits trying to get
          consistent visual outputs.
        </p>
      </div>

      {/* Featured testimonial */}
      <div className="rounded-2xl border border-zinc-200 bg-white p-8 mb-5 shadow-sm">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-500 mb-6">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z" />
            <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z" />
          </svg>
        </div>
        <p className="text-lg text-zinc-800 leading-relaxed mb-6">
          &ldquo;I wasted 50+ credits before realizing structured prompts cut my
          iterations by 70%. Structured editing made the process feel controlled
          instead of chaotic.&rdquo;
        </p>
        <div className="flex items-center gap-3">
          <Image
            src=""
            alt="Prashanth Krishna"
            className="h-10 w-10 rounded-full object-cover"
            width={40}
            height={40}
          />
          <div>
            <p className="text-sm font-semibold text-zinc-900">
              Prashanth Krishna
            </p>
            <p className="text-xs text-zinc-400">
              Product Designer & creator of PromptStruct
            </p>
          </div>
        </div>
      </div>

      {/* Social proof grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        {currentReviews.map((review, i) => (
          <div
            key={i}
            className="rounded-2xl border border-zinc-200 bg-white p-5 flex flex-col gap-4 shadow-sm"
          >
            <PlatformIcon platform={review.platform} />
            <p className="text-sm text-zinc-700 leading-relaxed flex-1">
              &ldquo;{review.quote}&rdquo;
            </p>
            <p className="text-sm font-medium text-zinc-500">{review.handle}</p>
          </div>
        ))}
      </div>

      {/* Pagination dots */}
      <div className="flex justify-center gap-2">
        {socialReviews.map((_, i) => (
          <button
            key={i}
            onClick={() => setPage(i)}
            className={`h-2.5 rounded-full transition-all duration-300 ${
              i === page
                ? "w-6 bg-blue-500"
                : "w-2.5 bg-zinc-300 hover:bg-zinc-400"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
