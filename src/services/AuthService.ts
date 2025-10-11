"use server";

import { supabase } from "@/lib/supabase/client";
import { createProfile } from "./ProfileService";
import { handleAuthResponse } from "./UserService";
import { Profile } from "@/state/role/profiles";

export async function signInMeNow(data: { email: string; password: string }) {
  try {
    const authResult = await supabase.auth.signInWithPassword(data);
    console.info("Did we signin the user?");
    if (authResult.error || !authResult.data.user) {
      console.info("We failed to signin the user");
      return { data: null, error: authResult.error };
    }
    return await handleAuthResponse(authResult.data.user);
  } catch (err) {
    console.error("Authethication error:", err);
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
  email: string;
  phone: string;
  password: string;
  profile: Profile;
}) {
  try {
    const isProduction = process.env.NODE_ENV === "production";
    const redirectTo = isProduction
      ? "https://echama.vercel.app/verify"
      : "http://localhost:3000/verify";

    const authResult = await supabase.auth.signUp({
      email: data.email,
      phone: data.phone,
      password: data.password,
      options: {
        data: {
          full_name: data.profile.first_name + " " + data.profile.last_name,
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
    data.profile.id = user.id;
    const profileResult = await createProfile(data.profile);

    if (profileResult.error) {
      console.error("Profile creation error:", profileResult.error);
      return {
        data: { user, profile: null, member: null },
        error: profileResult.error,
      };
    }

    return {
      data: { user, profileResult },
      error: null,
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