"use client";

import * as React from "react";

import { Box } from "@mui/material";
import { Header, NavbarBreadcrumbs } from "@/components/navigation";
import { Copyright } from "@/components/general";
import { useAuthStore } from "@/state/auth/auth";
import { useRouter } from "next/navigation";
import { JoinGroupCard } from "./card";

export default function Dashboard() {
  const router = useRouter();
  const { isAuthenticated } = useAuthStore();

  if (!isAuthenticated) {
    router.push("/");
  }

  return (
    <Box sx={{ width: "100%", maxWidth: { sm: "100%", md: "1700px" } }}>
      <Header />
      <NavbarBreadcrumbs
        items={[{ label: "Join a Chama", href: "/join" }]}
      />
      <JoinGroupCard />
      <Copyright sx={{ flex: 1, my: 4 }} />
    </Box>
  );
}
