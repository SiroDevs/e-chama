export interface Group {
  id: string;
  owner: string;
  title: string;
  description: string | null;
  avatar: string | null;
  initials: string | null;
  location: string | null;
  address: string | null;
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
  initials: string | null;
  location: string | null;
  address: string | null;
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

export interface Profile {
  id: string;
  first_name: string | null;
  last_name: string | null;
  id_number: string | null;
  kra_pin: string | null;
  country: string | null;
  address: string | null;
  sex: string | null;
  dob: Date | null;
  passport: string | null;
  group: string | null;
  field2: string | null;
  field3: string | null;
  created_at: string;
  updated_at: string | null;
}