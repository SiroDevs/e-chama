import { Button, ButtonProps, SxProps, Theme } from "@mui/material";

interface StateBtnProps extends Omit<ButtonProps, "disabled"> {
  label: string;
  loading?: boolean;
  fullWidth?: boolean;
  sx?: SxProps<Theme>;
}

export function StateBtn({
  label = "Loading...",
  loading = false,
  fullWidth = true,
  sx = {},
  ...props
}: StateBtnProps) {
  return (
    <Button
      type="submit"
      fullWidth={fullWidth}
      variant="contained"
      disabled={loading}
      sx={{ mt: 1, ...sx }}
      {...props}
    >
      {label}
    </Button>
  );
}
