import * as React from "react";
import Stack from "@mui/material/Stack";
import { Search } from "@mui/icons-material";
import NotificationsRoundedIcon from "@mui/icons-material/NotificationsRounded";

import ColorModeIconDropdown from "../shared/ColorModeSelect";
import { MenuButton } from "../actions/MenuButton";
import { SelectGroup } from "../general";
import AccountMenu from "./AccountMenu";

export function Header() {
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
        {/* {userMenu()} */}
        <AccountMenu/>
      </Stack>
    </Stack>
  );

}
