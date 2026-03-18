import { DatabaseFilters } from "@/types/general";

export interface GroupMember {
    member_no: string | null;
    full_name: string | null;
    role: string | null;
    first_name: string | null;
    last_name: string | null;
    phone: string | null;
    email: string | null;
    id_number: string | null;
    kra_pin: string | null;
    country: string | null;
    address: string | null;
    sex: string | null;
    dob: string | null;
    avatar: string | null;
    joined_at: string | null;
    id: string | null;
    user_id: string | null;
    group_id: string | null;
    created_at: string | null;
    updated_at: string | null;
}

export interface GroupMembersQueryParams {
  page: number;
  pageSize: number;
  sortField?: string;
  sortOrder?: 'asc' | 'desc';
  filters?: DatabaseFilters[];
  groupId?: string;
}

export interface GroupMembersResp {
  data: GroupMember[];
  count: number;
  error: Error | null;
}

