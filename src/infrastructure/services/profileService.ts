import { Profile } from "@/domain/entities/profile";
import { memberService } from "./memberService";
import { getServerClient } from "@/lib/supabase/server";

export const profileService = {
  async newUserProfile(profile: Profile) {
    const supabase = await getServerClient();
    return await supabase.from("profiles")
      .insert([
        {
          id: profile.id,
          group_id: profile.group_id,
          first_name: profile.first_name,
          last_name: profile.last_name,
          id_number: profile.id_number,
          kra_pin: profile.kra_pin,
          country: profile.country,
          address: profile.address,
          sex: profile.sex,
          dob: profile.dob,
          avatar: profile.avatar,
        },
      ])
      .select()
      .single();
  },
  async updateUserProfile(profile: Profile) {
    const supabase = await getServerClient();
    return await supabase.from("profiles")
      .update([
        {
          first_name: profile.first_name,
          last_name: profile.last_name,
          id_number: profile.id_number,
          kra_pin: profile.kra_pin,
          country: profile.country,
          address: profile.address,
          sex: profile.sex,
          dob: profile.dob,
          avatar: profile.avatar,
        },
      ])
      .eq("id", profile.id);
  },
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

    const { data: member, error: memberError } = await memberService.fetchGroupMember(
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
  async fetchUserProfile(userId: string) {
    const supabase = await getServerClient();
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

  async fetchUserProfileFromGroup(memberNo: string, groupId: string) {
    const { data, error } = await memberService.getGroupMemberByNo(memberNo, groupId);
    if (error) {
      return { data: null, error: error };
    }
    const supabase = await getServerClient();
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", data?.user_id)
      .single();

    if (profileError) {
      console.error("Profile fetch error:", profileError);
      return { data: null, error: profileError };
    }

    return { data: profile, error: null };
  },

  async setProfileGroup(userId: string, groupId: string) {
    try {
      const supabase = await getServerClient();
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