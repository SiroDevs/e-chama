import * as React from "react";
import MuiListItemAvatar from "@mui/material/ListItemAvatar";
import { MenuItem, ListItemText, ListItemIcon } from "@mui/material";
import { Divider, ListSubheader } from "@mui/material";
import Select, { SelectChangeEvent, selectClasses } from "@mui/material/Select";
import { styled } from "@mui/material/styles";
import AddRoundedIcon from "@mui/icons-material/AddRounded";

import { GroupAdd } from "@mui/icons-material";
import { useGroupStore } from "@/infrastucture/state/auth/group";
import { useRouter } from "next/navigation";

const ListItemAvatar = styled(MuiListItemAvatar)({
  minWidth: 0,
  marginRight: 12,
});

export function SelectGroup() {
  const router = useRouter();
  const { userGroups, selectedGroup, setSelectedGroup } = useGroupStore();
  const handleChange = (event: SelectChangeEvent) => {
    const groupId = event.target.value;
    if (groupId === "add-new") {
      router.push("/join");
      event.target.value = selectedGroup || "";
    } else {
      setSelectedGroup(groupId);
    }
  };

  const currentGroup = userGroups.find(group => group.group_id === selectedGroup);

  return (
    <Select
      labelId="group-select"
      id="group-simple-select"
      value={selectedGroup || ""}
      onChange={handleChange}
      displayEmpty
      inputProps={{ "aria-label": "Select Chama" }}
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
      renderValue={(selected) => {
        if (!selected) {
          return "Select a Chama";
        }
        const selectedGroup = userGroups.find(group => group.group_id === selected);
        return selectedGroup ? selectedGroup.title : "Select a Chama";
      }}
    >
      <ListSubheader sx={{ pt: 0 }}>My Chamas</ListSubheader>
      {userGroups.length === 0 ? (
        <MenuItem disabled value="">
          <ListItemText primary="No groups available" />
        </MenuItem>
      ) : (
        userGroups.map((group) => (
          <MenuItem key={group.group_id} value={group.group_id}>
            <ListItemAvatar>
              <GroupAdd />
            </ListItemAvatar>
            <ListItemText
              primary={group.title}
              secondary={group.group_id === selectedGroup ? "Current" : ""}
            />
          </MenuItem>
        ))
      )}
      <Divider sx={{ mx: -1 }} />
      <MenuItem key="new-chama" value="add-new">
        <ListItemIcon>
          <AddRoundedIcon />
        </ListItemIcon>
        <ListItemText primary="Add a Chama" secondary="Add or Join a New Chama" />
      </MenuItem>
    </Select>
  );
}