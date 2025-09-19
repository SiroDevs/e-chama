"use server";

import { supabase } from "@/lib/supabase/client";
import { createGroup } from "./GroupService";
import { updateSelectedGroup } from "./ProfileService";
import { GroupExt } from "@/types/types";

export async function createMember(
  group_id: string,
  user_id: string,
  member_no: string,
  role: string
) {
  const { error: checkError } = await supabase
    .from("members")
    .select("id")
    .eq("user_id", user_id)
    .eq("group_id", group_id)
    .single();

  if (!checkError || checkError.code !== "PGRST116") {
    console.error("Join group error:", checkError);
    return { data: null, error: checkError };
  }
  return await supabase
    .from("members")
    .insert([
      {
        group_id: group_id,
        user_id: user_id,
        member_no: member_no,
        role: role,
      },
    ])
    .select()
    .single();
}
export async function createMemberGroup(
  userId: string,
  title: string,
  description: string,
  initials: string,
  location: string,
  address: string,
) {
  try {
    const groupResult = await createGroup({
      user: userId,
      title: title,
      description: description,
      initials: initials,
      location: location,
      address: address,
    });

    if (groupResult.error) {
      console.error("Group creation error:", groupResult.error);
      return {
        data: null,
        error: groupResult.error,
      };
    }

    const memberResult = await createMember(
      groupResult.data.id,
      userId,
      "001",
      'official'
    );

    if (memberResult.error) {
      console.error("Member creation error:", memberResult.error.message);
      return {
        data: null,
        error: memberResult.error,
      };
    }

    await updateSelectedGroup(userId, groupResult.data.id);

    return {
      data: {
        group: groupResult.data,
        member: memberResult.data
      },
      error: null
    };
  } catch (error) {
    console.error("Unexpected error in createMemberGroup:", error);
    return {
      data: null,
      error: error instanceof Error ? error : new Error("Unknown error occurred")
    };
  }
}

export async function getMemberCount(group_id: string): Promise<number> {
  const { count, error } = await supabase
    .from("members")
    .select("*", { count: "exact" })
    .eq("group_id", group_id);

  if (error) {
    console.error("Error getting member count:", error);
    return 0;
  }

  return count || 0;
}
