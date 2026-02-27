export interface PaginationOptions {
  page: number;
  pageSize: number;
}

export interface PaginatedResult<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface BaseRepo<T> {
  getAll(): Promise<T[]>;
  getAllPaginated?(options: PaginationOptions): Promise<PaginatedResult<T>>;
  getById(id: number): Promise<T | null>;
  create(data: Omit<T, 'rid' | 'createdAt' | 'updatedAt'>): Promise<T>;
  update(id: number, data: Partial<T>): Promise<T>;
  delete(id: number): Promise<void>;
}