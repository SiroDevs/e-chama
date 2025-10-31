import * as React from 'react';
import Image from "next/image";

import appSvg from "../../../public/appicon.svg";
import Box from '@mui/material/Box';

interface AppIconProps {
  width?: number;
  alt?: string;
  centered?: boolean;
  sx?: any;
}

export function AppIcon({ 
  width = 150, 
  alt = "App Icon", 
  centered = false,
  sx = {} 
}: AppIconProps) {
  
  const iconContent = (
    <Image 
      src={appSvg} 
      alt={alt} 
      width={width}
      priority
    />
  );

  if (centered) {
    return (
      <Box
        sx={{
          display: { xs: "flex", md: "none" },
          justifyContent: "center",
          mb: 2,
          ...sx
        }}
      >
        {iconContent}
      </Box>
    );
  }

  return (
    <Box sx={sx}>
      {iconContent}
    </Box>
  );
}