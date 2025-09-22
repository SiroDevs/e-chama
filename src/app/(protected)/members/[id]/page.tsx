"use client";

import * as React from "react";
import { Box, Button, Typography, Paper } from "@mui/material";
import { Header, NavbarBreadcrumbs } from "@/components/navigation";
import { Copyright } from "@/components/general";
import { useAuthStore } from "@/state/auth/auth";
import { useRouter, useParams } from "next/navigation";
import { useState, useEffect } from "react";
import PageContainer from "@/components/actions/PageContainer";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import EditIcon from "@mui/icons-material/Edit";

export default function ViewMemberPage() {
  const { isAuthenticated } = useAuthStore();
  const router = useRouter();
  const params = useParams();
  const memberId = params.id as string;

  const [memberData, setMemberData] = useState(null);
  const [loading, setLoading] = useState(true);

  if (!isAuthenticated) {
    router.push("/");
    return null;
  }

  useEffect(() => {
    // Fetch member data here
  }, [memberId]);

  const handleEdit = () => {
    router.push(`/members/edit/${memberId}`);
  };

  const handleBack = () => {
    router.back();
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Box sx={{ width: "100%", maxWidth: { sm: "100%", md: "1700px" } }}>
      <Header />
      <Box sx={{ mt: 4 }}>
        <PageContainer
          title="Member Details"
          breadcrumbs={[
            { title: "Members"},
            { title: "Member Details" },
          ]}
          actions={
            <Box sx={{ display: "flex", gap: 1 }}>
              <Button
                variant="contained"
                startIcon={<EditIcon />}
                onClick={handleEdit}
              >
                Edit
              </Button>
              <Button
                variant="outlined"
                startIcon={<ArrowBackIcon />}
                onClick={handleBack}
              >
                Back
              </Button>
            </Box>
          }
        />

        <Paper sx={{ p: 3, mt: 2 }}>
          <Typography variant="h6" gutterBottom>
            Member Information
          </Typography>
          {/* Display member details here */}
        </Paper>
      </Box>
      <Copyright sx={{ flex: 1, my: 4 }} />
    </Box>
  );
}