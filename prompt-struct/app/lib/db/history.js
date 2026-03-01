// TODO: Implement with actual database later

export async function saveConversion(userId, prompt, jsonOutput) {
  // PLACEHOLDER: Log the save
  console.log("DB: saveConversion called for user:", userId);
  console.log("DB: prompt snippet:", prompt?.slice(0, 80));
  return { id: "mock-history-id" };
}

export async function getUserHistory(userId, limit = 10) {
  // PLACEHOLDER: Return mock history
  console.log("DB: getUserHistory called for user:", userId, "limit:", limit);
  return [];
}

