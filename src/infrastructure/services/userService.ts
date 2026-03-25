import { AuthResponse, UserResponse } from "@supabase/supabase-js";

// import { supabase } from "@/lib/supabase/client";
import { getAdminClient, getServerClient } from "@/lib/supabase/server";

export const userService = {
  async createUser(
    full_name: string,
    email: string,
    phone: string,
    password: string,
  ): Promise<AuthResponse> {
    const supabase = await getServerClient();
    const isProduction = process.env.NODE_ENV === "production";
    const redirectTo = isProduction
      ? "https://echama.vercel.app/verify"
      : "http://localhost:3000/verify";

    return await supabase.auth.signUp({
      email,
      phone,
      password,
      options: {
        data: { full_name },
        emailRedirectTo: redirectTo,
      },
    });
  },

  async updateUserInfo(full_name: string, phone: string): Promise<UserResponse> {
    const supabase = await getAdminClient();
    const { data, error } = await supabase.auth.updateUser({
      data: { full_name, phone },
    });

    if (error) throw error;
    return { data, error: null };
  },

  async updateUserEmail(email: string): Promise<UserResponse> {
    const supabase = await getAdminClient();
    const { data, error } = await supabase.auth.updateUser({ email });

    if (error) throw error;
    return { data, error: null };
  },

  async updateUserPassword(password: string): Promise<UserResponse> {
    const supabase = await getAdminClient();
    const { data, error } = await supabase.auth.updateUser({ password });

    if (error) throw error;
    return { data, error: null };
  },
};