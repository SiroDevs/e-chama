"use server";

import { supabase } from "@/lib/supabase/client";
import { createGroup } from "./GroupService";
import { updateSelectedGroup } from "./ProfileService";
import { GroupMember, GroupMembersQueryParams, GroupMembersResponse } from "@/types/profiles";

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

export async function getGroupMembers({
  page,
  pageSize,
  sortField = 'created_at',
  sortOrder = 'desc',
  filters = [],
  groupId,
}: GroupMembersQueryParams): Promise<GroupMembersResponse> {
  try {
    let query = supabase
      .from('user_profile_member')
      .select('*', { count: 'exact' })
      .eq('group_id', groupId);

    query = query.order(sortField, { ascending: sortOrder === 'asc' });

    filters.forEach((filter) => {
      if (filter.value) {
        switch (filter.operator) {
          case 'eq':
            query = query.eq(filter.field, filter.value);
            break;
          case 'gt':
            query = query.gt(filter.field, filter.value);
            break;
          case 'lt':
            query = query.lt(filter.field, filter.value);
            break;
          case 'gte':
            query = query.gte(filter.field, filter.value);
            break;
          case 'lte':
            query = query.lte(filter.field, filter.value);
            break;
          case 'ilike':
          default:
            query = query.ilike(filter.field, `%${filter.value}%`);
        }
      }
    });

    const from = page * pageSize;
    const to = from + pageSize - 1;
    query = query.range(from, to);

    const { data, error, count } = await query;

    if (error) {
      throw error;
    }

    return {
      data: data || [],
      count: count || 0,
      error: null,
    };
  } catch (error) {
    return {
      data: [],
      count: 0,
      error: error as Error,
    };
  }
}

export async function getGroupMemberById(id: string): Promise<{
  data: GroupMember | null;
  error: Error | null;
}> {
  try {
    const { data, error } = await supabase
      .from('contributions')
      .select('*')
      .eq('id', id)
      .single();

    return {
      data,
      error,
    };
  } catch (error) {
    return {
      data: null,
      error: error as Error,
    };
  }
}
