"use client";

import * as React from "react";
import { useState } from "react";
import { Box, Stack, CircularProgress, Typography } from "@mui/material";
import { Header } from "@/presentation/components/navigation";
import { Copyright } from "@/presentation/components/general";
import { useAuthStore } from "@/infrastucture/state/auth/auth";
import { useRouter } from "next/navigation";
import EditIcon from "@mui/icons-material/Edit";
import { MemberView } from "@/presentation/components/members/MemberView";
import { PageAction } from "@/presentation/components/actions/MenuButton";
import { processMemberProfileData } from "../members/arrays";
import PageContainer from "@/presentation/components/actions/PageContainer";
import NewContributionDialog from "@/presentation/components/contributions/NewContributionDialog";
import useNotifications from "@/presentation/hooks/notifications/useNotifications";

export default function MemberPage() {
  const router = useRouter();
  const notifications = useNotifications();
  const [openDialog, setOpenDialog] = useState(false);
  const { isAuthenticated, user, profile, member } = useAuthStore();

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  if (!isAuthenticated) {
    router.push("/");
    return null;
  }

  // Check if required data is available
  if (!profile || !member || !user) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
        <Typography sx={{ ml: 2 }}>Loading profile data...</Typography>
      </Box>
    );
  }

  const memberProfileData = processMemberProfileData(profile, member, user)();

  function handleEditMember(): void {
    router.push("/member/edit");
  }

  function handleRefresh(): void {
    router.push("/member");
  }

  function handleAddNew(): void {
    setOpenDialog(true);
  }

  const handleContributionAdded = () => {
    notifications.show("New contribution added successfully.", {
      severity: "success",
      autoHideDuration: 3000,
    });
    router.push("/member");
  };

  return (
    <Box sx={{ width: "100%", maxWidth: { sm: "100%", md: "1700px" } }}>
      <Header />
      <PageContainer
        title="My Chama Profile"
        breadcrumbs={[{ title: "My Chama Profile" }]}
        actions={
          <Stack direction="row" alignItems="center" spacing={1}>
            <PageAction
              title="Edit Your Profile"
              onClick={handleEditMember}
              icon={<EditIcon />}
            />
          </Stack>
        }
      />

      {member.id && (
        <MemberView
          {...memberProfileData}
          memberId={member.id}
          onRefresh={handleRefresh}
          onAddNew={handleAddNew}
        />
      )}

      <NewContributionDialog
        open={openDialog}
        members={[]}
        profile={profile}
        member={member}
        onClose={handleCloseDialog}
        onContributionAdded={handleContributionAdded}
      />
      <Copyright sx={{ flex: 1, my: 4 }} />
    </Box>
  );
}
