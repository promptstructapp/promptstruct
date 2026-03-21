import { supabaseAdmin } from "@/app/lib/supabase/server";

export async function saveConversion(
  userId: string,
  prompt: string,
  output: object,
) {
  const { data, error } = await supabaseAdmin
    .from("conversions")
    .insert({ user_id: userId, prompt, output })
    .select("id")
    .single();

  if (error) throw new Error(`Failed to save conversion: ${error.message}`);
  return data.id;
}

export async function getUserHistory(userId: string, limit = 10) {
  const { data, error } = await supabaseAdmin
    .from("conversions")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) throw new Error(`Failed to fetch history: ${error.message}`);
  return data ?? [];
}
