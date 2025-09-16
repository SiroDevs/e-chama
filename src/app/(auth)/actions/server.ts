'use server';

import { supabase } from '@/lib/supabase/client';

export async function newUser(userId: string, first_name: string, last_name: string) {
  return await supabase
    .from('profiles')
    .insert([
      {
        id: userId,
        first_name: first_name,
        last_name: last_name
      }
    ]);
}

export async function checkTheUser() {
  const { data: { user } } = await supabase.auth.getUser()
  return user;
}

export async function signInMeNow(data: {
  email: string;
  password: string;
}) {
  try {
    const authResult = await supabase.auth.signInWithPassword(data);
    if (authResult.error || !authResult.data.user) {
      return { data: null, error: authResult.error };
    }

    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', authResult.data.user.id)
      .single();

    if (profileError) {
      console.error("Profile fetch error:", profileError);
      return {
        data: { user: authResult.data.user, profile: null },
        error: profileError
      };
    }

    return {
      data: { user: authResult.data.user, profile: profile },
      error: null
    };
  } catch (err) {
    console.error("Sign in error:", err);
    return {
      data: null,
      error: {
        message: err instanceof Error ? err.message : "Unknown error occurred",
        status: 500
      }
    };
  }
}

export async function signUpMeNow(data: {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
}) {
  try {
    const isProduction = process.env.NODE_ENV === 'production';
    const redirectTo = isProduction 
      ? 'https://echama.vercel.app/verify' 
      : 'http://localhost:3000/verify';
    const authResult = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        data: {
          full_name: data.first_name + ' ' + data.last_name,
        },
        emailRedirectTo: redirectTo,
      },
    });

    if (authResult.error) {
      return { data: null, error: authResult.error };
    }

    if (!authResult.data.user) {
      return {
        data: null,
        error: {
          message: "User creation failed", status: 500
        }
      };
    }

    const profileResult = await newUser(
      authResult.data.user.id,
      data.first_name,
      data.last_name,
    );

    if (profileResult.error) {
      console.error("Profile creation error:", profileResult.error);
      return {
        data: {
          user: authResult.data.user,
          profile: null
        },
        error: profileResult.error
      };
    }

    const { data: profile, error: profileFetchError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', authResult.data.user.id)
      .single();

    if (profileFetchError) {
      console.error("Profile fetch error:", profileFetchError);
      return {
        data: { user: authResult.data.user, profile: null },
        error: profileFetchError
      };
    }

    return {
      data: { user: authResult.data.user, profile: profile },
      error: null
    };
  } catch (err) {
    console.error("Signup error:", err);
    return {
      data: null,
      error: {
        message: err instanceof Error ? err.message : "Unknown error occurred",
        status: 500
      }
    };
  }
}

export async function signMeOut() {
  return await supabase.auth.signOut();
}
