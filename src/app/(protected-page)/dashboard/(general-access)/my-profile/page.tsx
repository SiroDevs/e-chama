import { Button, CardContent, Chip, Divider, Typography } from '@mui/material';
import React from 'react';

import { readAccess, readUserSession } from '@/app/(protected-page)/actions';

export default async function MyProfilePage() {
  const { data: userSession } = await readUserSession();
  const { data: permissions } = await readAccess();

  const user = userSession.session?.user;
  const role = permissions.role;

  return (
    <>
      <Typography variant='h4' gutterBottom>
        Profile Information
      </Typography>
      <CardContent>
        <Divider sx={{ marginBottom: 2 }} />
        <Typography variant='h6'>Full Name</Typography>
        <Typography variant='body1' paragraph>
          {user?.user_metadata.full_name || 'N/A'}
        </Typography>
        <Divider sx={{ marginBottom: 2 }} />
        <Typography variant='h6'>Email</Typography>
        <Typography variant='body1' paragraph>
          {user?.email || 'N/A'}
        </Typography>
        <Divider sx={{ marginBottom: 2 }} />
        <Typography variant='h6'>Role</Typography>
        <Chip label={role || 'N/A'} color='primary' />
        <Divider sx={{ marginY: 2 }} />
        <Button variant='contained' color='primary' fullWidth>
          Edit Profile
        </Button>
      </CardContent>
    </>
  );
}
