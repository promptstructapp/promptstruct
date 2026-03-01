import { getUserByEmail, resetDailyQuotaIfNeeded, updateUserQuota } from "../db";

export async function checkUserQuota(userEmail) {
  // Get user from DB (placeholder)
  const user = await getUserByEmail(userEmail);

  if (!user) {
    return { allowed: false, error: "User not found" };
  }

  // Reset daily counter if needed (placeholder)
  await resetDailyQuotaIfNeeded(user.email, user.last_request_date);

  // Get fresh user data after potential reset
  const freshUser = await getUserByEmail(userEmail);

  // Define limits based on plan
  const limits = {
    free: { daily: 10, monthly: Infinity },
    pro: { daily: Infinity, monthly: 1000 },
  };

  const userLimits = limits[freshUser.plan] || limits.free;

  // Check daily limit
  if (freshUser.daily_requests_used >= userLimits.daily) {
    return {
      allowed: false,
      error: "Daily limit reached",
      resetTime: "tomorrow",
      current: freshUser.daily_requests_used,
      limit: userLimits.daily,
    };
  }

  // Check monthly limit
  if (freshUser.requests_used >= userLimits.monthly) {
    return {
      allowed: false,
      error: "Monthly limit reached",
      current: freshUser.requests_used,
      limit: userLimits.monthly,
    };
  }

  return {
    allowed: true,
    user: freshUser,
    remaining: {
      daily: userLimits.daily - freshUser.daily_requests_used,
      monthly: userLimits.monthly - freshUser.requests_used,
    },
  };
}

export async function incrementUserQuota(userEmail) {
  // Update both daily and monthly counters
  return await updateUserQuota(userEmail, {
    requests_used: 1,
    daily_requests_used: 1,
  });
}

