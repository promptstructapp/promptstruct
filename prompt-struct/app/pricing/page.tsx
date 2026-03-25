import { PricingComparison } from "./components/Pricing";
import { Reviews } from "../components/ui/Reviews";
import { FAQ } from "../components/ui/Faq";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "PromptStruct Pricing – Free & Pro Plans for AI Creators",
  description:
    "Start free with 10 conversions/month. Upgrade to Pro for unlimited analyses, export formats (JSON/YAML/CSV), and prompt history. No hidden fees.",
  alternates: {
    canonical: "https://promptstruct.vercel.app/pricing",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    url: "https://promptstruct.vercel.app/pricing",
    type: "website",
    title: "PromptStruct Pricing – Free & Pro Plans",
    description:
      "Start free with 10 conversions/month. Upgrade to Pro for unlimited analyses, export formats, and prompt history.",
    images: ["https://promptstruct.vercel.app/og-image.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "PromptStruct Pricing – Free & Pro Plans",
    description:
      "Start free with 10 conversions/month. Upgrade to Pro for unlimited analyses, export formats, and prompt history.",
    images: ["https://promptstruct.vercel.app/og-image.png"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "PromptStruct Pro",
  description:
    "Unlimited prompt-to-JSON conversions, export formats, and prompt history.",
  offers: {
    "@type": "Offer",
    price: "9",
    priceCurrency: "USD",
    availability: "https://schema.org/OnlineOnly",
    priceValidUntil: "2026-12-31",
  },
};

export default function Pricing() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="space-y-8">
        <PricingComparison />
        <Reviews />
        <FAQ />
      </div>
    </>
  );
}
