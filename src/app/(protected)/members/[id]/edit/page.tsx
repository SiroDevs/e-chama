"use client";

import * as React from "react";
import { Box, Button, Paper, Typography } from "@mui/material";
import { Header } from "@/presentation/components/navigation";
import { Copyright, Loader } from "@/presentation/components/general";
import { useAuthStore } from "@/infrastucture/state/auth/auth";
import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import PageContainer from "@/presentation/components/actions/PageContainer";
import { getGroupMemberByNo } from "@/infrastucture/services/MemberService";
import { GroupMember } from "@/data/types/profiles";
import EditMemberForm from "./form";
import useNotifications from "@/presentation/hooks/notifications/useNotifications";
import { PageStatus } from "@/infrastucture/state/PageStatus";
import { editMemberSchema } from "./arrays";
import z from "zod";

type FormData = z.infer<typeof editMemberSchema>;

export default function EditMemberPage() {
  const { isAuthenticated, member } = useAuthStore();
  const router = useRouter();
  const params = useParams();
  const memberNo = params.id as string;

  const [memberData, setMemberData] = useState<GroupMember | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const notifications = useNotifications();
  const [status, setStatus] = useState<PageStatus>("idle");
  const [message, setMessage] = useState("");

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

  const pageTitle = loading
    ? "Fetching details"
    : memberData?.full_name || "Unknown Member";

  const handleSubmit = async (formData: FormData) => {
    setLoading(true);

    try {
      // const result = await newMemberAction({
      //   email: formData.email.trim(),
      //   phone: formData.phone.trim(),
      //   profile: {
      //     first_name: formData.first_name.trim(),
      //     last_name: formData.last_name.trim(),
      //     sex: formData.sex.trim(),
      //     id_number: formData.id_number.trim(),
      //   },
      //   member: {
      //     group_id: member?.group_id,
      //     member_no: formData.member_no.trim(),
      //     role: formData.role.trim(),
      //   },
      // });
      // if (result.success) {
      //   notifications.show("Member's details updated successfully.", {
      //     severity: "success",
      //     autoHideDuration: 3000,
      //   });
      //   setTimeout(() => {
      //     router.push("/members");
      //   }, 1500);
      // } else {
      //   setStatus("error");
      //   setMessage(result.error!);
      // }
    } catch (err: any) {
      notifications.show(`Failed to create member: ${err.message}`, {
        severity: "error",
        autoHideDuration: 5000,
      });
      setStatus("error");
      setMessage(`Failed to create member: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    router.push("/members");
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
          title="Edit Member Information"
          breadcrumbs={[
            { title: "Members" },
            { title: pageTitle },
            { title: "Edit Details" },
          ]}
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
          <EditMemberForm
            member={memberData}
            onSubmit={handleSubmit}
            onCancel={handleCancel}
            loading={loading}
          />
        )}
      </Box>
      <Copyright sx={{ flex: 1, my: 4 }} />
    </Box>
  );
}
