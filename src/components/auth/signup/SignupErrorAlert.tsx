import { Alert, Button, Typography, AlertProps } from '@mui/material';

interface SignupErrorAlertProps extends Omit<AlertProps, 'action'> {
  error: {
    message: string;
    code?: string;
    status?: number;
  };
  onRetry?: () => void;
  showDebugInfo?: boolean;
}

export function SignupErrorAlert({
  error,
  onRetry,
  showDebugInfo = process.env.NODE_ENV === 'development',
  ...alertProps
}: SignupErrorAlertProps) {
  const getActions = () => {
    if (error.code !== 'SIGNUP_SUCCESS' && onRetry) {
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
      severity={error.code === 'SIGNUP_SUCCESS' ? 'success' : 'error'}
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