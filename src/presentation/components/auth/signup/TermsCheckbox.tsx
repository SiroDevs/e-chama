import { FormControlLabel, Checkbox, Typography, Grid } from '@mui/material';
import { UseFormRegister } from 'react-hook-form';

interface TermsCheckboxProps {
  register: UseFormRegister<any>;
  error?: any;
  disabled?: boolean;
}

export function TermsCheckbox({
  register,
  error,
  disabled = false,
}: TermsCheckboxProps) {
  return (
    <Grid size={12}>
      <FormControlLabel
        control={
          <Checkbox
            color="primary"
            {...register("terms")}
            disabled={disabled}
          />
        }
        label="I agree to the terms and conditions."
      />
      {error && (
        <Typography color="error" variant="body2">
          You must agree to the terms and conditions
        </Typography>
      )}
    </Grid>
  );
}