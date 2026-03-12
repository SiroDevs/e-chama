import { Contribution, Group, GroupMember, Member, Permission, Profile } from "../../entities";
import { BaseRepo } from "./base.repo";
import { BaseSupabaseRepo } from "./base.supabase.repo";

export class ContributionSupabaseRepo 
  extends BaseSupabaseRepo<Contribution> 
  implements BaseRepo<Contribution> {
  constructor() {
    super('contributions');
  }
}

export class GroupMemberSupabaseRepo 
  extends BaseSupabaseRepo<GroupMember> 
  implements BaseRepo<GroupMember> {
  constructor() {
    super('group_members');
  }
}

export class GroupSupabaseRepo 
  extends BaseSupabaseRepo<Group> 
  implements BaseRepo<Group> {
  constructor() {
    super('groups');
  }
}

export class MemberSupabaseRepo 
  extends BaseSupabaseRepo<Member> 
  implements BaseRepo<Member> {
  constructor() {
    super('members');
  }
}

export class PermissionSupabaseRepo 
  extends BaseSupabaseRepo<Permission> 
  implements BaseRepo<Permission> {
  constructor() {
    super('permissions');
  }
}

export class ProfileSupabaseRepo 
  extends BaseSupabaseRepo<Profile> 
  implements BaseRepo<Profile> {
  constructor() {
    super('profiles');
  }
}
