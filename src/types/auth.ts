export type AuthError = {
  message: string;
  code: string;
  status: number;
  details?: any;
};

export type AuthResult<T = any> = 
  | { success: true; data: T }
  | { success: false; error: AuthError };

export const AUTH_ERROR_CODES = {
  EMAIL_NOT_CONFIRMED: 'email_not_confirmed',
  INVALID_CREDENTIALS: 'invalid_credentials',
  RATE_LIMITED: 'rate_limited',
  NETWORK_ERROR: 'network_error',
  UNKNOWN_ERROR: 'unknown_error',
  USER_NOT_FOUND: 'user_not_found',
} as const;