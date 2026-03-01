type Usage = {
  daily?: { used: number; limit: number | null };
  monthly?: { used: number; limit: number | null };
};

type Props = {
  plan: "free" | "pro" | string;
  quota?: {
    remaining?: {
      daily?: number;
      monthly?: number;
    };
    user?: {
      daily_requests_used?: number;
      requests_used?: number;
    };
  };
};

function buildUsage(plan: string, quota?: Props["quota"]): Usage {
  const dailyUsed = quota?.user?.daily_requests_used ?? 0;
  const monthlyUsed = quota?.user?.requests_used ?? 0;

  const limits =
    plan === "pro"
      ? { daily: null, monthly: 1000 }
      : { daily: 10, monthly: Infinity };

  return {
    daily: {
      used: dailyUsed,
      limit: limits.daily,
    },
    monthly: {
      used: monthlyUsed,
      limit: Number.isFinite(limits.monthly) ? limits.monthly : null,
    },
  };
}

export function UsageDisplay({ plan, quota }: Props) {
  const usage = buildUsage(plan, quota);

  const dailyPct =
    usage.daily && usage.daily.limit
      ? Math.min(100, (usage.daily.used / usage.daily.limit) * 100)
      : 0;
  const monthlyPct =
    usage.monthly && usage.monthly.limit
      ? Math.min(100, (usage.monthly.used / usage.monthly.limit) * 100)
      : 0;

  return (
    <section className="rounded-xl border border-zinc-200 bg-zinc-50 p-4 text-sm">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-zinc-500">
            Plan
          </p>
          <p className="text-sm font-semibold text-zinc-900">
            {plan === "pro" ? "Pro" : "Free"}
          </p>
        </div>
        {plan === "free" && (
          <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-medium text-amber-700">
            Free tier · 10 conversions / day
          </span>
        )}
        {plan === "pro" && (
          <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
            Pro tier · 1000 conversions / month
          </span>
        )}
      </div>

      <div className="mt-4 space-y-3">
        {usage.daily?.limit && (
          <div>
            <div className="mb-1 flex items-center justify-between text-xs text-zinc-600">
              <span>Daily conversions</span>
              <span>
                {usage.daily.used}/{usage.daily.limit}
              </span>
            </div>
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-zinc-200">
              <div
                className="h-full rounded-full bg-zinc-900 transition-all"
                style={{ width: `${dailyPct}%` }}
              />
            </div>
          </div>
        )}

        {usage.monthly?.limit && (
          <div>
            <div className="mb-1 flex items-center justify-between text-xs text-zinc-600">
              <span>Monthly conversions</span>
              <span>
                {usage.monthly.used}/{usage.monthly.limit}
              </span>
            </div>
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-zinc-200">
              <div
                className="h-full rounded-full bg-zinc-900 transition-all"
                style={{ width: `${monthlyPct}%` }}
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

