"use client";

import { useState } from "react";
import { Search, Group } from "@mui/icons-material";
import { Chip, Button, Box, Typography, TextField } from "@mui/material";
import { Alert as MuiAlert, InputAdornment, IconButton } from "@mui/material";
import { List, ListItem, ListItemText, ListItemIcon } from "@mui/material";

import { joinGroupAction, searchGroupAction } from "../actions/GroupAction";
import { GroupExt } from "@/state/auth/groups";

export const JoinGroupSection = () => {
  const [joinCode, setJoinCode] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [foundGroup, setFoundGroup] = useState<GroupExt | null>(null);
  const [isJoining, setIsJoining] = useState(false);
  const [error, setError] = useState("");

  const handleJoinCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setJoinCode(e.target.value.toUpperCase());
    if (foundGroup) setFoundGroup(null);
    if (error) setError("");
  };

  const handleSearchGroup = async () => {
    setIsSearching(true);
    setError("");

    try {
      const result = await searchGroupAction(joinCode);
      if (result.success && result.group) {
        setFoundGroup(result.group);
      } else {
        setError(result.error || "No group found");
        setFoundGroup(null);
      }
    } catch (err) {
      setError("Failed to search for group. Please try again.");
      console.error("Search error:", err);
    } finally {
      setIsSearching(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearchGroup();
    }
  };

  const handleJoinGroup = async () => {
    if (!foundGroup) return;

    setIsJoining(true);
    setError("");

    try {
      const result = await joinGroupAction(foundGroup.id);
      if (result.success) {
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      } else {
        setError(result.error || "Failed to join group. Please try again.");
      }
    } catch (err) {
      setError("Failed to join group. Please try again.");
      console.error("Join error:", err);
    } finally {
      setIsJoining(false);
    }
  };

  return (
    <Box sx={{ mb: 3 }}>
      <Typography variant="h6" sx={{ mb: 2, textAlign: "left" }}>
        Join a Chama with a code
      </Typography>
      <TextField
        fullWidth
        placeholder="Enter group code"
        value={joinCode}
        onChange={handleJoinCodeChange}
        onKeyPress={handleKeyPress}
        disabled={isSearching || isJoining}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                onClick={handleSearchGroup}
                disabled={isSearching || !joinCode.trim()}
                edge="end"
              >
                <Search />
              </IconButton>
            </InputAdornment>
          ),
        }}
        sx={{ mb: 2 }}
      />

      {error && (
        <MuiAlert severity="error" sx={{ mb: 2 }}>
          {error}
        </MuiAlert>
      )}

      {foundGroup && (
        <List sx={{ width: "100%", bgcolor: "background.paper", mb: 2 }}>
          <ListItem
            alignItems="flex-start"
            secondaryAction={
              <Button
                variant="contained"
                onClick={handleJoinGroup}
                disabled={isJoining}
              >
                {isJoining ? "Joining..." : "Join"}
              </Button>
            }
          >
            <ListItemIcon>
              <Group />
            </ListItemIcon>
            <ListItemText
              primary={foundGroup.title}
              secondary={
                <Box sx={{ mt: 1 }}>
                  <Chip
                    label={`${foundGroup.member_count} members`}
                    size="small"
                    variant="outlined"
                    sx={{ mr: 1 }}
                  />
                  <Chip
                    label={`Code: ${joinCode}`}
                    size="small"
                    variant="outlined"
                    color="primary"
                  />
                </Box>
              }
            />
          </ListItem>
        </List>
      )}
    </Box>
  );
};
