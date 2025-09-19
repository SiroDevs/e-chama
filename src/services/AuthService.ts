"use server";

import { supabase } from "@/lib/supabase/client";
import { createProfile } from "./ProfileService";
import { handleAuthResponse, fetchUserMember } from "./UserService";

export async function signInMeNow(data: { email: string; password: string }) {
  try {
    const authResult = await supabase.auth.signInWithPassword(data);
    return await handleAuthResponse(authResult);
  } catch (err) {
    console.error("Sign in error:", err);
    return {
      data: null,
      error: {
        message: err instanceof Error ? err.message : "Unknown error occurred",
        status: 500,
      },
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
    const isProduction = process.env.NODE_ENV === "production";
    const redirectTo = isProduction
      ? "https://echama.vercel.app/verify"
      : "http://localhost:3000/verify";

    const authResult = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        data: {
          full_name: data.first_name + " " + data.last_name,
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
          message: "User creation failed",
          status: 500,
        },
      };
    }

    const user = authResult.data.user;

    const { data: profile, error: profileError } = await createProfile(
      user.id,
      data.first_name,
      data.last_name
    );

    if (profileError) {
      console.error("Profile creation error:", profileError);
      return {
        data: { user, profile: null, member: null },
        error: profileError,
      };
    }

    const { data: member, error: memberError } = await fetchUserMember(
      user.id,
      profile?.group_id || null
    );

    return {
      data: {
        user,
        profile,
        member: memberError ? null : member,
      },
      error: memberError,
    };

  } catch (err) {
    console.error("Signup error:", err);
    return {
      data: null,
      error: {
        message: err instanceof Error ? err.message : "Unknown error occurred",
        status: 500,
      },
    };
  }
}

export async function verifyToken(token: string) {
  try {
    const { data, error } = await supabase.auth.verifyOtp({
      token_hash: token,
      type: "signup",
    })

    if (error) {
      console.error('Verification error:', error)
      return { data: null, error }
    }

    return { data, error: null }
  } catch (err) {
    console.error('Unexpected verification error:', err)
    return {
      data: null,
      error: {
        message: 'An unexpected error occurred during verification',
        name: 'UnexpectedError'
      }
    }
  }
}

export async function signMeOut() {
  return await supabase.auth.signOut();
}