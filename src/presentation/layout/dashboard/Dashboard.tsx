import { LayoutDashboard } from "lucide-react";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";

import PageContent from "../../components/common/page-content";
import { PageContainer } from "../../components/common/page-container";
import { RootState } from "@/application/state/store";
import { memberService } from "@/infrastructure/services/memberService";
import { contributionService } from "@/infrastructure/services/contributionService";
import GroupAnalytics from "./group-anlytics";
import RecentMembers from "./recent-members";
import { GroupContribution, GroupMember } from "@/domain/entities";
import RecentContributions from "./recent-contributions";
import MonthlyMeetings from "./montly-meetings";

export default function Dashboard() {
  const { member } = useSelector((state: RootState) => state.group);
  const [memberCount, setMemberCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [previousMemberCount, setPreviousMemberCount] = useState<number>(0);
  const [totalContributions, setTotalContributions] = useState<number>(0);
  const [members, setMembers] = useState<GroupMember[]>([]);
  const [contributions, setContributions] = useState<GroupContribution[]>([]);

  useEffect(() => {
    const fetchMemberCount = async () => {
      if (!member?.group_id) return;

      try {
        setLoading(true);
        const count = await memberService.getMemberCount(member.group_id);

        setMemberCount(count);
      } catch (error) {
        console.error("Error fetching member count:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMemberCount();
  }, [member?.group_id]);

  useEffect(() => {
    const fetchTotalContributions = async () => {
      if (!member?.group_id) return;

      const dateTo = new Date().toISOString();
      const dateFrom = new Date(
        Date.now() - 28 * 24 * 60 * 60 * 1000,
      ).toISOString();

      const { data, error } = await contributionService.getTotalContributions(
        member.group_id,
        dateFrom,
        dateTo,
      );

      if (!error && data !== null) {
        setTotalContributions(data);
      }
    };

    fetchTotalContributions();
  }, [member?.group_id]);

  useEffect(() => {
    const fetchRecentMembers = async () => {
      if (!member?.group_id) return;

      try {
        setLoading(true);
        const { data } = await memberService.getRecentMembers(member.group_id);

        setMembers(data || []);
      } catch (error) {
        console.error("Error fetching recent members:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecentMembers();
  }, [member?.group_id]);

  useEffect(() => {
    const fetchRecentContributions = async () => {
      if (!member?.group_id) return;

      try {
        setLoading(true);
        const { data } = await contributionService.getRecentContributions(
          member.group_id,
        );

        setContributions(data || []);
      } catch (error) {
        console.error("Error fetching recent contributions:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecentContributions();
  }, [member?.group_id]);

  return (
    <PageContainer pageTitle="Chama Dashboard" pageIcon={<LayoutDashboard />}>
      <PageContent>
        <div className="py-3 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="flex flex-col gap-4">
              <GroupAnalytics
                members={loading ? 0 : memberCount}
                memberGrowth={loading ? 0 : memberCount}
                contributions={totalContributions}
                loans={0}
                periodDays={28}
              />
              <MonthlyMeetings />
            </div>

            <div className="flex flex-col gap-4">
              <RecentMembers members={members} />
            </div>

            <div className="flex flex-col gap-4">
              <RecentContributions contributions={contributions} />
            </div>
          </div>
        </div>
      </PageContent>
    </PageContainer>
  );
}
