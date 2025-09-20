import React, { useState, useEffect } from "react";
import { Avatar, Box, Container, Paper } from "@mui/material";
import { Typography, Grid, Card, CardContent } from "@mui/material";
import { Divider, Chip, Skeleton, useTheme } from "@mui/material";
import {
  Person as PersonIcon,
  LocationOn as LocationIcon,
  CalendarToday as CalendarIcon,
  Fingerprint as IdIcon,
  Badge as BadgeIcon,
  Group as GroupIcon,
} from "@mui/icons-material";
import { useAuthStore } from "@/state/auth/auth";

interface DetailItemProps {
  label: string;
  value: string;
  icon: React.ReactNode;
  multiline?: boolean;
}

export function DetailItem({
  label,
  value,
  icon,
  multiline = false,
}: DetailItemProps) {
  return (
    <Box sx={{ mb: 2 }}>
      <Typography
        variant="subtitle2"
        color="text.secondary"
        sx={{ display: "flex", alignItems: "center", gap: 1, mb: 0.5 }}
      >
        {icon}
        {label}
      </Typography>
      <Typography
        variant="body1"
        sx={{ ml: 4, whiteSpace: multiline ? "pre-wrap" : "nowrap" }}
      >
        {value}
      </Typography>
    </Box>
  );
}

export function ProfileSkeleton() {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Paper elevation={2} sx={{ p: 4, borderRadius: 2 }}>
        <Grid container spacing={4} alignItems="center">
          <Grid size={3}>
            <Box display="flex" justifyContent="center">
              <Skeleton variant="circular" width={120} height={120} />
            </Box>
          </Grid>
          <Grid size={9}>
            <Skeleton variant="text" height={60} width="60%" />
            <Skeleton variant="text" height={40} width="40%" />
            <Skeleton variant="text" height={30} width="30%" />
          </Grid>
        </Grid>
        <Divider sx={{ my: 4 }} />
        <Grid container spacing={3}>
          <Grid size={6}>
            <Skeleton variant="rectangular" height={200} />
          </Grid>
          <Grid size={6}>
            <Skeleton variant="rectangular" height={200} />
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}
