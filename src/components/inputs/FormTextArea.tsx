import { TextField } from "@mui/material";
import { FieldError } from "react-hook-form";

interface FormTextareaProps {
  id: string;
  label: string;
  placeholder?: string;
  required?: boolean;
  error?: FieldError;
  registration: any;
  rows?: number;
}

export function FormTextarea({
  id,
  label,
  placeholder,
  required,
  error,
  registration,
  rows = 3,
}: FormTextareaProps) {
  return (
    <TextField
      id={id}
      label={label}
      placeholder={placeholder}
      required={required}
      error={!!error}
      helperText={error?.message}
      fullWidth
      multiline
      rows={rows}
      {...registration}
    />
  );
}
