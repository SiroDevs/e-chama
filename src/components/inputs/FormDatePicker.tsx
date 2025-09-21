import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { FieldError } from "react-hook-form";
import { FormControl, FormLabel } from "@mui/material";

interface FormDatePickerProps {
  id: string;
  label: string;
  required?: boolean;
  error?: FieldError;
  registration: any;
}

export function FormDatePicker({
  id,
  label,
  required,
  error,
  registration,
}: FormDatePickerProps) {
  return (
    <FormControl fullWidth error={!!error} required={required}>
      <FormLabel htmlFor="email">{label}</FormLabel>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DatePicker
          value={registration.value || null}
          onChange={(date) =>
            registration.onChange({ target: { value: date, name: id } })
          }
          slotProps={{
            textField: {
              id,
              required,
              error: !!error,
              helperText: error?.message,
              fullWidth: true,
            },
          }}
        />
      </LocalizationProvider>
    </FormControl>
  );
}
