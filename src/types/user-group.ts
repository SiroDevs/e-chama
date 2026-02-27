export interface UserGroup {
  user_id: string;
  member_id: string;
  group_id: string;
  title: string;
  description: string | null;
  avatar: string | null;
  initials: string | null;
  location: string | null;
  address: string | null;
  created_at: string;
  updated_at: string | null;
  role: string;
  member_no: string | null;
  joined_at: string | null;
}