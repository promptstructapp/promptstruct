"use client";

import { useState } from "react";
import { PromptInput } from "@/app/components/conversion/PromptInput";
import { JsonOutput } from "@/app/components/conversion/JsonOutput";
import { LoadingSpinner } from "@/app/components/ui/LoadingSpinner";
import { useSession } from "next-auth/react";
import { UsageDisplay } from "@/app/components/ui/UsageDisplay";

type ParseResponse = {
  result?: object;
  error?: string;
  quota?: {
    plan: string;
    remaining: number;
  };
};

export function ConversionForm() {
  const { data: session } = useSession();
  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState({});
  const [quota, setQuota] = useState<{
    plan: string;
    remaining: number;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    const length = prompt.trim().length;
    if (length < 10 || length > 1000) {
      setError("Prompt must be between 10 and 1000 characters.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/parse", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? "Failed to convert prompt.");
        if (data.quota) {
          setQuota(data.quota);
        }
        return;
      }

      setResult(data.output);
      setQuota(data.quota);
    } catch (err) {
      console.error(err);
      setError("Unexpected error while converting prompt.");
    } finally {
      setLoading(false);
    }
  }

  const plan = (session?.user as any)?.plan ?? "free";

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-[minmax(0,2fr),minmax(0,2fr)]">
        <div className="space-y-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            <PromptInput
              value={prompt}
              onChange={setPrompt}
              disabled={loading}
            />
            {error && (
              <p className="text-xs text-red-500" role="alert">
                {error}
              </p>
            )}
            <div className="flex items-center justify-between gap-4">
              <button
                type="submit"
                disabled={loading}
                className="inline-flex items-center justify-center rounded-full bg-zinc-900 px-5 py-2 text-sm font-medium text-white shadow hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "Converting..." : "Convert to JSON"}
              </button>
              {loading && <LoadingSpinner />}
            </div>
          </form>
        </div>
        <div className="space-y-4">
          <JsonOutput data={result} />
          <UsageDisplay
            plan={quota?.plan ?? "free"}
            quota={{
              used: quota
                ? (quota.plan === "pro" ? 1000 : 5) - quota.remaining
                : 0,
              limit: quota?.plan === "pro" ? 1000 : 5,
              remaining: quota?.remaining ?? null,
            }}
          />
        </div>
      </div>

      {!session && (
        <p className="text-xs text-zinc-500">
          Sign in with Google to track usage, save history, and access higher
          limits.
        </p>
      )}
    </div>
  );
}
