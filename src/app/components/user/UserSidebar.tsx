import { AccountBox, BookmarkAdded, Groups } from "@mui/icons-material";
import { LibraryBooks, ShoppingCart } from "@mui/icons-material";
import { ListItem, ListItemButton, ListItemIcon } from "@mui/material";
import { ListItemText, List } from "@mui/material";
import { Divider, Toolbar, Typography, Drawer } from "@mui/material";
import Link from "next/link";
import SignOut from "../../(auth)/signout";

const drawerWidth = 240;

const UserSidebar = ({ role }: { role: string }) => {
  const menuItems = [
    {
      label: "User",
      icon: <LibraryBooks />,
      link: "/",
    },
    {
      label: "My Favorite Books",
      icon: <BookmarkAdded />,
      link: "/dashboard",
      role: "user",
    },
    {
      label: "My Order",
      icon: <ShoppingCart />,
      link: "/dashboard",
      role: "user",
    },
    {
      label: "User Order",
      icon: <ShoppingCart />,
      link: "/dashboard",
      role: "admin",
    },
    {
      label: "All User",
      icon: <Groups />,
      link: "/dashboard",
      role: "admin",
    },
    {
      label: "My Profile",
      icon: <AccountBox />,
      link: "/dashboard",
    },
  ];

  return (
    <Drawer
      variant="permanent"
      sx={{
        "& .MuiDrawer-paper": {
          position: "relative",
          whiteSpace: "nowrap",
          width: drawerWidth,
          boxSizing: "border-box",
        },
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          px: [1],
        }}
      >
        <Typography
          component="h1"
          variant="h6"
          color="inherit"
          noWrap
          sx={{ flexGrow: 1 }}
        >
          eChama
        </Typography>
      </Toolbar>
      <Divider />
      <List component="nav">
        {menuItems
          .filter((item) => !item.role || item.role === role)
          .map((item, index) => (
            <ListItemButton key={index} component={Link} href={item.link}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItemButton>
          ))}
        <Divider sx={{ my: 1 }} />
        <ListItem><SignOut /></ListItem>
      </List>
    </Drawer>
  );
};

export default UserSidebar;
