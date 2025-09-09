import MenuIcon from '@mui/icons-material/Menu';
import AppBar from '@mui/material/AppBar';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

const DashboardHeader = () => {
  return (
    <AppBar position='absolute'>
      <Toolbar sx={{ pr: '24px' }}>
        <IconButton edge='start' color='inherit' aria-label='open drawer'>
          <MenuIcon />
        </IconButton>
        <Typography
          component='h1'
          variant='h6'
          color='inherit'
          noWrap
          sx={{ flexGrow: 1 }}
        >
          Hello World
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default DashboardHeader;
