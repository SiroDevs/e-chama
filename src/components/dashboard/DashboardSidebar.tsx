import AccountBoxIcon from '@mui/icons-material/AccountBox';
import BookmarkAddedIcon from '@mui/icons-material/BookmarkAdded';
import GroupsIcon from '@mui/icons-material/Groups';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import Divider from '@mui/material/Divider';
import MuiDrawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Link from 'next/link';

import SignOut from '@/components/auth/SignOut';

const drawerWidth = 240;

const DashboardSidebar = ({ role }: { role: string }) => {
  const menuItems = [
    {
      label: 'Dashboard',
      icon: <LibraryBooksIcon />,
      link: '/dashboard',
    },
    {
      label: 'My Favorite Books',
      icon: <BookmarkAddedIcon />,
      link: '/dashboard/my-favorite-books',
      role: 'user',
    },
    {
      label: 'My Order',
      icon: <ShoppingCartIcon />,
      link: '/dashboard/my-order',
      role: 'user',
    },
    {
      label: 'User Order',
      icon: <ShoppingCartIcon />,
      link: '/dashboard/user-order',
      role: 'admin',
    },
    {
      label: 'All User',
      icon: <GroupsIcon />,
      link: '/dashboard/all-user',
      role: 'admin',
    },
    {
      label: 'My Profile',
      icon: <AccountBoxIcon />,
      link: '/dashboard/my-profile',
    },
  ];

  return (
    <MuiDrawer
      variant='permanent'
      sx={{
        '& .MuiDrawer-paper': {
          position: 'relative',
          whiteSpace: 'nowrap',
          width: drawerWidth,
          boxSizing: 'border-box',
        },
      }}
    >
      <Toolbar
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          px: [1],
        }}
      >
        <Typography
          component='h1'
          variant='h6'
          color='inherit'
          noWrap
          sx={{ flexGrow: 1 }}
        >
          Buku Online
        </Typography>
      </Toolbar>
      <Divider />
      <List component='nav'>
        {menuItems
          .filter((item) => !item.role || item.role === role)
          .map((item, index) => (
            <ListItemButton key={index} component={Link} href={item.link}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItemButton>
          ))}
        <Divider sx={{ my: 1 }} />
        <ListItem>
          <SignOut />
        </ListItem>
      </List>
    </MuiDrawer>
  );
};

export default DashboardSidebar;
