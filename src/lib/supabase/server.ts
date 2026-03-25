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
              async setAll(
                cookiesToSet: {
                  name: string;
                  value: string;
                  options?: CookieOptions;
                }[]
              ) {
                try {
                  const store = await cookieStore;
                  for (const { name, value, options } of cookiesToSet) {
                    store.set({ name, value, ...options });
                  }
                } catch {
                  // safe to ignore in RSC
                }
              },
            }),
      },
    }
  );
}

export async function getAdminClient({ readOnly = false } = {}) {
  const cookieStore = cookies();
  console.log('SUPABASE URL:', process.env.NEXT_PUBLIC_SUPABASE_URL);
  console.log('SERVICE ROLE:', process.env.SUPABASE_SERVICE_ROLE);

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE!,
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
              async setAll(
                cookiesToSet: {
                  name: string;
                  value: string;
                  options?: CookieOptions;
                }[]
              ) {
                try {
                  const store = await cookieStore;
                  for (const { name, value, options } of cookiesToSet) {
                    store.set({ name, value, ...options });
                  }
                } catch {
                  // safe to ignore in RSC
                }
              },
            }),
      },
    }
  );
}