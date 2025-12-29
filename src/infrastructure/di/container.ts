import { ContributionSupabaseRepo } from '@/domain/repositories/supabase/contribution.supabase.repo';
import { GroupSupabaseRepo } from '@/domain/repositories/supabase/group.supabase.repo';
import { MemberSupabaseRepo } from '@/domain/repositories/supabase/member.supabase.repo';
import { ProfileSupabaseRepo } from '@/domain/repositories/supabase/profile.supabase.repo';
import { ContributionUseCase } from '@/application/use-cases/supabase/contribution.usecase';
import { GroupUseCase } from '@/application/use-cases/supabase/group.usecase';
import { MemberUseCase } from '@/application/use-cases/supabase/member.usecase';
import { ProfileUseCase } from '@/application/use-cases/supabase/profile.usecase';

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
