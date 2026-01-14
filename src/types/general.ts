import { Member, Profile, Group, UserGroup, Contribution, Permission } from "@/domain/entities";

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

export type EntityType = 'members' | 'profiles' | 'groups' | 'permissions';
export const entityTypes: EntityType[] = ["members", "profiles", "groups", "permissions"];

export type AnyEntity = Member | Profile | Group | Permission | Contribution | UserGroup;
