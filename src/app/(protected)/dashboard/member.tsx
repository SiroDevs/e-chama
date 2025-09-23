import * as React from "react";
import { Box, Grid } from "@mui/material";
import { StatCardProps, StatCard } from "@/components/general";

const data: StatCardProps[] = [
  {
    title: "My Contributions",
    value: "0",
    interval: "Last 30 days",
    trend: "neutral",
    data: [],
  },
  {
    title: "My Loans",
    value: "0",
    interval: "Last 3 months",
    trend: "neutral",
    data: [],
  },
  {
    title: "My Table Banking",
    value: "0",
    interval: "Last 3 months",
    trend: "neutral",
    data: [],
  },
];

export function MemberDashboard() {
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
