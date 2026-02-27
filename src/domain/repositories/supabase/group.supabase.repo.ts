import { Group } from "../../entities";
import { BaseRepo } from "./base.repo";
import { BaseSupabaseRepo } from "./base.supabase.repo";

export class GroupSupabaseRepo 
  extends BaseSupabaseRepo<Group> 
  implements BaseRepo<Group> {
  constructor() {
    super('groups');
  }
}
