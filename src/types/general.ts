export interface DatabaseFilters {
  field: string;
  value: string;
  operator?: 'ilike' | 'eq' | 'gt' | 'lt' | 'gte' | 'lte';
}

export interface DatabaseQueryParams {
  page: number;
  pageSize: number;
  sortField?: string;
  sortOrder?: 'asc' | 'desc';
  filters?: DatabaseFilters[];
}

export type ApiResponse<T> = {
  data: T | null;
  error: string | null;
  success: boolean;
};
