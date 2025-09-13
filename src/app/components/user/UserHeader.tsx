import MenuIcon from "@mui/icons-material/Menu";
import { AppBar, IconButton, Toolbar, Typography } from "@mui/material";
import ColorModeSelect from "../shared/ColorModeSelect";

const UserHeader = () => {
  return (
    <AppBar position="absolute">
      <Toolbar sx={{ pr: "24px" }}>
        <IconButton edge="start" color="inherit" aria-label="open drawer">
          <MenuIcon />
        </IconButton>
        <ColorModeSelect
          sx={{ position: "fixed", top: "1rem", right: "1rem" }}
        />
        <Typography
          component="h1"
          variant="h6"
          color="inherit"
          noWrap
          sx={{ flexGrow: 1 }}
        >
          Hello World
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default UserHeader;
