'use client';

import { Logout } from '@mui/icons-material';
import SyncIcon from '@mui/icons-material/Sync';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import React, { useState, useTransition } from 'react';
import toast from 'react-hot-toast';

import { logout } from '@/app/(auth-pages)/actions';

export default function SignOut() {
  const [isPending, startTransition] = useTransition();
  const [open, setOpen] = useState(false); // State to manage dialog open/close

  const handleSignOut = () => {
    startTransition(async () => {
      try {
        handleClose(); // Close the dialog before logging out
        await logout();
        toast.success('You have been logged out.');
        setOpen(false); // Close the dialog after logout
      } catch (error) {
        handleClose(); // Close the dialog on error
        toast.error('Failed to log out.');
      }
    });
  };

  const handleClickOpen = () => {
    setOpen(true); // Open the confirmation dialog
  };

  const handleClose = () => {
    setOpen(false); // Close the dialog
  };

  return (
    <div className='flex w-full'>
      <Button
        startIcon={<Logout />}
        className='w-full gap-6 flex items-center justify-start'
        onClick={handleClickOpen} // Open dialog on button click
        disabled={isPending}
      >
        SignOut {isPending && <SyncIcon className='animate-spin' />}
      </Button>

      {/* Confirmation Dialog */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Confirm Sign Out</DialogTitle>
        <DialogContent>Are you sure you want to sign out?</DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color='primary'>
            Cancel
          </Button>
          <Button onClick={handleSignOut} color='primary'>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
