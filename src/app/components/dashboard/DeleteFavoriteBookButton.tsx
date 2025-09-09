'use client';
import { Delete } from '@mui/icons-material'; // Material UI's Delete icon
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import { useRouter } from 'next/navigation';
import React, { useState, useTransition } from 'react';
import toast from 'react-hot-toast';

import { deleteUserFavoriteBook } from '@/app/(protected-page)/actions';

export default function DeleteFavoriteBookButton({
  book_id,
  book_title,
}: {
  book_id: string;
  book_title: string;
}) {
  const [isPending, startTransition] = useTransition();
  const [open, setOpen] = useState(false); // State to manage dialog open/close
  const router = useRouter();

  const handleClickOpen = () => {
    setOpen(true); // Open the modal
  };

  const handleClose = () => {
    setOpen(false); // Close the modal
  };

  const handleDelete = async () => {
    try {
      startTransition(async () => {
        const result = await deleteUserFavoriteBook(book_id); // Directly await the result
        if (result.error) {
          toast.error(result.error);
        } else {
          router.refresh(); // Redirect to dashboard after deletion
          toast.success('Book deleted successfully');
        }
      });
    } catch (error) {
      toast.error(`Failed to delete book  ${book_id}`);
    }
    setOpen(false); // Close modal after deletion
  };

  return (
    <>
      <Button
        variant='outlined'
        color='error'
        startIcon={<Delete />}
        disabled={isPending} // Disable the button while pending
        onClick={handleClickOpen} // Open modal on button click
        className='w-full'
      >
        Remove from Favorites
      </Button>

      {/* Confirmation Modal */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this book{' '}
          <span className='font-bold text-red-600'>"{book_title}"</span>? This
          action cannot be undone.
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color='primary'>
            Cancel
          </Button>
          <Button onClick={handleDelete} color='error'>
            Remove
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
