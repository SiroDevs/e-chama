import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged as fbOnAuthStateChanged,
  User as FirebaseUser,
} from "firebase/auth";
import { auth } from "./config";
import { AppUser, createUser } from "../../domain/entities/User";

// Helper function to convert Firebase User to our domain User
export const firebaseUserToDomainUser = (
  firebaseUser: FirebaseUser | null
): AppUser | null => {
  if (!firebaseUser) return null;

  return createUser(
    firebaseUser.uid,
    firebaseUser.email,
    firebaseUser.displayName,
    firebaseUser.photoURL
  );
};

// Firebase Auth Service
export const authService = {
  // Register a new user
  async registerUser(email: string, password: string): Promise<AppUser> {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    return firebaseUserToDomainUser(userCredential.user) as AppUser;
  },

  // Login a user
  async loginUser(email: string, password: string): Promise<AppUser> {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    return firebaseUserToDomainUser(userCredential.user) as AppUser;
  },

  // Logout the current user
  async logoutUser(): Promise<void> {
    await signOut(auth);
  },

  // Get current user
  getCurrentUser(): Promise<AppUser | null> {
    return new Promise((resolve) => {
      const unsubscribe = fbOnAuthStateChanged(auth, (user) => {
        unsubscribe();
        resolve(firebaseUserToDomainUser(user));
      });
    });
  },

  // Subscribe to auth state changes
  onAuthStateChanged(callback: (user: AppUser | null) => void): () => void {
    return fbOnAuthStateChanged(auth, (user) => {
      callback(firebaseUserToDomainUser(user));
    });
  },
};
