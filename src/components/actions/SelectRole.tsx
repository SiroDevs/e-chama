import * as React from "react";
import MuiAvatar from "@mui/material/Avatar";
import MuiListItemAvatar from "@mui/material/ListItemAvatar";
import { MenuItem, ListItemText, ListItemIcon } from "@mui/material";
import { Divider, ListSubheader } from "@mui/material";
import Select, { SelectChangeEvent, selectClasses } from "@mui/material/Select";
import { styled } from "@mui/material/styles";
import AddRoundedIcon from "@mui/icons-material/AddRounded";

import { useAuthStore } from "@/state/auth/auth";
import { useState } from "react";
import { GroupAdd } from "@mui/icons-material";

const ListItemAvatar = styled(MuiListItemAvatar)({
  minWidth: 0,
  marginRight: 12,
});

export function SelectGroup() {
  const { userGroups, selectedGroup, setSelectedGroup } = useAuthStore();
  const [group, setGroup] = useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setGroup(event.target.value as string);
  };

  return (
    <Select
      labelId="group-select"
      id="group-simple-select"
      value={group}
      onChange={handleChange}
      displayEmpty
      inputProps={{ "aria-label": "Select Group" }}
      fullWidth
      sx={{
        maxHeight: 56,
        width: 215,
        "&.MuiList-root": {
          p: "8px",
        },
        [`& .${selectClasses.select}`]: {
          display: "flex",
          alignItems: "center",
          gap: "2px",
          pl: 1,
        },
      }}
    >
      <ListSubheader sx={{ pt: 0 }}>My Chamas</ListSubheader>
      {userGroups.map((group) => (
        <MenuItem key={group.group_id} value="">
          <ListItemAvatar>
            <GroupAdd />
          </ListItemAvatar>
          <ListItemText
            primary={group.title}
          />
        </MenuItem>
      ))}
      <Divider sx={{ mx: -1 }} />
      <MenuItem key="new-chama" value={40}>
        <ListItemIcon>
          <AddRoundedIcon />
        </ListItemIcon>
        <ListItemText primary="Add a Chama" secondary="Add or Join aNew Chama" />
      </MenuItem>
    </Select>
  );
}
