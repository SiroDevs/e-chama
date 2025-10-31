import { AUTH_ERROR_CODES, AuthError } from "@/types/auth";

export function mapAuthError(error: any): AuthError {
  const message = error.message || '';
  const status = error.status || 500;

  if (message.includes('email_not_confirmed') || message.includes('Email not confirmed')) {
    return {
      message: 'Please verify your email address before signing in.',
      code: AUTH_ERROR_CODES.EMAIL_NOT_CONFIRMED,
      status: 403,
      details: { canResend: true }
    };
  }
  
  if (message.includes('Invalid login credentials') || status === 400) {
    return {
      message: 'Invalid email or password. Please try again.',
      code: AUTH_ERROR_CODES.INVALID_CREDENTIALS,
      status: 400
    };
  }
  
  if (message.includes('rate limit') || message.includes('too many requests') || status === 429) {
    return {
      message: 'Too many sign in attempts. Please try again in a few minutes.',
      code: AUTH_ERROR_CODES.RATE_LIMITED,
      status: 429
    };
  }
  
  if (message.includes('User not found')) {
    return {
      message: 'No account found with this email address.',
      code: AUTH_ERROR_CODES.USER_NOT_FOUND,
      status: 404
    };
  }

  return {
    message: 'Authentication failed. Please try again.',
    code: AUTH_ERROR_CODES.UNKNOWN_ERROR,
    status: status
  };
}
