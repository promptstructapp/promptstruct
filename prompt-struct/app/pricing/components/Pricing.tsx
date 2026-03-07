"use client";

import Link from "next/link";

const plans = [
  {
    name: "Free",
    nameColor: "text-zinc-900",
    subtitle: "For Hobbyist",
    price: "$0",
    period: "/forever",
    priceColor: "text-zinc-900",
    description: "Perfect for getting started",
    cta: "Get Started",
    ctaStyle: "border border-blue-500 text-blue-500 hover:bg-blue-50",
    ctaNote: "Get Started — no credit card",
    features: [
      { text: "10 JSON conversions/month", status: "green" },
      { text: "Prompts gallery access", status: "green" },
      { text: "Download as .json/.txt/.csv", status: "orange" },
      { text: "No Support", status: "orange" },
      { text: "Feature Request", status: "orange" },
    ],
  },
  {
    name: "Pro",
    nameColor: "text-blue-500",
    subtitle: "For Creatives",
    price: "$12",
    period: "/month",
    priceColor: "text-blue-500",
    description: "Perfect for getting started",
    cta: "Start Trail",
    ctaStyle: "bg-blue-600 text-white hover:bg-blue-700",
    ctaNote: "Pro trial — cancel anytime",
    features: [
      { text: "1000 JSON conversions/month", status: "green" },
      { text: "Prompts gallery access", status: "green" },
      { text: "Download as .json/.txt/.csv", status: "green" },
      { text: "Community Support", status: "green" },
      { text: "Feature Request", status: "green" },
    ],
  },
  {
    name: "Lifetime",
    nameColor: "text-emerald-500",
    subtitle: "For Professionals",
    price: "$49",
    period: "/once",
    priceColor: "text-emerald-500",
    description: "Perfect for getting started",
    cta: "Buy Lifetime",
    ctaStyle: "bg-emerald-500 text-white hover:bg-emerald-600",
    ctaNote: "Lifetime — pay once, own forever",
    features: [
      { text: "Unlimited Conversions", status: "green" },
      { text: "Prompts gallery access", status: "green" },
      { text: "Download as .json/.txt/.csv", status: "green" },
      { text: "Email Support", status: "green" },
      { text: "Feature Request", status: "green" },
    ],
  },
];

function GreenCheck() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      className="shrink-0"
    >
      <circle cx="12" cy="12" r="10" stroke="#22c55e" strokeWidth="1.5" />
      <path
        d="M8 12l3 3 5-5"
        stroke="#22c55e"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function OrangeWarning() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      className="shrink-0"
    >
      <circle cx="12" cy="12" r="10" stroke="#f59e0b" strokeWidth="1.5" />
      <path
        d="M12 8v4"
        stroke="#f59e0b"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <circle cx="12" cy="16" r="1" fill="#f59e0b" />
    </svg>
  );
}

export function PricingComparison() {
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
            <line x1="12" y1="1" x2="12" y2="23" />
            <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
          </svg>
          Pricing
        </span>
      </div>

      {/* Heading */}
      <div className="text-center mb-12">
        <h2 className="font-serif italic text-4xl sm:text-5xl text-zinc-900 mb-3">
          Simple, Transparent Pricing
        </h2>
        <p className="text-zinc-400 text-sm">
          Start free, Upgrade when you need more power
        </p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className="rounded-2xl border border-zinc-200 bg-white p-6 flex flex-col gap-4 shadow-sm"
          >
            {/* Plan name + subtitle */}
            <div>
              <h3 className={`text-xl font-semibold ${plan.nameColor}`}>
                {plan.name}
              </h3>
              <p className="text-sm text-zinc-400 mt-0.5">{plan.subtitle}</p>
            </div>

            <hr className="border-zinc-100" />

            {/* Price */}
            <div>
              <div className="flex items-baseline gap-1">
                <span className={`text-4xl font-bold ${plan.priceColor}`}>
                  {plan.price}
                </span>
                <span className="text-sm text-zinc-400">{plan.period}</span>
              </div>
              <p className="text-sm text-zinc-400 mt-1">{plan.description}</p>
            </div>

            {/* Features */}
            <ul className="flex flex-col gap-2.5 flex-1">
              {plan.features.map((f) => (
                <li
                  key={f.text}
                  className="flex items-center gap-2.5 text-sm text-zinc-700"
                >
                  {f.status === "green" ? <GreenCheck /> : <OrangeWarning />}
                  {f.text}
                </li>
              ))}
            </ul>

            {/* CTA */}
            <div className="flex flex-col gap-2 mt-2">
              <button
                className={`w-full rounded-xl px-4 py-2.5 text-sm font-semibold transition-colors ${plan.ctaStyle}`}
              >
                {plan.cta}
              </button>
              <p className="text-xs text-zinc-400 text-center">
                {plan.ctaNote}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
