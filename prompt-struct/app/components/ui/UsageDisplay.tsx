export const PLAN_LIMITS: Record<string, number | null> = {
  free: 10,
  pro: 1000,
  lifetime: null, // unlimited
};

const PLAN_LABELS: Record<string, string> = {
  free: `Free tier · ${PLAN_LIMITS.free} conversions / month`,
  pro: `Pro · ${PLAN_LIMITS.pro} conversions / month`,
  lifetime: "Lifetime · Unlimited conversions",
};

const PLAN_BADGE_STYLES: Record<string, string> = {
  free: "bg-amber-50 text-amber-700",
  pro: "bg-blue-50 text-blue-600",
  lifetime: "bg-emerald-50 text-emerald-700",
};

type Props = {
  plan: "free" | "pro" | string;
  quota?: {
    used?: number;
    limit?: number | null;
    remaining?: number | null;
  };
};

function progressColor(pct: number): string {
  if (pct >= 90) return "bg-red-500";
  if (pct >= 70) return "bg-amber-400";
  return "bg-blue-500";
}

export function UsageDisplay({ plan, quota }: Props) {
  const normalizedPlan = plan in PLAN_LIMITS ? plan : "free";
  const limit = quota?.limit ?? PLAN_LIMITS[normalizedPlan];
  const used = quota?.used ?? 0;
  const planLimit = PLAN_LIMITS[plan] ?? 0;
  const remaining =
    quota?.remaining ?? (limit !== null ? Math.max(0, planLimit - used) : null);
  console.log(remaining);
  const isUnlimited = limit === null;
  const pct = isUnlimited ? 0 : Math.min(100, (used / planLimit) * 100);
  const barColor = progressColor(pct);

  const badgeStyle =
    PLAN_BADGE_STYLES[normalizedPlan] ?? PLAN_BADGE_STYLES.free;
  const badgeLabel = PLAN_LABELS[normalizedPlan] ?? PLAN_LABELS.free;

  return (
    <section className="rounded-xl border border-zinc-200 bg-zinc-50 p-5 text-sm flex flex-col gap-4">
      {/* Plan row */}
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div>
          <p className="text-[10px] font-medium uppercase tracking-widest text-zinc-400 mb-0.5">
            Current Plan
          </p>
          <p className="text-lg font-semibold capitalize text-zinc-900 leading-tight">
            {normalizedPlan}
          </p>
        </div>
        <span
          className={`rounded-full px-3 py-1 text-xs font-medium ${badgeStyle}`}
        >
          {badgeLabel}
        </span>
      </div>

      <hr className="border-zinc-200" />

      {/* Quota section */}
      {isUnlimited ? (
        <div className="flex items-center gap-3">
          {/* Infinity icon */}
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-emerald-500">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 12c-2-2.5-4-4-6-4a4 4 0 0 0 0 8c2 0 4-1.5 6-4z" />
              <path d="M12 12c2 2.5 4 4 6 4a4 4 0 0 0 0-8c-2 0-4 1.5-6 4z" />
            </svg>
          </div>
          <div>
            <p className="text-sm font-semibold text-zinc-900">
              {used.toLocaleString()} conversions used
            </p>
            <p className="text-xs text-zinc-400">
              No monthly limit on your plan
            </p>
          </div>
        </div>
      ) : (
        <div className="space-y-2">
          {/* Label row */}
          <div className="flex items-center justify-between text-xs">
            <span className="text-zinc-500 font-medium">
              Monthly conversions
            </span>
            <span className="tabular-nums font-semibold text-zinc-700">
              {used.toLocaleString()}
              <span className="text-zinc-400 font-normal">
                {" "}
                / {PLAN_LIMITS[plan]}
              </span>
            </span>
          </div>

          {/* Progress bar */}
          <div className="h-2 w-full overflow-hidden rounded-full bg-zinc-200">
            <div
              className={`h-full rounded-full transition-all duration-500 ${barColor}`}
              style={{ width: `${pct}%` }}
            />
          </div>

          {/* Remaining / warning row */}
          <div className="flex items-center justify-between text-xs">
            {pct >= 90 ? (
              <span className="text-red-500 font-medium">
                ⚠ Almost at limit — upgrade to avoid interruption
              </span>
            ) : pct >= 70 ? (
              <span className="text-amber-500 font-medium">
                Running low — {remaining} remaining this month
              </span>
            ) : (
              <span className="text-zinc-400">
                {remaining} remaining this month
              </span>
            )}
            <span className="text-zinc-400 tabular-nums">
              {Math.round(pct)}%
            </span>
          </div>
        </div>
      )}
    </section>
  );
}
