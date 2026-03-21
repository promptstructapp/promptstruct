## Prompt → JSON Struct App – Next.js User Manual

This repo is a **Next.js App Router** project that converts natural‑language prompts into structured JSON. This document is a **practical manual** to help you learn how the app (and Next.js) works, file by file.

---

## 1. Big Picture: How a Next.js App Works

- **Next.js = React + Routing + Server Features**
  - **React components** render the UI.
  - **File‑based routing** turns files into URLs (`app/page.tsx` → `/`, `app/dashboard/page.tsx` → `/dashboard`).
  - **Server Components (default)** run on the server and can access secrets/DB.
  - **Client Components** (with `"use client"`) run in the browser and can use hooks and event handlers.

- **App Router (`app/` folder)** is the routing system used here:
  - Each **folder** under `app/` is a **route segment**.
  - `page.tsx` inside a folder = actual page for that URL.
  - `layout.tsx` inside a folder = wrapper that surrounds all pages in that segment.
  - `app/api/**/route.ts` = backend endpoints (API routes).
  - `middleware.ts` = runs before matching routes for things like auth and redirects.

---

## 2. Project Map and Responsibilities

High‑level structure:

- **Config & tooling**
  - `package.json` – dependencies and scripts.
  - `next.config.ts` – Next.js configuration.
  - `tsconfig.json` – TypeScript configuration and path aliases.
  - `.env.local` – runtime secrets (not committed; `.env.local.example` is a template).

- **App entry & layouts**
  - `app/layout.tsx` – root layout, wraps all pages.
  - `app/page.tsx` – home page (`/`) with the conversion UI.
  - `app/dashboard/page.tsx` – dashboard page (`/dashboard`).
  - `app/examples/page.tsx` - Example page with featured components.
  - `app/pricing/page.tsx` - Pricing page
  - `app/gallery/page.tsx` - Gallery page

- **Backend & auth**
  - `app/api/auth/[...nextauth]/route.ts` – NextAuth (Google OAuth) configuration.
  - `app/api/parse/route.ts` – main JSON conversion endpoint.
  - `app/api/user/usage/route.ts` – usage & history endpoint.
  - `middleware.ts` – protects dashboard and API routes.

- **Domain logic (placeholders)**
  - `app/lib/db/users.js` – user‑related DB placeholders.
  - `app/lib/db/history.js` – conversion history placeholders.
  - `app/lib/db/index.js` – exports all DB functions.
  - `app/lib/utils/rateLimiter.js` – quota checks and increments (using DB placeholders).
  - `app/lib/utils/llm.ts` – LLM placeholder: converts prompts into JSON with the target schema.
  - `app/lib/auth/auth.ts` - Configuration for authentication.

- **UI components**
  - `app/components/auth/SessionProvider.tsx` – wraps NextAuth session provider.
  - `app/components/auth/LoginButton.tsx` – sign‑in / sign‑out button.
  - `app/components/ui/Navbar.tsx` – top navigation bar.
  - `app/components/ui/UsageDisplay.tsx` – usage progress bars by plan.
  - `app/components/ui/LoadingSpinner.tsx` – small loading indicator.
  - `app/components/ui/BuildForCreators.tsx` - Section describing build for creators.
  - `app/components/ui/Chatfaq.tsx` - Chat FAQ section.
  - `app/components/ui/Comparison.tsx` - Comparison table between plans.
  - `app/components/ui/Conversionui.tsx` - Conversion UI components.
  - `app/components/ui/Cta.tsx` - Call to action component.
  - `app/components/ui/Faq.tsx` - FAQ section.
  - `app/components/ui/Footer.tsx` - Footer section.
  - `app/components/ui/HeroSection.tsx` - Hero section of the landing page.
  - `app/components/ui/HowItWorks.tsx` - How it works section of the landing page.
  - `app/components/ui/Reviews.tsx` - Reviews section.
  - `app/components/conversion/PromptInput.tsx` – textarea + validation.
  - `app/components/conversion/JsonOutput.tsx` – syntax‑highlighted JSON + copy button.
  - `app/components/conversion/ConversionForm.tsx` – main conversion form, connects UI ↔ API.
  - `app/pricing/components/Pricing.tsx` - Pricing plans UI component
  - `app/examples/components/ExamplePage.tsx` - Example page UI Component
  - `app/gallery/components/GalleryPage.tsx` - Gallery page UI Component

---

## 3. Config Files – What They Do

- **`package.json`**
  - **scripts**
    - **`dev`**: `next dev` (start dev server).
    - **`build`**: `next build` (production build).
    - **`start`**: `next start` (run production build).
  - **dependencies**
    - **`next`**: framework.
    - **`react`, `react-dom`**: UI library/runtime.
    - **`next-auth`**: authentication (Google OAuth).

- **`next.config.ts`**
  - Default export `nextConfig` tells Next.js how to behave.
  - You can add things like:
    - `images.domains` for remote images.
    - `redirects`, `rewrites`, feature flags, etc.

- **`tsconfig.json`**
  - Controls TypeScript compilation.
  - Key points:
    - **`strict: true`**: catch more bugs at compile time.
    - **`paths: { "@/*": ["./*"] }`**: lets you import like `@/app/page` instead of long relative paths.

- **`.env.local` & `.env.local.example`**
  - `.env.local` (ignored by git) stores secrets used at runtime:
