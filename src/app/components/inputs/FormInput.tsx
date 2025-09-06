import React from "react";
import {
  TextField,
  IconButton,
  InputAdornment,
  Grid,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { FieldError, UseFormRegisterReturn } from "react-hook-form";

type FormInputProps = {
  id: string;
  label: string;
  type?: string;
  autoComplete?: string;
  autoFocus?: boolean;
  required?: boolean;
  error?: FieldError;
  registration: UseFormRegisterReturn;
  withPasswordToggle?: boolean;
  size?: number;
};

export function FormInput({
  id,
  label,
  type = "text",
  autoComplete,
  autoFocus = false,
  required = false,
  error,
  registration,
  withPasswordToggle = false,
  size = 12,
}: FormInputProps) {
  const [show, setShow] = React.useState(false);

  return (
    <Grid size={size}>
      <TextField
        id={id}
        label={label}
        fullWidth
        required={required}
        autoFocus={autoFocus}
        autoComplete={autoComplete}
        error={!!error}
        helperText={error?.message}
        type={withPasswordToggle ? (show ? "text" : "password") : type}
        {...registration}
        InputProps={
          withPasswordToggle
            ? {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label={`toggle ${label.toLowerCase()} visibility`}
                      onClick={() => setShow((prev) => !prev)}
                      edge="end"
                    >
                      {show ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }
            : undefined
        }
      />
    </Grid>
  );
}
