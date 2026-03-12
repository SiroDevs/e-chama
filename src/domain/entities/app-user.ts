import { User } from "@supabase/supabase-js";

interface AuthData {
  user: User;
  session: any;
  profile?: any;
}

export const sbUserToAppUser = (data: AuthData | null): AppUser | null => {
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

export interface AppUser {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  created_at?: string;
}

export const createUser = (
  uid: string,
  email: string | null,
  displayName: string | null = null,
  photoURL: string | null = null,
): AppUser => {
  return {
    uid,
    email,
    displayName,
    photoURL,
    created_at: new Date().toISOString(),
  };
};
