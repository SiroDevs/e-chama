
export interface Contribution {
  id: string;
  title: string;
  group_id: string;
  member_id: string;
  description: string | null;
  mode: string | null;
  reference: string | null;
  status: string;
  amount: number;
  attachment: string;
  note: string;
  created_at: string;
  updated_at: string;
}

export interface ContributionsQueryParams {
  page: number;
  pageSize: number;
  sortField?: string;
  sortOrder?: 'asc' | 'desc';
  filters?: ContributionsFilters[];
  groupId?: string;
  memberId?: string;
}

export interface ContributionsResponse {
  data: Contribution[];
  count: number;
  error: Error | null;
}

export interface ContributionsFilters {
  field: string;
  value: string;
  operator?: 'ilike' | 'eq' | 'gt' | 'lt' | 'gte' | 'lte';
}

export interface ContributionsQueryParams {
  page: number;
  pageSize: number;
  sortField?: string;
  sortOrder?: 'asc' | 'desc';
  filters?: ContributionsFilters[];
}
