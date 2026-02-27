import { Profile } from "@/domain/entities/profile.entity";
import { supabase } from "@/lib/supabase/client";

export const profileService = {
  async refreshUserProfile(user: any) {
    console.info("Fetching the user profile");
    const profileResult = await profileService.fetchUserProfile(user.id);

    if (profileResult.error) {
      console.error("Profile fetching error:", profileResult.error);
      return {
        data: { user, profile: null, member: null },
        error: profileResult.error,
      };
    }

    if (!profileResult.data?.group_id) {
      console.error("No group assigned to profile");
      return {
        data: {
          user,
          profile: profileResult.data,
          member: null,
        },
        error: null,
      };
    }

    const { data: member, error: memberError } = await profileService.fetchUserMember(
      user.id,
      profileResult.data.group_id
    );

    return {
      data: {
        user,
        profile: profileResult.data,
        member: memberError ? null : member,
      },
      error: memberError,
    };
  },
  async fetchUserMember(userId: string, groupId: string | null) {
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
  async fetchUserProfile(userId: string) {
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
  },

  async createProfile(profile: Profile) {
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
          id_number: profile.id_number,
          kra_pin: profile.kra_pin,
        },
      ])
      .select()
      .single();
  },

  async setProfileGroup(userId: string, groupId: string) {
    try {
      const { error } = await supabase
        .from("profiles")
        .update({
          group_id: groupId,
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
}