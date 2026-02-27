import { Contribution } from "../../entities";
import { BaseRepo } from "./base.repo";
import { BaseSupabaseRepo } from "./base.supabase.repo";

export class ContributionSupabaseRepo 
  extends BaseSupabaseRepo<Contribution> 
  implements BaseRepo<Contribution> {
  constructor() {
    super('contributions');
  }
}
