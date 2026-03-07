"use client";

const personas = [
  {
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="10" />
        <path d="M8 14s1.5 2 4 2 4-2 4-2" />
        <path d="M9 9h.01M15 9h.01" />
        <path d="M7 9a5 5 0 0 1 10 0" />
      </svg>
    ),
    title: "Midjourney Artists",
    description:
      "Tired of Midjourney giving you wildly different results from the same prompt? PromptStruct helps you see exactly which keywords control style, lighting, and composition. Once you understand what's working, you can replicate successful outputs and build a library of reliable prompt structures.",
  },
  {
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 19l7-7 3 3-7 7-3-3z" />
        <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />
        <path d="M2 2l7.586 7.586" />
        <circle cx="11" cy="11" r="2" />
      </svg>
    ),
    title: "Designers",
    description:
      "Whether you're creating social media assets or concept art, PromptStruct helps you turn rough ideas into structured prompts. See how professional prompts are built, maintain visual consistency across projects, and spend less time tweaking – more time designing.",
  },
  {
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
        <circle cx="8.5" cy="8.5" r="1.5" />
        <polyline points="21 15 16 10 5 21" />
      </svg>
    ),
    title: "Stable Diffusion Users",
    description:
      "Stable Diffusion offers incredible control, but only if your prompt is structured right. PromptStruct shows you the layers behind your images – subject, environment, lighting – so you can fine-tune with precision and get the same quality every time.",
  },
  {
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="3" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="14" width="7" height="7" rx="1" />
        <path d="M7 17v-4a3 3 0 0 1 3-3h3" />
      </svg>
    ),
    title: "Workflow Builders",
    description:
      "Building AI-powered workflows? PromptStruct delivers clean, consistent JSON that you can pipe into automation tools, prompt generators, or analytics dashboards. No parsing messy text – just structured data ready for action.",
  },
  {
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
      </svg>
    ),
    title: "Prompt Learners",
    description:
      "Learning prompt engineering? PromptStruct acts like X-ray vision for prompts. Paste any example, and see exactly how it's constructed layer by layer. It's the fastest way to go from beginner to pro.",
  },
  {
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    title: "Creative Teams",
    description:
      "For agencies and in-house teams, brand consistency is everything. PromptStruct helps you document and share prompt structures that work, so everyone on your team can generate on-brand visuals without endless back-and-forth.",
  },
];

export function BuiltForCreators() {
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
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
          </svg>
          Built for AI creators
        </span>
      </div>

      {/* Heading */}
      <div className="text-center mb-12">
        <h2 className="font-serif italic text-4xl sm:text-5xl text-zinc-900 mb-3">
          Built for creators who need consistency
        </h2>
        <p className="text-zinc-500 text-sm">
          See how designers, artists, and teams use PromptStruct to eliminate
          prompt guesswork
        </p>
      </div>

      {/* 6-cell grid inside one big rounded border */}
      <div className="rounded-2xl border border-zinc-200 overflow-hidden">
        <div className="grid grid-cols-1 sm:grid-cols-3">
          {personas.map((persona, i) => {
            const isLastRow = i >= 3;
            const col = i % 3;
            const isLastCol = col === 2;

            return (
              <div
                key={persona.title}
                className={`p-8 flex flex-col gap-4
                  ${!isLastRow ? "border-b border-zinc-200" : ""}
                  ${!isLastCol ? "sm:border-r border-zinc-200" : ""}
                `}
              >
                {/* Icon */}
                <div className="text-zinc-800">{persona.icon}</div>

                {/* Title with blue left border */}
                <div className="flex flex-col gap-2">
                  <h3 className="text-base font-bold text-zinc-900 border-l-2 border-blue-500 pl-3 leading-snug">
                    {persona.title}
                  </h3>
                  <p className="text-sm text-zinc-500 leading-relaxed">
                    {persona.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
