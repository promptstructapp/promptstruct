"use client";

import { useState } from "react";

const faqs = [
  {
    question: "What is PromptStruct?",
    answer:
      "PromptStruct is a tool that converts natural language descriptions into structured JSON format. It helps AI artists, designers, and creators get consistent, repeatable outputs from image generation tools like Midjourney, Stable Diffusion, and DALL·E.",
  },
  {
    question: "How does the conversion work?",
    answer:
      "You paste any natural language prompt and our AI engine parses it into semantic fields — subject, environment, lighting, mood, style, and more — returned as a clean JSON object you can copy, download, or pipe into your workflow.",
  },
  {
    question: "Which AI tools does PromptStruct support?",
    answer:
      "PromptStruct generates structured JSON that works with any AI image generation tool including Midjourney, Stable Diffusion, DALL·E, Adobe Firefly, and more. The structured format is tool-agnostic.",
  },
  {
    question: "Is there a free plan?",
    answer:
      "Yes! The free plan includes 10 conversions per month with no credit card required. For unlimited daily conversions and priority processing, upgrade to the Pro plan.",
  },
  {
    question: "Can I export the JSON output?",
    answer:
      "Absolutely. You can copy the JSON to your clipboard, download it as a .json file, or export it as .txt or .csv. Pro users also get batch export and API access.",
  },
  {
    question: "Do I need to sign in to use PromptStruct?",
    answer:
      "You can try it without signing in, but creating a free account lets you track your usage, view your conversion history, and save your structured prompts for later.",
  },
];

function FAQItem({
  faq,
  isOpen,
  onToggle,
}: {
  faq: { question: string; answer: string };
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="rounded-2xl border border-zinc-200 bg-white overflow-hidden shadow-sm">
      {/* Question row */}
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between px-6 py-5 text-left"
      >
        <span className="text-sm font-semibold text-zinc-900">
          {faq.question}
        </span>
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-50 text-blue-400 ml-4 transition-transform duration-300">
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`transition-transform duration-300 ${isOpen ? "rotate-180" : "rotate-0"}`}
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </div>
      </button>

      {/* Answer — animate height via grid trick */}
      <div
        className={`grid transition-all duration-300 ease-in-out ${
          isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <p className="px-6 pb-5 text-sm text-zinc-400 leading-relaxed">
            {faq.answer}
          </p>
        </div>
      </div>
    </div>
  );
}

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(1);

  function toggle(i: number) {
    setOpenIndex(openIndex === i ? null : i);
  }

  return (
    <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
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
            <circle cx="12" cy="12" r="10" />
            <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
            <line x1="12" y1="17" x2="12.01" y2="17" />
          </svg>
          FAQ&apos;s
        </span>
      </div>

      {/* Heading */}
      <div className="text-center mb-10">
        <h2 className="font-serif italic text-4xl sm:text-5xl text-zinc-900 mb-3">
          Frequently Asked Question
        </h2>
        <p className="text-zinc-400 text-sm">
          Paste your natural language description and get structured JSON
          instantly.
        </p>
      </div>

      {/* Accordion */}
      <div className="flex flex-col gap-3">
        {faqs.map((faq, i) => (
          <FAQItem
            key={i}
            faq={faq}
            isOpen={openIndex === i}
            onToggle={() => toggle(i)}
          />
        ))}
      </div>
    </section>
  );
}
