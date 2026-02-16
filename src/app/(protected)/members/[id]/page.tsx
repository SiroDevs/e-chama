"use client";

import * as React from "react";
import { Tab, Box, Typography, Paper, Chip, Tabs, Stack } from "@mui/material";
import { Badge } from "@mui/icons-material";
import { Header } from "@/components/navigation";
import { Copyright, Loader } from "@/components/general";
import { useAuthStore } from "@/state/auth/auth";
import { useRouter, useParams } from "next/navigation";
import { useState, useEffect } from "react";
import PageContainer from "@/components/actions/PageContainer";
import { Add, Edit } from "@mui/icons-material";
import { getGroupMemberByNo } from "@/services/MemberService";
import { GroupMember } from "@/types/profiles";
import { MemberDetails } from "./details";
import { tabProps, CustomTabPanel } from "@/components/general/CustomTabPanel";
import ContributionList from "../../contributions/records";
import { PageAction } from "@/components/actions/MenuButton";

export default function MemberPage() {
  const { isAuthenticated, member } = useAuthStore();
  const router = useRouter();
  const params = useParams();
  const memberNo = params.id as string;

  const [memberData, setMemberData] = useState<GroupMember | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

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
    router.push(`/members/${memberNo}/edit`);
  };

  const handleNewContribution = () => {
    router.push(`/members/${memberNo}/contributions/new`);
    // Or open a modal, depending on your implementation
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
      color={color || "default"}
      sx={{
        fontWeight: 500,
        fontSize: { xs: "1.5rem", sm: "1.2rem" },
      }}
    />
  );

  // Define actions based on selected tab
  const getActions = () => {
    if (value === 0) {
      // Profile tab - show Edit button
      return (
        <Stack direction="row" alignItems="center" spacing={1}>
          <PageAction
            title="Edit"
            onClick={handleEdit}
            icon={<Edit />}
          />
        </Stack>
      );
    } else {
      // Contributions tab - show New Contribution button
      return (
        <Stack direction="row" alignItems="center" spacing={1}>
          <PageAction
            title="New Contribution"
            onClick={handleNewContribution}
            icon={<Add />}
          />
        </Stack>
      );
    }
  };

  return (
    <Box sx={{ width: "100%", maxWidth: { sm: "100%", md: "1700px" } }}>
      <Header />
      <Box sx={{ mt: 2 }}>
        <PageContainer
          title={pageTitle}
          titleExtra={
            <Box sx={{ display: "flex", gap: 1 }}>
              <Badge sx={{ xs: "small", sm: "small" }} color="action" />
              <StatusChip label={status.label} color={status.color} />
              <Chip
                label={`Member ${memberData?.member_no || "-"}`}
                variant="outlined"
              />
            </Box>
          }
          breadcrumbs={[{ title: "Members" }, { title: "Member" }]}
          actions={getActions()}
        />
        {loading ? (
          <Loader />
        ) : error || !memberData ? (
          <Paper sx={{ p: 3, mt: 1 }}>
            <Typography color="error" align="center">
              {error || "Member not found"}
            </Typography>
          </Paper>
        ) : (
          <Box sx={{ width: "100%", mt: 1 }}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label="basic tabs example"
              >
                <Tab label="Profile" {...tabProps(0)} />
                <Tab label="Contributions" {...tabProps(1)} />
              </Tabs>
            </Box>
            <CustomTabPanel value={value} index={0}>
              <MemberDetails member={memberData} />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
              <ContributionList groupId={member!.group_id!} />
            </CustomTabPanel>
          </Box>
        )}
      </Box>
      <Copyright sx={{ flex: 1, my: 4 }} />
    </Box>
  );
}