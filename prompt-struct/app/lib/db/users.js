// TODO: Implement with actual database (Supabase/PostgreSQL) later
// These functions should be replaced with real DB queries

export async function findOrCreateUser(email, userData = {}) {
  // PLACEHOLDER: Return mock user object
  console.log("DB: findOrCreateUser called with:", { email, userData });
  return {
    id: "mock-user-id",
    email,
    name: userData.name ?? "Mock User",
    plan: "free",
    requests_used: 0,
    daily_requests_used: 0,
    last_request_date: new Date().toISOString().split("T")[0],
  };
}

export async function getUserByEmail(email) {
  // PLACEHOLDER: Return mock user
  console.log("DB: getUserByEmail called with:", email);
  return {
    id: "mock-user-id",
    email,
    plan: "free",
    requests_used: 0,
    daily_requests_used: 0,
    last_request_date: new Date().toISOString().split("T")[0],
  };
}

export async function updateUserQuota(email, increments) {
  // PLACEHOLDER: Log the update
  console.log("DB: updateUserQuota called for:", email, increments);
  return { success: true };
}

export async function resetDailyQuotaIfNeeded(email, lastRequestDate) {
  // PLACEHOLDER: Check and reset daily counter
  const today = new Date().toISOString().split("T")[0];
  if (lastRequestDate !== today) {
    console.log("DB: Resetting daily quota for:", email);
    return true;
  }
  return false;
}

