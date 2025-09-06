"use client";

import * as z from "zod";
import React, { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LockOutlined, Sync } from "@mui/icons-material";
import { Avatar, Box, Button, Container } from "@mui/material";
import { CssBaseline, Grid, Typography } from "@mui/material";
import toast from "react-hot-toast";

import { signUpMeNow } from "@/app/(auth)/actions";
import { FormInput } from "../inputs/FormInput";
import { GridLink } from "../general/GridLink";

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

export default function SignUp() {
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
  const [email, setEmail] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const [isPending, startTransition] = useTransition();

  async function onSubmit(data: FormData) {
    const { confirm_password, terms, ...payload } = data;

    startTransition(async () => {
      try {
        const result = await signUpMeNow(payload);
        if (typeof result !== "string") {
          throw new Error("Unexpected result type");
        }
        setEmail(data.email);
        toast.success("Email verification sent!");
      } catch (e) {
        toast.error(
          e instanceof Error
            ? e.message
            : "An error occurred during signup. Please try again."
        );
      }
    });
  }

  return (
    <Container
      component="div"
      maxWidth="xs"
      className="flex flex-col items-center justify-center h-screen"
    >
      <CssBaseline />
      {!email && (
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlined />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit(onSubmit)}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <FormInput
                id="full_name"
                label="Full Name"
                required
                autoComplete="given-name"
                autoFocus
                error={errors.full_name}
                registration={register("full_name")}
              />

              <FormInput
                id="email"
                label="Email Address"
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
                error={errors.password}
                registration={register("password")}
                withPasswordToggle
              />

              <FormInput
                id="confirm_password"
                label="Confirm Password"
                required
                autoComplete="confirm-password"
                error={errors.confirm_password}
                registration={register("confirm_password")}
                withPasswordToggle
              />
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
            <Grid justifyContent="flex-end">
              <GridLink
                size={2}
                href="/"
                label="Already have an account? Sign in"
              />
            </Grid>
          </Box>
        </Box>
      )}

      {email && (
        <Typography component="h1" variant="h5" className="text-center">
          Check your email{" "}
          <pre className="text-green-600">
            <strong>{email}</strong>
          </pre>{" "}
          for verification!
        </Typography>
      )}
    </Container>
  );
}
