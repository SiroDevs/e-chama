"use server";

import { signUpUser } from "@/services/AuthService";
import { AUTH_ERROR_CODES, AuthResult } from "@/types/auth";
import { mapAuthError } from "@/utils/mapAuthError";

export async function onSignupAction(payload: {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
}): Promise<AuthResult<{ user: any; profile: any; member: any }>> {
  try {
    console.info("Signup attempt for:", payload.email);
    
    const { data, error } = await signUpUser({
      email: payload.email,
      phone: "",
      password: payload.password,
      profile: {
        id: "",
        first_name: payload.first_name,
        last_name: payload.last_name,
      },
    });

    if (error) {
      console.warn("Signup failed:", error.message);
      return {
        success: false,
        error: mapAuthError(error)
      };
    }

    if (!data?.user) {
      return {
        success: false,
        error: {
          message: "Signup failed - no user data returned",
          code: AUTH_ERROR_CODES.USER_NOT_FOUND,
          status: 404
        }
      };
    }

    console.info("Signup successful for:", payload.email);
    return {
      success: true,
      data: {
        user: data.user,
        profile: data.profile,
        member: data.member
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