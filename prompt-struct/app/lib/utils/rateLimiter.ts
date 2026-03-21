import { supabaseAdmin } from "@/app/lib/supabase/server";
import { findOrCreateUser } from "@/app/lib/db";

const PLAN_LIMITS: Record<string, number> = {
  free: 10,
  pro: 1000,
  lifetime: Infinity,
};

function isNewMonth(lastResetDate: string): boolean {
  const last = new Date(lastResetDate);
  const now = new Date();
  return (
    last.getFullYear() !== now.getFullYear() ||
    last.getMonth() !== now.getMonth()
  );
}

export async function checkUserQuota(email: string) {
  const user = await findOrCreateUser(email, {});

  // Lifetime users always pass — no quota check needed
  if (user.plan === "lifetime") {
    return { allowed: true, remaining: Infinity, user };
  }

  const limit = PLAN_LIMITS[user.plan] ?? PLAN_LIMITS.free;
  const resetNeeded = isNewMonth(user.last_reset_date);
  const monthlyUsed = resetNeeded ? 0 : user.monthly_used;
  const remaining = Math.max(0, limit - monthlyUsed);

  if (remaining === 0) {
    return {
      allowed: false,
      error: `Monthly limit of ${limit} reached. ${
        user.plan === "free"
          ? "Upgrade to Pro for more."
          : "Try again next month."
      }`,
      remaining: 0,
      user,
    };
  }

  return { allowed: true, remaining, user };
}

export async function incrementUserQuota(email: string) {
  const user = await findOrCreateUser(email, {});

  // Lifetime users — only increment all-time counter, skip monthly tracking
  if (user.plan === "lifetime") {
    await supabaseAdmin
      .from("users")
      .update({ conversions_used: user.conversions_used + 1 })
      .eq("email", email);
    return;
  }

  const resetNeeded = isNewMonth(user.last_reset_date);
  const today = new Date().toISOString().split("T")[0];

  await supabaseAdmin
    .from("users")
    .update({
      conversions_used: user.conversions_used + 1,
      monthly_used: resetNeeded ? 1 : user.monthly_used + 1,
      last_reset_date: resetNeeded ? today : user.last_reset_date,
    })
    .eq("email", email);
}
