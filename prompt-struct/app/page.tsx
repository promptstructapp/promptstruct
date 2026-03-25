import { HeroSection } from "./components/ui/HeroSection";
import { ChatFAQ } from "./components/ui/Chatfaq";
import { HowItWorks } from "./components/ui/HowItWorks";
import { BuiltForCreators } from "./components/ui/BuildForCreators";
import { Reviews } from "./components/ui/Reviews";
import { Comparison } from "./components/ui/Comparison";
import { ConversionUI } from "./components/ui/Conversionui";
import { FAQ } from "./components/ui/Faq";
import { CTA } from "./components/ui/Cta";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "PromptStruct: Turn AI Prompts into Structured JSON",
  description:
    "Convert any natural language prompt to structured JSON. Extract subject, lighting, mood, and more. Free tier: 10 conversions/month. No credit card required.",
  alternates: {
    canonical: "https://promptstruct.vercel.app/",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    url: "https://promptstruct.vercel.app/",
    type: "website",
    title: "PromptStruct: Turn AI Prompts into Structured JSON",
    description:
      "Convert any natural language prompt to structured JSON. Extract subject, lighting, mood, and more. Free tier: 10 conversions/month.",
    images: ["https://promptstruct.vercel.app/og-image.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "PromptStruct: Turn AI Prompts into Structured JSON",
    description:
      "Convert any natural language prompt to structured JSON. Extract subject, lighting, mood, and more. Free tier: 10 conversions/month.",
    images: ["https://promptstruct.vercel.app/og-image.png"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "PromptStruct",
  applicationCategory: "DeveloperApplication",
  operatingSystem: "Web",
  description:
    "Convert natural language prompts to structured JSON for AI image generation.",
  url: "https://promptstruct.vercel.app/",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
    availability: "https://schema.org/OnlineOnly",
  },
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="space-y-8">
        <HeroSection />
        <ChatFAQ />
        <HowItWorks />
        <BuiltForCreators />
        <Reviews />
        <Comparison />
        <ConversionUI />
        <FAQ />
        <CTA />
      </div>
    </>
  );
}
