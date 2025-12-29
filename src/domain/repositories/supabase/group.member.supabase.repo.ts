import { GroupMember } from "../../entities";
import { BaseRepo } from "./base.repo";
import { BaseSupabaseRepo } from "./base.supabase.repo";

export class GroupMemberSupabaseRepo 
  extends BaseSupabaseRepo<GroupMember> 
  implements BaseRepo<GroupMember> {
  constructor() {
    super('group_members');
  }
}
