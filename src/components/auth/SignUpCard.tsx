"use client";

import * as z from "zod";
import { useTransition } from "react";
import { Box, Button, Typography, Grid, Link } from "@mui/material";
import { FormControlLabel, Checkbox } from "@mui/material";
import { LockOutlined, Sync } from "@mui/icons-material";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { handleSignupAction } from "@/app/(auth)/actions/client";
import { useAuthStore } from "@/state/auth/auth";
import { AppIcon } from "../general/CustomIcons";
import { FormInput, MuiCard } from "../inputs/FormInput";

const schema = z.object({
  first_name: z
    .string()
    .min(4, { message: "Your name must be at least 4 characters" }),
  last_name: z
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
        await loginUser(result.user!, result.profile!);
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
        <Typography
          component="div"
          sx={{
            width: "100%",
            display: "flex",
            gap: 2,
            flexDirection: { xs: "column", sm: "row" },
          }}
        >
          <FormInput
            id="first_name"
            label="First Name"
            placeholder="Kamau"
            required
            autoComplete="given-name"
            error={errors.first_name}
            registration={register("first_name")}
          />
          <FormInput
            id="last_name"
            label="Last Name"
            placeholder="Onyango"
            required
            autoComplete="family-name"
            error={errors.last_name}
            registration={register("last_name")}
          />
        </Typography>

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
          placeholder="******"
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
          <Link href="/">Already have an Account? Sign In</Link>
        </Typography>
      </Box>
    </MuiCard>
  );
}
