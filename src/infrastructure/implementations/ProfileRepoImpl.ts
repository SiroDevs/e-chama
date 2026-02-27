import { ProfileRepo } from "@/domain/repositories/profile.repo";
import { profileService } from "../services/profileService";
import { Profile } from "@/domain/entities";

export class ProfileRepoImpl implements ProfileRepo {
  async fetchUserProfile(userId: string): Promise<{ data: Profile | null; error: Error | null }> {
    return profileService.fetchUserProfile(userId);
  }

  async fetchUserMember(
    userId: string, 
    groupId: string | null
  ): Promise<{ data: any | null; error: Error | null }> {
    return profileService.fetchUserMember(userId, groupId);
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

  async createProfile(profile: Profile): Promise<{ data: Profile | null; error: Error | null }> {
    return profileService.createProfile(profile);
  }

  async updateSelectedGroup(userId: string, groupId: string): Promise<void> {
    return profileService.updateSelectedGroup(userId, groupId);
  }
}