import { AppUser } from "@/domain/entities/app.user.entity";
import { AuthRepo } from "../../domain/repos/auth.repo";
import { authService } from "../supabase/authService";
import { AuthResponse } from "@supabase/supabase-js";

// Implementation of the Auth Repository
export class AuthRepoImpl implements AuthRepo {
  async signupUser(full_name: string, phone: string, email: string, password: string): Promise<AuthResponse> {
    return authService.signupUser(full_name, phone, email, password);
  }

  async signinUser(email: string, password: string): Promise<AuthResponse> {
    return authService.signinUser(email, password);
  }

  async signoutUser(): Promise<void> {
    return authService.signoutUser();
  }

  async getCurrentUser(): Promise<AppUser | null> {
    return await authService.getCurrentUser();
  }

  onAuthStateChanged(callback: (user: AppUser | null) => void): () => void {
    return authService.onAuthStateChanged(callback);
  }
}
