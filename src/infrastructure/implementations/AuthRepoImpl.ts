import { AuthResponse } from "@supabase/supabase-js";

import { AppUser } from "@/domain/entities/app-user";
import { AuthRepo } from "../../domain/repositories/auth.repo";
import { createAuthService } from "../services/authService";
import { getServerClient } from "@/lib/supabase/server";
import { supabase } from "@/lib/supabase/client";

export class AuthRepoImpl implements AuthRepo {
  async signupUser(full_name: string, phone: string, email: string, password: string): Promise<AuthResponse> {
    const supabase = await getServerClient();
    const authService = createAuthService(supabase);
    return authService.signupUser(full_name, phone, email, password);
  }

  async signinUser(email: string, password: string): Promise<AuthResponse> {
    const supabase = await getServerClient();
    const authService = createAuthService(supabase);
    return authService.signinUser(email, password);
  }

  async signoutUser(): Promise<void> {
    const supabase = await getServerClient();
    const authService = createAuthService(supabase);
    return authService.signoutUser();
  }

  async getCurrentUser(): Promise<AppUser | null> {
    const supabase = await getServerClient();
    const authService = createAuthService(supabase);
    return await authService.getCurrentUser();
  }

  onAuthStateChanged(callback: (user: AppUser | null) => void): () => void {
    // const supabase = getServerClient();
    const authService = createAuthService(supabase);
    return authService.onAuthStateChanged(callback);
  }
}
