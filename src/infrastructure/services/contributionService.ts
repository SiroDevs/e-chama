"use server";

import { supabase } from "@/lib/supabase/client";
import { ContributionsQueryParams, ContributionsResp, Contribution } from "@/types";

export const contributionService = {
  async getContributions({
    page,
    pageSize,
    sortField = 'created_at',
    sortOrder = 'desc',
    filters = [],
    groupId,
    memberId,
  }: ContributionsQueryParams): Promise<ContributionsResp> {
    try {
      let query = supabase
        .from('contributions')
        .select('*', { count: 'exact' });

      if (groupId) {
        query = query.eq('group_id', groupId);
      }

      if (memberId) {
        query = query.eq('member_id', memberId);
      }

      query = query.order(sortField, { ascending: sortOrder === 'asc' });

      filters.forEach((filter) => {
        if (filter.value) {
          switch (filter.operator) {
            case 'eq':
              query = query.eq(filter.field, filter.value);
              break;
            case 'gt':
              query = query.gt(filter.field, filter.value);
              break;
            case 'lt':
              query = query.lt(filter.field, filter.value);
              break;
            case 'gte':
              query = query.gte(filter.field, filter.value);
              break;
            case 'lte':
              query = query.lte(filter.field, filter.value);
              break;
            case 'ilike':
            default:
              query = query.ilike(filter.field, `%${filter.value}%`);
          }
        }
      });

      const from = page * pageSize;
      const to = from + pageSize - 1;
      query = query.range(from, to);

      const { data, error, count } = await query;

      if (error) {
        throw error;
      }
      return {
        data: data || [],
        count: count || 0,
        error: null,
      };
    } catch (error) {
      return {
        data: [],
        count: 0,
        error: error as Error,
      };
    }
  },

  async getContributionById(id: string): Promise<{
    data: Contribution | null;
    error: Error | null;
  }> {
    try {
      const { data, error } = await supabase
        .from('contributions')
        .select('*')
        .eq('id', id)
        .single();

      return {
        data,
        error,
      };
    } catch (error) {
      return {
        data: null,
        error: error as Error,
      };
    }
  },

  async createContribution(contribution: Omit<Contribution, 'id' | 'created_at' | 'updated_at'>): Promise<{
    data: Contribution | null;
    error: Error | null;
  }> {
    try {
      const { data, error } = await supabase
        .from('contributions')
        .insert([contribution])
        .select()
        .single();

      return {
        data,
        error,
      };
    } catch (error) {
      return {
        data: null,
        error: error as Error,
      };
    }
  },

  async updateContribution(
    id: string,
    updates: Partial<Omit<Contribution, 'id' | 'created_at'>>
  ): Promise<{
    data: Contribution | null;
    error: Error | null;
  }> {
    try {
      const { data, error } = await supabase
        .from('contributions')
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq('id', id)
        .select()
        .single();

      return {
        data,
        error,
      };
    } catch (error) {
      return {
        data: null,
        error: error as Error,
      };
    }
  },

  async deleteContribution(id: string): Promise<{
    success: boolean;
    error: Error | null;
  }> {
    try {
      const { error } = await supabase
        .from('contributions')
        .delete()
        .eq('id', id);

      return {
        success: !error,
        error,
      };
    } catch (error) {
      return {
        success: false,
        error: error as Error,
      };
    }
  }
}