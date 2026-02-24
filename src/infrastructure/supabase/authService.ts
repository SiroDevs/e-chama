import { supabase } from "@/lib/supabase/client";
import { AuthResponse, UserResponse } from "@supabase/supabase-js";
import { AppUser, supabaseUserToAppUser } from "@/domain/entities/app.user.entity";

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

  async getCurrentUser(): Promise<UserResponse> {
    return await supabase.auth.getUser();
  },
  
  onAuthStateChanged(callback: (user: AppUser | null) => void): () => void {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log("Auth state changed:", event);
        const user = session?.user || null;
        callback(
          supabaseUserToAppUser({ user: session?.user!, session: session, profile: null })
        );
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  },
};
