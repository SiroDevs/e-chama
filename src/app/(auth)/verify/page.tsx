"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  Container,
  Paper,
  Typography,
  Box,
  CircularProgress,
  Button,
  Alert,
  CssBaseline,
} from "@mui/material";
import { CheckCircle, Error, ArrowForward } from "@mui/icons-material";
import Link from "next/link";
import { supabase } from "@/lib/supabase/client";
import AppTheme from "@/components/shared/AppTheme";
import { AppIcon } from "@/components/general/CustomIcons";

export default function VerifyEmail() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const type = searchParams.get("type");
  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading"
  );
  const [message, setMessage] = useState("");

  useEffect(() => {
    const verifyEmail = async () => {
      if (!token || type !== "signup") {
        setStatus("error");
        setMessage("Invalid verification link");
        return;
      }

      try {
        const { error } = await supabase.auth.verifyOtp({
          token_hash: token,
          type: "signup",
        });

        if (error) {
          console.error("Verification error:", error);
          setStatus("error");
          setMessage(error.message || "Failed to verify email");
          return;
        }

        setStatus("success");
        setMessage("Your email has been successfully verified!");
      } catch (err) {
        console.error("Verification error:", err);
        setStatus("error");
        setMessage("An unexpected error occurred during verification");
      }
    };

    verifyEmail();
  }, [token, type]);

  return (
    <AppTheme>
      <CssBaseline enableColorScheme />
      <Container component="main" maxWidth="sm">
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Box sx={{ margin: 3 }}>
            <AppIcon />
          </Box>
          <Paper
            elevation={3}
            sx={{ p: 4, width: "100%", textAlign: "center" }}
          >
            {status === "loading" && (
              <>
                <CircularProgress size={60} sx={{ mb: 2 }} />
                <Typography variant="h5" component="h1" gutterBottom>
                  Verifying your email...
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Please wait while we verify your email address.
                </Typography>
              </>
            )}

            {status === "success" && (
              <>
                <CheckCircle color="success" sx={{ fontSize: 60, mb: 2 }} />
                <Typography variant="h5" component="h1" gutterBottom>
                  Email Verified Successfully!
                </Typography>
                <Alert severity="success" sx={{ my: 2 }}>
                  {message}
                </Alert>
                <Typography variant="body2" sx={{ mb: 3 }}>
                  Your account has been successfully verified. You can now sign
                  in to your account.
                </Typography>
                <Button
                  variant="contained"
                  endIcon={<ArrowForward />}
                  component={Link}
                  href="/signin"
                  size="large"
                >
                  Go to Sign In
                </Button>
              </>
            )}

            {status === "error" && (
              <>
                <Error color="error" sx={{ fontSize: 60, mb: 2 }} />
                <Typography variant="h5" component="h1" gutterBottom>
                  Verification Failed
                </Typography>
                <Alert severity="error" sx={{ my: 2 }}>
                  {message}
                </Alert>
                <Typography variant="body2" sx={{ mb: 3 }}>
                  The verification link may be invalid or expired. Please try
                  signing up again.
                </Typography>
                <Button
                  variant="outlined"
                  component={Link}
                  href="/signup"
                  sx={{ mr: 2 }}
                >
                  Try Again
                </Button>
                <Button variant="contained" component={Link} href="/support">
                  Contact Support
                </Button>
              </>
            )}
          </Paper>
        </Box>
      </Container>
    </AppTheme>
  );
}
