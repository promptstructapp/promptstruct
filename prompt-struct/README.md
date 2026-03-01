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

- **UI components**
  - `app/components/auth/SessionProvider.tsx` – wraps NextAuth session provider.
  - `app/components/auth/LoginButton.tsx` – sign‑in / sign‑out button.
  - `app/components/ui/Navbar.tsx` – top navigation bar.
  - `app/components/ui/UsageDisplay.tsx` – usage progress bars by plan.
  - `app/components/ui/LoadingSpinner.tsx` – small loading indicator.
  - `app/components/conversion/PromptInput.tsx` – textarea + validation.
  - `app/components/conversion/JsonOutput.tsx` – syntax‑highlighted JSON + copy button.
  - `app/components/conversion/ConversionForm.tsx` – main conversion form, connects UI ↔ API.

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

    ```bash
    NEXTAUTH_URL=http://localhost:3000
    NEXTAUTH_SECRET=...
    GOOGLE_CLIENT_ID=...
    GOOGLE_CLIENT_SECRET=...
    MAAZA_API_KEY=...
    OPENROUTER_API_KEY=...
    ```

  - `.env.local.example` documents what you need to set.

---

## 4. Layouts and Pages (Routing)

### 4.1 Root Layout – `app/layout.tsx`

- **Purpose**: Wraps *every* page in the app.
- **Key responsibilities**:
  - Defines `<html>` and `<body>`.
  - Applies global fonts and background.
  - Sets up global providers like `SessionProvider` for auth.
  - Renders the `Navbar` on every page.

**Execution**: Runs on the server; children can include client components inside.

### 4.2 Home Page – `app/page.tsx` (`/`)

- **Purpose**: The main prompt → JSON conversion UI.
- **What it renders**:
  - Title + description of what the app does.
  - `<ConversionForm />`, which handles:
    - Prompt input.
    - Calling the `/api/parse` endpoint.
    - Showing JSON output and usage info.

**Execution**: Server Component that renders once per request; it includes client components inside.

### 4.3 Dashboard Page – `app/dashboard/page.tsx` (`/dashboard`)

- **Purpose**: Shows plan, usage, and (placeholder) history.
- **Flow**:
  - Uses `getServerSession(authOptions)` to ensure the user is logged in.
  - If not logged in, calls `redirect("/")`.
  - Fetches `/api/user/usage` to get quota and history.
  - Renders:
    - `UsageDisplay` with plan and usage.
    - Plan/upgrade card (UI only).
    - History section (placeholder until a real DB is added).

**Execution**: Runs entirely on the server; no hooks are used directly in this file.

---

## 5. API Routes (Backend Logic)

In the App Router, files under `app/api/**/route.ts` define **Route Handlers**.

### 5.1 Auth – `app/api/auth/[...nextauth]/route.ts`

- **URL**: `/api/auth/*`
- **Purpose**: Configures NextAuth (Google OAuth).
- **Key pieces**:
  - **Providers**: Google, using `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET`.
  - **Callbacks**:
    - `signIn` → calls `findOrCreateUser(email, userData)` in `app/lib/db/users.js`.
    - `session` → enriches `session.user` with:
      - `id`, `plan`, `requests_used`, `daily_requests_used` from placeholder DB.
  - Exports:

    ```ts
    const handler = NextAuth(authOptions);
    export { handler as GET, handler as POST };
    ```

This is the central hub for authentication.

### 5.2 Parse – `app/api/parse/route.ts` (POST `/api/parse`)

- **Responsibility**: Convert a text prompt into structured JSON (using placeholder logic).
- **Flow**:
  1. Confirm the user is authenticated via `getServerSession(authOptions)`.
  2. Read `{ prompt }` from the request body and validate length (10–1000 characters).
  3. Call `checkUserQuota(email)` from `app/lib/utils/rateLimiter.js`.
  4. If not allowed, return HTTP `429` with an error and quota details.
  5. If allowed, call `generateSceneJsonFromPrompt(prompt)` from `app/lib/utils/llm.ts`.
  6. Call `incrementUserQuota(email)` to update counters (placeholder).
  7. If plan is `"pro"`, call `saveConversion(userId, prompt, jsonOutput)` (placeholder).
  8. Return `{ output, quota }` as JSON.

**Important**: Right now, **all LLM and DB behavior is mocked**, so you can change only the placeholder files later to plug in real implementations.

### 5.3 Usage – `app/api/user/usage/route.ts` (GET `/api/user/usage`)

- **Responsibility**: Return usage stats and conversion history.
- **Flow**:
  1. Authenticate via `getServerSession(authOptions)`.
  2. Call `checkUserQuota(email)` for usage limits and counters.
  3. Call `getUserHistory(userId, limit)` from `app/lib/db/history.js`.
  4. Return `{ plan, quota, history }`.

This endpoint powers the dashboard.

---

## 6. Domain Logic Placeholders

These files intentionally decouple the **app logic** from **real storage/LLM APIs** so you can swap implementations later.

### 6.1 DB Layer – `app/lib/db/*`

- **`users.js`**
  - **`findOrCreateUser(email, userData)`**: logs and returns a mock user with:
    - `id`, `email`, `name`, `plan`, `requests_used`, `daily_requests_used`, `last_request_date`.
  - **`getUserByEmail(email)`**: returns a similar mock user.
  - **`updateUserQuota(email, increments)`**: logs the update and returns `{ success: true }`.
  - **`resetDailyQuotaIfNeeded(email, lastRequestDate)`**: logs when it would reset daily usage.

