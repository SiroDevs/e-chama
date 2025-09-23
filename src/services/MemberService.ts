"use server";

import { supabase } from "@/lib/supabase/client";
import { GroupMember, GroupMembersQueryParams, GroupMembersResp } from "@/types/profiles";
import { Member } from "@/types/types";

export async function newMember(member: Member) {
  const { error: checkError } = await supabase
    .from("members")
    .select("id")
    .eq("user_id", member.user_id)
    .eq("group_id", member.group_id)
    .single();

  if (!checkError || checkError.code !== "PGRST116") {
    console.error("Join group error:", checkError);
    return { data: null, error: checkError };
  }
  return await supabase
    .from("members")
    .insert([
      {
        group_id: member.group_id,
        user_id: member.user_id,
        member_no: member.member_no,
        role: member.role,
      },
    ])
    .select()
    .single();
}

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

export async function getGroupMembers({
  page,
  pageSize,
  sortField = 'created_at',
  sortOrder = 'desc',
  filters = [],
  groupId,
}: GroupMembersQueryParams): Promise<GroupMembersResp> {
  try {
    let query = supabase
      .from('group_members')
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

    console.log(`Data found: ${count}`);
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
      .from('contributions').select('*').eq('id', id).single();

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
