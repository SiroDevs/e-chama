import { Contribution, GroupContribution } from "@/domain/entities";
import { getServerClient } from "@/lib/supabase/server";

export const contributionService = {
  async getContributionById(id: string): Promise<{
    data: Contribution | null;
    error: Error | null;
  }> {
    try {
      const supabase = await getServerClient();
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
      const supabase = await getServerClient();
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
      const supabase = await getServerClient();
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
      const supabase = await getServerClient();
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
  },
  async getTotalContributions(
    groupId: string,
    dateFrom: string,
    dateTo: string
  ): Promise<{
    data: number | null;
    error: Error | null;
  }> {
    try {
      const supabase = await getServerClient();
      const { data, error } = await supabase
        .from('group_contributions')
        .select('amount')
        .eq('group_id', groupId)
        .gte('created_at', dateFrom)
        .lte('created_at', dateTo);
      // .eq('status', 'approved');

      if (error) throw error;

      const total = data?.reduce((sum, row) => sum + (row.amount ?? 0), 0) ?? 0;

      return { data: total, error: null };
    } catch (error) {
      return { data: null, error: error as Error };
    }
  },

  async getRecentContributions(groupId: string, limit: number = 3): Promise<{
    data: GroupContribution[];
    error: Error | null;
  }> {
    try {
      const supabase = await getServerClient();
      const { data, error } = await supabase
        .from('group_contributions')
        .select('*')
        .eq('group_id', groupId)
        .order('created_at', { ascending: false })
        .limit(limit);

      if (error) throw error;

      return { data: data || [], error: null };
    } catch (error) {
      return { data: [], error: error as Error };
    }
  },
}