- **`history.js`**
  - **`saveConversion(userId, prompt, jsonOutput)`**: logs and returns a mock history ID.
  - **`getUserHistory(userId, limit)`**: returns an empty array (placeholder).

- **`index.js`**
  - Re‑exports all DB functions so you can import them from `../db`.

> Later, you will replace these implementations with real Supabase/Postgres queries without changing the rest of the app.

### 6.2 Rate Limiter – `app/lib/utils/rateLimiter.js`

- **`checkUserQuota(userEmail)`**
  - Uses DB placeholders to fetch a user and reset daily quota if needed.
  - Enforces:
    - **Free**: 10 requests/day, unlimited monthly.
    - **Pro**: unlimited daily, 1000/month.
  - Returns:
    - `{ allowed: true, user, remaining: { daily, monthly } }` or
    - `{ allowed: false, error, current, limit, resetTime? }`.

- **`incrementUserQuota(userEmail)`**
  - Calls `updateUserQuota` with request increments (both daily and monthly).

### 6.3 LLM Logic – `app/lib/utils/llm.ts`

- **`OUTPUT_SCHEMA`**
  - JSON schema describing the final shape of the output (`scene`, `elements`, `style`, `mood`).

- **`SceneJson`**
  - TypeScript type that matches the schema.

- **`generateSceneJsonFromPrompt(prompt)`**
  - Logs it was called (with preview/length).
  - Returns a **mock JSON object** with:
    - Simple heuristic for `time_of_day` (e.g. detects “sunset”, “night”, etc.).
    - Placeholder strings for other fields.
    - Includes the raw prompt in `elements.details`.

> This is where you will later plug in real Maaza / OpenRouter logic, while keeping the same return type so the rest of the app doesn’t change.

---

## 7. UI Components – How They Fit Together

### 7.1 Auth Components

- **`SessionProvider.tsx`**
  - Client component wrapping NextAuth’s `SessionProvider`.
  - Used in `app/layout.tsx` so the whole tree can access `useSession()`.

- **`LoginButton.tsx`**
  - Client component.
  - Uses `useSession()` to:
    - Show “Sign in with Google” when logged out.
    - Show user name/email and “Sign out” when logged in.

### 7.2 Navbar – `Navbar.tsx`

- Client component.
- Uses `usePathname()` to highlight the active route.
- Renders:
  - Brand icon and text.
  - Links to `/` and `/dashboard`.
  - `LoginButton`.

### 7.3 Conversion Components

- **`ConversionForm.tsx`**
  - Client component; main brain of the UI.
  - Manages `prompt`, `result`, `quota`, `error`, `loading` with React state.
  - On submit:
    - Validates prompt length.
    - POSTs to `/api/parse` and updates state from the response.
  - Renders:
    - `PromptInput` for text entry.
    - `JsonOutput` for structured JSON.
    - `UsageDisplay` for plan and progress bars.
    - `LoadingSpinner` when a request is in flight.

- **`PromptInput.tsx`**
  - Textarea with:
    - Character count.
    - Basic validation messages (“too short”, “too long”).
    - Focus styles and clean card UI.

- **`JsonOutput.tsx`**
  - If no data → shows a placeholder card.
  - If data → pretty‑prints JSON in a dark code block.
  - Has a “Copy” button that uses the Clipboard API.

- **`UsageDisplay.tsx`**
  - Renders current plan and usage progress bars.
  - Calculates daily and monthly percentages based on plan and `quota`.

- **`LoadingSpinner.tsx`**
  - Small animated spinner with “Processing…” text.

---

## 8. Middleware – `middleware.ts`

- **Purpose**: Run before certain routes to enforce authentication.
- **Matcher**:
  - Applies to:
    - `/dashboard/:path*`
    - `/api/parse`
    - `/api/user/usage`
- **Flow**:
  1. Checks if the request path is protected.
  2. Uses `getToken({ req, secret: NEXTAUTH_SECRET })` from `next-auth/jwt` to see if there’s a session.
  3. If not authenticated, redirects to `/` with a `?from=...` query.
  4. Otherwise, lets the request through.

> This gives you a central place to gate both pages and API routes without writing auth logic in every handler.

---

## 9. How to Practice (Typing Exercises)

Here are a few small exercises you can type out yourself to get comfortable:

- **Exercise 1 – New page**
  - Create `app/about/page.tsx`:

    ```tsx
    export default function AboutPage() {
      return <div>About this app</div>;
    }
    ```

  - Visit `/about` in the browser.

- **Exercise 2 – Nested layout**
  - Create `app/dashboard/layout.tsx`:

    ```tsx
    export default function DashboardLayout({ children }: { children: React.ReactNode }) {
      return (
        <div>
          <h1>Dashboard Shell</h1>
          {children}
        </div>
      );
    }
    ```

  - See how it wraps the existing dashboard page.

- **Exercise 3 – Simple API route**
  - Create `app/api/hello/route.ts`:

    ```ts
    import { NextResponse } from "next/server";

    export async function GET() {
      return NextResponse.json({ message: "Hello from API" });
    }
    ```

  - Visit `/api/hello` and inspect the JSON response.

- **Exercise 4 – Client vs Server**
  - Create `app/components/demo/Counter.tsx`:

    ```tsx
    "use client";
    import { useState } from "react";

    export function Counter() {
      const [count, setCount] = useState(0);
      return (
        <button onClick={() => setCount(count + 1)}>
          Count: {count}
        </button>
      );
    }
    ```

  - Import and render `<Counter />` inside `app/page.tsx`.

As you type these out and experiment, you’ll build an intuition for how pages, layouts, API routes, and client/server components all fit together in a real Next.js App Router project.
