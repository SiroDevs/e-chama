"use server";

import { supabase } from "@/lib/supabase/client";

export async function newUser(userId: string, first_name: string, last_name: string) {
  return await supabase.from("profiles").insert([
    {
      id: userId,
      first_name: first_name,
      last_name: last_name,
    },
  ]);
}
