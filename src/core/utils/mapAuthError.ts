import { AUTH_ERROR_CODES, AuthError } from "@/data/types/auth";

export function mapAuthError(error: any): AuthError {
  const message = error.message || '';
  const status = error.status || 500;

  if (message.includes('User already registered') ||
    message.includes('email already exists') ||
    message.includes('already exists')) {
    return {
      message: 'An account with this email already exists. Please sign in instead.',
      code: AUTH_ERROR_CODES.EMAIL_ALREADY_EXISTS,
      status: 409
    };
  }

  if (message.includes('Password should be at least')) {
    return {
      message: 'Password is too weak. Please use a stronger password.',
      code: AUTH_ERROR_CODES.WEAK_PASSWORD,
      status: 400
    };
  }

  if (message.includes('Invalid email')) {
    return {
      message: 'Please enter a valid email address.',
      code: AUTH_ERROR_CODES.INVALID_EMAIL,
      status: 400
    };
  }

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
      message: 'Too many attempts. Please try again in a few minutes.',
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
  
  if (message.includes('profile') || message.includes('Profile')) {
    return {
      message: 'There was an issue creating your profile. Please try again.',
      code: AUTH_ERROR_CODES.PROFILE_CREATION_FAILED,
      status: status
    };
  }

  return {
    message: 'Authentication failed. Please try again.',
    code: AUTH_ERROR_CODES.UNKNOWN_ERROR,
    status: status
  };
}