import { AuthResponse } from "@supabase/supabase-js";

import { supabase } from "@/lib/supabase/client";
import { AppUser, sbUserToAppUser } from "@/domain/entities/app-user";

export const authService = {
  async signupUser(
    full_name: string,
    email: string,
    phone: string,
    password: string,
  ): Promise<AuthResponse> {
    const isProduction = process.env.NODE_ENV === "production";
    const redirectTo = isProduction
      ? "https://echama.vercel.app/verify"
      : "http://localhost:3000/verify";
    return await supabase.auth.signUp({
      email: email,
      phone: phone,
      password: password,
      options: {
        data: {
          full_name: full_name,
        },
        emailRedirectTo: redirectTo,
      },
    });
  },

  async signinUser(email: string, password: string): Promise<AuthResponse> {
    return await supabase.auth.signInWithPassword({
      email,
      password
    });
  },

  async signoutUser(): Promise<void> {
    await supabase.auth.signOut();
  },

  async getCurrentUser(): Promise<AppUser | null> {
    try {
      const { data: { session }, error } = await supabase.auth.getSession();
      
      if (error) {
        console.error("Error getting session:", error);
        return null;
      }

      if (!session?.user) {
        return null;
      }

      return sbUserToAppUser({ user: session?.user, session: session, profile: null });
    } catch (error) {
      console.error("Unexpected error in getCurrentUser:", error);
      return null;
    }
  },
  
  onAuthStateChanged(callback: (user: AppUser | null) => void): () => void {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log("Auth state changed:", event);
        const user = session?.user || null;
        callback(
          sbUserToAppUser({ user: session?.user!, session: session, profile: null })
        );
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  },
};
