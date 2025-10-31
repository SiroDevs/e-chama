"use server";

import { signUpUser } from "@/services/AuthService";
import { createProfile } from "@/services/ProfileService";
import { AUTH_ERROR_CODES, AuthResult } from "@/types/auth";
import { mapAuthError } from "@/utils/mapAuthError";

export async function onSignupAction(payload: {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
}): Promise<AuthResult<{ user: any; profile: any; member: any }>> {
  try {
    const authResult = await signUpUser({
      email: payload.email,
      phone: "",
      password: payload.password,
      profile: {
        id: "",
        first_name: payload.first_name,
        last_name: payload.last_name,
      },
    });

    if (authResult.error) {
      console.warn("Signup failed:", authResult.error.message);
      return {
        success: false,
        error: mapAuthError(authResult.error)
      };
    }

    if (!authResult.data?.user) {
      return {
        success: false,
        error: {
          message: "Signup failed - no user data returned",
          code: AUTH_ERROR_CODES.USER_NOT_FOUND,
          status: 404
        }
      };
    }

    const user = authResult.data.user;
    console.info("Creating profile for user:", user.id);
    
    const profileResult = await createProfile({
      id: user.id,
      first_name: payload.first_name,
      last_name: payload.last_name,
    });

    if (profileResult.error) {
      console.error("Profile creation failed:", profileResult.error);
      return {
        success: false,
        error: {
          message: "Account created but profile setup failed. Please contact support.",
          code: AUTH_ERROR_CODES.PROFILE_CREATION_FAILED,
          status: 500
        }
      };
    }

    console.info("Signup successful for:", payload.email);
    return {
      success: true,
      data: {
        user: user,
        profile: profileResult.data,
        member: null
      }
    };

  } catch (err) {
    console.error('Unexpected signup error:', err);
    return {
      success: false,
      error: {
        message: "An unexpected error occurred during sign up",
        code: AUTH_ERROR_CODES.UNKNOWN_ERROR,
        status: 500
      }
    };
  }
}
