import { AppUser } from "../entities/User";

// Abstract repository interface for authentication operations
export interface AuthRepository {
  // Register a new user
  registerUser(email: string, password: string): Promise<AppUser>;

  // Login a user
  loginUser(email: string, password: string): Promise<AppUser>;

  // Logout the current user
  logoutUser(): Promise<void>;

  // Get the current authenticated user
  getCurrentUser(): Promise<AppUser | null>;

  // Subscribe to auth state changes
  onAuthStateChanged(callback: (user: AppUser | null) => void): () => void;
}
