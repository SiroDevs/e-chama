"use client";

import * as React from "react";
import { Box, Typography } from "@mui/material";
import { Header, NavbarBreadcrumbs } from "@/components/navigation";
import { Copyright } from "@/components/general";
import useNotifications from "@/hooks/notifications/useNotifications";
import NewMemberForm from "./form";
import { useAuthStore } from "@/state/auth/auth";
import { useRouter } from "next/navigation";

export default function NewMemberPage() {
  const router = useRouter();
  const { isAuthenticated, member } = useAuthStore();
  const notifications = useNotifications();
  if (!isAuthenticated) {
    router.push("/");
    return null;
  }
  function handleMemberCreated(): void {
    notifications.show("New Member registered successfully.", {
      severity: "success",
      autoHideDuration: 3000,
    });
  }

  return (
    <Box sx={{ width: "100%", maxWidth: { sm: "100%", md: "1700px" } }}>
      <Header />
      <NavbarBreadcrumbs
        items={[
          { label: "Members", href: "/members" },
          { label: "New Member" },
        ]}
      />
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
          Register a New Member
        </Typography>
        <NewMemberForm onMemberCreated={handleMemberCreated} />
      </Box>
      <Copyright sx={{ flex: 1, my: 4 }} />
    </Box>
  );
}
