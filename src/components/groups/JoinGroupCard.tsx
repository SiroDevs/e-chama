"use client";

import { useState } from "react";
import { ExitToApp, GroupAdd } from "@mui/icons-material";
import { Box, Container, Divider, Paper, Typography } from "@mui/material";
import { Button, Alert, CssBaseline } from "@mui/material";

import { useAuthStore } from "@/state/auth/auth";
import AppTheme from "@/components/shared/AppTheme";
import { AppIcon } from "@/components/general/CustomIcons";
import NewGroupDialog from "@/components/groups/NewGroupDialog";
import { handleSignOutAction } from "../../app/(protected)/actions/AuthAction";
import { JoinGroupSection } from "./JoinGroupSection";

interface JoinGroupCardProps {
  hasGroups?: boolean;
}

export function JoinGroupCard({ hasGroups = true }: JoinGroupCardProps) {
  const { profile, logoutUser } = useAuthStore();
  const [openDialog, setOpenDialog] = useState(false);

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleGroupCreated = () => {
    window.location.reload();
  };

  const handleSignOut = async () => {
    await handleSignOutAction();
    await logoutUser();
    window.location.reload();
  };

  return (
    <Container component="main" maxWidth="sm">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {!hasGroups && (
          <Box sx={{ margin: 3 }}>
            <AppIcon />
          </Box>
        )}
        <Paper
          elevation={3}
          sx={{
            p: { xs: 3, sm: 5 },
            width: "100%",
            textAlign: "center",
          }}
        >
          {!hasGroups && (
            <>
              <Typography variant="h5" component="h1" gutterBottom>
                ⚠️ You aren&apos;t in any Chama
              </Typography>
              <Alert severity="error" sx={{ my: 2 }}>
                Hey, {profile!.first_name} this screen will go away, as soon as
                you become a member of a chama.
              </Alert>
              <Divider />
            </>
          )}

          <JoinGroupSection />
          <Divider />
          <Typography variant="body2" sx={{ mb: 3 }}>
            Create a new one or request an official of your Chama to add you.
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              gap: 2,
              width: "100%",
            }}
          >
            <Button
              fullWidth
              variant="contained"
              size="large"
              startIcon={<GroupAdd />}
              onClick={handleOpenDialog}
              sx={{
                py: 2,
                order: { xs: 1, sm: 1 },
              }}
            >
              Create a Chama
            </Button>
            {!hasGroups && (
              <Button
                fullWidth
                variant="outlined"
                size="large"
                startIcon={<ExitToApp />}
                onClick={handleSignOut}
                sx={{
                  py: 2,
                  order: { xs: 2, sm: 2 },
                }}
              >
                Sign Out
              </Button>
            )}
          </Box>
        </Paper>
        <NewGroupDialog
          open={openDialog}
          onClose={handleCloseDialog}
          onGroupCreated={handleGroupCreated}
        />
      </Box>
    </Container>
  );
}
