import { Member } from "../../entities";
import { BaseRepo } from "./base.repo";
import { BaseSupabaseRepo } from "./base.supabase.repo";

export class MemberSupabaseRepo 
  extends BaseSupabaseRepo<Member> 
  implements BaseRepo<Member> {
  constructor() {
    super('members');
  }
}
