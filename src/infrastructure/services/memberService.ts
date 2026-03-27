import { GroupMember, GroupMembersQueryParams, GroupMembersResp, Member } from "@/domain/entities";
import { getServerClient } from "@/lib/supabase/server";

export const memberService = {
  async newMember(member: Member) {
    const supabase = await getServerClient();
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
  },

  async editMember(member: Member) {
    const supabase = await getServerClient();
    return await supabase
      .from("members")
      .update([
        {
          member_no: member.member_no,
          role: member.role,
        },
      ])
      .eq("id", member.id);
  },

  async getMemberCount(group_id: string): Promise<number> {
    const supabase = await getServerClient();
    const { count, error } = await supabase.from("members")
      .select("*", { count: "exact" })
      .eq("group_id", group_id);

    if (error) {
      console.error("Error getting member count:", error);
      return 0;
    }

    return count || 0;
  },

  async getGroupMembers({
    page,
    pageSize,
    sortField = 'created_at',
    sortOrder = 'desc',
    filters = [],
    groupId,
  }: GroupMembersQueryParams): Promise<GroupMembersResp> {
    try {
    const supabase = await getServerClient();
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
  },
  async getRecentMembers(groupId: string, limit: number = 3): Promise<{
    data: GroupMember[];
    error: Error | null;
  }> {
    try {
    const supabase = await getServerClient();
      const { data, error } = await supabase
        .from('group_members')
        .select('*')
        .eq('group_id', groupId)
        .order('created_at', { ascending: false })
        .limit(limit);

      if (error) throw error;

      return { data: data || [], error: null };
    } catch (error) {
      return { data: [], error: error as Error };
    }
  },
  async searchGroupMembers(groupId: string, query: string, limit = 10): Promise<{
    data: GroupMember[];
    error: Error | null;
  }> {
    try {
    const supabase = await getServerClient();
      const { data, error } = await supabase
        .from('group_members')
        .select('id, full_name, member_no, role')
        .eq('group_id', groupId)
        .or(`full_name.ilike.%${query}%,member_no.ilike.%${query}%`)
        .order('full_name', { ascending: true })
        .limit(limit);

      return { data: (data || []) as GroupMember[], error };
    } catch (error) {
      return { data: [], error: error as Error };
    }
  },
  async getGroupMemberById(id: string): Promise<{
    data: GroupMember | null;
    error: Error | null;
  }> {
    try {
    const supabase = await getServerClient();
      const { data, error } = await supabase
        .from('group_members').select('*').eq('id', id).single();

      return { data, error };
    } catch (error) {
      return {
        data: null,
        error: error as Error,
      };
    }
  },

  async getGroupMemberByNo(memberNo: string, groupId: string): Promise<{
    data: GroupMember | null;
    error: Error | null;
  }> {
    try {
    const supabase = await getServerClient();
      const { data, error } = await supabase
        .from('group_members').select('*').eq('member_no', memberNo).eq("group_id", groupId).single();

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
  },
  async fetchGroupMember(userId: string, groupId: string | null) {
    const supabase = await getServerClient();
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
  },
}
