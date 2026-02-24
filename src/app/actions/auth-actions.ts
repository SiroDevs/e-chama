"use server";

import { User } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase/client";
import { AppUser, createUser } from "@/domain/entities/User";
import { fetchUserProfile } from "@/infrastructure/supabase/userService";
import { createProfile } from "@/infrastructure/supabase/profileService";

interface AuthData {
  user: User;
  session: any;
  profile?: any;
}

const supabaseUserToAppUser = (data: AuthData | null): AppUser | null => {
  if (!data || !data.user) return null;

  let fullName = data.user.email?.split('@')[0] || 'User';

  if (data.profile) {
    if (data.profile.first_name || data.profile.last_name) {
      fullName = `${data.profile.first_name || ''} ${data.profile.last_name || ''}`.trim();
    }
  } else if (data.user.user_metadata) {
    const firstName = data.user.user_metadata.first_name || '';
    const lastName = data.user.user_metadata.last_name || '';
    if (firstName || lastName) {
      fullName = `${firstName} ${lastName}`.trim();
    }
  }

  const avatar = data.profile?.avatar || data.user.user_metadata?.avatar;

  return createUser(
    data.user.id,
    data.user.email || '',
    fullName,
    avatar
  );
};

export async function signinUserAction(
  email: string,
  password: string
): Promise<AppUser> {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) throw error;
    if (!data.user) throw new Error("No user data returned");

    let profileData = null;
    try {
      const { data: profile } = await fetchUserProfile(data.user.id)
      profileData = profile;
    } catch (profileError) {
      console.log("No profile found for user:", profileError);
    }

    const domainUser = supabaseUserToAppUser({
      user: data.user,
      session: data.session,
      profile: profileData
    });

    if (!domainUser) {
      throw new Error("Failed to convert user to app user");
    }

    return domainUser;
  } catch (error: unknown) {
    console.error("Error logging in user:", error);
    throw new Error(
      `Failed to login: ${error instanceof Error ? error.message : "Unknown error"
      }`
    );
  }
}

// Register a new user (server action)
export async function signupUserAction(
  first_name: string,
  last_name: string,
  email: string,
  phone: string,
  password: string
): Promise<AppUser> {
  try {
    const isProduction = process.env.NODE_ENV === "production";
    const redirectTo = isProduction
      ? "https://echama.vercel.app/verify"
      : "http://localhost:3000/verify";

    const { data, error } = await supabase.auth.signUp({
      email: email,
      phone: phone,
      password: password,
      options: {
        data: {
          full_name: first_name + " " + last_name,
        },
        emailRedirectTo: redirectTo,
      },
    });

    if (error) throw error;
    if (!data.user) throw new Error("No user data returned");
    
    let profileData = null;
    try {
      const { data: profile } = await createProfile({
        id: data.user.id,
        first_name: first_name,
        last_name: last_name,
      });
      profileData = profile;
    } catch (profileError) {
      console.log("No profile found for user:", profileError);
    }

    const domainUser = supabaseUserToAppUser({
      user: data.user,
      session: data.session,
      profile: profileData
    });

    if (!domainUser) {
      throw new Error("Failed to convert user to app user");
    }

    return domainUser;
  } catch (error: unknown) {
    console.error("Error registering user:", error);
    throw new Error(
      `Failed to register: ${error instanceof Error ? error.message : "Unknown error"
      }`
    );
  }
}

// Signout a user (server action)
export async function signoutUserAction(): Promise<void> {
  try {
    await supabase.auth.signOut();
  } catch (error: unknown) {
    console.error("Error signing out user:", error);
    throw new Error(
      `Failed to sign out: ${error instanceof Error ? error.message : "Unknown error"
      }`
    );
  }
}
