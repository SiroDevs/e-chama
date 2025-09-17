"use server";

import { supabase } from "@/lib/supabase/client";

export async function createProfile(userId: string, first_name: string, last_name: string) {
  return await supabase.from("profiles").insert([
    {
      id: userId,
      first_name: first_name,
      last_name: last_name,
    },
  ]);
}

export async function updateSelectedGroup(userId: string, groupId: string) {
  try {
    const { error } = await supabase
      .from("profiles")
      .update({ 
        group: groupId,
        updated_at: new Date().toISOString() 
      })
      .eq("id", userId);

    if (error) {
      console.error("Error updating selected group:", error);
    }
  } catch (err) {
    console.error("Unexpected error updating selected group:", err);
  }
}
