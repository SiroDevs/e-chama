import { signInMeNow } from "@/services/AuthService";
import { refreshUserProfile } from "@/services/UserService";
import { AUTH_ERROR_CODES, AuthResult } from "@/types/auth";
import { mapAuthError } from "@/utils/mapAuthError";

export async function onSigninAction(payload: {
  email: string;
  password: string;
}): Promise<AuthResult<{ user: any; profile: any; member: any }>> {
  try {
    console.info("🔐 Signin attempt for:", payload.email);
    
    const authResult = await signInMeNow(payload);
    
    if (authResult.error) {
      console.warn("🔐 Authentication failed:", authResult.error.message);
      return {
        success: false,
        error: mapAuthError(authResult.error)
      };
    }

    if (!authResult.data?.user) {
      return {
        success: false,
        error: {
          message: "Authentication failed - no user data returned",
          code: AUTH_ERROR_CODES.USER_NOT_FOUND,
          status: 404
        }
      };
    }

    if (!authResult.data.user.email_confirmed_at) {
      return {
        success: false,
        error: {
          message: "Please verify your email address before signing in.",
          code: AUTH_ERROR_CODES.EMAIL_NOT_CONFIRMED,
          status: 403,
          details: { 
            canResend: true,
            email: authResult.data.user.email 
          }
        }
      };
    }

    console.info("🔐 Refreshing user profile for:", authResult.data.user.id);
    const profileResult = await refreshUserProfile(authResult.data.user);

    if (profileResult.error || !profileResult.data) {
      console.error("🔐 Profile refresh failed:", profileResult.error);
      return {
        success: false,
        error: {
          message: "Failed to load user profile. Please try again.",
          code: AUTH_ERROR_CODES.UNKNOWN_ERROR,
          status: 500
        }
      };
    }

    console.info("🔐 Signin successful for:", payload.email);
    return {
      success: true,
      data: {
        user: authResult.data.user,
        profile: profileResult.data.profile,
        member: profileResult.data.member
      }
    };

  } catch (err) {
    console.error('🔐 Unexpected signin error:', err);
    return {
      success: false,
      error: {
        message: "An unexpected error occurred during sign in",
        code: AUTH_ERROR_CODES.UNKNOWN_ERROR,
        status: 500
      }
    };
  }
}

