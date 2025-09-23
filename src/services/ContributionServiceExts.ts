"use server";

import { supabase } from "@/lib/supabase/client";
import { ContributionsQueryParams, GrpContributionsResp } from "@/types/contribution";

export async function getGroupContributions({
  page,
  pageSize,
  sortField = 'created_at',
  sortOrder = 'desc',
  filters = [],
  groupId,
}: ContributionsQueryParams): Promise<GrpContributionsResp> {
  try {
    let query = supabase
      .from('group_contributions')
      .select('*', { count: 'exact' })
      .eq('group_id', groupId);

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
}
