import { Permission } from "../entities";
import { BaseRepo } from "./base.repo";
import { BaseSupabaseRepo } from "./base.supabase.repo";

export class PermissionSupabaseRepo 
  extends BaseSupabaseRepo<Permission> 
  implements BaseRepo<Permission> {
  constructor() {
    super('permissions');
  }
}
