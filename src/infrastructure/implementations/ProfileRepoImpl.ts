import { ProfileRepo } from "@/domain/repositories/profile.repo";
import { profileService } from "../services/profileService";
import { Profile } from "@/domain/entities";
import { memberService } from "../services/memberService";

export class ProfileRepoImpl implements ProfileRepo {
  async fetchUserProfile(userId: string): Promise<{ data: Profile | null; error: Error | null }> {
    return profileService.fetchUserProfile(userId);
  }

  async fetchUserMember(
    userId: string, 
    groupId: string | null
  ): Promise<{ data: any | null; error: Error | null }> {
    return memberService.fetchGroupMember(userId, groupId);
  }

  async refreshUserProfile(user: any): Promise<{
    data: {
      user: any;
      profile: Profile | null;
      member: any | null;
    };
    error: Error | null;
  }> {
    return profileService.refreshUserProfile(user);
  }

  async newUserProfile(profile: Profile): Promise<{ data: Profile | null; error: Error | null }> {
    return profileService.newUserProfile(profile);
  }

  async setProfileGroup(userId: string, groupId: string): Promise<void> {
    return profileService.setProfileGroup(userId, groupId);
  }
}