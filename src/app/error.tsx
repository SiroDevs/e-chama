'use client'; // Error components must be Client Components

import WarningIcon from '@mui/icons-material/Warning';
import { Box, Button, Container, Typography } from '@mui/material';
import * as React from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main>
      <Container
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          textAlign: 'center',
          padding: 3,
        }}
      >
        <WarningIcon
          sx={{
            fontSize: '4rem',
            color: 'error.main',
            marginBottom: 3,
          }}
        />
        <Typography
          variant='h3'
          sx={{
            fontWeight: 'bold',
            color: 'text.primary',
            marginBottom: 2,
          }}
        >
          Oops, something went wrong!
        </Typography>
        <Typography
          variant='h5'
          sx={{
            marginBottom: 3,
            color: 'text.secondary',
          }}
        >
          {error.message}
        </Typography>
        <Box sx={{ marginBottom: 3 }}>
          <Button
            variant='contained'
            color='primary'
            onClick={reset}
            sx={{
              textTransform: 'none',
              padding: '10px 20px',
            }}
          >
            Try again
          </Button>
        </Box>
        <Button
          variant='outlined'
          href='/'
          sx={{
            textTransform: 'none',
            padding: '10px 20px',
          }}
        >
          Back to Home
        </Button>
      </Container>
    </main>
  );
}
