export interface ProcessedProfile {
  id?: string;
  first_name: string | null;
  last_name: string | null;
  dob: string | null;
  sex: string | null;
  country: string | null;
  address: string | null;
  avatar: string | null;
  fullName: string;
  formattedDob: string;
  initials: string;
  location: string;
}

export interface ProcessedMember {
  id?: string;
  member_no: string | null;
  role: string | null;
  joined_at: string | null;
  formattedJoinedAt: string;
  memberNo: string;
}

export interface ProcessedUser {
  phone: string | undefined;
}

export interface MemberProfileProps {
  loading: boolean;
  profile: ProcessedProfile | null;
  member: ProcessedMember | null;
  user: ProcessedUser | null;
}