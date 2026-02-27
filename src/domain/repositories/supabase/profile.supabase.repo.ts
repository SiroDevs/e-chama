import { Profile } from "../../entities";
import { BaseRepo } from "./base.repo";
import { BaseSupabaseRepo } from "./base.supabase.repo";

export class ProfileSupabaseRepo 
  extends BaseSupabaseRepo<Profile> 
  implements BaseRepo<Profile> {
  constructor() {
    super('profiles');
  }
}
