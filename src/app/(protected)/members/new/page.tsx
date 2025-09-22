"use client";

import * as React from "react";
import { Alert, Box, Typography } from "@mui/material";
import { Header, NavbarBreadcrumbs } from "@/components/navigation";
import { Copyright } from "@/components/general";
import useNotifications from "@/hooks/notifications/useNotifications";
import NewMemberForm from "./form";
import { useAuthStore } from "@/state/auth/auth";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { newMemberSchema } from "./arrays";
import { newMemberAction } from "../../actions/MemberAction";
import { PageStatus } from "@/state/status";
import { useState } from "react";

type FormData = z.infer<typeof newMemberSchema>;

export default function NewMemberPage() {
  const router = useRouter();
  const { isAuthenticated, member } = useAuthStore();
  const notifications = useNotifications();
  const [status, setStatus] = useState<PageStatus>("idle");
  const [message, setMessage] = useState("");

  const [loading, setLoading] = React.useState(false);

  if (!isAuthenticated) {
    router.push("/");
    return null;
  }

  const handleSubmit = async (formData: FormData) => {
    setLoading(true);

    try {
      const result = await newMemberAction({
        groupId: member?.group_id!,
        firstName: formData.first_name.trim(),
        lastName: formData.last_name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        idNumber: formData.id_number.trim(),
        sex: formData.sex.trim(),
        memberNo: formData.member_no.trim(),
        role: formData.role.trim(),
        joinedAt: formData.joined_at,
      });

      if (result.success) {
        notifications.show("New Member registered successfully.", {
          severity: "success",
          autoHideDuration: 3000,
        });

        setTimeout(() => {
          router.push("/members");
        }, 1500);
      } else {
        setStatus("error");
        setMessage(result.error!);
      }
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
      <NavbarBreadcrumbs
        items={[
          { label: "Members", href: "/members" },
          { label: "New Member" },
        ]}
      />
      <Box
        sx={{
          height: {
            xs: "100%",
            sm: "calc(100dvh - var(--template-frame-height, 0px))",
          },
          mt: { xs: 4, sm: 0 },
          display: "flex",
          flexDirection: "column",
          gap: 1,
        }}
      >
        <Typography component="h2" variant="h4" sx={{ mb: 1 }}>
          Register a New Member
        </Typography>

        {status === "error" && <Alert severity="error"> {message}</Alert>}

        <NewMemberForm
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          loading={loading}
        />
      </Box>
      <Copyright sx={{ flex: 1, my: 4 }} />
    </Box>
  );
}
