import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Toolbar from '@mui/material/Toolbar';
import { ReactNode } from 'react';

import DashboardHeader from '@/components/dashboard/DashboardHeader';
import DashboardSidebar from '@/components/dashboard/DashboardSidebar';
import Copyright from '@/components/shared/Copyright';

import { Role } from '@/types';

type DashboardLayoutProps = {
  children: ReactNode;
  role: Role;
};

const DashboardLayout = ({ children, role }: DashboardLayoutProps) => {
  return (
    <Box sx={{ display: 'flex' }}>
      <DashboardHeader />
      <DashboardSidebar role={role} />

      <Box
        component='div'
        sx={{
          flexGrow: 1,
          height: '100vh',
          overflow: 'auto',
        }}
      >
        <Toolbar />
        <Container maxWidth='lg' sx={{ mt: 4, mb: 4 }}>
          {/* <Grid item xs={12}> */}
            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
              {children}
            </Paper>
          {/* </Grid> */}
          <Copyright sx={{ pt: 4 }} />
        </Container>
      </Box>
    </Box>
  );
};

export default DashboardLayout;
