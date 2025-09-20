"use client";

import * as React from "react";

import { Header, NavbarBreadcrumbs } from "@/components/navigation";
import { Box, Typography } from "@mui/material";
import { Copyright, MainGrid } from "@/components/general";
import { useGroupStore } from "@/state/auth/group";
import { AdminDashboard } from "./AdminDashboard";
import { MemberDashboard } from "./MemberDashboard";

export default function Dashboard() {
  const { currentRole } = useGroupStore();

  const dashboardContent = () => {
    switch (currentRole) {
      case 'admin':
        return <MainGrid/>;

      case 'official':
        return <AdminDashboard/>;
        
      case 'member':
        return <MemberDashboard/>;

      default:
        return <Header />;
    }
  };

  return (
    <div>
      <Header />
      <NavbarBreadcrumbs />

      <Box sx={{ width: "100%", maxWidth: { sm: "100%", md: "1700px" } }}>
        <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
          Overview
        </Typography>
        {dashboardContent()}
        <Copyright sx={{ my: 4 }} />
      </Box>
    </div>
  );
}
