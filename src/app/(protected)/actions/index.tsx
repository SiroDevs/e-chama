'use server';

import { getServerClient } from '@/lib/supabase/server';
import { unstable_noStore as noStore } from 'next/cache';

export async function readUserSession() {
  noStore();
  const supabase = await getServerClient();
  const session = await supabase.auth.getSession();
  return session;
}

export async function readAccess() {
  noStore();

  const supabase = await getServerClient();

  const permissions = await supabase
    .from("permissions")
    .select("*")
    .single();

  return permissions;
}
