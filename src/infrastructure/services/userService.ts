import { AuthResponse, SupabaseClient, UserResponse } from "@supabase/supabase-js";

import { supabase } from "@/lib/supabase/client";
import { getServerClient } from "@/lib/supabase/server";

export const userService = {
  async createUser(
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
    const sbServeClient = await getServerClient();
    const { data, error } = await sbServeClient.auth.updateUser({
      data: { full_name, phone },
    });

    if (error) throw error;
    return { data, error: null };
  },

  async updateUserEmail(email: string): Promise<UserResponse> {
    const sbServeClient = await getServerClient();
    const { data, error } = await sbServeClient.auth.updateUser({ email });

    if (error) throw error;
    return { data, error: null };
  },

  async updateUserPassword(password: string): Promise<UserResponse> {
    const sbServeClient = await getServerClient();
    const { data, error } = await sbServeClient.auth.updateUser({ password });

    if (error) throw error;
    return { data, error: null };
  },
};