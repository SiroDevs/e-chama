import { AuthResponse, UserResponse } from "@supabase/supabase-js";

import { supabase } from "@/lib/supabase/client";

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
  async updateUserInfo(
    full_name: string,
    phone: string,
  ): Promise<UserResponse> {
    return await supabase.auth.updateUser({
      phone: phone,
      data: {
        full_name: full_name,
      },
    });
  },
  async updateUserEmail(
    email: string,
  ): Promise<UserResponse> {
    return await supabase.auth.updateUser({ email: email });
  },
  async updateUserPassword(
    password: string,
  ): Promise<UserResponse> {
    return await supabase.auth.updateUser({ password: password });
  },
};
