"use server";

import { supabase } from "@/lib/supabase/client";
import { createProfile } from "./ProfileService";
import { Profile } from "@/state/role/profiles";

export async function signInMeNow(data: { email: string; password: string }) {
  try {
    return await supabase.auth.signInWithPassword(data);
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

export async function signMeOut() {
  return await supabase.auth.signOut();
}