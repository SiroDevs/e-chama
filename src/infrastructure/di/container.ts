import { ContributionSupabaseRepo } from '@/domain/repos/contribution.supabase.repo';
import { GroupSupabaseRepo } from '@/domain/repos/group.supabase.repo';
import { MemberSupabaseRepo } from '@/domain/repos/member.supabase.repo';
import { ProfileSupabaseRepo } from '@/domain/repos/profile.supabase.repo';
import { ContributionUseCase } from '@/application/use-cases/contribution.usecase';
import { GroupUseCase } from '@/application/use-cases/group.usecase';
import { MemberUseCase } from '@/application/use-cases/member.usecase';
import { ProfileUseCase } from '@/application/use-cases/profile.usecase';

const contributionRepo = new ContributionSupabaseRepo();
const groupRepo = new GroupSupabaseRepo();
const memberRepo = new MemberSupabaseRepo();
const profileRepo = new ProfileSupabaseRepo();

const contributionUseCase = new ContributionUseCase(contributionRepo);
const groupUseCase = new GroupUseCase(groupRepo);
const memberUseCase = new MemberUseCase(memberRepo);
const profileUseCase = new ProfileUseCase(profileRepo);

export const container = {
  contributionUseCase,
  groupUseCase,
  memberUseCase,
  profileUseCase,
};

export type Container = typeof container;
