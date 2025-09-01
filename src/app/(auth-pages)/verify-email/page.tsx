'use client';

import { Button, Typography } from '@mui/material';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import Copyright from '@/components/shared/Copyright';

export default function VerifyEmail() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const code = searchParams.get('code'); // Updated to 'code'
  const error = searchParams.get('error');
  const errorCode = searchParams.get('error_code');
  const errorDescription = searchParams.get('error_description');

  const [statusMessage, setStatusMessage] = useState('');
  const [buttonLabel, setButtonLabel] = useState('');
  const [redirectTo, setRedirectTo] = useState('');

  useEffect(() => {
    if (error && errorCode && errorDescription) {
      // Failed verification
      setStatusMessage('Verified Failed');
      setButtonLabel('Go to Sign Up');
      setRedirectTo('/sign-up');
    } else if (code) {
      // Success verification
      setStatusMessage('Verify Success');
      setButtonLabel('Go to Sign In');
      setRedirectTo('/sign-in');
    }
  }, [code, error, errorCode, errorDescription]);

  return (
    <div className='flex flex-col gap-2 items-center justify-center h-screen'>
      <Typography component='h1' variant='h5' className='text-center'>
        {statusMessage}
      </Typography>

      {statusMessage && (
        <Button
          variant='contained'
          color='primary'
          onClick={() => router.push(redirectTo)}
        >
          {buttonLabel}
        </Button>
      )}

      <Copyright sx={{ mt: 5 }} />
    </div>
  );
}
