"use client";

import * as React from "react";
import { Box, Stack } from "@mui/material";
import { Header } from "@/components/navigation";
import { Copyright } from "@/components/general";
import { useAuthStore } from "@/state/auth/auth";
import ContributionList from "./records";
import { useRouter } from "next/navigation";
import AddIcon from "@mui/icons-material/Add";
import { PageAction, PageIconButton } from "@/components/actions/MenuButton";
import PageContainer from "@/components/actions/PageContainer";
import useNotifications from "@/hooks/notifications/useNotifications";
import { useEffect, useState } from "react";
import NewContributionDialog from "@/components/contributions/NewContributionDialog";
import { GroupMember } from "@/types/profiles";
import RefreshIcon from "@mui/icons-material/Refresh";
import { getGroupMembers } from "@/services/MemberService";

export default function ContributionsPage() {
  const router = useRouter();
  const notifications = useNotifications();
  const [groupMembers, setGroupMembers] = useState<GroupMember[]>([]);
  const [openDialog, setOpenDialog] = useState(false);
  const { isAuthenticated, member } = useAuthStore();

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
              title="Add a Contribution"
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
        onClose={handleCloseDialog}
        onContributionAdded={handleContributionAdded}
      />
      <Copyright sx={{ flex: 1, my: 4 }} />
    </Box>
  );
}
