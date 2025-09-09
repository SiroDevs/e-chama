'use server';

import { supabase } from '@/lib/supabase/client';
import { redirect } from 'next/navigation';

export async function checkTheUser() {
  const { data: { user } } = await supabase.auth.getUser()
  return user;
}

export async function signInMeNow(data: {
  email: string;
  password: string;
}) {
  // const supabase = await getServerClient();
  return await supabase.auth.signInWithPassword(data);
}

export async function signUpMeNow(data: {
  email: string;
  password: string;
  full_name: string;
}) {
  return await supabase.auth.signUp({
    email: data.email,
    password: data.password,
    options: {
      data: {
        full_name: data.full_name,
      },
    },
  });
}

export async function signMeOut() {
  return supabase.auth.signOut();
}
