"use client";

import * as z from "zod";
import { useState, useTransition } from "react";
import { Box, Button, Typography, Grid, Link } from "@mui/material";
import { FormControlLabel, Checkbox } from "@mui/material";
import { LockOutlined, Sync } from "@mui/icons-material";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { handleSignupAction } from "@/app/(auth)/actions/client";
import { useAuthStore } from "@/state/auth/auth";
import { AppIcon } from "./CustomIcons";
import { FormInput, MuiCard } from "../inputs/FormInput";

const schema = z.object({
  full_name: z
    .string()
    .min(4, { message: "Your name must be at least 4 characters" }),
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
  terms: z.literal(true, {
    message: "You must agree to the terms & conditions",
  }),
});

type FormData = z.infer<typeof schema>;
export function SignUpCard() {
  const [showPassword, setShowPassword] = useState(false);
  const [open, setOpen] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });
  const [loading, startTransition] = useTransition();

  const { loginUser } = useAuthStore();

  function onSubmit(data: FormData) {
    startTransition(async () => {
      const result = await handleSignupAction(data);
      if (result.success) {
        await loginUser(result.user!);
        window.location.href = "/";
      }
    });
  }

  return (
    <MuiCard variant="outlined">
      <Box sx={{ display: { xs: "flex", md: "none" } }}>
        <AppIcon />
      </Box>

      <Typography
        component="h1"
        sx={{ width: "100%", fontSize: "clamp(2rem, 10vw, 2.15rem)" }}
      >
        <LockOutlined /> Sign Up
      </Typography>

      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
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
          endIcon={loading && <Sync className="animate-spin" />}
          disabled={loading}
        >
          Sign Up
        </Button>
        <Typography sx={{ textAlign: "center" }}>
          <Grid size={2}>
            <Link href="/">Already have an Account? Sign In</Link>
          </Grid>
        </Typography>
      </Box>
    </MuiCard>
  );
}
