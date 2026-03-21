import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../lib/auth/auth";
import { UsageDisplay } from "@/app/components/ui/UsageDisplay";

async function fetchUsage() {
  const res = await fetch(`${process.env.NEXTAUTH_URL ?? ""}/api/user/usage`, {
    cache: "no-store",
  });

  if (!res.ok) {
    return null;
  }

  return res.json();
}

export default async function DashboardPage() {
  const session = (await getServerSession(authOptions)) ?? {};

  if (!session || !session.user?.email) {
    redirect("/");
  }

  const usage = await fetchUsage();

  const plan =
    (usage?.plan as string | undefined) ??
    (session.user?.plan as string | undefined) ??
    "free";

  const history = (usage?.history as any[]) ?? [];

  return (
    <div className="space-y-8">
      <section className="space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight text-zinc-900 sm:text-3xl">
          Dashboard
        </h1>
        <p className="max-w-2xl text-sm text-zinc-600">
          Track your usage, review recent conversions, and explore upgrade
          options.
        </p>
      </section>

      <div className="grid gap-6 md:grid-cols-[minmax(0,2fr),minmax(0,3fr)]">
        <UsageDisplay plan={plan} quota={usage?.quota} />

        <section className="space-y-3 rounded-xl border border-zinc-200 bg-white p-4">
          <div className="flex items-center justify-between gap-2">
            <div>
              <h2 className="text-sm font-semibold text-zinc-900">
                Plan & Limits
              </h2>
              <p className="text-xs text-zinc-500">
                Upgrade to unlock higher daily and monthly limits.
              </p>
            </div>
            <button
              type="button"
              className="rounded-full bg-zinc-900 px-4 py-1.5 text-xs font-medium text-white shadow hover:bg-zinc-800"
            >
              View Pro plans
            </button>
          </div>
          <ul className="space-y-1 text-xs text-zinc-600">
            <li>• Free: 10 conversions per day.</li>
            <li>• Pro: Up to 1000 conversions per month.</li>
            <li>
              • Priority access to new schema types and advanced controls.
            </li>
          </ul>
        </section>
      </div>

      <section className="space-y-3 rounded-xl border border-zinc-200 bg-white p-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold text-zinc-900">
            Recent conversions
          </h2>
          <span className="text-xs text-zinc-500">
            History will populate once a real database is connected.
          </span>
        </div>

        {history.length === 0 ? (
          <p className="text-xs text-zinc-500">
            No conversion history yet. For now, history is a placeholder and
            will be powered by the database later.
          </p>
        ) : (
          <ul className="space-y-2 text-xs text-zinc-600">
            {history.map((item) => (
              <li
                key={item.id}
                className="rounded-lg border border-zinc-200 bg-zinc-50 p-2"
              >
                <p className="line-clamp-2 text-[11px] text-zinc-700">
                  {item.prompt}
                </p>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
