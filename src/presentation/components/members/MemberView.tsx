"use client";

import * as React from "react";
import { Box, Card, CardContent, Grid, Stack, Typography } from "@mui/material";
import MemberProfileSmall from "./MemberProfileSmall";
import MemberContributions from "./MemberContributions";
import { PageAction, PageIconButton } from "../actions/MenuButton";
import RefreshIcon from "@mui/icons-material/Refresh";
import PlusIcon from "@mui/icons-material/Add";
import { MemberProfileProps } from "@/data/types/profiles";
import MemberProfile from "./MemberProfile";

interface MemberViewProps extends MemberProfileProps {
  memberId: string;
  onRefresh: () => void;
  onAddNew: () => void;
}

export function MemberView({
  memberId,
  onRefresh,
  onAddNew,
  ...memberProfileData
}: MemberViewProps) {
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

      <Grid
        size={{ xs: 12, md: 7, lg: 8 }}
        sx={{
          display: "flex",
          flexDirection: "column",
          height: {
            xs: "100%",
            sm: "calc(100dvh - var(--template-frame-height, 0px))",
          },
          mt: { xs: 4, sm: 0 },
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            flex: 1,
            width: "100%",
            p: 1,
          }}
        >
          <Stack
            direction="row"
            alignItems="center"
            spacing={1}
            sx={{ width: "100%", mb: 1 }}
          >
            <Typography component="h3" variant="h5" sx={{ flex: 1 }}>
              Recent Contributions
            </Typography>
            <PageIconButton
              title="Reload data"
              onClick={onRefresh}
              icon={<RefreshIcon />}
            />
            <PageAction
              title="New Contribution"
              onClick={onAddNew}
              size="small"
              icon={<PlusIcon />}
            />
          </Stack>

          <Box sx={{ width: "100%", flex: 1 }}>
            <MemberContributions memberId={memberId} />
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}