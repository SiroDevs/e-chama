"use client";

import * as React from "react";
import { Box, Button, Typography, Paper, Chip } from "@mui/material";
import { Badge } from "@mui/icons-material";
import { Header } from "@/components/navigation";
import { Copyright, Loader } from "@/components/general";
import { useAuthStore } from "@/state/auth/auth";
import { useRouter, useParams } from "next/navigation";
import { useState, useEffect } from "react";
import PageContainer from "@/components/actions/PageContainer";
import EditIcon from "@mui/icons-material/Edit";
import { getGroupMemberByNo } from "@/services/MemberService";
import { GroupMember } from "@/types/profiles";
import { MemberDetails } from "./details";

export default function MemberPage() {
  const { isAuthenticated, member } = useAuthStore();
  const router = useRouter();
  const params = useParams();
  const memberNo = params.id as string;

  const [memberData, setMemberData] = useState<GroupMember | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isAuthenticated) return;

    const fetchMemberData = async () => {
      try {
        setLoading(true);
        const { data, error } = await getGroupMemberByNo(
          memberNo,
          member!.group_id!,
        );

        if (error) {
          setError(error.message);
        } else if (data) {
          setMemberData(data);
        } else {
          setError("Member not found");
        }
      } catch (err) {
        setError("Failed to fetch member data");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (memberNo) {
      fetchMemberData();
    }
  }, [memberNo, isAuthenticated]);

  if (!isAuthenticated) {
    router.push("/");
    return null;
  }

  const handleEdit = () => {
    router.push(`/members/edit/${memberNo}`);
  };

  const pageTitle = loading
    ? "Fetching details"
    : memberData?.full_name || "Unknown Member";

  const getMemberStatus = () => {
    if (memberData?.role?.toLowerCase() === "admin")
      return { label: "Admin", color: "info" as const };
    if (memberData?.role?.toLowerCase() === "manager")
      return { label: "Manager", color: "warning" as const };
    return { label: "Active", color: "success" as const };
  };

  const status = getMemberStatus();

  const StatusChip = ({
    label,
    color,
  }: {
    label: string;
    color?: "success" | "warning" | "error" | "info" | "default";
  }) => (
    <Chip
      label={label}
      size="medium"
      color={color || "default"}
      sx={{ fontWeight: 500 }}
    />
  );

  return (
    <Box sx={{ width: "100%", maxWidth: { sm: "100%", md: "1700px" } }}>
      <Header />
      <Box sx={{ mt: 4 }}>
        <PageContainer
          title={pageTitle}
          titleExtra={
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                justifyContent: "space-between",
                alignItems: { xs: "flex-start", sm: "center" },
                m: 3,
                gap: 2,
              }}
            >
              <Box>
                <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                  <Badge fontSize="medium" color="action" />
                  <StatusChip label={status.label} color={status.color} />
                  <Chip
                      label={`Member ${memberData?.member_no || "-"}`}
                      size="medium"
                      variant="outlined"
                    />
                </Box>
              </Box>
            </Box>
          }
          breadcrumbs={[{ title: "Members" }, { title: "Member Profile" }]}
          actions={
            <Box sx={{ display: "flex", gap: 1 }}>
              <Button
                variant="contained"
                startIcon={<EditIcon />}
                onClick={handleEdit}
              >
                Edit
              </Button>
            </Box>
          }
        />
        {loading ? (
          <Loader />
        ) : error || !memberData ? (
          <Paper sx={{ p: 3, mt: 2 }}>
            <Typography color="error" align="center">
              {error || "Member not found"}
            </Typography>
          </Paper>
        ) : (
          <MemberDetails member={memberData} />
        )}
      </Box>
      <Copyright sx={{ flex: 1, my: 4 }} />
    </Box>
  );
}
