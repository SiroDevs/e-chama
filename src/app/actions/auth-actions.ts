"use server";

import { supabase } from "@/lib/supabase/client";
import { AppUser, createUser } from "@/domain/entities/User";
import { User } from "@supabase/supabase-js";
import { fetchUserProfile } from "@/infrastructure/supabase/UserService";

interface AuthData {
  user: User;
  session: any;
  profile?: any;
}

const supabaseUserToDomainUser = (data: AuthData | null): AppUser | null => {
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

export async function loginUserAction(
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

    const domainUser = supabaseUserToDomainUser({
      user: data.user,
      session: data.session,
      profile: profileData
    });
    
    if (!domainUser) {
      throw new Error("Failed to convert user to domain user");
    }

    return domainUser;
  } catch (error: unknown) {
    console.error("Error logging in user:", error);
    throw new Error(
      `Failed to login: ${
        error instanceof Error ? error.message : "Unknown error"
      }`
    );
  }
}