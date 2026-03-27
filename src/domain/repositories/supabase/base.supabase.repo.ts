import { supabase } from "@/lib/supabase/client";
import { BaseRepo, PaginationOptions, PaginatedResult } from "./base.repo";

export abstract class BaseSupabaseRepo<T> implements BaseRepo<T> {
  constructor(protected tableName: string) { }

  async getAll(): Promise<T[]> {
    const { data, error } = await supabase
      .from(this.tableName)
      .select('*')
      .order('id', { ascending: true });

    if (error) throw new Error(`Failed to fetch ${this.tableName}: ${error.message}`);
    return data as T[];
  }

  async getAllPaginated(options: PaginationOptions): Promise<PaginatedResult<T>> {
    const { page, pageSize, filters } = options;
    const from = (page - 1) * pageSize;
    const to = from + pageSize - 1;

    let query = supabase
      .from(this.tableName)
      .select('*', { count: 'exact' })
      .order('id', { ascending: true })
      .range(from, to);

    if (filters) {
      for (const [key, value] of Object.entries(filters)) {
        if (value !== undefined && value !== null) {
          query = query.eq(key, value);
        }
      }
    }

    const { data, error, count } = await query;

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
      .eq('id', id)
      .single();

    if (error) return null;
    return data as T;
  }

  async create(data: Omit<T, 'id' | 'created_at' | 'updated_at'>): Promise<T> {
    const { data: result, error } = await supabase
      .from(this.tableName)
      .insert({
        ...data,
        created_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (error) throw new Error(`Failed to create ${this.tableName}: ${error.message}`);
    return result as T;
  }

  async update(id: number, data: Partial<T>): Promise<T> {
    const updateData = {
      ...data,
      updated_at: new Date().toISOString(),
    };

    const { data: result, error } = await supabase
      .from(this.tableName)
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) throw new Error(`Failed to update ${this.tableName}: ${error.message}`);
    return result as T;
  }

  async delete(id: number): Promise<void> {
    const { error } = await supabase
      .from(this.tableName)
      .delete()
      .eq('id', id);

    if (error) throw new Error(`Failed to delete ${this.tableName}: ${error.message}`);
  }
}