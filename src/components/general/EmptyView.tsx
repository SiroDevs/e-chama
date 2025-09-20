import { Alert, Box, Paper, Typography } from "@mui/material";

interface EmptyViewProps {
  title: string;
  message: string;
}

export function EmptyView({ title, message }: EmptyViewProps) {
  return (
    <Paper
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        p: 4,
        height: 300,
        backgroundColor: "background.default",
      }}
    >
      <Typography variant="h6" color="text.secondary" gutterBottom>
        {title}
      </Typography>
      <Typography variant="body2" color="text.secondary" align="center">
        {message}
      </Typography>
    </Paper>
  );
}

interface ErrorViewProps {
  error: string;
}

export function ErrorView({ error }: ErrorViewProps) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Alert severity="error">{error}</Alert>
    </Box>
  );
}
