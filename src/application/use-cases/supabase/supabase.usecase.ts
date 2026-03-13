import { BaseRepo } from '@/domain/repositories/supabase/base.repo';
import { CrudUseCase } from './crud.usecase';
import { GroupContribution, Group, GroupMember, Permission, Profile } from '@/domain/entities';

export class ContributionUseCase extends CrudUseCase<GroupContribution> {
  constructor(repository: BaseRepo<GroupContribution>) {
    super(repository);
  }
}

export class GroupUseCase extends CrudUseCase<Group> {
  constructor(repository: BaseRepo<Group>) {
    super(repository);
  }
}

export class MemberUseCase extends CrudUseCase<GroupMember> {
  constructor(repository: BaseRepo<GroupMember>) {
    super(repository);
  }
}

export class ProfileUseCase extends CrudUseCase<Profile> {
  constructor(repository: BaseRepo<Profile>) {
    super(repository);
  }
}

export class PermissionUseCase extends CrudUseCase<Permission> {
  constructor(repository: BaseRepo<Permission>) {
    super(repository);
  }
}