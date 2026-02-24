"use server";

import { AppUser, supabaseUserToAppUser } from "@/domain/entities/User";
import { authService } from "@/infrastructure/supabase/authService";
import { profileService } from "@/infrastructure/supabase/profileService";

export async function signinUserAction(
  email: string,
  password: string
): Promise<AppUser> {
  try {
    const { data, error } = await authService.signinUser(email, password);

    if (error) throw error;
    if (!data.user) throw new Error("No user data returned");

    let profileData = null;
    try {
      const { data: profile } = await profileService.fetchUserProfile(data.user.id)
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

export async function signupUserAction(
  first_name: string,
  last_name: string,
  phone: string,
  email: string,
  password: string
): Promise<AppUser> {
  try {
    const { data, error } = await authService.signupUser(
      first_name + " " + last_name,
      email,
      phone,
      password,
    );

    if (error) throw error;
    if (!data.user) throw new Error("No user data returned");

    let profileData = null;
    try {
      const { data: profile } = await profileService.createProfile({
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

export async function signoutUserAction(): Promise<void> {
  try {
    await authService.signoutUser();
  } catch (error: unknown) {
    console.error("Error signing out user:", error);
    throw new Error(
      `Failed to sign out: ${error instanceof Error ? error.message : "Unknown error"
      }`
    );
  }
}
