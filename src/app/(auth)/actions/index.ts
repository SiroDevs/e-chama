'use server';

import { redirect } from 'next/navigation';

import { createSupabaseClient } from '@/lib/supabase';
import toast from 'react-hot-toast';

export async function loginWithEmailAndPassword(data: {
  email: string;
  password: string;
}) {
  const supabase = await createSupabaseClient({
    isBrowser: false,
    readOnly: false,
  });

  const result = await supabase.auth.signInWithPassword(data);

  if (result.error) {
    throw new Error(result.error.message);
  }

  return JSON.stringify(result);
}

export async function signUpWithEmailAndPassword(data: {
  email: string;
  password: string;
  full_name: string;
}) {
  const supabase = await createSupabaseClient({
    isBrowser: false,
    readOnly: false,
  });

  const result = await supabase.auth.signUp({
    email: data.email,
    password: data.password,
    options: {
      emailRedirectTo: `${process.env.NEXT_WEB_PATH}/verify-email`,
      data: {
        full_name: data.full_name,
      },
    },
  });

  if (result.error) {
    throw new Error(result.error.message);
  }

  return JSON.stringify(result);
}

export async function logout() {
  const supabase = await createSupabaseClient({
    isBrowser: false,
    readOnly: false,
  });
  await supabase.auth.signOut();
  redirect('/sign-in');
}

export function handleAuthResult(result: any) {
  const parsedResult = JSON.parse(result);

  if (parsedResult.error?.status) {
    switch (parsedResult.error.status) {
      case 400:
        toast.error("Invalid credentials. Please check your email and password.");
        break;
      case 401:
        toast.error("Unauthorized. Please try again.");
        break;
      case 403:
        toast.error("Access forbidden. Contact support if this issue persists.");
        break;
      case 500:
        toast.error("Internal server error. Please try again later.");
        break;
      default:
        toast.error("An unknown error occurred.");
    }
  } else {
    toast.success("You have been logged in.");
  }
}
