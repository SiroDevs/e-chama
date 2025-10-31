import React from 'react';
import { Typography, SxProps, Theme } from '@mui/material';

interface PageTitleProps {
  icon: React.ReactNode;
  text: string;
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  align?: 'left' | 'center' | 'right' | 'justify';
  gutterBottom?: boolean;
  sx?: SxProps<Theme>;
  iconSx?: SxProps<Theme>;
}

export function PageTitle({
  icon,
  text,
  variant = 'h4',
  align = 'center',
  gutterBottom = true,
  iconSx = { mr: 1, verticalAlign: 'middle' }
}: PageTitleProps) {
  return (
    <Typography
      component="h1"
      variant={variant}
      align={align}
      gutterBottom={gutterBottom}
      sx={{ mb: 3 }}
    >
      {React.isValidElement(icon) 
        ? React.cloneElement(icon as React.ReactElement)
        : <span style={iconSx as any}>{icon}</span>
      }
      {text}
    </Typography>
  );
}