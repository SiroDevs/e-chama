"use client";

import { useState } from "react";
import { Search } from "@mui/icons-material";
import { Box, Typography, TextField, CircularProgress } from "@mui/material";
import { Alert as MuiAlert, InputAdornment, IconButton } from "@mui/material";

import { joinGroupAction, searchGroupAction } from "@/app/(protected)/actions/GroupAction";
import { GroupExt } from "@/types/types";
import { useAuthStore } from "@/state/auth/auth";
import { JoinGroupItem } from "@/components/actions/JoinGroupItem";
import { useGroupStore } from "@/state/auth/group";

export function JoinGroupSection() {
  const { user } = useAuthStore();
  const { setUserGroups } = useGroupStore();
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
      const result = await joinGroupAction(user!.id, foundGroup);
      if (result.success) {
        await setUserGroups(result.groups!, foundGroup.id || null);
        window.location.reload();
      } else {
        setError(
          result.error?.toString() || "Failed to join group. Please try again."
        );
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
        placeholder="Enter chama code"
        value={joinCode}
        autoComplete="off"
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
                {isSearching ? (
                  <CircularProgress size={20} thickness={5} />
                ) : (
                  <Search />
                )}
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
        <JoinGroupItem
          group={foundGroup}
          isJoining={isJoining}
          onJoinGroup={handleJoinGroup}
        />
      )}
    </Box>
  );
}
