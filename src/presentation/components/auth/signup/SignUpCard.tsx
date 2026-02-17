"use client";

import * as z from "zod";
import { useState } from "react";
import { Box, Typography } from "@mui/material";
import { LockOutlined } from "@mui/icons-material";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { onSignupAction } from "@/app/(auth)/actions/SignupAction";
import { useAuthStore } from "@/infrastucture/state/auth/auth";
import { FormInput, MuiCard } from "../../inputs/FormInput";
import { PageStatus } from "@/infrastucture/state/PageStatus";
import { SignupErrorAlert, signupLabels, signupSchema, TermsCheckbox } from ".";
import { AppIcon, AppLink, PageTitle } from "@/presentation/components/general";
import { Loader, StateBtn } from "@/presentation/components/general";
import { AuthError } from "@/data/types/auth";

type FormData = z.infer<typeof signupSchema>;
interface SignUpCardProps {
  onAuthSuccess: () => void;
}

export function SignUpCard({ onAuthSuccess }: SignUpCardProps) {
  const [status, setStatus] = useState<PageStatus>("idle");
  const [error, setError] = useState<AuthError | null>(null);
  const [userEmail, setUserEmail] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(signupSchema) });

  const { setLoginState } = useAuthStore();

  async function onSubmit(formData: FormData) {
    setStatus("loading");
    setError(null);
    setUserEmail(formData.email);

    try {
      const result = await onSignupAction({
        first_name: formData.first_name.trim(),
        last_name: formData.last_name.trim(),
        email: formData.email.trim(),
        password: formData.password.trim(),
      });

      if (result.success) {
        await handleSuccessfulSignup(result.data);
      } else {
        handleSignupError(result.error);
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

  async function handleSuccessfulSignup(data: {
    user: any;
    profile: any;
    member: any;
  }) {
    try {
      await setLoginState(data.user, data.profile || null, data.member || null);
      setStatus("success");
      onAuthSuccess();
    } catch (err) {
      console.error("Error in post-signup setup:", err);
      setStatus("error");
      setError({
        message:
          "Sign up successful, but there was an issue loading your data.",
        code: "POST_SIGNUP_ERROR",
        status: 500,
      });
    }
  }

  function handleSignupError(error: AuthError) {
    setStatus("error");
    setError(error);
  }

  function handleRetrySignup() {
    setError(null);
    setStatus("idle");
  }

  const isLoading = status === "loading";

  return (
    <MuiCard variant="outlined" sx={{ maxWidth: 400, mx: "auto", mt: 4 }}>
      <AppIcon centered={true} />
      <PageTitle icon={<LockOutlined />} text="Sign Up" />

      {isLoading ? (
        <Loader
          height="30vh"
          title="Creating your account..."
          message="Please wait while we set up your profile."
        />
      ) : (
        <>
          {error && (
            <SignupErrorAlert error={error} onRetry={handleRetrySignup} />
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
            <Typography
              component="div"
              sx={{
                width: "100%",
                display: "flex",
                gap: 2,
                flexDirection: { xs: "column", sm: "row" },
              }}
            >
              {Object.values(signupLabels)
                .filter((field) => field.name !== "email")
                .map((field) => (
                  <FormInput
                    key={field.name}
                    id={field.name}
                    label={field.label}
                    placeholder={field.placeholder}
                    type="text"
                    autoComplete="off"
                    required={field.required}
                    error={errors[field.name]}
                    registration={register(field.name)}
                    disabled={isLoading}
                  />
                ))}
            </Typography>

            <FormInput
              id={signupLabels.email.name}
              label={signupLabels.email.label}
              placeholder={signupLabels.email.placeholder}
              required={signupLabels.email.required}
              autoComplete="email"
              error={errors.email}
              registration={register("email")}
              disabled={isLoading}
            />

            <FormInput
              id="password"
              label="Password"
              required
              autoComplete="new-password"
              placeholder="******"
              error={errors.password}
              registration={register("password")}
              withPasswordToggle
              disabled={isLoading}
            />

            <TermsCheckbox
              register={register}
              error={errors.terms}
              disabled={isLoading}
            />
            <StateBtn
              loading={isLoading}
              label={isLoading ? "Creating Account..." : "Sign Up"}
            />
            <AppLink
              href="/"
              text="Already have an Account?"
              linkText="Sign In"
            />
          </Box>
        </>
      )}
    </MuiCard>
  );
}
