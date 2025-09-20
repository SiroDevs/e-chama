"use client";

import * as React from "react";
import { Box, Card, CardContent, Grid, Typography } from "@mui/material";
import { Header, NavbarBreadcrumbs } from "@/components/navigation";
import { Copyright } from "@/components/general";
import { useAuthStore } from "@/state/auth/auth";
import Contributions from "./Contributions";
import MemberProfile from "./Profile";
import { MemberProfileProps } from "@/types/profiles";
import MemberProfileSmall from "./ProfileMobile";

export default function Dashboard() {
  const { isAuthenticated, user, profile, member } = useAuthStore();

  if (!isAuthenticated) {
    window.location.href = "/";
    return null;
  }

  const processMemberProfileData = (): MemberProfileProps => {
    if (!profile || !member) {
      return {
        loading: false,
        profile: null,
        member: null,
        user: null,
      };
    }

    const fullName =
      `${profile.first_name || ""} ${profile.last_name || ""}`.trim() ||
      "Unknown Member";

    const formatDate = (dateString: string | null) => {
      if (!dateString) return "Not set";
      return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    };

    const getInitials = (firstName: string | null, lastName: string | null) => {
      const first = firstName?.[0] || "";
      const last = lastName?.[0] || "";
      return `${first}${last}`.toUpperCase();
    };

    return {
      loading: false,
      profile: {
        ...profile,
        fullName,
        formattedDob: formatDate(profile.dob),
        initials: getInitials(profile.first_name, profile.last_name),
        location:
          `${profile.country || ""} ${profile.address || ""}`.trim() ||
          "Not specified",
      },
      member: {
        ...member,
        formattedJoinedAt: formatDate(member.joined_at),
        memberNo: member.member_no || "Not assigned",
        role: member.role || "Member",
      },
      user: {
        phone: user?.phone || "Not specified",
      },
    };
  };

  const memberProfileData = processMemberProfileData();

  return (
    <Box sx={{ width: "100%", maxWidth: { sm: "100%", md: "1700px" } }}>
      <Header />
      <NavbarBreadcrumbs
        items={[{ label: "My Chama Profile", href: "/my-chama-profile" }]}
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
        <Grid
          size={{ xs: 12, sm: 5, lg: 4 }}
          sx={{
            display: { xs: "none", md: "flex" },
            flexDirection: "column",
            borderRight: { sm: "none", md: "1px solid" },
            borderColor: { sm: "none", md: "divider" },
            alignItems: "start",
            pt: 2,
          }}
        >
          <MemberProfile {...memberProfileData} />
        </Grid>

        <Card
          sx={{
            width: "100%",
            display: { xs: "flex", md: "none" },
          }}
        >
          <CardContent>
            <MemberProfileSmall {...memberProfileData} />
          </CardContent>
        </Card>
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
            Your Recent Contributions
          </Typography>
          <Contributions memberId={member!.id} />
        </Box>
      </Grid>
      <Copyright sx={{ flex: 1, my: 4 }} />
    </Box>
  );
}
