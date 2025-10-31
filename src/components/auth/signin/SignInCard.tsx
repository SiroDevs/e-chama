"use client";

import * as z from "zod";
import { useState } from "react";
import { Box, FormControlLabel, Checkbox } from "@mui/material";
import { LockOutlined } from "@mui/icons-material";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { useAuthStore } from "@/state/auth/auth";
import { FormInput, MuiCard } from "../../inputs/FormInput";
import { useGroupStore } from "@/state/auth/group";
import { fetchGroups } from "@/app/(protected)/actions/group";
import { AuthError } from "@/types/auth";
import { PageStatus } from "@/state/PageStatus";
import { onSigninAction } from "@/app/(auth)/actions/SigninAction";
import { AppIcon, AppLink, StateBtn } from "@/components/general";
import { Loader, PageTitle } from "@/components/general";
import { signinSchema, SigninErrorAlert, SigninPassword } from ".";

type FormData = z.infer<typeof signinSchema>;
interface SignInCardProps {
  onAuthSuccess: () => void;
}

export function SignInCard({ onAuthSuccess }: SignInCardProps) {
  const [status, setStatus] = useState<PageStatus>("idle");
  const [error, setError] = useState<AuthError | null>(null);
  const [userEmail, setUserEmail] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(signinSchema) });

  const { setLoginState } = useAuthStore();
  const { setUserGroups } = useGroupStore();

  async function onSubmit(formData: FormData) {
    setStatus("loading");
    setError(null);
    setUserEmail(formData.email);

    try {
      const result = await onSigninAction(formData);
      if (result.success) {
        await handleSuccessfulSignin(result.data);
      } else {
        handleSigninError(result.error);
      }
    } catch (err) {
      console.error("Unexpected client error:", err);
      setStatus("error");
      setError({
        message: "An unexpected error occurred. Please try again.",
        code: "CLIENT_ERROR",
        status: 500,
      });
    }
  }

  async function handleSuccessfulSignin(data: {
    user: any;
    profile: any;
    member: any;
  }) {
    try {
      await setLoginState(data.user, data.profile || null, data.member || null);

      const groupResult = await fetchGroups(data.user.id);
      if (groupResult.length > 0) {
        await setUserGroups(groupResult, data.profile?.group || null);
      }
      setStatus("success");
      onAuthSuccess();
    } catch (err) {
      console.error("Error in post-signin setup:", err);
      setStatus("error");
      setError({
        message:
          "Sign in successful, but there was an issue loading your data.",
        code: "POST_SIGNIN_ERROR",
        status: 500,
      });
    }
  }

  function handleSigninError(error: AuthError) {
    setStatus("error");
    setError(error);
  }

  function handleVerificationSent() {
    setError({
      message: "Verification email sent! Please check your inbox or spam folder.",
      code: "VERIFICATION_SENT",
      status: 200,
    });
  }

  function handleRetrySignin() {
    setError(null);
    setStatus("idle");
  }

  function handleForgotPassword() {
    console.log("Forgot password clicked for:", userEmail);
  }

  const isLoading = status === "loading";

  return (
    <MuiCard variant="outlined" sx={{ maxWidth: 400, mx: "auto", mt: 4 }}>
      <AppIcon centered={true} />
      <PageTitle icon={<LockOutlined />} text="Sign In" />

      {isLoading ? (
        <Loader
          height="30vh"
          title="Signing you in..."
          message="Please wait while we authenticate your account."
        />
      ) : (
        <>
          {error && (
            <SigninErrorAlert
              error={error}
              userEmail={userEmail}
              onRetry={handleRetrySignin}
              onVerificationSent={handleVerificationSent}
            />
          )}
          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
              gap: 2,
            }}
          >
            <FormInput
              id="email"
              label="Email Address"
              placeholder="you@mail.com"
              required
              autoComplete="email"
              autoFocus
              error={errors.email}
              registration={register("email")}
              disabled={isLoading}
            />
            <SigninPassword
              id="password"
              error={errors.password}
              disabled={isLoading}
              registration={register("password")}
              onForgotPassword={handleForgotPassword}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
              disabled={isLoading}
            />
            <StateBtn
              loading={isLoading}
              label={isLoading ? "Signing In..." : "Sign In"}
            />
            <AppLink
              href="/signup"
              text="Don't have an account?"
              linkText="Sign Up"
            />
          </Box>
        </>
      )}
    </MuiCard>
  );
}