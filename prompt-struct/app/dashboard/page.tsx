import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../lib/auth/auth";
import { UsageDisplay } from "@/app/components/ui/UsageDisplay";
import { checkUserQuota } from "@/app/lib/utils/rateLimiter";
import { getUserHistory } from "@/app/lib/db";
import Link from "next/link";
import { PLAN_LIMITS } from "../components/ui/UsageDisplay";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user?.email) {
    redirect("/");
  }

  const email = session.user.email;

  // ✅ Call DB/quota functions directly — no HTTP round-trip, no auth issues
  const [quotaResult] = await Promise.allSettled([
    checkUserQuota(email),
    getUserHistory("", 10), // will be replaced with user id below
  ]);

  const quota = quotaResult.status === "fulfilled" ? quotaResult.value : null;
  console.log(quota);
  const user = quota?.user ?? null;
  const plan = user?.plan ?? "free";
  const limit = plan === "lifetime" ? Infinity : (PLAN_LIMITS[plan] ?? 10);
  const monthlyUsed = user?.monthly_used ?? 0;
  const conversionsUsed = user?.conversions_used ?? 0;
  const remaining = quota?.remaining ?? 0;

  const quotaForDisplay = {
    used: monthlyUsed,
    limit: plan === "lifetime" ? null : limit,
    remaining: plan === "lifetime" ? null : remaining,
  };

  return (
    <div className="space-y-8">
      {/* Page header */}
      <section className="space-y-1 mt-12">
        <h1 className="text-2xl font-semibold tracking-tight text-zinc-900 sm:text-3xl">
          Dashboard
        </h1>
        <p className="max-w-2xl text-sm text-zinc-500">
          Track your usage, review recent conversions, and explore upgrade
          options.
        </p>
      </section>

      <div className="grid gap-6 md:grid-cols-[minmax(0,2fr),minmax(0,3fr)] mb-32">
        {/* Usage card */}
        <UsageDisplay plan={plan} quota={quotaForDisplay} />

        {/* Plan & Limits card */}
        <section className="space-y-3 rounded-xl border border-zinc-200 bg-white p-5">
          <div className="flex items-center justify-between gap-2">
            <div>
              <h2 className="text-sm font-semibold text-zinc-900">
                Plan &amp; Limits
              </h2>
              <p className="text-xs text-zinc-500 mt-0.5">
                Upgrade to unlock higher monthly limits.
              </p>
            </div>
            <Link
              href="/pricing"
              className="rounded-full bg-zinc-900 px-4 py-1.5 text-xs font-medium text-white shadow hover:bg-zinc-800 transition-colors"
            >
              View Pro plans
            </Link>
          </div>

          {/* Live stat pills */}
          <div className="flex flex-wrap gap-2 pt-1">
            <span className="rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1 text-xs text-zinc-600">
              Plan:{" "}
              <span className="font-semibold capitalize text-zinc-900">
                {plan}
              </span>
            </span>
            <span className="rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1 text-xs text-zinc-600">
              This month:{" "}
              <span className="font-semibold text-zinc-900">
                {monthlyUsed} used
              </span>
            </span>
            <span className="rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1 text-xs text-zinc-600">
              All-time:{" "}
              <span className="font-semibold text-zinc-900">
                {conversionsUsed} conversions
              </span>
            </span>
          </div>

          <ul className="space-y-1 text-xs text-zinc-600 pt-1">
            <li>• Free: 10 conversions per month.</li>
            <li>• Pro: Up to 1,000 conversions per month + history saved.</li>
            <li>• Lifetime: Unlimited conversions, pay once.</li>
          </ul>
        </section>
      </div>
    </div>
  );
}
