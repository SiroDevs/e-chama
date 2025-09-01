'use client';
import BookmarkAddedIcon from '@mui/icons-material/BookmarkAdded';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import { Button, CircularProgress } from '@mui/material';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState, useTransition } from 'react';
import toast from 'react-hot-toast';

import {
  addFavoriteBook,
  isFavoriteBook,
} from '@/app/(protected-page)/actions';

type AddFavoriteButtonProps = {
  book_id: string; // ID buku yang akan ditambahkan ke favorit
};

export default function AddFavoriteBookButton({
  book_id,
}: AddFavoriteButtonProps) {
  const [isPending, startTransition] = useTransition();
  const [isFavorite, setIsFavorite] = useState<boolean | null>(null);
  const router = useRouter();

  useEffect(() => {
    const checkFavoriteStatus = async () => {
      try {
        const favorite = await isFavoriteBook(book_id);
        setIsFavorite(favorite);
      } catch (error) {
        toast.error('Failed to fetch favorite status');
      }
    };

    checkFavoriteStatus();
  }, [book_id]);

  const handleAddFavorite = async () => {
    try {
      startTransition(async () => {
        const result = await addFavoriteBook({ book_id: book_id });

        if (result.error) {
          toast.error(result.error);
        } else {
          router.refresh();
          toast.success('Book added to favorites successfully!');
          setIsFavorite(true); // Update the status to "favorite"
        }
      });
    } catch (error) {
      toast.error('Failed to add to favorites');
    }
  };

  if (isFavorite === null) {
    return <CircularProgress size={24} />;
  }

  return isFavorite ? (
    <Button
      startIcon={<BookmarkAddedIcon />}
      variant='contained'
      color='secondary'
      disabled
    >
      Favorite Book
    </Button>
  ) : (
    <Button
      startIcon={<BookmarkBorderIcon />}
      variant='contained'
      color='primary'
      disabled={isPending}
      onClick={handleAddFavorite}
    >
      Add to Favorites
    </Button>
  );
}
