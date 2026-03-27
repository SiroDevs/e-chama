import { Group, Member, Profile } from "@/domain/entities";
import { groupService } from "./groupService";
import { memberService } from "./memberService";
import { profileService } from "./profileService";
import { getServerClient } from "@/lib/supabase/server";
import { createAuthService } from "./authService";

export const memberServiceExts = {
  async newMemberGroup(group: Group) {
    try {
      if (!group.owner) {
        throw new Error("Group owner is required");
      }

      const groupResult = await groupService.newGroup(group);
      if (groupResult.error) {
        console.error("Group creation failed:", groupResult.error);
        throw groupResult.error;
      }

      if (!groupResult.data?.id) {
        throw new Error("Group created but no ID returned");
      }

      const groupId = groupResult.data.id;
      console.info("Group created successfully with ID:", groupId);

      const memberPayload = {
        group_id: groupId,
        user_id: group.owner,
        member_no: "001",
        role: "official" as const,
      };

      const memberResult = await memberService.newMember(memberPayload);
      if (memberResult.error) {
        console.error("Member creation failed:", memberResult.error.message);

        try {
          console.warn("Cleaned up group after member creation failure");
        } catch (cleanupError) {
          console.error("Failed to clean up group after member creation failure:", cleanupError);
        }

        throw new Error(`Failed to add owner as member: ${memberResult.error.message}`);
      }

      console.info("Group member created successfully");

      try {
        await profileService.setProfileGroup(group.owner, groupId);
        console.info("User's selected group updated");
      } catch (updateError) {
        console.warn("Failed to update selected group, but continuing:", updateError);
      }

      const userGroups = await groupService.getUserGroups(group.owner);
      if (!userGroups || userGroups.length === 0) {
        console.warn("No groups found for user after creation - this might be expected for first group");
      } else {
        console.info(`Found ${userGroups.length} groups for user`);
      }

      return {
        data: {
          group: groupResult.data,
          member: memberResult.data,
          groups: userGroups || [],
          groupId: groupId,
        },
        error: null,
      };

    } catch (error) {
      console.error("Unexpected error in newMemberGroup:", error);
      const normalizedError = error instanceof Error
        ? error
        : new Error("Unknown error occurred during group creation");

      return {
        data: null,
        error: normalizedError,
      };
    }
  },
  async newMemberProfile(payload: {
    email: string;
    phone: string;
    profile: Profile;
    member: Member;
  }) {
    try {
      const supabase = await getServerClient();
      const authService = createAuthService(supabase);
      const { data, error } = await authService.signupUser(
        payload.profile.first_name + ' ' + payload.profile.last_name,
        payload.email,
        payload.phone,
        "pass1235"
      );
      if (error) {
        console.error("Signup error:", error);
        return { data: null, error: error };
      }

      const profileResult = await profileService.newUserProfile({
        id: data.user?.id,
        first_name: payload.profile.first_name,
        last_name: payload.profile.last_name,
      });

      if (profileResult.error) {
        console.error("Profile creation error:", error);
        return { data: null, error: error };
      }

      const memberResult = await memberService.newMember(
        {
          group_id: payload.member.group_id,
          user_id: data.user?.id,
          member_no: payload.member.member_no,
          role: payload.member.role,
        });
      return memberResult;
    } catch (error) {
      console.error("Unexpected error in newMemberProfile:", error);
      return {
        data: null,
        error: error instanceof Error ? error : new Error("Unknown error occurred")
      };
    }
  }
}
