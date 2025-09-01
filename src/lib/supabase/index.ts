'use server';

import {
  type CookieOptions,
  createBrowserClient,
  createServerClient,
} from '@supabase/ssr';
import { cookies } from 'next/headers';

export async function createSupabaseClient({
  isBrowser = false,
  readOnly = false,
} = {}) {
  const cookieStore = cookies();

  if (isBrowser) {
    return createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );
  }

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
        ...(readOnly
          ? {}
          : {
              set(name: string, value: string, options: CookieOptions) {
                cookieStore.set({ name, value, ...options });
              },
              remove(name: string, options: CookieOptions) {
                cookieStore.set({ name, value: '', ...options });
              },
            }),
      },
    }
  );
}

// Unified Supabase Admin Function
export async function createSupabaseAdmin({
  isBrowser = false,
  readOnly = false,
} = {}) {
  const cookieStore = cookies();

  if (isBrowser) {
    return createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SERVICE_ROLE!
    );
  }

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SERVICE_ROLE!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
        ...(readOnly
          ? {}
          : {
              set(name: string, value: string, options: CookieOptions) {
                cookieStore.set({ name, value, ...options });
              },
              remove(name: string, options: CookieOptions) {
                cookieStore.set({ name, value: '', ...options });
              },
            }),
      },
    }
  );
}
