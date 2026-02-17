"use client";

import * as React from "react";
import { Box, Typography, Paper, Grid, Divider } from "@mui/material";
import { GroupMember } from "@/data/types/profiles";
import { Email, Phone, Badge } from "@mui/icons-material";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PersonIcon from "@mui/icons-material/Person";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";

interface DetailItemProps {
  label: string;
  value: string | null;
  icon?: React.ReactNode;
}

const DetailItem = ({ label, value, icon }: DetailItemProps) => (
  <Box
    sx={{
      display: "flex",
      flexDirection: "row",
      p: 0.5,
      transition: "all 0.2s",
      "&:hover": {
        borderColor: "primary.main",
        boxShadow: 1,
      },
    }}
  >
    <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
      {icon && (
        <Box
          sx={{
            color: "text.secondary",
            display: "flex",
            alignItems: "center",
          }}
        >
          {icon}
        </Box>
      )}
      <Typography
        variant="caption"
        color="text.secondary"
        sx={{ textTransform: "uppercase", letterSpacing: 0.5 }}
      >
        {label}:
      </Typography>
    </Box>
    <Typography
      variant="body2"
      sx={{ fontWeight: 500, wordBreak: "break-word", ml: 1 }}
    >
      {value || "-"}
    </Typography>
  </Box>
);

const SectionHeader = ({
  title,
  icon,
}: {
  title: string;
  icon?: React.ReactNode;
}) => (
  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
    {icon && <Box sx={{ color: "primary.main" }}>{icon}</Box>}
    <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
      {title}
    </Typography>
    <Divider sx={{ flex: 1 }} />
  </Box>
);

export const MemberDetails = ({ member }: { member: GroupMember }) => {
  const formatDate = (date: string | null) => {
    if (!date) return "-";
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <Paper sx={{ p: { xs: 2, sm: 3 }}}>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 8 }}>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12 }}>
              <SectionHeader
                title="Personal Information"
                icon={<PersonIcon />}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 6 }}>
              <DetailItem
                label="Sex"
                value={member.sex}
                icon={<PersonIcon fontSize="small" />}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 6 }}>
              <DetailItem
                label="Date of Birth"
                value={formatDate(member.dob)}
                icon={<CalendarTodayIcon fontSize="small" />}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 6 }}>
              <DetailItem
                label="ID Number"
                value={member.id_number}
                icon={<AssignmentIndIcon fontSize="small" />}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 6 }}>
              <DetailItem
                label="KRA PIN"
                value={member.kra_pin}
                icon={<AssignmentIndIcon fontSize="small" />}
              />
            </Grid>

            <Grid size={{ xs: 12 }}>
              <SectionHeader title="Contact Information" icon={<Email />} />
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 6 }}>
              <DetailItem
                label="Phone"
                value={member.phone}
                icon={<Phone fontSize="small" />}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 6 }}>
              <DetailItem
                label="Email"
                value={member.email}
                icon={<Email fontSize="small" />}
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <DetailItem
                label="Address"
                value={`${member.address}, ${member.country}`}
                icon={<LocationOnIcon fontSize="small" />}
              />
            </Grid>
          </Grid>
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12 }}>
              <SectionHeader title="Membership Details" icon={<Badge />} />
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 12 }}>
              <DetailItem
                label="Role"
                value={member.role}
                icon={<PersonIcon fontSize="small" />}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 12 }}>
              <DetailItem
                label="Joined Date"
                value={formatDate(member.joined_at)}
                icon={<CalendarTodayIcon fontSize="small" />}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 12 }}>
              <DetailItem
                label="Created At"
                value={formatDate(member.created_at)}
                icon={<CalendarTodayIcon fontSize="small" />}
              />
            </Grid>
            {member.updated_at && (
              <Grid size={{ xs: 12, sm: 6, md: 12 }}>
                <Typography variant="caption" color="text.secondary">
                  Last updated: {formatDate(member.updated_at)}
                </Typography>
              </Grid>
            )}
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};
