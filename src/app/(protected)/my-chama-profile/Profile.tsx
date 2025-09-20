import React from "react";
import { Avatar, Box, Container, Chip } from "@mui/material";
import { Typography, Grid, Card, CardContent } from "@mui/material";
import {
  Person as PersonIcon,
  LocationOn as LocationIcon,
  CalendarToday as CalendarIcon,
  Badge as BadgeIcon,
  Info as InfoIcon,
} from "@mui/icons-material";
import { ProfileSkeleton, DetailItem } from "./ProfileSkeleton";
import { MemberProfileProps } from "@/types/profiles";

export default function MemberProfile({
  loading,
  profile,
  member,
  user
}: MemberProfileProps) {
  if (loading) {
    return <ProfileSkeleton />;
  }

  if (!profile || !member || !user) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography variant="h6" color="error" align="center">
          Profile data not available
        </Typography>
      </Container>
    );
  }

  return (
    <Box sx={{ pr: 2 }}>
      <Grid container alignItems="center">
        <Grid size={12}>
          <Box display="flex" justifyContent="center">
            {profile.avatar ? (
              <Avatar
                src={profile.avatar}
                alt={profile.fullName}
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
                {profile.initials}
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
              {profile.fullName}
            </Typography>
            <Typography gutterBottom>
              Member No.: {member.memberNo}
            </Typography>

            <Chip
              icon={<BadgeIcon />}
              label={`Chama ${member.role}`}
              variant="outlined"
              color="primary"
              size="small"
            />

            <Typography variant="body1" color="text.secondary">
              Joined: {member.formattedJoinedAt}
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
                  value={profile.formattedDob}
                  icon={<CalendarIcon />}
                />
                <DetailItem
                  label="Gender"
                  value={profile.sex || "Not specified"}
                  icon={<PersonIcon />}
                />
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
                  value={user.phone!}
                  icon={<PersonIcon />}
                />
                <DetailItem
                  label="Location"
                  value={profile.location}
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