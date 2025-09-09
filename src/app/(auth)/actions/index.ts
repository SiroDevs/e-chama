'use server';

import { redirect } from 'next/navigation';

import { createSupabaseClient } from '@/lib/supabase';

export async function checkTheUser() {
  const supabase = await createSupabaseClient({
    isBrowser: false,
    readOnly: false,
  });
  const { data: { user } } = await supabase.auth.getUser()
  return user;
}

export async function signInMeNow(data: {
  email: string;
  password: string;
}) {
  const supabase = await createSupabaseClient({
    isBrowser: false,
    readOnly: false,
  });

  const result = await supabase.auth.signInWithPassword(data);

  return JSON.stringify(result);
}

export async function signUpMeNow(data: {
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

  return JSON.stringify(result);
}

export async function logout() {
  const supabase = await createSupabaseClient({
    isBrowser: false,
    readOnly: false,
  });
  await supabase.auth.signOut();
  redirect('/');
}
