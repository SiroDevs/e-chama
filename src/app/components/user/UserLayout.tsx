import { ReactNode } from "react";
import {
  Box,
  Container,
  CssBaseline,
  Grid,
  Paper,
  Toolbar,
} from "@mui/material";
import { Copyright } from "@mui/icons-material";

import UserSidebar from "./UserSidebar";
import UserHeader from "./UserHeader";
import { Role } from "@/types";
import AppTheme from "../shared/AppTheme";

type UserLayoutProps = {
  children: ReactNode;
  role: Role;
};

export const UserLayout = ({ children, role }: UserLayoutProps) => {
  return (
    <AppTheme>
      <CssBaseline enableColorScheme />
      <Box sx={{ display: "flex" }}>
        <UserHeader />
        <UserSidebar role={role} />
        <Box
          component="div"
          sx={{
            flexGrow: 1,
            height: "100vh",
            overflow: "auto",
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid size={12}>
              <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
                {children}
              </Paper>
            </Grid>
            <Copyright sx={{ pt: 4 }} />
          </Container>
        </Box>
      </Box>
    </AppTheme>
  );
};
