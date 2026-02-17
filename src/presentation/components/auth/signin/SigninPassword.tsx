import { useState } from "react";
import { FormControl, FormLabel, Link, TextField } from "@mui/material";
import { InputAdornment, IconButton, Box, FormHelperText } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

interface SigninPasswordProps {
  id: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
  error?: any;
  disabled?: boolean;
  registration: any;
  showForgotPassword?: boolean;
  onForgotPassword?: () => void;
}

export function SigninPassword({
  id,
  label = "Password",
  placeholder = "******",
  required = true,
  error,
  disabled = false,
  registration,
  showForgotPassword = true,
  onForgotPassword,
}: SigninPasswordProps) {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <FormControl fullWidth>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 1,
        }}
      >
        <FormLabel htmlFor={id} required={required}>
          {label}
        </FormLabel>
        {showForgotPassword && (
          <Link
            component="button"
            type="button"
            onClick={onForgotPassword}
            variant="body2"
            sx={{ alignSelf: "baseline" }}
            disabled={disabled}
          >
            Forgot your password?
          </Link>
        )}
      </Box>
      <TextField
        margin="normal"
        required={required}
        fullWidth
        placeholder={placeholder}
        type={showPassword ? "text" : "password"}
        id={id}
        autoComplete="current-password"
        error={!!error}
        disabled={disabled}
        {...registration}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                edge="end"
                disabled={disabled}
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      {error?.message && <FormHelperText error>{error.message}</FormHelperText>}
    </FormControl>
  );
}
