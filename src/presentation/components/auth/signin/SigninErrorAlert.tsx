import { Alert, Button, Typography, AlertProps, Box } from '@mui/material';
import { useState } from 'react';
import { AuthError } from '@/data/types/auth';
import { resendVerificationEmail } from '@/infrastucture/services/VerifyService';

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
        console.error('Failed to resend verification email:', result.error);
      }
    } catch (err) {
      console.error('Error resending verification:', err);
    } finally {
      setIsResending(false);
    }
  };

  const getActionButton = () => {
    if (error.code === 'email_not_confirmed') {
      return (
        <Button
          variant="outlined"
          size="small"
          onClick={handleResendVerification}
          disabled={isResending || !userEmail}
          sx={{ mt: 1 }}
        >
          {isResending ? 'Sending...' : 'Resend Verification Email'}
        </Button>
      );
    }
    
    if (error.code !== 'VERIFICATION_SENT' && onRetry) {
      return (
        <Button 
          variant="outlined" 
          size="small" 
          onClick={onRetry}
          sx={{ mt: 1 }}
        >
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
      {...alertProps}
    >
      <Box>
        <Typography variant="body2">{error.message}</Typography>
        {getActionButton()}
      </Box>
    </Alert>
  );
}