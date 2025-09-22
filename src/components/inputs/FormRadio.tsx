import {
  FormControl,
  FormLabel,
  FormHelperText,
  RadioGroup,
  FormControlLabel,
  Radio,
  Box,
} from "@mui/material";
import { FieldError } from "react-hook-form";

interface FormRadioProps {
  id: string;
  label: string;
  required?: boolean;
  error?: FieldError;
  registration: any;
  options: Array<{ value: string; label: string }>;
  row?: boolean; // Optional: layout horizontally
}

export function FormRadio({
  id,
  label,
  required,
  error,
  registration,
  options,
  row = true,
}: FormRadioProps) {
  return (
    <FormControl 
      component="fieldset" 
      error={!!error} 
      required={required}
      fullWidth
    >
      <FormLabel component="legend" sx={{ mb: 1, fontWeight: 'bold' }}>
        {label}
      </FormLabel>
      
      <RadioGroup
        id={id}
        {...registration}
        row={row}
        sx={{
          '& .MuiFormControlLabel-root': {
            mr: 3,
          }
        }}
      >
        {options.map((option) => (
          <FormControlLabel
            key={option.value}
            value={option.value}
            control={<Radio />}
            label={option.label}
          />
        ))}
      </RadioGroup>
      
      {error && (
        <FormHelperText sx={{ ml: 0, mt: 0.5 }}>
          {error.message}
        </FormHelperText>
      )}
    </FormControl>
  );
}