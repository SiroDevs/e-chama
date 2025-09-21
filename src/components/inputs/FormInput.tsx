import React from "react";
import { TextField, IconButton, InputAdornment, Grid } from "@mui/material";
import { FormControl, FormLabel, Card } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { FieldError, UseFormRegisterReturn } from "react-hook-form";
import { styled } from "@mui/material/styles";

type FormInputProps = {
  id: string;
  label: string;
  placeholder: string;
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
  placeholder,
  type = "text",
  autoComplete,
  autoFocus = false,
  required = false,
  error,
  registration,
  withPasswordToggle = false,
}: FormInputProps) {
  const [show, setShow] = React.useState(false);

  return (
    <FormControl fullWidth error={!!error} required={required}>
      <FormLabel htmlFor="email">{label}</FormLabel>
      <TextField
        id={id}
        fullWidth
        required={required}
        autoFocus={autoFocus}
        autoComplete={autoComplete}
        placeholder={placeholder}
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
    </FormControl>
  );
}

export const MuiCard = styled(Card)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignSelf: "center",
  width: "100%",
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  boxShadow:
    "hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px",
  [theme.breakpoints.up("sm")]: {
    width: "450px",
  },
  ...theme.applyStyles("dark", {
    boxShadow:
      "hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px",
  }),
}));

export const MuiContainer = styled(Card)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignSelf: "center",
  width: "100%",
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  boxShadow:
    "hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px",
  [theme.breakpoints.up("sm")]: {
    // width: "450px",
  },
  ...theme.applyStyles("dark", {
    boxShadow:
      "hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px",
  }),
}));
