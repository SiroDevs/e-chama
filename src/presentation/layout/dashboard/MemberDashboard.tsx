import { LayoutDashboard } from "lucide-react";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";

import { PageContent, PageContainer } from "../../components/common";
import { RootState } from "@/application/state/store";
import { contributionService } from "@/infrastructure/services/contributionService";
import { DashboardAnalytics, MonthlyMeetings } from ".";
import { RecentContributions } from ".";
import { GroupContribution } from "@/domain/entities";
import { formatNumber } from "@/lib";

export function MemberDashboard() {
  const PERIOD_DAYS = 28;

  const { member } = useSelector((state: RootState) => state.group);

  const [loading, setLoading] = useState(true);
  const [totalContributions, setTotalContributions] = useState(0);
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
        const [recentContributions, totalContribs] =
          await Promise.all([
            contributionService.getRecentContributions({
              groupId: member.group_id!,
              memberNo: member.member_no!,
            }),
            contributionService.getTotalContributions({
              groupId: member.group_id!,
              memberNo: member.member_no!,
              dateFrom: dateFrom,
              dateTo: dateTo,
            }),
          ]);

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
    <PageContainer pageTitle="Member Dashboard" pageIcon={<LayoutDashboard />}>
      <PageContent>
        <div className="py-3 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="flex flex-col gap-4">
              <DashboardAnalytics
                title="Member analytics"
                metricLabel="Total shares"
                metricValue={22000}
                metricGrowth={22000}
                periodDays={PERIOD_DAYS}
                summaryItems={summaryItems}
              />
            </div>

            <div className="flex flex-col gap-4">
              <RecentContributions contributions={contributions} />
            </div>

            <div className="flex flex-col gap-4">
              <MonthlyMeetings />
            </div>
          </div>
        </div>
      </PageContent>
    </PageContainer>
  );
}
