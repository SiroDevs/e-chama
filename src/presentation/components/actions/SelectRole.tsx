import * as React from "react";
import { Avatar, Box, MenuItem } from "@mui/material";
import { ListItemText, ListItemIcon } from "@mui/material";
import Select, { SelectChangeEvent, selectClasses } from "@mui/material/Select";
import { getRoleInfo, isUserRole, UserRole } from "@/infrastucture/state/role/profiles";

interface SelectRoleProps {
  currentRole: UserRole;
  availableRoles: UserRole[];
  onRoleChange: (role: UserRole) => void;
  size?: "small" | "medium";
}

export function SelectRole({
  currentRole,
  availableRoles,
  onRoleChange,
  size = "medium",
}: SelectRoleProps) {
  const handleChange = (event: SelectChangeEvent) => {
    const newRole = event.target.value;
    if (isUserRole(newRole)) {
      onRoleChange(newRole);
    }
  };

  const rolesWithMember = availableRoles.includes("member")
    ? availableRoles
    : [...availableRoles, "member"];

  const uniqueRoles = Array.from(new Set(rolesWithMember)).filter(isUserRole);

  return (
    <Select
      value={currentRole}
      onChange={handleChange}
      displayEmpty
      inputProps={{ "aria-label": "Select Role" }}
      sx={{
        maxHeight: size === "small" ? 32 : 40,
        minWidth: size === "small" ? 130 : 150,
        [`& .${selectClasses.select}`]: {
          display: "flex",
          alignItems: "center",
          gap: "6px",
          padding: size === "small" ? "2px 6px" : "4px 8px",
          fontSize: size === "small" ? "0.875rem" : "1rem",
        },
      }}
      renderValue={(selected) => {
        const roleInfo = getRoleInfo(selected);
        return (
          <Box
            display="flex"
            alignItems="center"
            gap={1}
            color={getRoleColor(selected)}
          >
            <Avatar
              sx={{
                width: size === "small" ? 20 : 24,
                height: size === "small" ? 20 : 24,
                fontSize: size === "small" ? "12px" : "14px",
              }}
            >
              {getRoleIcon(selected)}
            </Avatar>
            <ListItemText primary={roleInfo.label} />
          </Box>
        );
      }}
    >
      {uniqueRoles.map((role) => {
        const roleInfo = getRoleInfo(role);
        const roleDescription =
          role === currentRole ? "Current Dashboard View" : roleInfo.description;
        return (
          <MenuItem key={role} value={role} color="primary">
            <ListItemIcon>
              <Avatar
                sx={{
                  width: size === "small" ? 20 : 24,
                  height: size === "small" ? 20 : 24,
                  fontSize: size === "small" ? "12px" : "14px",
                }}
              >
                {getRoleIcon(role)}
              </Avatar>
            </ListItemIcon>
            <ListItemText
              primary={"CHAMA " +roleInfo.label.toUpperCase()}
              secondary={roleDescription}
              primaryTypographyProps={{
                fontSize: size === "small" ? "0.875rem" : "1rem",
              }}
              secondaryTypographyProps={{
                fontSize: size === "small" ? "0.75rem" : "0.875rem",
              }}
            />
          </MenuItem>
        );
      })}
    </Select>
  );
}

const getRoleColor = (role: string) => {
  if (!isUserRole(role)) return "default";

  switch (role) {
    case "admin":
      return "error";
    case "treasurer":
      return "warning";
    case "accountant":
      return "secondary";
    case "secretary":
      return "info";
    case "chairperson":
      return "success";
    case "vicechairperson":
      return "success";
    case "official":
      return "primary";
    case "member":
      return "default";
    default:
      return "default";
  }
};

const getRoleIcon = (role: string) => {
  if (!isUserRole(role)) return "👤";

  switch (role) {
    case "admin":
      return "⚙️";
    case "treasurer":
      return "💰";
    case "accountant":
      return "📊";
    case "secretary":
      return "📝";
    case "chairperson":
      return "👑";
    case "vicechairperson":
      return "🎖️";
    case "official":
      return "⭐";
    case "member":
      return "👤";
    default:
      return "👤";
  }
};
