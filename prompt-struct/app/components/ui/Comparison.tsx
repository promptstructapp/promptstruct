"use client";

const rows = [
  {
    feature: "Consistency",
    manual: "Variable results",
    ps: "Repeatable outputs",
  },
  {
    feature: "Editability",
    manual: "Rewrite entire prompt",
    ps: "Tweak JSON fields",
  },
  {
    feature: "Credit Efficiency",
    manual: "Wasted iterations",
    ps: "Fewer retries",
  },
  {
    feature: "Export Flexibility",
    manual: "Platform-specific syntax",
    ps: "Copy/Download/Export (.json/.txt/.csv)",
  },
  {
    feature: "Learning Curve",
    manual: "Trial and error",
    ps: "Structured guidance",
  },
];

function XIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="shrink-0 text-red-400"
    >
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="shrink-0 text-emerald-500"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

export function Comparison() {
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
            <line x1="21" y1="10" x2="3" y2="10" />
            <line x1="21" y1="6" x2="3" y2="6" />
            <line x1="21" y1="14" x2="3" y2="14" />
            <line x1="21" y1="18" x2="3" y2="18" />
          </svg>
          Comparison
        </span>
      </div>

      {/* Heading */}
      <div className="text-center mb-10">
        <h2 className="font-serif italic text-4xl sm:text-5xl text-zinc-900 mb-3">
          Manual prompting vs. PromptStruct
        </h2>
        <p className="text-zinc-400 text-sm">
          Natural prompts rely on guesswork. Structured prompts give you
          control.
        </p>
      </div>

      {/* Table */}
      <div className="rounded-2xl border border-zinc-200 overflow-hidden bg-white shadow-sm">
        {/* Header row */}
        <div className="grid grid-cols-3 border-b border-zinc-200 px-6 py-4">
          <span className="text-sm font-bold text-zinc-900">Feature</span>
          <span className="text-sm font-bold text-zinc-900">
            Manual Prompting
          </span>
          <span className="text-sm font-bold text-zinc-900">PromptStruct</span>
        </div>

        {/* Data rows */}
        {rows.map((row, i) => (
          <div
            key={row.feature}
            className={`grid grid-cols-3 px-6 py-4 items-center ${
              i !== rows.length - 1 ? "border-b border-zinc-100" : ""
            }`}
          >
            {/* Feature */}
            <span className="text-sm text-zinc-400">{row.feature}</span>

            {/* Manual — red */}
            <div className="flex items-center gap-2">
              <XIcon />
              <span className="text-sm text-red-400">{row.manual}</span>
            </div>

            {/* PromptStruct — green */}
            <div className="flex items-center gap-2">
              <CheckIcon />
              <span className="text-sm text-emerald-500">{row.ps}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
