import { AuthResponse } from "@supabase/supabase-js";
import { AppUser } from "../entities/User";

// Abstract repository interface for authentication operations
export interface AuthRepo {
  // signup a new user
  signupUser(full_name: string, phone: string, email: string, password: string): Promise<AuthResponse>;

  // signin a user
  signinUser(email: string, password: string): Promise<AuthResponse>;

  // signout the current user
  signoutUser(): Promise<void>;

  // Get the current authenticated user
  getCurrentUser(): Promise<AppUser | null>;

  // Subscribe to auth state changes
  onAuthStateChanged(callback: (user: AppUser | null) => void): () => void;
}
