import React, { useState, useEffect } from "react";
import { Avatar, Box, Container, Paper } from "@mui/material";
import { Typography, Grid, Card, CardContent } from "@mui/material";
import { Divider, Chip, useTheme } from "@mui/material";
import {
  Person as PersonIcon,
  LocationOn as LocationIcon,
  CalendarToday as CalendarIcon,
  Fingerprint as IdIcon,
  Badge as BadgeIcon,
  Group as GroupIcon,
} from "@mui/icons-material";
import { useAuthStore } from "@/state/auth/auth";
import { ProfileSkeleton, DetailItem } from "./ProfileSkeleton";

export default function MemberProfile() {
  const { profile, member } = useAuthStore();
  const theme = useTheme();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (profile && member) {
      setLoading(false);
    }
  }, [profile, member]);

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "Not specified";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getInitials = (firstName: string | null, lastName: string | null) => {
    const first = firstName?.[0] || "";
    const last = lastName?.[0] || "";
    return `${first}${last}`.toUpperCase();
  };

  if (loading) {
    return <ProfileSkeleton />;
  }

  if (!profile || !member) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography variant="h6" color="error" align="center">
          Profile data not available
        </Typography>
      </Container>
    );
  }

  const fullName =
    `${profile.first_name || ""} ${profile.last_name || ""}`.trim() ||
    "Unknown Member";

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Paper elevation={2} sx={{ p: 4, borderRadius: 2 }}>
        <Grid container spacing={4} alignItems="center">
          <Grid size={3}>
            <Box display="flex" justifyContent="center">
              {profile.avatar ? (
                <Avatar
                  src={profile.avatar}
                  alt={fullName}
                  sx={{
                    width: 120,
                    height: 120,
                    fontSize: "2.5rem",
                    bgcolor: theme.palette.primary.main,
                  }}
                />
              ) : (
                <Avatar
                  sx={{
                    width: 120,
                    height: 120,
                    fontSize: "2.5rem",
                    bgcolor: theme.palette.primary.main,
                  }}
                >
                  {getInitials(profile.first_name, profile.last_name)}
                </Avatar>
              )}
            </Box>
          </Grid>

          <Grid size={9}>
            <Box>
              <Typography variant="h4" component="h1" gutterBottom>
                {fullName}
              </Typography>

              <Box display="flex" flexWrap="wrap" gap={1} mb={2}>
                <Chip
                  icon={<BadgeIcon />}
                  label={`Role: ${member.role || "Member"}`}
                  variant="outlined"
                  color="primary"
                  size="small"
                />
                <Chip
                  icon={<GroupIcon />}
                  label={`ID: ${member.member_no || "Not assigned"}`}
                  variant="outlined"
                  size="small"
                />
              </Box>

              <Typography variant="body1" color="text.secondary">
                Joined: {formatDate(member.joined_at)}
              </Typography>
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ my: 4 }} />

        <Grid container spacing={3}>
          <Grid size={6}>
            <Card variant="outlined">
              <CardContent>
                <Typography
                  variant="h6"
                  gutterBottom
                  sx={{ display: "flex", alignItems: "center", gap: 1 }}
                >
                  <PersonIcon color="primary" />
                  Personal Information
                </Typography>

                <Box sx={{ mt: 2 }}>
                  <DetailItem
                    label="Date of Birth"
                    value={formatDate(profile.dob)}
                    icon={<CalendarIcon />}
                  />
                  <DetailItem
                    label="Gender"
                    value={profile.sex || "Not specified"}
                    icon={<PersonIcon />}
                  />
                  <DetailItem
                    label="ID Number"
                    value={profile.id_number || "Not provided"}
                    icon={<IdIcon />}
                  />
                  <DetailItem
                    label="KRA Pin"
                    value={profile.kra_pin || "Not provided"}
                    icon={<IdIcon />}
                  />
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid size={6}>
            <Card variant="outlined">
              <CardContent>
                <Typography
                  variant="h6"
                  gutterBottom
                  sx={{ display: "flex", alignItems: "center", gap: 1 }}
                >
                  <LocationIcon color="primary" />
                  Contact Information
                </Typography>

                <Box sx={{ mt: 2 }}>
                  <DetailItem
                    label="Country"
                    value={profile.country || "Not specified"}
                    icon={<LocationIcon />}
                  />
                  <DetailItem
                    label="Address"
                    value={profile.address || "Not provided"}
                    icon={<LocationIcon />}
                    multiline
                  />
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}
