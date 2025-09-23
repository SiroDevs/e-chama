"use client";

import * as React from "react";
import { Autocomplete, FormControl, FormLabel, InputAdornment, OutlinedInput, Stack, TextField } from "@mui/material";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import { GroupMember } from "@/types/profiles";

export function Search() {
  return (
    <FormControl sx={{ width: { xs: "100%", md: "25ch" } }} variant="outlined">
      <OutlinedInput
        size="small"
        id="search"
        placeholder="Search…"
        sx={{ flexGrow: 1 }}
        startAdornment={
          <InputAdornment position="start" sx={{ color: "text.primary" }}>
            <SearchRoundedIcon fontSize="small" />
          </InputAdornment>
        }
        inputProps={{
          "aria-label": "search",
        }}
      />
    </FormControl>
  );
}

interface MemberSearchProps {
  members: GroupMember[];
  selectedMember: GroupMember | null;
  onMemberSelect: (event: any, value: string | null) => void;
}

export function MemberSearch({
  members,
  selectedMember,
  onMemberSelect,
}: MemberSearchProps) {
  return (
    <Stack spacing={2}>
      <FormLabel>Selected Member</FormLabel>
      <Autocomplete
        // freeSolo
        id="member-search"
        options={members.map((member) => member.full_name)}
        onChange={onMemberSelect}
        value={selectedMember?.full_name || ""}
        renderInput={(params) => (
          <TextField
            {...params}
            placeholder="Search for a member"
            slotProps={{
              input: {
                ...params.InputProps,
                type: "search",
              },
            }}
          />
        )}
      />
    </Stack>
  );
}