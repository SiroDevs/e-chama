"use client";

import { Group, LocationOn, People } from "@mui/icons-material";
import { Button, Box, Chip, Paper } from "@mui/material";
import { Typography, Avatar, CircularProgress } from "@mui/material";
import { GroupExt } from "@/state/auth/groups";

interface JoinGroupProps {
  group: GroupExt;
  isJoining: boolean;
  onJoinGroup: () => void;
}

const getMemberText = (count: number) => {
  return count === 1 ? `${count} member` : `${count} members`;
};
export const JoinGroup = ({
  group,
  isJoining,
  onJoinGroup,
}: JoinGroupProps) => {
  const getAvatarContent = () => {
    if (group.initials) {
      return group.initials;
    }
    return <Group />;
  };

  return (
    <Paper
      elevation={1}
      sx={{
        width: "100%",
        p: 2.5,
        mb: 2,
        borderRadius: 1,
        border: 1,
        borderColor: "divider",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <Avatar
          sx={{
            width: 50,
            height: 50,
            fontSize: "1rem",
            borderRadius: "50%",
          }}
        >
          {getAvatarContent()}
        </Avatar>

        <Box sx={{ flex: 1 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
            <Typography variant="subtitle1" fontWeight="bold">
              {group.title}
            </Typography>
            {group.initials && (
              <Typography variant="body2" color="text.secondary">
                ({group.initials})
              </Typography>
            )}
          </Box>

          <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
            {group.location && (
              <Chip
                icon={<LocationOn sx={{ fontSize: 16 }} />}
                label={group.location}
                size="small"
                variant="outlined"
                sx={{ borderRadius: 6, fontSize: "0.75rem" }}
              />
            )}
            <Chip
              icon={<People sx={{ fontSize: 16 }} />}
              label={getMemberText(group.member_count)}
              size="medium"
              variant="outlined"
              sx={{ borderRadius: 6, fontSize: "0.75rem" }}
            />
          </Box>
        </Box>
        <Button
          variant="contained"
          onClick={onJoinGroup}
          disabled={isJoining}
          size="medium"
          sx={{ minWidth: 100, px: 2 }}
        >
          {isJoining ? <CircularProgress size={20} /> : "Join"}
        </Button>
      </Box>
      {group.description && (
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            mt: 2,
            p: 1.5,
            bgcolor: "action.hover",
            borderRadius: 2,
            fontSize: "0.875rem",
          }}
        >
          {group.description}
        </Typography>
      )}
    </Paper>
  );
};
