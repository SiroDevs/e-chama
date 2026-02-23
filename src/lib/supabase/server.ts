'use server';

import {
  createServerClient,
  type CookieOptions,
} from '@supabase/ssr';
import { cookies } from 'next/headers';

export async function getServerClient({ readOnly = false } = {}) {
  const cookieStore = cookies();
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        async getAll() {
          return (await cookieStore).getAll().map(({ name, value }) => ({
            name,
            value,
          }));
        },
        ...(readOnly
          ? {}
          : {
              setAll(
                cookiesToSet: {
                  name: string;
                  value: string;
                  options?: CookieOptions;
                }[]
              ) {
                try {
                  cookiesToSet.forEach(async ({ name, value, options }) =>
                    (await cookieStore).set({ name, value, ...options })
                  );
                } catch {
                  // safe to ignore on RSC
                }
              },
            }),
      },
    }
  );
}

export async function getAdminClient({ readOnly = false } = {}) {
  const cookieStore = cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SERVICE_ROLE!,
    {
      cookies: {
        async getAll() {
          return (await cookieStore).getAll().map(({ name, value }) => ({
            name,
            value,
          }));
        },
        ...(readOnly
          ? {}
          : {
              setAll(
                cookiesToSet: {
                  name: string;
                  value: string;
                  options?: CookieOptions;
                }[]
              ) {
                try {
                  cookiesToSet.forEach(async ({ name, value, options }) =>
                    (await cookieStore).set({ name, value, ...options })
                  );
                } catch {
                  // safe to ignore on RSC
                }
              },
            }),
      },
    }
  );
}
