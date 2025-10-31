import * as React from "react";
import { styled } from "@mui/material/styles";
import { AppBar, Stack } from "@mui/material";
import MuiToolbar from "@mui/material/Toolbar";
import { tabsClasses } from "@mui/material/Tabs";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import NotificationsRoundedIcon from "@mui/icons-material/NotificationsRounded";

import { SideMenuMobile } from "../navigation";
import { AppIcon } from "../general/AppIcon";
import AccountMenu from "./AccountMenu";
import { MenuButton } from "../actions/MenuButton";

const Toolbar = styled(MuiToolbar)({
  width: "100%",
  padding: "12px",
  display: "flex",
  flexDirection: "column",
  alignItems: "start",
  justifyContent: "center",
  gap: "12px",
  flexShrink: 0,
  [`& ${tabsClasses.flexContainer}`]: {
    gap: "8px",
    p: "8px",
    pb: 0,
  },
});

export function AppNavbar() {
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        display: { xs: "auto", md: "none" },
        boxShadow: 0,
        bgcolor: "background.paper",
        backgroundImage: "none",
        borderBottom: "1px solid",
        borderColor: "divider",
        top: "var(--template-frame-height, 0px)",
      }}
    >
      <Toolbar variant="regular">
        <Stack
          direction="row"
          sx={{
            alignItems: "center",
            flexGrow: 1,
            width: "100%",
            gap: 1,
          }}
        >
          <MenuButton aria-label="menu" onClick={toggleDrawer(true)}>
            <MenuRoundedIcon />
          </MenuButton>
          <Stack
            direction="row"
            spacing={1}
            sx={{ justifyContent: "center", mr: "auto" }}
          >
            <AppIcon />
          </Stack>
          <MenuButton showBadge>
            <NotificationsRoundedIcon />
          </MenuButton>
           <AccountMenu/>
          <SideMenuMobile open={open} toggleDrawer={toggleDrawer} />
        </Stack>
      </Toolbar>
    </AppBar>
  );
}
