"use server";

import { supabase } from "@/lib/supabase/client";
import { Profile } from "@/state/role/profiles";

export async function createProfile(profile: Profile) {
  return await supabase.from("profiles")
    .insert([
      {
        id: profile.id,
        first_name: profile.first_name,
        last_name: profile.last_name,
        country: profile.country,
        address: profile.address,
        sex: profile.sex,
        dob: profile.dob,
        avatar: profile.avatar,
        idNumber: profile.id_number,
        kraPin: profile.kra_pin,
      },
    ])
    .select()
    .single();
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
