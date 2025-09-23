"use client";

import * as React from "react";
import { Box, Grid, Stack, Typography } from "@mui/material";
import { Header, NavbarBreadcrumbs } from "@/components/navigation";
import { Copyright } from "@/components/general";
import { useAuthStore } from "@/state/auth/auth";
import Contributions from "./records";
import { useRouter } from "next/navigation";
import AddIcon from "@mui/icons-material/Add";
import { PageAction } from "@/components/actions/MenuButton";
import PageContainer from "@/components/actions/PageContainer";
import useNotifications from "@/hooks/notifications/useNotifications";
import { useState } from "react";
import NewContributionDialog from "@/components/contributions/NewContributionDialog";

export default function Dashboard() {
  const router = useRouter();
  const notifications = useNotifications();
  const [openDialog, setOpenDialog] = useState(false);
  const { isAuthenticated, member } = useAuthStore();

  if (!isAuthenticated) {
    router.push("/");
    return null;
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
    router.push("/member");
  };

  return (
    <Box sx={{ width: "100%", maxWidth: { sm: "100%", md: "1700px" } }}>
      <Header />
      <PageContainer
        title="Contributions"
        breadcrumbs={[{ title: "Contributions" }]}
        actions={
          <Stack direction="row" alignItems="center" spacing={1}>
            <PageAction
              title="Add a Contribution"
              onClick={handleAddNew}
              icon={<AddIcon />}
            />
          </Stack>
        }
      />
      <Contributions groupId={member!.group_id!} />
      <NewContributionDialog
        open={openDialog}
        name=""
        member={member!}
        onClose={handleCloseDialog}
        onContributionAdded={handleContributionAdded}
      />
      <Copyright sx={{ flex: 1, my: 4 }} />
    </Box>
  );
}
