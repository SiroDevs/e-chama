import * as React from "react";
import { Link, List, ListItem, ListItemButton } from "@mui/material";
import { ListItemIcon, ListItemText, Stack } from "@mui/material";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import InfoRoundedIcon from "@mui/icons-material/InfoRounded";
import HelpRoundedIcon from "@mui/icons-material/HelpRounded";
import { useGroupStore } from "@/state/auth/group";
import { useState } from "react";
import { hasRole } from "@/types/roles";
import { MenuItem, allRoles, mainMenuItems } from "@/utils/MenuItems";

const secondaryListItems: MenuItem[] = [
  { text: "Settings", icon: <SettingsRoundedIcon />, roles: allRoles },
  { text: "About", icon: <InfoRoundedIcon />, roles: allRoles },
  { text: "Feedback", icon: <HelpRoundedIcon />, roles: allRoles },
];

export function MenuContent() {
  const { currentRole } = useGroupStore();
  const filteredMainMenuItems = mainMenuItems.filter((item) =>
    hasRole(item.roles, currentRole)
  );

  return (
    <Stack sx={{ flexGrow: 1, p: 1, justifyContent: "space-between" }}>
      <List dense>
        {filteredMainMenuItems.map((item, index) =>
          MenuContentItem(item, index)
        )}
      </List>
      <List dense>
        {secondaryListItems.map((item, index) => MenuContentItem(item, index))}
      </List>
    </Stack>
  );
}

export function MenuContentItem(item: MenuItem, index: number) {
  const isActivePath = (path: string) => {
    return (
      location.pathname === path || location.pathname.startsWith(path + "/")
    );
  };

  const handleClick = () => {
    window.location.href = item.path!;
  };

  return (
    <ListItem
      key={index}
      disablePadding
      sx={{ p: .2, display: "block" }}
      onClick={handleClick}
    >
      <ListItemButton selected={isActivePath(item.path!)}>
        <ListItemIcon>{item.icon}</ListItemIcon>
        <ListItemText primary={item.text} />
      </ListItemButton>
    </ListItem>
  );
}
