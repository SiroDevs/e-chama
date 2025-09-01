'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { Add } from '@mui/icons-material'; // Material UI's Add icon
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@mui/material';
import { useRouter } from 'next/navigation';
import React, { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import * as z from 'zod';

import { addBook } from '@/app/(protected-page)/actions'; // ensure this is correct

// Zod schema for validating book fields
const bookSchema = z.object({
  title: z.string().min(1, { message: 'Title is required' }),
  author: z.string().min(1, { message: 'Author is required' }),
  description: z
    .string()
    .min(10, { message: 'Description must be at least 10 characters' }),
  stocks: z
    .number()
    .int({ message: 'Stock must be an integer' })
    .min(0, { message: 'Stock cannot be negative' }),
});

type BookFormData = z.infer<typeof bookSchema>;

export default function AddBookButton() {
  const [isPending, startTransition] = useTransition();
  const [open, setOpen] = useState(false); // State to manage dialog open/close
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BookFormData>({
    resolver: zodResolver(bookSchema),
  });

  const handleClickOpen = () => {
    setOpen(true); // Open the modal
  };

  const handleClose = () => {
    setOpen(false); // Close the modal
  };

  const handleAdd = async (data: BookFormData) => {
    try {
      startTransition(async () => {
        const result = await addBook(data); // Pass validated data
        if (result.error) {
          toast.error(result.error);
        } else {
          router.refresh(); // Redirect to dashboard after adding book
          toast.success('Book added successfully');
        }
      });
    } catch (error) {
      toast.error('Failed to add book');
    }
    setOpen(false); // Close modal after adding
  };

  return (
    <>
      <Button
        variant='outlined'
        color='primary'
        startIcon={<Add />}
        disabled={isPending} // Disable the button while pending
        onClick={handleClickOpen} // Open modal on button click
      >
        Add Book
      </Button>

      {/* Add Book Modal */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add New Book</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit(handleAdd)}>
            <TextField
              autoFocus
              margin='dense'
              label='Title'
              fullWidth
              error={!!errors.title}
              helperText={errors.title?.message}
              {...register('title')}
            />
            <TextField
              margin='dense'
              label='Author'
              fullWidth
              error={!!errors.author}
              helperText={errors.author?.message}
              {...register('author')}
            />
            <TextField
              margin='dense'
              label='Description'
              fullWidth
              multiline
              rows={4}
              error={!!errors.description}
              helperText={errors.description?.message}
              {...register('description')}
            />
            <TextField
              margin='dense'
              label='Stock'
              fullWidth
              type='number'
              error={!!errors.stocks}
              helperText={errors.stocks?.message}
              {...register('stocks', { valueAsNumber: true })}
            />
            <DialogActions>
              <Button onClick={handleClose} color='primary'>
                Cancel
              </Button>
              <Button type='submit' color='primary'>
                Add
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
