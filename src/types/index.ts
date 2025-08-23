export type Role = 'user' | 'admin';

export type Book = {
  book_id: string;
  title: string;
  author: string;
  description: string;
  created_at: string;
  stocks: number;
};
