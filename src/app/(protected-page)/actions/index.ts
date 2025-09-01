'use server';

import { unstable_noStore as noStore } from 'next/cache';

import { createSupabaseAdmin, createSupabaseClient } from '@/lib/supabase';

import { Book } from '@/types';

export async function readUserSession() {
  noStore();
  const supabase = await createSupabaseClient({
    readOnly: true,
    isBrowser: false,
  });
  const session = await supabase.auth.getSession();
  return session;
}

export async function readAccess() {
  noStore();
  const supabaseClient = await createSupabaseClient({
    readOnly: true,
    isBrowser: false,
  });

  // bisa data, bisa error
  const permissions = await supabaseClient
    .from('permissions')
    .select('*')
    .single();

  return permissions;
}

export async function readAllUsers() {
  const supabaseAdmin = await createSupabaseAdmin({
    isBrowser: false, // This is a server-side query
    readOnly: false,
  });

  // Fetch users and sort by created_at
  const allUserData = await supabaseAdmin.auth.admin.listUsers();

  if (allUserData.error) {
    throw new Error(allUserData.error.message);
  }

  // Sort the users by created_at
  const sortedUsers = allUserData.data.users.sort(
    (a, b) =>
      new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
  );

  return { ...allUserData, data: { ...allUserData.data, users: sortedUsers } };
}

export async function readAllBooks() {
  noStore();
  const supabase = await createSupabaseClient({
    readOnly: true,
    isBrowser: false,
  });

  const { data: books, error } = await supabase
    .from('books')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return books;
}

export async function bookDetailById(book_id: string): Promise<Book | null> {
  const supabase = await createSupabaseClient({
    readOnly: true,
    isBrowser: false,
  });

  const { data, error } = await supabase
    .from('books')
    .select('*')
    .eq('book_id', book_id)
    .single(); // single record!

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

// Delete operation for books, requires writable access
export async function deleteBook(book_id: string) {
  const supabase = await createSupabaseClient({
    readOnly: false,
    isBrowser: false,
  });

  const result = await supabase.from('books').delete().eq('book_id', book_id);

  if (result.error) {
    throw new Error(result.error.message);
  }

  return result;
}

export async function addBook(data: {
  title: string;
  author: string;
  description: string;
  stocks: number;
}) {
  const supabase = await createSupabaseClient({
    isBrowser: false,
    readOnly: false,
  });

  const result = await supabase.from('books').insert({
    title: data.title,
    author: data.author,
    description: data.description,
    stocks: data.stocks,
  });

  if (result.error) {
    throw new Error(result.error.message);
  }

  return result;
}

export async function updateBook(
  data: {
    title: string;
    author: string;
    description: string;
    stocks: number;
  },
  book_id: string
) {
  const supabase = await createSupabaseClient({
    isBrowser: false,
    readOnly: false,
  });

  const result = await supabase
    .from('books')
    .update({
      title: data.title,
      author: data.author,
      description: data.description,
      stocks: data.stocks,
    })
    .eq('book_id', book_id);

  if (result.error) {
    throw new Error(result.error.message);
  }

  return result;
}

export async function addFavoriteBook(data: { book_id: string }) {
  const supabase = await createSupabaseClient({
    isBrowser: false,
    readOnly: false,
  });

  const result = await supabase.from('favorites').insert({
    book_id: data.book_id,
    user_id: (await supabase.auth.getSession()).data.session?.user.id, // Ambil user ID dari sesi
  });

  if (result.error) {
    throw new Error(result.error.message);
  }

  return result;
}

export async function isFavoriteBook(book_id: string) {
  const supabase = await createSupabaseClient({
    readOnly: true,
    isBrowser: false,
  });

  const { data, error } = await supabase
    .from('favorites')
    .select('*')
    .eq('book_id', book_id)
    .single();

  if (error) {
    // Handle unexpected errors, return false
    return false;
  }

  return !!data; // Return true if the book is in favorites
}

export async function readUserFavorites() {
  const supabase = await createSupabaseClient({
    readOnly: true,
    isBrowser: false,
  });

  const user = await supabase.auth.getUser();
  const userId = user.data?.user?.id;

  if (!userId) {
    throw new Error('User is not authenticated');
  }

  const result = await supabase
    .from('favorites')
    .select(
      `
      book_id,
      books (title, author, description)
    `
    )
    .eq('user_id', userId);

  if (result.error) {
    throw new Error(result.error.message);
  }

  return result;
}

// Delete operation for books, requires writable access
export async function deleteUserFavoriteBook(book_id: string) {
  const supabase = await createSupabaseClient({
    readOnly: false,
    isBrowser: false,
  });

  const result = await supabase
    .from('favorites')
    .delete()
    .eq('book_id', book_id);

  if (result.error) {
    throw new Error(result.error.message);
  }

  return result;
}

export async function orderSingleBook(data: {
  book_id: string;
  count: number;
  shipping_address: string;
  city: string;
  province: string;
  courier: string;
  service: string;
  shipping_cost: number;
  delivery_estimate: string;
  total_price: number;
}) {
  const supabase = await createSupabaseClient({
    isBrowser: false,
    readOnly: false,
  });

  const result = await supabase.from('orders').insert({
    book_id: data.book_id,
    user_id: (await supabase.auth.getSession()).data.session?.user.id, // Ambil user ID dari sesi
    count: data.count,
    shipping_address: data.shipping_address,
    city: data.city,
    province: data.province,
    courier: data.courier,
    service: data.service,
    shipping_cost: data.shipping_cost,
    delivery_estimate: data.delivery_estimate,
    total_price: data.total_price, // Total harga (termasuk pengiriman)
  });

  if (result.error) {
    throw new Error(result.error.message);
  }

  return result;
}
