"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Container, Paper, Typography, Box } from "@mui/material";
import { Button, Alert, CssBaseline } from "@mui/material";
import { CheckCircle, Error, ArrowForward } from "@mui/icons-material";
import AppTheme from "@/theme/AppTheme";
import { AppIcon } from "@/components/general/CustomIcons";
import { Loader } from "@/components/general/Loader";
import { verifyToken } from "@/services/AuthService";

interface VerifyEmailProps {
  searchParams: {
    token?: string;
    type?: string;
  };
}

export default function VerifyEmail({ searchParams }: VerifyEmailProps) {
  const token = searchParams.token;
  const type = searchParams.type;
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
        const { error } = await verifyToken(token);

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
              <Loader
                title="Verifying your email ..."
                message="Please wait while we verify your email address."
              />
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
                  href="/"
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
                  The verification link may be invalid or expired.<br></br>
                  Please try again or contact support.
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