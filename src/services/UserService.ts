"use server";

import { supabase } from "@/lib/supabase/client";

export async function fetchUserProfile(userId: string) {
  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .single();

  if (profileError) {
    console.error("Profile fetch error:", profileError);
    return { data: null, error: profileError };
  }

  return { data: profile, error: null };
}

export async function fetchUserMember(userId: string, groupId: string | null) {
  if (!groupId) {
    return { data: null, error: new Error("No group assigned to profile") };
  }

  const { data: member, error: memberError } = await supabase
    .from("members")
    .select("*")
    .eq("user_id", userId)
    .eq("group_id", groupId)
    .maybeSingle();

  if (memberError) {
    console.error("Member fetch error:", memberError);
    return { data: null, error: memberError };
  }

  return { data: member, error: null };
}

export async function handleAuthResponse(user: any) {
  const profileResult = await fetchUserProfile(user.id);
  if (profileResult.error) {
    console.error("Profile fetching error:", profileResult.error);
    return {
      data: { user, profile: null, member: null },
      error: profileResult.error,
    };
  }

  const { data: member, error: memberError } = await fetchUserMember(
    user.id,
    profileResult.data?.group_id || null
  );

  return {
    data: {
      user,
      profile: profileResult.data,
      member: memberError ? null : member,
    },
    error: memberError,
  };
}