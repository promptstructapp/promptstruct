import { supabaseAdmin } from "@/app/lib/supabase/server";

export async function findOrCreateUser(
  email: string,
  userData: { name?: string; image?: string },
) {
  const { data: existing } = await supabaseAdmin
    .from("users")
    .select("*")
    .eq("email", email)
    .single();

  if (existing) return existing;

  const { data, error } = await supabaseAdmin
    .from("users")
    .insert({
      email,
      name: userData.name ?? null,
      image: userData.image ?? null,
    })
    .select()
    .single();

  if (error) throw new Error(`Failed to create user: ${error.message}`);
  return data;
}

export async function getUserByEmail(email: string) {
  const { data, error } = await supabaseAdmin
    .from("users")
    .select("*")
    .eq("email", email)
    .single();

  if (error) throw new Error(`User not found: ${error.message}`);
  return data;
}
