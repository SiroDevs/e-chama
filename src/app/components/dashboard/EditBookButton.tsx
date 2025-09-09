/* eslint-disable unused-imports/no-unused-vars */
'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { Edit } from '@mui/icons-material'; // Material UI's Edit icon
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@mui/material';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import * as z from 'zod';

import { updateBook } from '@/app/(protected-page)/actions'; // ensure this is correct

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

interface EditBookProps {
  book_id: string;
  initial_title: string;
  initial_author: string;
  initial_description: string;
  initial_stocks: number;
}

export default function EditBookButton({
  book_id,
  initial_title,
  initial_author,
  initial_description,
  initial_stocks,
}: EditBookProps) {
  const [isPending, startTransition] = useTransition();
  const [open, setOpen] = useState(false); // State to manage dialog open/close
  const [title, setTitle] = useState(initial_title);
  const [author, setAuthor] = useState(initial_author);
  const [description, setDescription] = useState(initial_description);
  const [stocks, setStocks] = useState(initial_stocks);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<BookFormData>({
    resolver: zodResolver(bookSchema),
  });

  useEffect(() => {
    // Pre-fill the form fields with initial data
    setValue('title', title);
    setValue('author', author);
    setValue('description', description);
    setValue('stocks', stocks);
  }, [title, author, description, stocks, setValue]);

  const handleClickOpen = () => {
    setOpen(true); // Open the modal
  };

  const handleClose = () => {
    setOpen(false); // Close the modal
  };

  const handleUpdate = async (data: BookFormData) => {
    try {
      startTransition(async () => {
        const result = await updateBook(data, book_id); // Pass validated data and bookId
        if (result.error) {
          toast.error(result.error);
        } else {
          router.refresh(); // Redirect to dashboard after updating book
          toast.success('Book updated successfully');
        }
      });
    } catch (error) {
      toast.error('Failed to update book');
    }
    setOpen(false); // Close modal after updating
  };

  return (
    <>
      <Button
        variant='outlined'
        color='primary'
        startIcon={<Edit />}
        onClick={handleClickOpen} // Open modal on button click
        className='w-full'
      >
        Edit
      </Button>

      {/* Edit Book Modal */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit Book</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit(handleUpdate)}>
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
                Update
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
