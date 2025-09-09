import { getServerClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { supabase } from '@/lib/supabase/client';

export async function checkTheUser() {
  const { data: { user } } = await supabase.auth.getUser()
  return user;
}

export async function signInMeNow(data: {
  email: string;
  password: string;
}) {
  const supabase = await getServerClient();
  const result = await supabase.auth.signInWithPassword(data);

  return JSON.stringify(result);
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

export async function logout() {
  const supabase = await getServerClient();
  await supabase.auth.signOut();
  redirect('/');
}
