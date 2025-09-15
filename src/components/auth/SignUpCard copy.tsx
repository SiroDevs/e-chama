"use client";

import * as z from "zod";
import React, { useEffect, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LockOutlined, Sync } from "@mui/icons-material";
import { Box, Button, Divider, Grid, Link } from "@mui/material";
import { Checkbox, FormControlLabel, Typography } from "@mui/material";

import { FormInput, MuiCard } from "../inputs/FormInput";
import { handleSignupAction } from "@/app/(auth)/actions/client";
import { AppIcon, GoogleIcon } from "./CustomIcons";
import ColorModeSelect from "../shared/ColorModeSelect";

const schema = z
  .object({
    full_name: z
      .string()
      .min(4, { message: "Your name must be at least 4 characters" }),
    email: z.string().email({ message: "Invalid email address" }),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters" }),
    confirm_password: z.string(),
    terms: z.literal(true, {
      message: "You must agree to the terms & conditions",
    }),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Passwords don't match",
    path: ["confirm_password"],
  });

type FormData = z.infer<typeof schema>;

export function SignUpCard() {
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const [isPending, startTransition] = useTransition();

  async function onSubmit(data: FormData) {
    const { confirm_password, terms, ...payload } = data;

    startTransition(async () => {
      await handleSignupAction(payload);
    });
  }
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <MuiCard variant="outlined">
      <Box sx={{ display: { xs: "flex", md: "none" } }}>
        <AppIcon />
      </Box>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography component="h1" variant="h5">
          <LockOutlined /> Sign Up
        </Typography>

        <ColorModeSelect sx={{ alignSelf: "baseline" }} />
      </Box>

      <Box
        component="form"
        noValidate
        onSubmit={handleSubmit(onSubmit)}
        sx={{ display: "flex", flexDirection: "column", width: "100%", gap: 2 }}
      >
        <FormInput
          id="full_name"
          label="Full Name"
          placeholder="Kamau Onyango"
          required
          autoComplete="given-name"
          autoFocus
          error={errors.full_name}
          registration={register("full_name")}
        />

        <FormInput
          id="email"
          label="Email Address"
          placeholder="you@mail.com"
          required
          autoComplete="email"
          error={errors.email}
          registration={register("email")}
        />

        <FormInput
          id="password"
          label="Password"
          required
          autoComplete="new-password"
          placeholder="..."
          error={errors.password}
          registration={register("password")}
          withPasswordToggle
        />

        <FormInput
          id="confirm_password"
          label="Confirm Password"
          required
          autoComplete="confirm-password"
          placeholder="..."
          error={errors.confirm_password}
          registration={register("confirm_password")}
          withPasswordToggle
        />
        <Grid size={12}>
          <FormControlLabel
            control={<Checkbox color="primary" {...register("terms")} />}
            label="I agree to the terms and conditions."
          />
          {errors.terms && (
            <Typography color="error" variant="body2">
              You must agree to the terms and conditions
            </Typography>
          )}
        </Grid>

        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          disabled={isPending}
          endIcon={isPending && <Sync className="animate-spin" />}
        >
          Sign Up
        </Button>
        <Typography sx={{ textAlign: "center" }}>
          <Grid size={2}>
            <Link href="/signup">"Don&apos;t have an account? Sign Up"</Link>
          </Grid>
        </Typography>
      </Box>
      <Divider>or</Divider>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <Button
          fullWidth
          variant="outlined"
          onClick={() => alert("Sign in with Google")}
          startIcon={<GoogleIcon />}
        >
          Sign up with Google
        </Button>
      </Box>
    </MuiCard>
  );
}
