import * as React from "react";
import { Avatar, Box, Button, Divider } from "@mui/material";
import { Stack, Typography } from "@mui/material";
import Drawer, { drawerClasses } from "@mui/material/Drawer";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";

import { handleSignOutAction } from "@/app/(protected)/actions/AuthAction";
import { useAuthStore } from "@/state/auth/auth";
import { MenuButton, MenuContent } from ".";
import ColorModeIconDropdown from "../shared/ColorModeSelect";
import { SelectGroup } from "../general";

interface SideMenuMobileProps {
  open: boolean | undefined;
  toggleDrawer: (newOpen: boolean) => () => void;
}

export function SideMenuMobile({ open, toggleDrawer }: SideMenuMobileProps) {
  const { profile, logoutUser } = useAuthStore();

  const handleSignOut = async () => {
    await handleSignOutAction();
    await logoutUser();
    window.location.reload();
  };

  return (
    <Drawer
      anchor="left"
      open={open}
      onClose={toggleDrawer(false)}
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        [`& .${drawerClasses.paper}`]: {
          backgroundImage: "none",
          backgroundColor: "background.paper",
        },
      }}
    >
      <Stack
        sx={{
          maxWidth: "70dvw",
          height: "100%",
        }}
      >
        <Stack direction="row" sx={{ p: 2, pb: 0, gap: 1 }}>
          <Stack
            direction="row"
            sx={{ gap: 1, alignItems: "center", flexGrow: 1, p: 1 }}
          >
            <Avatar
              sizes="small"
              alt={`${profile!.first_name} ${profile!.last_name}`}
              src="/static/images/avatar/7.jpg"
              sx={{ width: 24, height: 24 }}
            />
            <Typography component="p" variant="h6">
              {profile!.first_name} {profile!.last_name}
            </Typography>
          </Stack>
          <MenuButton>
            <ColorModeIconDropdown />
          </MenuButton>
        </Stack>
        <Divider />
        <Stack sx={{ flexGrow: 1 }}>
          <Box
            sx={{
              display: "flex",
              mt: "calc(var(--template-frame-height, 0px) + 4px)",
              p: 1.5,
            }}
          >
            <SelectGroup />
          </Box>
          <Divider />
          <MenuContent />
          <Divider />
        </Stack>
        <Stack sx={{ p: 2 }}>
          <Button
            variant="outlined"
            fullWidth
            onClick={handleSignOut}
            startIcon={<LogoutRoundedIcon />}
          >
            Sign Out
          </Button>
        </Stack>
      </Stack>
    </Drawer>
  );
}
