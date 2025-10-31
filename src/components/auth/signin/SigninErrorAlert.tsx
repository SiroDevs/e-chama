import { Alert, Button, Typography, AlertProps } from '@mui/material';
import { useState } from 'react';
import { AuthError } from '@/types/auth';
import { resendVerificationEmail } from '@/services/VerifyService';

interface SigninErrorAlertProps extends Omit<AlertProps, 'action'> {
  error: AuthError;
  userEmail?: string;
  onRetry?: () => void;
  onVerificationSent?: () => void;
  showDebugInfo?: boolean;
}

export function SigninErrorAlert({
  error,
  userEmail,
  onRetry,
  onVerificationSent,
  showDebugInfo = process.env.NODE_ENV === 'development',
  ...alertProps
}: SigninErrorAlertProps) {
  const [isResending, setIsResending] = useState(false);

  const handleResendVerification = async () => {
    if (!userEmail) return;
    
    setIsResending(true);
    try {
      const result = await resendVerificationEmail(userEmail);
      
      if (result.success) {
        onVerificationSent?.();
      } else {
        // You could show a toast or handle the error here
        console.error('Failed to resend verification email:', result.error);
      }
    } catch (err) {
      console.error('Error resending verification:', err);
    } finally {
      setIsResending(false);
    }
  };

  const getActions = () => {
    if (error.code === 'email_not_confirmed') {
      return (
        <Button
          color="inherit"
          size="small"
          onClick={handleResendVerification}
          disabled={isResending || !userEmail}
        >
          {isResending ? 'Sending...' : 'Resend Email'}
        </Button>
      );
    }
    
    if (error.code !== 'VERIFICATION_SENT' && onRetry) {
      return (
        <Button color="inherit" size="small" onClick={onRetry}>
          Try Again
        </Button>
      );
    }
    
    return null;
  };

  return (
    <Alert
      severity={error.code === 'VERIFICATION_SENT' ? 'success' : 'error'}
      sx={{ mb: 2 }}
      action={getActions()}
      {...alertProps}
    >
      <Typography variant="body2">{error.message}</Typography>
      {showDebugInfo && error.code && (
        <Typography variant="caption" display="block" sx={{ mt: 0.5 }}>
          Code: {error.code} {error.status && `| Status: ${error.status}`}
        </Typography>
      )}
    </Alert>
  );
}