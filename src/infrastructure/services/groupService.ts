import { getServerClient } from "@/lib/supabase/server";
import { UserGroup, Group, GroupExt } from "@/domain/entities";
import { supabase } from "@/lib/supabase/client";
import { memberService } from "./memberService";
import { PaginatedResp } from "@/types/paginations";

export const groupService = {
  async newGroup(group: Group) {
    return await supabase
      .from("groups")
      .insert([
        {
          owner: group.owner,
          title: group.title,
          description: group.description,
          initials: group.initials,
          location: group.location,
          address: group.address,
        },
      ])
      .select()
      .single();
  },

  async getUserGroups(userId: string): Promise<UserGroup[]> {
    const supabase = await getServerClient();
    console.info("Fetching user's groups");
    const { data, error } = await supabase
      .from("user_groups")
      .select("*")
      .eq("user_id", userId)
      .order("title");

    if (error) {
      throw new Error(`Failed to fetch user groups: ${error.message}`);
    }
    return data as UserGroup[];
  },

  async getUserGroup(
    userId: string, groupId: string
  ): Promise<UserGroup> {
    const supabase = await getServerClient();
    const { data, error } = await supabase
      .from("user_groups")
      .select("*")
      .eq("user_id", userId)
      .eq("group_id", groupId)
      .single();

    if (error) {
      throw new Error(`Failed to fetch user group: ${error.message}`);
    }
    return data as UserGroup;
  },

  async getUserGroupDetails(
    userId: string,
    groupId: string
  ): Promise<UserGroup | null> {
    const supabase = await getServerClient();
    const { data, error } = await supabase
      .from("user_groups")
      .select("*")
      .eq("user_id", userId)
      .eq("group_id", groupId)
      .single();

    if (error) {
      if (error.code === "PGRST116") {
        return null;
      }
      throw new Error(`Failed to fetch group details: ${error.message}`);
    }

    return data as UserGroup;
  },

  async searchUserGroups(
    userId: string,
    searchTerm: string
  ): Promise<UserGroup[]> {
    const supabase = await getServerClient();
    const { data, error } = await supabase
      .from("user_groups")
      .select("*")
      .eq("user_id", userId)
      .ilike("title", `%${searchTerm}%`)
      .order("title");

    if (error) {
      throw new Error(`Failed to search groups: ${error.message}`);
    }

    return data as UserGroup[];
  },

  async getUserGroupsPaginated(
    userId: string,
    page: number = 1,
    pageSize: number = 10
  ): Promise<PaginatedResp<UserGroup>> {
    const from = (page - 1) * pageSize;
    const to = from + pageSize - 1;

    const supabase = await getServerClient();
    const { data, error, count } = await supabase
      .from("user_groups")
      .select("*", { count: "exact" })
      .eq("user_id", userId)
      .range(from, to)
      .order("title");

    if (error) {
      throw new Error(`Failed to fetch paginated groups: ${error.message}`);
    }

    const totalCount = count;
    const totalPages = totalCount ? Math.ceil(totalCount / pageSize) : 0;

    return {
      data: data as UserGroup[],
      totalCount,
      page,
      pageSize,
      totalPages,
    };
  },

  async getUserRoleInGroup(
    userId: string,
    groupId: string
  ): Promise<string | null> {
    const supabase = await getServerClient();
    const { data, error } = await supabase
      .from("members")
      .select("role")
      .eq("user", userId)
      .eq("group", groupId)
      .single();

    if (error) {
      if (error.code === "PGRST116") {
        return null;
      }
      throw new Error(`Failed to fetch user role: ${error.message}`);
    }

    return data.role;
  },

  async isUserMemberOfGroup(userId: string, groupId: string): Promise<boolean> {
    const supabase = await getServerClient();
    const { data, error } = await supabase
      .from("members")
      .select("id")
      .eq("user", userId)
      .eq("group", groupId)
      .single();

    if (error) {
      if (error.code === "PGRST116") {
        return false;
      }
      throw new Error(`Failed to check membership: ${error.message}`);
    }

    return !!data;
  },

  async searchByCode(code: string): Promise<(GroupExt & { member_count: number }) | null> {
    const supabase = await getServerClient();
    const { data, error } = await supabase
      .from("groups")
      .select("*")
      .eq("code", code)
      .single();

    if (error) {
      if (error.code === "PGRST116") {
        return null;
      }
      throw new Error(`Failed to search group by code: ${error.message}`);
    }

    const memberCount = await memberService.getMemberCount(data.id);
    return {
      ...data as GroupExt,
      member_count: memberCount
    };
  }
}
