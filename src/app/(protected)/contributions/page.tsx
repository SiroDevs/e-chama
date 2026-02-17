"use client";

import * as React from "react";
import { Box, Stack } from "@mui/material";
import { Header } from "@/presentation/components/navigation";
import { Copyright } from "@/presentation/components/general";
import { useAuthStore } from "@/infrastucture/state/auth/auth";
import ContributionList from "./records";
import { useRouter } from "next/navigation";
import AddIcon from "@mui/icons-material/Add";
import { PageAction, PageIconButton } from "@/presentation/components/actions/MenuButton";
import PageContainer from "@/presentation/components/actions/PageContainer";
import useNotifications from "@/presentation/hooks/notifications/useNotifications";
import { useEffect, useState } from "react";
import NewContributionDialog from "@/presentation/components/contributions/NewContributionDialog";
import { GroupMember } from "@/data/types/profiles";
import RefreshIcon from "@mui/icons-material/Refresh";
import { getGroupMembers } from "@/infrastucture/services/MemberService";

export default function ContributionsPage() {
  const router = useRouter();
  const notifications = useNotifications();
  const [groupMembers, setGroupMembers] = useState<GroupMember[]>([]);
  const [openDialog, setOpenDialog] = useState(false);
  const { isAuthenticated, profile, member } = useAuthStore();

  useEffect(() => {
    const fetchGroupMembers = async () => {
      if (!member?.group_id) return;

      try {
        const result = await getGroupMembers({
          page: 0,
          pageSize: 100,
          groupId: member.group_id,
        });

        if (result.error) {
          console.error("Error fetching group members:", result.error);
          return;
        }

        setGroupMembers(result.data || []);
      } catch (error) {
        console.error("Error fetching group members:", error);
      } finally {
      }
    };

    fetchGroupMembers();
  }, [member?.group_id]);

  if (!isAuthenticated) {
    router.push("/");
    return null;
  }

  function handleRefresh(): void {
    router.push("/contributions");
  }

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  function handleAddNew(): void {
    setOpenDialog(true);
  }

  const handleContributionAdded = () => {
    notifications.show("New contribution added successfully.", {
      severity: "success",
      autoHideDuration: 3000,
    });
    router.push("/contributions");
  };

  return (
    <Box sx={{ width: "100%", maxWidth: { sm: "100%", md: "1700px" } }}>
      <Header />
      <PageContainer
        title="Contributions"
        breadcrumbs={[{ title: "Contributions" }]}
        actions={
          <Stack direction="row" alignItems="center" spacing={1}>
            <PageIconButton
              title="Reload data"
              onClick={handleRefresh}
              icon={<RefreshIcon />}
            />
            <PageAction
              title="New Contribution"
              onClick={handleAddNew}
              icon={<AddIcon />}
            />
          </Stack>
        }
      />
      <ContributionList groupId={member!.group_id!} />
      <NewContributionDialog
        open={openDialog}
        members={groupMembers}
        profile={profile!}
        member={member!}
        onClose={handleCloseDialog}
        onContributionAdded={handleContributionAdded}
      />
      <Copyright sx={{ flex: 1, my: 4 }} />
    </Box>
  );
}
