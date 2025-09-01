import { Box, Button, Typography } from '@mui/material';
import { Metadata } from 'next';
import * as React from 'react';

export const metadata: Metadata = {
  title: 'Not Found',
};

export default function NotFound() {
  return (
    <main>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          textAlign: 'center',
          backgroundColor: 'background.paper',
          padding: 3,
        }}
      >
        <Typography
          variant='h1'
          sx={{
            fontSize: '3rem',
            fontWeight: 'bold',
            color: 'error.main',
            marginBottom: 2,
          }}
        >
          404 - Page Not Found
        </Typography>
        <Typography
          variant='h5'
          sx={{
            marginBottom: 3,
            color: 'text.secondary',
          }}
        >
          Oops! The page you're looking for doesn't exist.
        </Typography>
        <Button
          variant='contained'
          color='primary'
          href='/'
          sx={{
            padding: '10px 20px',
            textTransform: 'none',
          }}
        >
          Back to Home
        </Button>
      </Box>
    </main>
  );
}
