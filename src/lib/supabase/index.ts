'use server';
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import {
  type CookieOptions,
  createBrowserClient,
  createServerClient,
} from '@supabase/ssr';
import { cookies } from 'next/headers';

// ! BATAS ITERASI 1 (below)
// // Supabase client untuk operasi read-only (misalnya hanya mengambil data)
// export async function createSupbaseServerClientReadOnly() {
//   const cookieStore = cookies();

//   return createServerClient(
//     process.env.NEXT_PUBLIC_SUPABASE_URL!,
//     process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
//     {
//       cookies: {
//         get(name: string) {
//           return cookieStore.get(name)?.value;
//         },
//       },
//     }
//   );
// }

// // Supabase client untuk operasi umum (misalnya autentikasi dan operasi lainnya)
// export async function createSupbaseServerClient() {
//   const cookieStore = cookies();

//   return createServerClient(
//     process.env.NEXT_PUBLIC_SUPABASE_URL!,
//     process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
//     {
//       cookies: {
//         get(name: string) {
//           return cookieStore.get(name)?.value;
//         },
//         set(name: string, value: string, options: CookieOptions) {
//           cookieStore.set({ name, value, ...options });
//         },
//         remove(name: string, options: CookieOptions) {
//           cookieStore.set({ name, value: '', ...options });
//         },
//       },
//     }
//   );
// }

// // Supabase Admin client untuk akses dengan peran admin (misalnya, melakukan perubahan data yang sensitif)
// export async function createSupbaseAdmin() {
//   return createClient(
//     process.env.NEXT_PUBLIC_SUPABASE_URL!,
//     process.env.SERVICE_ROLE!,
//     {
//       auth: {
//         autoRefreshToken: true,
//         persistSession: true,
//       },
//     }
//   );
// }

// // Supabase Client untuk keperluan umum (misalnya autentikasi dan akses data)
// export async function createSupbaseClient() {
//   return createClient(
//     process.env.NEXT_PUBLIC_SUPABASE_URL!,
//     process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
//     {
//       auth: {
//         autoRefreshToken: true,
//         persistSession: true,
//       },
//     }
//   );
// }

// export async function createSupbaseBrowserClient() {
//   return createBrowserClient(
//     process.env.NEXT_PUBLIC_SUPABASE_URL!,
//     process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
//   );
// }

// ! BATAS BATAS ITERASI 2 (below)
// export async function createSupbaseServerClient({ readOnly = false } = {}) {
//   const cookieStore = cookies();

//   return createServerClient(
//     process.env.NEXT_PUBLIC_SUPABASE_URL!,
//     process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
//     {
//       cookies: {
//         get(name: string) {
//           return cookieStore.get(name)?.value;
//         },
//         ...(readOnly
//           ? {}
//           : {
//               set(name: string, value: string, options: CookieOptions) {
//                 cookieStore.set({ name, value, ...options });
//               },
//               remove(name: string, options: CookieOptions) {
//                 cookieStore.set({ name, value: '', ...options });
//               },
//             }),
//       },
//     }
//   );
// }

// export async function createSupbaseBrowserClient({ isBrowser = false } = {}) {
//   if (isBrowser) {
//     return createBrowserClient(
//       process.env.NEXT_PUBLIC_SUPABASE_URL!,
//       process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
//     );
//   }

//   return createClient(
//     process.env.NEXT_PUBLIC_SUPABASE_URL!,
//     process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
//     {
//       auth: {
//         autoRefreshToken: true,
//         persistSession: true,
//       },
//     }
//   );
// }

/*
1. Read-Only Server Client (SPECIFY READ)
Function: createSupbaseServerClient({ readOnly: true })
Purpose:
This client is designed for server-side operations where you only need to read data from Supabase without modifying any session state or cookies.
It is useful for scenarios such as fetching data for display in server-rendered pages or APIs where you do not want to alter the user's session or cookie state.
This ensures that sensitive operations that could change user state are avoided, providing a layer of safety when only data retrieval is needed.

2. Full-Featured Server Client (SPECIFY CRUD)
Function: createSupbaseServerClient({ readOnly: false })
Purpose:
This client allows for full CRUD (Create, Read, Update, Delete) operations on the server side, including the ability to set and remove cookies.
It is suitable for scenarios where you need to manage user sessions, such as logging in or out, updating user information, or performing any operations that require modifying the session state.
This client is essential for server-side logic that interacts with user authentication and session management.

3. Browser Client (SPECIFY BROWSER ONLY)
Function: createSupbaseBrowserClient({ isBrowser: true })
Purpose:
This client is specifically designed for client-side operations in the browser. It uses createBrowserClient, which is optimized for managing user sessions and authentication in a browser environment.
It is useful for scenarios where you need to perform operations that require real-time updates, such as listening for changes in user authentication state or interacting with the database directly from the client.
This client is ideal for single-page applications (SPAs) where user interactions and data updates happen frequently without full page reloads.

4. Server-Fallback Client (GENERAL ALL YOU CAN DO)
Function: createSupbaseBrowserClient({ isBrowser: false })
Purpose:
This client is created when the isBrowser parameter is set to false, falling back to a standard Supabase client using createClient.
It is suitable for server-side rendering scenarios where you still need to manage user sessions and perform database operations, but you are not in a browser context.
This client can handle session persistence and token auto-refreshing, making it useful for server-rendered pages that require user authentication and data fetching.
*/

// ! BATAS ITERASI 3 (below)
// Unified Supabase Client Function
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
