import { Group, GroupMember, GroupContribution, Permission, Profile, GroupMeeting } from "../../entities";
import { BaseRepo } from "./base.repo";
import { BaseSupabaseRepo } from "./base.supabase.repo";

export class ContributionSupabaseRepo
  extends BaseSupabaseRepo<GroupContribution>
  implements BaseRepo<GroupContribution> {
  constructor() {
    super('group_contributions');
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
  extends BaseSupabaseRepo<GroupMember>
  implements BaseRepo<GroupMember> {
  constructor() {
    super('group_members');
  }
}

export class MeetingSupabaseRepo
  extends BaseSupabaseRepo<GroupMeeting>
  implements BaseRepo<GroupMeeting> {
  constructor() {
    super('group_meetings');
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
