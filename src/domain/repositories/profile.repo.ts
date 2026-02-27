import { Profile } from "@/domain/entities";

export interface ProfileRepo {
  fetchUserProfile(userId: string): Promise<{ data: Profile | null; error: Error | null }>;
  
  fetchUserMember(userId: string, groupId: string | null): Promise<{ data: any | null; error: Error | null }>;
  
  refreshUserProfile(user: any): Promise<{
    data: {
      user: any;
      profile: Profile | null;
      member: any | null;
    };
    error: Error | null;
  }>;
  
  createProfile(profile: Profile): Promise<{ data: Profile | null; error: Error | null }>;
  
  setProfileGroup(userId: string, groupId: string): Promise<void>;
}