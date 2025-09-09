import { ReactNode } from "react";
import { Box, Container, Grid, Paper, Toolbar } from "@mui/material";
import { Copyright } from "@mui/icons-material";

import DashboardHeader from "./DashboardHeader";
import DashboardSidebar from "./DashboardSidebar";
import { Role } from "@/types";

type DashboardLayoutProps = {
  children: ReactNode;
  role: Role;
};

const DashboardLayout = ({ children, role }: DashboardLayoutProps) => {
  return (
    <Box sx={{ display: "flex" }}>
      <DashboardHeader />
      <DashboardSidebar role={role} />
      <Box
        component="div"
        sx={{
          flexGrow: 1,
          height: "100vh",
          overflow: "auto",
        }}
      >
        <Toolbar />
        <Container maxWidth='lg' sx={{ mt: 4, mb: 4 }}>
          <Grid size={12}>
            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
              {children}
            </Paper>
          </Grid>
          <Copyright sx={{ pt: 4 }} />
        </Container>
      </Box>
    </Box>
  );
};

export default DashboardLayout;
