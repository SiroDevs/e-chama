"use client";

import * as React from "react";
import { Box, Grid, Typography } from "@mui/material";
import { Header, NavbarBreadcrumbs } from "@/components/navigation";
import { Copyright } from "@/components/general";
import { useAuthStore } from "@/state/auth/auth";
import GroupMembers from "./GroupMembers";

export default function Dashboard() {
  const { isAuthenticated, member } = useAuthStore();

  if (!isAuthenticated) {
    window.location.href = "/";
    return null;
  }

  return (
    <Box sx={{ width: "100%", maxWidth: { sm: "100%", md: "1700px" } }}>
      <Header />
      <NavbarBreadcrumbs items={[{ label: "Members", href: "/members" }]} />
      <Box
        sx={{
          height: {
            xs: "100%",
            sm: "calc(100dvh - var(--template-frame-height, 0px))",
          },
          mt: { xs: 4, sm: 0 },
          display: "flex",
          flexDirection: "column",
          gap: 1,
        }}
      >
        <Typography component="h2" variant="h4" sx={{ mb: 1 }}>
          Chama Members
        </Typography>
        <GroupMembers groupId={member!.group_id} />
      </Box>
      <Copyright sx={{ flex: 1, my: 4 }} />
    </Box>
  );
}
