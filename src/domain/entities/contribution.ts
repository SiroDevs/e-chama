import { DatabaseFilters } from "@/types/general";

export interface Contribution {
  id?: string;
  group_id?: string;
  member_id?: string;
  reason?: string;
  details?: string;
  mode?: string;
  reference?: string;
  status?: string;
  amount?: number;
  attachment?: string;
  note?: string;
  created_at?: string;
  updated_at?: string;
}

export interface GroupContribution {
  id?: string;
  group_id?: string;
  member_id?: string;
  reason?: string;
  amount?: number;
  mode?: string;
  reference?: string;
  status?: string;
  attachment?: string;
  details?: string;
  note?: string;
  user_id?: string;
  full_name?: string;
  member_no?: string;
  role?: string;
  created_at?: string;
  updated_at?: string;
}

export interface ContributionsResp {
  data: Contribution[];
  count: number;
  error: Error | null;
}

export interface GrpContributionsResp {
  data: GroupContribution[];
  count: number;
  error: Error | null;
}
