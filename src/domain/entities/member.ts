import { ProcessedMember, ProcessedProfile, ProcessedUser } from "@/domain/entities/profiles";

export interface Member {
  id?: string;
  group_id?: string;
  user_id?: string;
  country?: string | null;
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

export const dataToMember = ({
  id,
  group_id,
  user_id,
  country,
  role,
  joined_at,
  created_at,
  updated_at,
}: {
  id: string;
  group_id?: string | null;
  user_id?: string | null;
  country?: string | null;
  role?: string | null;
  joined_at?: string | null;
  created_at?: string | null;
  updated_at?: string | null;
}): Member => {
  return {
    id,
    group_id: group_id ?? undefined,
    user_id: user_id ?? undefined,
    country: country ?? undefined,
    role: role ?? undefined,
    joined_at: joined_at ?? undefined,
    created_at: created_at ?? undefined,
    updated_at: updated_at ?? undefined,
  };
};