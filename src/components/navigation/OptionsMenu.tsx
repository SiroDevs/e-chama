"use client";

import * as React from "react";
import Divider, { dividerClasses } from "@mui/material/Divider";
import { Menu, listClasses, styled, paperClasses } from "@mui/material";
import MuiMenuItem from "@mui/material/MenuItem";
import ListItemIcon, { listItemIconClasses } from '@mui/material/ListItemIcon';
import MoreVertRoundedIcon from "@mui/icons-material/MoreVertRounded";
import ListItemText from '@mui/material/ListItemText';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';

import { handleSignOutAction } from "@/app/(protected)/actions/AuthAction";
import { useAuthStore } from "@/state/auth/auth";
import { MenuButton } from "../actions/MenuButton";

const MenuItem = styled(MuiMenuItem)({ margin: "2px 0" });

export function OptionsMenu() {
  const { logoutUser } = useAuthStore();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSignOut = async () => {
    await handleSignOutAction();
    await logoutUser();
    window.location.reload();
  };

  return (
    <React.Fragment>
      <MenuButton
        aria-label="Open menu"
        onClick={handleClick}
        sx={{ borderColor: "transparent" }}
      >
        <MoreVertRoundedIcon />
      </MenuButton>
      <Menu
        anchorEl={anchorEl}
        id="menu"
        open={open}
        onClose={handleClose}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        sx={{
          [`& .${listClasses.root}`]: {
            padding: "4px",
          },
          [`& .${paperClasses.root}`]: {
            padding: 0,
          },
          [`& .${dividerClasses.root}`]: {
            margin: "4px -4px",
          },
        }}
      >
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>My account</MenuItem>
        <Divider />
        {/* <MenuItem onClick={handleClose}>Add another account</MenuItem> */}
        <MenuItem onClick={handleClose}>Settings</MenuItem>
        <Divider />
        <MenuItem
          onClick={handleSignOut}
          sx={{
            [`& .${listItemIconClasses.root}`]: {
              ml: 'auto',
              minWidth: 0,
            },
          }}
        >
          <ListItemText>Sign Out</ListItemText>
          <ListItemIcon>
            <LogoutRoundedIcon fontSize="small" />
          </ListItemIcon>
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
}
