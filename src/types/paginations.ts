export type PaginationParams = {
  page: number;
  limit: number;
  totalPages?: number;
  totalItems?: number;
};

export type PaginatedResponse<T> = {
  items: T[];
  pagination: PaginationParams;
};

export interface PaginatedResp<T> {
  data: T[];
  totalCount: number | null;
  page: number;
  pageSize: number;
  totalPages: number;
}
