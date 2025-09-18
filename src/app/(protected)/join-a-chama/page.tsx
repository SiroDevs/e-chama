"use client";

import * as React from "react";

import { Box } from "@mui/material";
import { Header, NavbarBreadcrumbs } from "@/components/navigation";
import { JoinGroupCard } from "@/components/groups/JoinGroupCard";
import { useAuthStore } from "@/state/auth/auth";

export default function Dashboard() {
  // const { isAuthenticated } = useAuthStore();
  // if (!isAuthenticated) {
  //   window.location.href = "/";
  // }
  return (
    <div>
      <Box sx={{ width: "100%", maxWidth: { sm: "100%", md: "1700px" } }}>
        {/* <Header /> */}
        <NavbarBreadcrumbs
          items={[{ label: "Join a Chama", href: "/join-a-chama" }]}
        />
      </Box>
      <JoinGroupCard />
    </div>
  );
}
