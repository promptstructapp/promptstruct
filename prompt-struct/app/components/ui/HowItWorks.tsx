"use client";

const steps = [
  {
    number: 1,
    title: "Paste your natural language description",
    description: "Simply type or paste your prompt idea into the input box.",
  },
  {
    number: 2,
    title: "Get instant structured JSON output",
    description: "Our engine parses your text into semantic fields instantly.",
  },
  {
    number: 3,
    title: "Copy, download, or export",
    description: "Use your JSON directly in Midjourney, SDXL, or DALL·E.",
  },
];

export function HowItWorks() {
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
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
          How it works
        </span>
      </div>

      {/* Heading */}
      <div className="text-center mb-12">
        <h2 className="font-serif text-4xl sm:text-5xl italic text-zinc-900 mb-3">
          Convert your prompt in 3 steps
        </h2>
        <p className="text-zinc-500 text-sm">
          Paste your natural language description and get structured JSON
          instantly.
        </p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        {steps.map((step) => (
          <div
            key={step.number}
            className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm flex flex-col gap-6"
          >
            {/* Number badge */}
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-50 text-blue-500 text-sm font-semibold">
              {step.number}
            </div>

            {/* Text */}
            <div className="flex flex-col gap-2">
              <h3 className="text-base font-bold text-zinc-900 leading-snug">
                {step.title}
              </h3>
              <p className="text-sm text-zinc-400 leading-relaxed">
                {step.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
