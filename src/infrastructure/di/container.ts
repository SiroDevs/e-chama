import { ContributionUseCase, GroupMemberUseCase, GroupUseCase, MemberUseCase, ProfileUseCase } from '@/application/use-cases/supabase/supabase.usecase';
import { ContributionSupabaseRepo, GroupMemberSupabaseRepo, GroupSupabaseRepo, MemberSupabaseRepo, ProfileSupabaseRepo } from '@/domain/repositories/supabase/supabase.repo';

const contributionRepo = new ContributionSupabaseRepo();
const groupMemberRepo = new GroupMemberSupabaseRepo();
const groupRepo = new GroupSupabaseRepo();
const memberRepo = new MemberSupabaseRepo();
const profileRepo = new ProfileSupabaseRepo();

const contributionUseCase = new ContributionUseCase(contributionRepo);
const groupMemberUseCase = new GroupMemberUseCase(groupMemberRepo);
const groupUseCase = new GroupUseCase(groupRepo);
const memberUseCase = new MemberUseCase(memberRepo);
const profileUseCase = new ProfileUseCase(profileRepo);

export const container = {
  contributionUseCase,
  groupMemberUseCase,
  groupUseCase,
  memberUseCase,
  profileUseCase,
};

export type Container = typeof container;
