import { ContributionUseCase, GroupUseCase, MemberUseCase, MeetingUseCase, ProfileUseCase } from '@/application/use-cases/supabase/supabase.usecase';
import { ContributionSupabaseRepo, GroupSupabaseRepo, MeetingSupabaseRepo, MemberSupabaseRepo, ProfileSupabaseRepo } from '@/domain/repositories/supabase/supabase.repo';

const contributionRepo = new ContributionSupabaseRepo();
const groupRepo = new GroupSupabaseRepo();
const memberRepo = new MemberSupabaseRepo();
const meetingRepo = new MeetingSupabaseRepo();
const profileRepo = new ProfileSupabaseRepo();

const contributionUseCase = new ContributionUseCase(contributionRepo);
const groupUseCase = new GroupUseCase(groupRepo);
const memberUseCase = new MemberUseCase(memberRepo);
const meetingUseCase = new MeetingUseCase(meetingRepo);
const profileUseCase = new ProfileUseCase(profileRepo);

export const container = {
  contributionUseCase,
  groupUseCase,
  memberUseCase,
  meetingUseCase,
  profileUseCase,
};

export type Container = typeof container;
