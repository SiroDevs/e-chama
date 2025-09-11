"use client";

import * as React from "react";
import { Box, Button, TextField, Typography, Paper } from "@mui/material";
import { Header, NavbarBreadcrumbs } from "@/components/navigation";
import { Copyright } from "@/components/general";
import { useAuthStore } from "@/state/auth/auth";
import { useRouter, useParams } from "next/navigation";
import { useState, useEffect } from "react";
import PageContainer from "@/components/actions/PageContainer";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SaveIcon from "@mui/icons-material/Save";

export default function EditMemberPage() {
  const { isAuthenticated } = useAuthStore();
  const router = useRouter();
  const params = useParams();
  const memberId = params.id as string;

  const [memberData, setMemberData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    // Add other member fields
  });

  const [loading, setLoading] = useState(false);

  if (!isAuthenticated) {
    window.location.href = "/";
    return null;
  }

  // Fetch member data
  useEffect(() => {
    const fetchMemberData = async () => {
      try {
        setLoading(true);
        // Replace with your actual API call
        // const response = await getMemberById(memberId);
        // setMemberData(response.data);
      } catch (error) {
        console.error("Error fetching member data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (memberId) {
      fetchMemberData();
    }
  }, [memberId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      // Replace with your actual update API call
      // await updateMember(memberId, memberData);
      router.push("/members"); // Redirect back to list after success
    } catch (error) {
      console.error("Error updating member:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <Box sx={{ width: "100%", maxWidth: { sm: "100%", md: "1700px" } }}>
      <Header />
      <Box
        sx={{
          mt: { xs: 4, sm: 0 },
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <PageContainer
          title="Edit Member"
          breadcrumbs={[
            { title: "Members"}, //href: "/members" },
            { title: "Edit Member" },
          ]}
          actions={
            <Button
              variant="outlined"
              startIcon={<ArrowBackIcon />}
              onClick={handleBack}
            >
              Back
            </Button>
          }
        />

        <Paper sx={{ p: 3 }}>
          <form onSubmit={handleSubmit}>
            <Typography variant="h6" gutterBottom>
              Edit Member Information
            </Typography>
            
            <TextField
              fullWidth
              label="First Name"
              value={memberData.first_name}
              onChange={(e) => setMemberData({ ...memberData, first_name: e.target.value })}
              margin="normal"
              required
            />
            
            <TextField
              fullWidth
              label="Last Name"
              value={memberData.last_name}
              onChange={(e) => setMemberData({ ...memberData, last_name: e.target.value })}
              margin="normal"
              required
            />
            
            <TextField
              fullWidth
              label="Email"
              type="email"
              value={memberData.email}
              onChange={(e) => setMemberData({ ...memberData, email: e.target.value })}
              margin="normal"
              required
            />
            
            <TextField
              fullWidth
              label="Phone"
              value={memberData.phone}
              onChange={(e) => setMemberData({ ...memberData, phone: e.target.value })}
              margin="normal"
            />

            <Box sx={{ mt: 3, display: "flex", gap: 2 }}>
              <Button
                type="submit"
                variant="contained"
                startIcon={<SaveIcon />}
                disabled={loading}
              >
                {loading ? "Saving..." : "Save Changes"}
              </Button>
              
              <Button
                variant="outlined"
                onClick={handleBack}
                disabled={loading}
              >
                Cancel
              </Button>
            </Box>
          </form>
        </Paper>
      </Box>
      <Copyright sx={{ flex: 1, my: 4 }} />
    </Box>
  );
}