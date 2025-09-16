export interface Group {
  id: string;
  owner: string;
  title: string;
  description: string | null;
  avatar: string | null;
  field1: string | null;
  field2: string | null;
  field3: string | null;
  created_at: string;
  updated_at: string | null;
}

export interface Member {
  id: string;
  group: string;
  user: string;
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
  group_owner: string;
  created_at: string;
  updated_at: string | null;
  role: string;
  joined_at: string | null;
  member_no: string | null;
}

export interface PaginatedResp<T> {
  data: T[];
  totalCount: number | null;
  page: number;
  pageSize: number;
  totalPages: number;
}