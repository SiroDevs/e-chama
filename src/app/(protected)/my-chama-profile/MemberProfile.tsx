import React, { useState, useEffect } from "react";
import { Avatar, Box, Container, Chip, useTheme } from "@mui/material";
import { Typography, Grid, Card, CardContent } from "@mui/material";
import {
  Person as PersonIcon,
  LocationOn as LocationIcon,
  CalendarToday as CalendarIcon,
  Fingerprint as IdIcon,
  Badge as BadgeIcon,
  Group as GroupIcon,
  Info as InfoIcon,
} from "@mui/icons-material";
import { useAuthStore } from "@/state/auth/auth";
import { ProfileSkeleton, DetailItem } from "./ProfileSkeleton";

export default function MemberProfile() {
  const { user, profile, member } = useAuthStore();
  const theme = useTheme();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (profile && member) {
      setLoading(false);
    }
  }, [profile, member]);

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "Not set";
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
    <Box sx={{ pr: 2 }}>
      <Grid container alignItems="center">
        <Grid size={12}>
          <Box display="flex" justifyContent="center">
            {profile.avatar ? (
              <Avatar
                src={profile.avatar}
                alt={fullName}
                sx={{
                  width: 100,
                  height: 100,
                  fontSize: "2.5rem",
                }}
              />
            ) : (
              <Avatar
                sx={{
                  width: 100,
                  height: 100,
                  fontSize: "2.5rem",
                }}
              >
                {getInitials(profile.first_name, profile.last_name)}
              </Avatar>
            )}
          </Box>
        </Grid>

        <Grid size={12} sx={{ pb: 1 }}>
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            textAlign="center"
          >
            <Typography variant="h4" component="h1">
              {fullName}
            </Typography>
            <Typography gutterBottom>
              Member No.: {`${member.member_no || "Not assigned"}`}
            </Typography>

            <Chip
              icon={<BadgeIcon />}
              label={`Chama ${member.role || "Member"}`}
              variant="outlined"
              color="primary"
              size="small"
            />

            <Typography variant="body1" color="text.secondary">
              Joined: {formatDate(member.joined_at)}
            </Typography>
          </Box>
        </Grid>
      </Grid>

      <Grid container spacing={2}>
        <Grid size={12}>
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
                {/* <DetailItem
                  label="ID Number"
                  value={profile.id_number || "Not provided"}
                  icon={<IdIcon />}
                /> */}
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={12}>
          <Card variant="outlined">
            <CardContent>
              <Typography
                variant="h6"
                gutterBottom
                sx={{ display: "flex", alignItems: "center", gap: 1 }}
              >
                <InfoIcon color="primary" />
                Contact Information
              </Typography>

              <Box sx={{ mt: 2 }}>
                <DetailItem
                  label="Phone"
                  value={user?.phone || "Not specified"}
                  icon={<PersonIcon />}
                />
                <DetailItem
                  label="Location"
                  value={
                    `${profile.country || ""} ${
                      profile.address || ""
                    }`.trim() || "Not specified"
                  }
                  icon={<LocationIcon />}
                  multiline
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
