import * as React from "react";
import Stack from "@mui/material/Stack";
import { Search } from "@mui/icons-material";
import NotificationsRoundedIcon from "@mui/icons-material/NotificationsRounded";

import ColorModeIconDropdown from "../shared/ColorModeSelect";
import { MenuButton, OptionsMenu } from ".";
import { Avatar, Box, Typography, Skeleton } from "@mui/material";
import { useAuthStore } from "@/state/auth/auth";
import { SelectGroup } from "../general";

export function Header() {
  const { user, profile } = useAuthStore();
  
  return (
    <Stack
      direction="row"
      sx={{
        display: { xs: "none", md: "flex" },
        width: "100%",
        alignItems: { xs: "flex-start", md: "center" },
        justifyContent: "space-between",
        maxWidth: { sm: "100%", md: "1700px" },
        pt: 1.5,
      }}
      spacing={2}
    >
      <SelectGroup />
      <Stack direction="row" sx={{ gap: 1 }}>
        <Search />
        {/* <CustomDatePicker /> */}
        <MenuButton showBadge aria-label="Open notifications">
          <NotificationsRoundedIcon />
        </MenuButton>
        <ColorModeIconDropdown />
        {userMenu()}
      </Stack>
    </Stack>
  );

  function userMenu() {
    const displayName = profile 
      ? `${profile.first_name || ''} ${profile.last_name || ''}`.trim()
      : user?.email?.split('@')[0] || 'User';
    
    const email = user?.email || '';

    return (
      <Stack
        direction="row"
        sx={{
          gap: 1,
          alignItems: "center",
        }}
      >
        <Avatar
          sizes="small"
          alt={displayName}
          src="/static/images/avatar/7.jpg"
          sx={{ width: 36, height: 36 }}
        />
        <Box sx={{ mr: "auto" }}>
          <Typography
            variant="body2"
            sx={{ fontWeight: 500, lineHeight: "16px" }}
          >
            {displayName}
          </Typography>
          <Typography variant="caption" sx={{ color: "text.secondary" }}>
            {email}
          </Typography>
        </Box>
        <OptionsMenu />
      </Stack>
    );
  }
}
