'use server';

import {
  createBrowserClient,
  createServerClient,
  type CookieOptions
} from '@supabase/ssr';
import { cookies } from 'next/headers';

export async function createSupabaseClient({
  isBrowser = false,
  readOnly = false
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
        async getAll() {
          return (await cookieStore).getAll().map(({ name, value }) => ({ name, value }));
        },
        ...(readOnly
          ? {}
          : {
              setAll(cookiesToSet: { name: string; value: string; options?: CookieOptions }[]) {
                try {
                  cookiesToSet.forEach(async ({ name, value, options }) =>
                    (await cookieStore).set({ name, value, ...options })
                  );
                } catch {
                  // If called from a Server Component, setAll may error.
                  // This is safe if session management is handled elsewhere.
                }
              },
            }),
      },
    }
  );
}

export async function createSupabaseAdmin({
  isBrowser = false,
  readOnly = false
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
        async getAll() {
          return (await cookieStore).getAll().map(({ name, value }) => ({ name, value }));
        },
        ...(readOnly
          ? {}
          : {
              setAll(cookiesToSet: { name: string; value: string; options?: CookieOptions }[]) {
                try {
                  cookiesToSet.forEach(async ({ name, value, options }) =>
                    (await cookieStore).set({ name, value, ...options })
                  );
                } catch {
                  // Safe to ignore if called from a Server Component
                }
              },
            }),
      },
    }
  );
}
