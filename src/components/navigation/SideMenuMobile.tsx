import * as React from "react";
import { Avatar, Box, Button, Divider } from "@mui/material";
import { Stack, Typography } from "@mui/material";
import Drawer, { drawerClasses } from "@mui/material/Drawer";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";

import { handleSignOutAction } from "@/app/(protected)/actions/AuthAction";
import { useAuthStore } from "@/state/auth/auth";
import ColorModeIconDropdown from "../../theme/ColorModeSelect";
import { MenuButton } from "../actions/MenuButton";
import { SelectGroup } from "../general";
import { MenuContent } from "./MenuContent";
import { SelectRole } from "../actions/SelectRole";
import { useGroupStore } from "@/state/auth/group";
import { AppIcon } from "../general/CustomIcons";

interface SideMenuMobileProps {
  open: boolean | undefined;
  toggleDrawer: (newOpen: boolean) => () => void;
}

export function SideMenuMobile({ open, toggleDrawer }: SideMenuMobileProps) {
  const { profile, logoutUser } = useAuthStore();
  const { currentRole, availableRoles, setCurrentRole } = useGroupStore();

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
          <AppIcon />
          <MenuButton>
            <ColorModeIconDropdown />
          </MenuButton>
        </Stack>
        <Divider />
        <Stack sx={{ flexGrow: 1 }}>
          <Stack sx={{ p: 2 }} spacing={2}>
            <SelectGroup />
            <SelectRole
              currentRole={currentRole}
              availableRoles={availableRoles}
              onRoleChange={setCurrentRole}
            />
          </Stack>
          
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
