import { UserResponse } from "@supabase/supabase-js";

import { getAdminClient } from "@/lib/supabase/server";

export const userService = {
  async createUser(
    full_name: string,
    email: string,
    phone: string,
    password: string,
  ): Promise<UserResponse> {
    const supabase = await getAdminClient();
    return await supabase.auth.admin.createUser({
      email: email,
      phone: phone,
      password: password,
      user_metadata: { name: full_name }

    });;
  },

  async updateUserInfo(userId: string, full_name: string, phone: string): Promise<UserResponse> {
    const supabase = await getAdminClient();
    return await supabase.auth.admin.updateUserById(
      userId,
      { 
        user_metadata: { name: full_name },
        phone: phone,
      }
    );
  },

  async updateUserEmail(userId: string, email: string): Promise<UserResponse> {
    const supabase = await getAdminClient();
    return await supabase.auth.admin.updateUserById(
      userId,
      { email: email }
    );
  },

  async updateUserPassword(userId: string, password: string): Promise<UserResponse> {
    const supabase = await getAdminClient();
    return await supabase.auth.admin.updateUserById(
      userId,
      { password: password }
    );
  },
};