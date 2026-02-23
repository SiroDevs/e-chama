// Domain entity for User
export interface AppUser {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  createdAt?: Date;
}

// Create a new User factory function
export const createUser = (
  uid: string,
  email: string | null,
  displayName: string | null = null,
  photoURL: string | null = null
): AppUser => {
  return {
    uid,
    email,
    displayName,
    photoURL,
    createdAt: new Date(),
  };
};
