import {
  FormControl,
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
  defaultValue?: string;
}

export function FormSelect({
  id,
  label,
  required,
  error,
  registration,
  options,
  defaultValue,
}: FormSelectProps) {
  const effectiveDefaultValue = defaultValue !== undefined 
    ? defaultValue 
    : options.length > 0 ? options[0].value : "";

  return (
    <FormControl fullWidth error={!!error} required={required}>
      <FormLabel>{label}</FormLabel>
      <Select 
        labelId={`${id}-label`} 
        id={id} 
        label={label} 
        defaultValue={effectiveDefaultValue}
        {...registration}
      >
        {options.length === 0 && (
          <MenuItem value="">
            <em>No options available</em>
          </MenuItem>
        )}
        
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