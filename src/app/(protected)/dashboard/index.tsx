"use client";

import * as React from "react";

import { Header, NavbarBreadcrumbs } from "@/components/navigation";
import { Box } from "@mui/material";
import { MainGrid } from "@/components/general";

export default function Dashboard() {
  return (
    <Box sx={{ width: "100%", maxWidth: { sm: "100%", md: "1700px" } }}>
      <Header />
      <NavbarBreadcrumbs />
      <MainGrid/>
    </Box>
  );
}
