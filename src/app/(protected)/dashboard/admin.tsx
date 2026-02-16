import * as React from "react";
import { useState, useEffect } from "react";
import { Box, Grid } from "@mui/material";

import { getMemberCount } from "@/services/MemberService";
import { StatCardProps, StatCard } from "@/components/general";
import { useAuthStore } from "@/state/auth/auth";

export function AdminDashboard() {
  const { isAuthenticated, member } = useAuthStore();
  const [memberCount, setMemberCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [previousMemberCount, setPreviousMemberCount] = useState<number>(0);

  useEffect(() => {
    const fetchMemberCount = async () => {
      if (!member?.group_id) return;
      
      try {
        setLoading(true);
        const count = await getMemberCount(member.group_id);
        
        setMemberCount(count);
        
      } catch (error) {
        console.error("Error fetching member count:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMemberCount();
  }, [member?.group_id]);

  const getTrend = (current: number, previous: number): 'up' | 'down' | 'neutral' => {
    if (current > previous) return 'up';
    if (current < previous) return 'down';
    return 'neutral';
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
    <Box sx={{ width: "100%", maxWidth: { sm: "100%", md: "1700px" } }}>
      <Grid
        container
        spacing={2}
        columns={12}
        sx={{ mb: (theme) => theme.spacing(2) }}
      >
        {data.map((card, index) => (
          <Grid key={index} size={{ xs: 12, sm: 6, lg: 3 }}>
            <StatCard {...card} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}