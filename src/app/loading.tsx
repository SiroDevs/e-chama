'use client';

import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import { Box, CircularProgress, Typography } from '@mui/material';
import React from 'react';

export default function Loading() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        bgcolor: 'background.default',
        color: 'text.primary',
      }}
    >
      <HourglassEmptyIcon sx={{ fontSize: 50, mb: 2 }} />
      <CircularProgress color='primary' />
      <Typography variant='h6' sx={{ mt: 2 }}>
        Loading, please wait...
      </Typography>
    </Box>
  );
}
