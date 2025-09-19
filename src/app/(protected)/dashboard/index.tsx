"use client";

import * as React from "react";

import { Header, NavbarBreadcrumbs } from "@/components/navigation";
import { Box, Typography } from "@mui/material";
import { Copyright } from "@/components/general";

export default function Dashboard() {
  return (
    <div>
      <Header />
      <NavbarBreadcrumbs />

      <Box sx={{ width: "100%", maxWidth: { sm: "100%", md: "1700px" } }}>
        <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
          Overview
        </Typography>
        <Copyright sx={{ my: 4 }} />
      </Box>
    </div>
  );
}
