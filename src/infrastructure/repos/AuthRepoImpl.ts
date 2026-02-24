import { AppUser, supabaseUserToAppUser } from "@/domain/entities/app.user.entity";
import { AuthRepo } from "../../domain/repos/auth.repo";
import { authService } from "../supabase/authService";
import { AuthResponse } from "@supabase/supabase-js";
import { profileService } from "../supabase/profileService";

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
    const { data, error } = await authService.getCurrentUser();
    if (error) throw error;
    if (!data.user) throw new Error("No user data returned");

    try {
      const { data: profile } = await profileService.fetchUserProfile(data.user.id)
      return supabaseUserToAppUser({ user: data.user, session: null, profile: profile });
    } catch (profileError) {
      console.log("No profile found for user:", profileError);
      return null;
    }
  }

  onAuthStateChanged(callback: (user: AppUser | null) => void): () => void {
    return authService.onAuthStateChanged(callback);
  }
}
