"use server";

import { supabase } from "@/lib/supabase/client";
import { createGroup } from "./GroupService";
import { updateSelectedGroup } from "./ProfileService";

export async function createMember(
  group_id: string,
  user_id: string,
  member_no: string,
  role: string
) {
  const { data: memberData, error } = await supabase
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

  return { data: memberData, error };
}

export async function createMemberGroup(
  userId: string,
  title: string,
  description: string,
  initials: string,
  location: string,
  address: string,
) {
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
    console.error("Member creation error:", memberResult.error);
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
}