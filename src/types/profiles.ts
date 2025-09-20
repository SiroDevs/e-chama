import { DatabaseFilters } from "./types";

export interface GroupMember {
  auth_user_id: string;
  phone: string | null;
  email: string;
  first_name: string | null;
  last_name: string | null;
  id_number: string | null;
  kra_pin: string | null;
  country: string | null;
  address: string | null;
  sex: string | null;
  dob: string | null;
  avatar: string | null;
  member_id: string | null;
  member_no: string | null;
  role: string | null;
  joined_at: string | null;
  full_name: string | null;
  is_member: boolean;
}

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

export interface GroupMembersQueryParams {
  page: number;
  pageSize: number;
  sortField?: string;
  sortOrder?: 'asc' | 'desc';
  filters?: DatabaseFilters[];
  groupId?: string;
}

export interface GroupMembersResponse {
  data: GroupMember[];
  count: number;
  error: Error | null;
}
