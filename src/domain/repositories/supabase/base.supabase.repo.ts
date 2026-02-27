import { supabase } from "@/lib/supabase/client";
import { BaseRepo } from "./base.repo";

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

export abstract class BaseSupabaseRepo<T> implements BaseRepo<T> {
  constructor(protected tableName: string) {}

  async getAll(): Promise<T[]> {
    const { data, error } = await supabase
      .from(this.tableName)
      .select('*')
      .order('rid', { ascending: true });

    if (error) throw new Error(`Failed to fetch ${this.tableName}: ${error.message}`);
    return data as T[];
  }

  async getAllPaginated(options: PaginationOptions): Promise<PaginatedResult<T>> {
    const { page, pageSize } = options;
    const from = (page - 1) * pageSize;
    const to = from + pageSize - 1;

    const { data, error, count } = await supabase
      .from(this.tableName)
      .select('*', { count: 'exact' })
      .order('rid', { ascending: true })
      .range(from, to);

    if (error) throw new Error(`Failed to fetch ${this.tableName}: ${error.message}`);

    const total = count || 0;
    const totalPages = Math.ceil(total / pageSize);

    return {
      data: data as T[],
      total,
      page,
      pageSize,
      totalPages,
    };
  }

  async getById(id: number): Promise<T | null> {
    const { data, error } = await supabase
      .from(this.tableName)
      .select('*')
      .eq('rid', id)
      .single();

    if (error) return null;
    return data as T;
  }

  async create(data: Omit<T, 'rid' | 'createdAt' | 'updatedAt'>): Promise<T> {
    const { data: result, error } = await supabase
      .from(this.tableName)
      .insert({
        ...data,
        createdAt: new Date().toISOString(),
      })
      .select()
      .single();

    if (error) throw new Error(`Failed to create ${this.tableName}: ${error.message}`);
    return result as T;
  }

  async update(id: number, data: Partial<T>): Promise<T> {
    const updateData = {
      ...data,
      updatedAt: new Date().toISOString(),
    };

    const { data: result, error } = await supabase
      .from(this.tableName)
      .update(updateData)
      .eq('rid', id)
      .select()
      .single();

    if (error) throw new Error(`Failed to update ${this.tableName}: ${error.message}`);
    return result as T;
  }

  async delete(id: number): Promise<void> {
    const { error } = await supabase
      .from(this.tableName)
      .delete()
      .eq('rid', id);

    if (error) throw new Error(`Failed to delete ${this.tableName}: ${error.message}`);
  }
}