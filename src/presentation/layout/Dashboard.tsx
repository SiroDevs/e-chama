import { LayoutDashboard } from "lucide-react";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";

import PageContent from "../components/common/page-content";
import { PageContainer } from "../components/common/page-container";
import { StatCard, StatCardProps } from "../components/common/stat-card";
import { RootState } from "@/application/state/store";
import { memberService } from "@/infrastructure/services/memberService";

export default function Dashboard() {
  const { member } = useSelector((state: RootState) => state.group);
  const [memberCount, setMemberCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [previousMemberCount, setPreviousMemberCount] = useState<number>(0);

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

  const getTrend = (
    current: number,
    previous: number,
  ): "up" | "down" | "neutral" => {
    if (current > previous) return "up";
    if (current < previous) return "down";
    return "neutral";
  };

  const data: StatCardProps[] = [
    {
      title: "Members",
      link: "members",
      value: loading ? "..." : memberCount.toString(),
      interval: "Total members",
      trend: getTrend(memberCount, previousMemberCount),
      data: [],
    },
    {
      title: "Contributions",
      link: "contributions",
      value: "0",
      interval: "Last 30 days",
      trend: "neutral",
      data: [],
    },
    {
      title: "Loans",
      link: "",
      value: "0",
      interval: "Last 3 months",
      trend: "neutral",
      data: [],
    },
    {
      title: "Table Banking",
      link: "",
      value: "0",
      interval: "Last 3 months",
      trend: "neutral",
      data: [],
    },
  ];

  return (
    <PageContainer pageTitle="Dashboard" pageIcon={<LayoutDashboard />}>
      <PageContent>
        <div className="w-full max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-4">
            {data.map((card, index) => (
              <div key={index} className="w-full">
                <StatCard {...card} />
              </div>
            ))}
          </div>
        </div>
      </PageContent>
    </PageContainer>
  );
}
