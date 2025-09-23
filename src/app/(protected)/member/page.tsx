"use client";

import * as React from "react";
import { Box, Button, Stack } from "@mui/material";
import { Header } from "@/components/navigation";
import { Copyright } from "@/components/general";
import { useAuthStore } from "@/state/auth/auth";
import { useRouter } from "next/navigation";
import { processMemberProfileData } from "../members/arrays";
import PageContainer from "@/components/actions/PageContainer";
import EditIcon from "@mui/icons-material/Edit";
import { MemberView } from "@/components/members/MemberView";
import { PageAction } from "@/components/actions/MenuButton";
import { useState } from "react";
import NewContributionDialog from "@/components/contributions/NewContributionDialog";

export default function MemberPage() {
  const router = useRouter();
  const [openDialog, setOpenDialog] = useState(false);
  const { isAuthenticated, user, profile, member } = useAuthStore();

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  if (!isAuthenticated) {
    router.push("/");
    return null;
  }

  const memberProfileData = processMemberProfileData(profile, member, user)();

  function handleEditMember(): void {
    router.push("/member/edit");
  }
  function handleRefresh(): void {
    router.push("/member/edit");
  }
  function handleAddNew(): void {
    setOpenDialog(true);
  }

  const handleContributionAddedd = () => {
    router.push("/");
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
      <MemberView
        {...memberProfileData}
        memberId={member?.id!}
        onRefresh={handleRefresh}
        onAddNew={handleAddNew}
      />
      <Copyright sx={{ flex: 1, my: 4 }} />
      <NewContributionDialog
        open={openDialog}
        m_name={memberProfileData?.profile?.fullName!}
        m_number={member?.member_no!}
        onClose={handleCloseDialog}
        onContributionAdded={handleContributionAddedd}
      />
    </Box>
  );
}
