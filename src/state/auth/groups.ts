export interface Group {
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

export interface Member {
  id: string;
  group_id: string;
  user_id: string;
  member_no: string | null;
  role: string;
  joined_at: string | null;
  field1: string | null;
  field2: string | null;
  field3: string | null;
  field4: string | null;
  field5: string | null;
  created_at: string;
  updated_at: string | null;
}

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

export interface PaginatedResp<T> {
  data: T[];
  totalCount: number | null;
  page: number;
  pageSize: number;
  totalPages: number;
}
