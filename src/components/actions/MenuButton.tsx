import * as React from "react";
import Badge, { badgeClasses } from "@mui/material/Badge";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import { Button, Tooltip } from "@mui/material";
import { ReactNode } from "react";

export interface MenuButtonProps extends IconButtonProps {
  showBadge?: boolean;
}

export function MenuButton({ showBadge = false, ...props }: MenuButtonProps) {
  return (
    <Badge
      color="error"
      variant="dot"
      invisible={!showBadge}
      sx={{ [`& .${badgeClasses.badge}`]: { right: 2, top: 2 } }}
    >
      <IconButton size="small" {...props} />
    </Badge>
  );
}

interface PageActionProps {
  title: string;
  icon: ReactNode;
  onClick?: () => void;
  size?: 'small' | 'medium' | 'large';
}

export function PageAction({ title, icon, size = 'medium', onClick }: PageActionProps) {
  return (
    <Button 
      variant="contained" 
      onClick={onClick} 
      startIcon={icon}
      size={size}
    >
      {title}
    </Button>
  );
}

interface PageIconButtonProps {
  title: string;
  icon: ReactNode;
  onClick?: () => void;
}

export function PageIconButton({ title, icon, onClick }: PageIconButtonProps) {
  return (
    <Tooltip title={title} placement="right" enterDelay={1000}>
      <div>
        <IconButton size="small" aria-label="action" onClick={onClick}>
          {icon}
        </IconButton>
      </div>
    </Tooltip>
  );
}
