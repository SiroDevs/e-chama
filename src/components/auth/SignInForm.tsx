'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import SyncIcon from '@mui/icons-material/Sync';
import { IconButton, InputAdornment } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import * as z from 'zod';

import Copyright from '@/components/shared/Copyright';

import { loginWithEmailAndPassword } from '@/app/(auth-pages)/actions';

// Zod schema
const schema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters' }),
});

type FormData = z.infer<typeof schema>;

export default function SignInForm() {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  // eslint-disable-next-line unused-imports/no-unused-vars
  const [isPending, startTransition] = useTransition();

  function onSubmit(data: FormData) {
    startTransition(async () => {
      try {
        const result = await loginWithEmailAndPassword(data);
        const parsedResult = JSON.parse(result);

        // Handle error based on status code
        if (parsedResult.error?.status) {
          switch (parsedResult.error.status) {
            case 400:
              toast.error(
                'Invalid credentials. Please check your email and password.'
              );
              break;
            case 401:
              toast.error('Unauthorized. Please try again.');
              break;
            case 403:
              toast.error(
                'Access forbidden. Contact support if this issue persists.'
              );
              break;
            case 500:
              toast.error('Internal server error. Please try again later.');
              break;
            default:
              toast.error('An unknown error occurred.');
          }
        } else {
          // Success case
          toast.success('You have been logged in.');
        }
      } catch (err) {
        // Catch unexpected errors (e.g., network issues)
        const message =
          err instanceof Error ? err.message : 'Something went wrong.';
        toast.error(message);
      }
    });
  }

  return (
    <Container
      component='div'
      maxWidth='xs'
      className='flex flex-col items-center justify-center h-screen'
    >
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>
          Sign in
        </Typography>
        <Box
          component='form'
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          sx={{ mt: 1 }}
        >
          <TextField
            margin='normal'
            required
            fullWidth
            id='email'
            label='Email Address'
            autoComplete='email'
            autoFocus
            error={!!errors.email}
            helperText={errors.email?.message}
            {...register('email')}
          />
          <TextField
            margin='normal'
            required
            fullWidth
            label='Password'
            type={showPassword ? 'text' : 'password'}
            id='password'
            autoComplete='current-password'
            error={!!errors.password}
            helperText={errors.password?.message}
            {...register('password')}
            InputProps={{
              endAdornment: (
                <InputAdornment position='end'>
                  <IconButton
                    aria-label='toggle password visibility'
                    onClick={() => setShowPassword((prev) => !prev)}
                    edge='end'
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Button
            type='submit'
            fullWidth
            variant='contained'
            sx={{ mt: 3, mb: 2 }}
            endIcon={isPending && <SyncIcon className='animate-spin' />}
            disabled={isPending}
          >
            Sign In
          </Button>
          <Grid container justifyContent='flex-end'>
            {/* <Grid item> */}
              <Link href='/sign-up' variant='body2'>
                Don't have an account? Sign Up
              </Link>
            {/* </Grid> */}
          </Grid>
        </Box>
      </Box>
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </Container>
  );
}
