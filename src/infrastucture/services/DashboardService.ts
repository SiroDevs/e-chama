"use server";

import { supabase } from "@/lib/supabase/client";
import { GroupMember, GroupMembersQueryParams, GroupMembersResp } from "@/data/types/profiles";
import { Member } from "@/data/types/types";

export async function getMemberCount(group_id: string): Promise<number> {
  const { count, error } = await supabase.from("members")
    .select("*", { count: "exact" })
    .eq("group_id", group_id);

  if (error) {
    console.error("Error getting member count:", error);
    return 0;
  }

  return count || 0;
}
