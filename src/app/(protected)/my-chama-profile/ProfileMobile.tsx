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
import { DetailItem, ProfileSkeleton } from "./ProfileSkeleton";
import { MemberProfileProps } from "@/types/profiles";
import ViewMore from "@/components/actions/ViewMore";

export default function MemberProfileSmall({
  loading,
  profile,
  member,
  user,
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
        <Grid size={5}>
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="flex-start"
            textAlign="left"
          >
            {profile.avatar ? (
              <Avatar
                src={profile.avatar}
                alt={profile.fullName}
                sx={{
                  width: 75,
                  height: 75,
                  fontSize: "2.5rem",
                }}
              />
            ) : (
              <Avatar
                sx={{
                  width: 75,
                  height: 75,
                  fontSize: "2.5rem",
                }}
              >
                {profile.initials}
              </Avatar>
            )}

            <Chip
              icon={<BadgeIcon />}
              label={member.role}
              variant="outlined"
              color="primary"
              size="small"
              sx={{
                p: 1,
                mt: 1,
              }}
            />
          </Box>
        </Grid>

        <Grid size={7}>
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="flex-start"
            textAlign="left"
          >
            <Typography variant="h6" component="h4">
              {profile.fullName}
            </Typography>
            <Typography gutterBottom>M. No.: {member.memberNo}</Typography>

            <Typography variant="body1" color="text.secondary">
              Joined: {member.formattedJoinedAt}
            </Typography>

            <Grid size={12}>
              <Box
                display="flex"
                justifyContent="flex-end"
                alignItems="flex-end"
                sx={{ height: "100%" }}
              >
                <ViewMore />
              </Box>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
