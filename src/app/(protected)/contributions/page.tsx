"use client";

import * as React from "react";
import { Box, Grid, Typography } from "@mui/material";
import { Header, NavbarBreadcrumbs } from "@/components/navigation";
import { Copyright } from "@/components/general";
import { useAuthStore } from "@/state/auth/auth";
import GroupContributions from "./GroupContributions";

export default function Dashboard() {
  const { isAuthenticated, member } = useAuthStore();

  if (!isAuthenticated) {
    window.location.href = "/";
    return null;
  }

  return (
    <Box sx={{ width: "100%", maxWidth: { sm: "100%", md: "1700px" } }}>
      <Header />
      <NavbarBreadcrumbs
        items={[{ label: "Contributions", href: "/members" }]}
      />
      <Grid
        container
        sx={{
          height: {
            xs: "100%",
            sm: "calc(100dvh - var(--template-frame-height, 0px))",
          },
          mt: { xs: 4, sm: 0 },
        }}
      >
        <Typography component="h2" variant="h4" sx={{ mb: 1 }}>
          Chama Contributions
        </Typography>
        <GroupContributions groupId={member!.group_id} />
      </Grid>
      <Copyright sx={{ flex: 1, my: 4 }} />
    </Box>
  );
}
