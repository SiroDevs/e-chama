"use client";

import { CircularProgress, Box, Typography } from "@mui/material";

interface LoaderProps {
  title?: string;
  message?: string;
  showSpinner?: boolean;
  size?: number;
  height?: string;
  thickness?: number;
}

export function Loader({
  title = "",
  message = "",
  showSpinner = true,
  size = 60,
  height = "50vh",
  thickness = 4
}: LoaderProps) {
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      height={height}
      width="100%"
      gap={2}
    >
      {showSpinner && (
        <CircularProgress size={size} thickness={thickness} />
      )}
      <Typography variant="h5" component="h1" gutterBottom textAlign="center">
        {title}
      </Typography>
      <Typography variant="body2" color="text.secondary" textAlign="center">
        {message}
      </Typography>
    </Box>
  );
}