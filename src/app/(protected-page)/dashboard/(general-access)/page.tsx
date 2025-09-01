import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Chip,
  Typography,
} from '@mui/material';
import React from 'react';
import Grid from "@mui/material/Grid";

import AddBookButton from '@/components/dashboard/AddBookButton';
import DeleteBookButton from '@/components/dashboard/DeleteBookButton';
import EditBookButton from '@/components/dashboard/EditBookButton';

import { readAccess, readAllBooks } from '@/app/(protected-page)/actions';

import { Book } from '@/types';

export default async function BooksListPage() {
  // Fetch books data
  const booksData = await readAllBooks();

  const { data: permissions } = await readAccess();
  const role = permissions.role;

  return (
    <>
      <Typography variant='h4' gutterBottom>
        All Books
      </Typography>
      {/* Add Book Button for Admin */}
      {role === 'admin' && (
        <Box display='flex' justifyContent='flex-end' padding={2}>
          <AddBookButton />
        </Box>
      )}

      <Grid container spacing={4} padding={2}>
        
      </Grid>
    </>
  );
}
