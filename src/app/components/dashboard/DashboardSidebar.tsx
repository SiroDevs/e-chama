import SignOut from "@/app/(auth)/signout";
import { AccountBox, BookmarkAdded, Groups } from "@mui/icons-material";
import { LibraryBooks, ShoppingCart } from "@mui/icons-material";
import { ListItem, ListItemButton, ListItemIcon } from "@mui/material";
import { ListItemText, List } from "@mui/material";
import { Divider, Toolbar, Typography, Drawer } from "@mui/material";
import Link from "next/link";

const drawerWidth = 240;

const DashboardSidebar = ({ role }: { role: string }) => {
  const menuItems = [
    {
      label: "Dashboard",
      icon: <LibraryBooks />,
      link: "/dashboard",
    },
    {
      label: "My Favorite Books",
      icon: <BookmarkAdded />,
      link: "/dashboard/my-favorite-books",
      role: "user",
    },
    {
      label: "My Order",
      icon: <ShoppingCart />,
      link: "/dashboard/my-order",
      role: "user",
    },
    {
      label: "User Order",
      icon: <ShoppingCart />,
      link: "/dashboard/user-order",
      role: "admin",
    },
    {
      label: "All User",
      icon: <Groups />,
      link: "/dashboard/all-user",
      role: "admin",
    },
    {
      label: "My Profile",
      icon: <AccountBox />,
      link: "/dashboard/my-profile",
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
          Buku Online
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

export default DashboardSidebar;
