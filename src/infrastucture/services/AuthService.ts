"use server";

import { supabase } from "@/lib/supabase/client";
import { Profile } from "@/infrastucture/state/role/profiles";

export async function signInUser(data: { email: string; password: string }) {
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

export async function signUpUser(data: {
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

    return await supabase.auth.signUp({
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

export async function signMeOut() {
  return await supabase.auth.signOut();
}