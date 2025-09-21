import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  FormLabel,
} from "@mui/material";
import { FieldError } from "react-hook-form";

interface FormSelectProps {
  id: string;
  label: string;
  required?: boolean;
  error?: FieldError;
  registration: any;
  options: Array<{ value: string; label: string }>;
}

export function FormSelect({
  id,
  label,
  required,
  error,
  registration,
  options,
}: FormSelectProps) {
  return (
    <FormControl fullWidth error={!!error} required={required}>
      <FormLabel htmlFor="email">{label}</FormLabel>
      <Select labelId={`${id}-label`} id={id} label={label} {...registration}>
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
      {error && <FormHelperText>{error.message}</FormHelperText>}
    </FormControl>
  );
}
