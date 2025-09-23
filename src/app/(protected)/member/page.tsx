"use client";

import * as React from "react";
import { Box, Card, CardContent, Grid, Typography } from "@mui/material";
import { Header, NavbarBreadcrumbs } from "@/components/navigation";
import { Copyright } from "@/components/general";
import { useAuthStore } from "@/state/auth/auth";
import Contributions from "./Contributions";
import MemberProfile from "./Profile";
import MemberProfileSmall from "./ProfileMobile";
import { useRouter } from "next/navigation";
import { processMemberProfileData } from "../members/arrays";
import { Member } from "@/state/role/profiles";
import { MemberProfileProps } from "@/types/profiles";

export default function MemberPage() {
  const router = useRouter();
  const { isAuthenticated, user, profile, member } = useAuthStore();

  if (!isAuthenticated) {
    router.push("/");
    return null;
  }

  const memberProfileData = processMemberProfileData(profile, member, user)();

  return (
    <Box sx={{ width: "100%", maxWidth: { sm: "100%", md: "1700px" } }}>
      <Header />
      <NavbarBreadcrumbs
        items={[{ label: "My Chama Profile", href: "/my-chama-profile" }]}
      />
      {SingleMemberView(memberProfileData, member)}
      <Copyright sx={{ flex: 1, my: 4 }} />
    </Box>
  );
}

export function SingleMemberView(
  memberProfileData: MemberProfileProps,
  member: Member | null
) {
  return (
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
        <Typography component="h3" variant="h5" sx={{ ml: 1, mb: 1 }}>
          Recent Contributions
        </Typography>
        <Contributions memberId={member!.id!} />
      </Box>
    </Grid>
  );
}
