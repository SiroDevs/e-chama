export interface Group {
  id?: string;
  owner?: string;
  title?: string;
  description?: string | null;
  avatar?: string | null;
  initials?: string | null;
  location?: string | null;
  address?: string | null;
  code?: string | null;
  created_at?: string;
  updated_at?: string | null;
}

export interface GroupExt {
  id: string;
  owner: string;
  title: string;
  description: string | null;
  avatar: string | null;
  initials: string | null;
  location: string | null;
  address: string | null;
  code: string | null;
  created_at: string;
  updated_at: string | null;
  member_count: number;
}
