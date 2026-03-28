import { LayoutDashboard } from "lucide-react";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";

import { PageContent, PageContainer } from "../../components/common";
import { RootState } from "@/application/state/store";
import { memberService } from "@/infrastructure/services/memberService";
import { contributionService } from "@/infrastructure/services/contributionService";
import { DashboardAnalytics, MonthlyMeetings } from ".";
import { RecentContributions, RecentMembers } from ".";
import { GroupContribution, GroupMember } from "@/domain/entities";
import { formatNumber } from "@/lib";

export function AdminDashboard() {
  const PERIOD_DAYS = 28;

  const { member } = useSelector((state: RootState) => state.group);

  const [loading, setLoading] = useState(true);
  const [memberCount, setMemberCount] = useState(0);
  const [totalContributions, setTotalContributions] = useState(0);
  const [members, setMembers] = useState<GroupMember[]>([]);
  const [contributions, setContributions] = useState<GroupContribution[]>([]);

  useEffect(() => {
    if (!member?.group_id) return;

    const fetchDashboardData = async () => {
      setLoading(true);

      const dateTo = new Date().toISOString();
      const dateFrom = new Date(
        Date.now() - PERIOD_DAYS * 24 * 60 * 60 * 1000,
      ).toISOString();

      try {
        const [count, recentMembers, recentContributions, totalContribs] =
          await Promise.all([
            memberService.getMemberCount(member.group_id!),
            memberService.getRecentMembers(member.group_id!),
            contributionService.getRecentContributions({
              groupId: member.group_id!,
            }),
            contributionService.getTotalContributions({
              groupId: member.group_id!,
              dateFrom: dateFrom,
              dateTo: dateTo,
            }),
          ]);

        setMemberCount(count);
        setMembers(recentMembers.data || []);
        setContributions(recentContributions.data || []);

        if (!totalContribs.error && totalContribs.data !== null) {
          setTotalContributions(totalContribs.data);
        }
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [member?.group_id]);

  const summaryItems = [
    { label: "Contributions", value: formatNumber(totalContributions) },
    { label: "Loans repayment", value: (0).toLocaleString() },
  ];

  return (
    <PageContainer pageTitle="Chama Dashboard" pageIcon={<LayoutDashboard />}>
      <PageContent>
        <div className="py-3 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="flex flex-col gap-4">
              <DashboardAnalytics
                title="Group analytics"
                metricLabel="Total members"
                metricValue={loading ? 0 : memberCount}
                metricGrowth={loading ? 0 : memberCount}
                periodDays={PERIOD_DAYS}
                summaryItems={summaryItems}
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
