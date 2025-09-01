import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from '@mui/material';
import React from 'react';

import DeleteFavoriteBookButton from '@/components/dashboard/DeleteFavoriteBookButton';

import { readAccess, readUserFavorites } from '@/app/(protected-page)/actions';

export default async function FavoriteBooksPage() {
  // Fetch favorite books data
  const favoriteBooks = await readUserFavorites();
  const { data: permissions } = await readAccess();
  const role = permissions.role;

  return (
    <>
      <Typography variant='h4' gutterBottom>
        My Favorite Books
      </Typography>
      
    </>
  );
}
