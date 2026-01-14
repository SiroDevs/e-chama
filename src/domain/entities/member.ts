import { ProcessedMember, ProcessedProfile, ProcessedUser } from "@/domain/entities/profiles";

export interface Member {
  id?: string;
  group_id?: string;
  user_id?: string;
  member_no?: string | null;
  role?: string;
  joined_at?: string | null;
  created_at?: string;
  updated_at?: string | null;
}

export interface MemberProfileProps {
  loading: boolean;
  profile: ProcessedProfile | null;
  member: ProcessedMember | null;
  user: ProcessedUser | null;
}