"use client";

import { useState } from "react";
import { Menu, MenuItem, Button } from "@mui/material";
import { ListItemIcon, ListItemText } from "@mui/material";
import { Group, ArrowDropDown } from "@mui/icons-material";
import { useAuthStore } from "@/state/auth/auth";

export function GroupSelector() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { userGroups, selectedGroup, setSelectedGroup } = useAuthStore();

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleGroupSelect = (groupId: string) => {
    setSelectedGroup(groupId);
    handleClose();
  };

  if (!userGroups || userGroups.length === 0) {
    return null;
  }

  const currentGroup = userGroups.find(
    (group) => group.group_id === selectedGroup
  );

  return (
    <div>
      <Button
        onClick={handleClick}
        startIcon={<Group />}
        endIcon={<ArrowDropDown />}
        sx={{ color: "white" }}
      >
        {currentGroup ? currentGroup.title : "Select Group"}
      </Button>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        {userGroups.map((group) => (
          <MenuItem
            key={group.group_id}
            onClick={() => handleGroupSelect(group.group_id)}
            selected={group.group_id === selectedGroup}
          >
            <ListItemIcon>
              <Group />
            </ListItemIcon>
            <ListItemText>{group.title}</ListItemText>
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}
