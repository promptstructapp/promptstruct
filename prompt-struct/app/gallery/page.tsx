import { GalleryPage } from "./components/GalleryPage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Prompt Gallery – AI Images Generated with Structured Prompts",
  description:
    "See real AI images created using JSON‑structured prompts. Browse examples from Midjourney, DALL·E, and Stable Diffusion. Get inspired and try the tool free.",
  alternates: {
    canonical: "https://promptstruct.vercel.app/gallery",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    url: "https://promptstruct.vercel.app/gallery",
    type: "website",
    title: "Prompt Gallery – AI Images with Structured Prompts",
    description:
      "See real AI images created using JSON‑structured prompts. Browse examples and get inspired.",
    images: ["https://promptstruct.vercel.app/og-gallery.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Prompt Gallery – AI Images with Structured Prompts",
    description:
      "See real AI images created using JSON‑structured prompts. Browse examples and get inspired.",
    images: ["https://promptstruct.vercel.app/og-gallery.png"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": ["CollectionPage", "ImageGallery"],
  name: "Prompts Gallery – PromptStruct",
  description:
    "Real prompts structured by PromptStruct — copy and use instantly.",
  url: "https://promptstruct.vercel.app/gallery",
  publisher: {
    "@type": "Organization",
    name: "PromptStruct",
    url: "https://promptstruct.vercel.app",
  },
};

export default function Gallery() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="space-y-8">
        <GalleryPage />
      </div>
    </>
  );
}
