"use client";

import * as z from "zod";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { LockOutlined, Sync } from "@mui/icons-material";
import { IconButton, FormControl, FormLabel, Link } from "@mui/material";
import { Box, Button, InputAdornment } from "@mui/material";
import { Divider, TextField, Typography } from "@mui/material";

import { handleSigninAction } from "@/app/(auth)/actions/client";
import { AppIcon, GoogleIcon } from ".";
import { MuiCard, FormInput } from "../inputs/FormInput";
import { GridLink } from "../general/GridLink";
import ColorModeSelect from "../shared/ColorModeSelect";
import { useAuthStore } from "@/state/auth/auth";

const schema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
});

type FormData = z.infer<typeof schema>;
export function SignInCard() {
  const [showPassword, setShowPassword] = useState(false);
  const [open, setOpen] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });
  const [loading, startTransition] = useTransition();

  const { loginUser } = useAuthStore();
  const handleClickOpen = () => setOpen(true);

  function onSubmit(data: FormData) {
    startTransition(async () => {
      const result = await handleSigninAction(data);
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
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography component="h1" variant="h5">
          <LockOutlined /> Sign In
        </Typography>

        <ColorModeSelect sx={{ alignSelf: "baseline" }} />
      </Box>

      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        sx={{ display: "flex", flexDirection: "column", width: "100%", gap: 2 }}
      >
        <FormInput
          id="email"
          label="Email Address"
          placeholder="you@mail.com"
          required
          autoComplete="email"
          error={errors.email}
          registration={register("email")}
        />
        <FormControl>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <FormLabel htmlFor="password">Password</FormLabel>
            <Link
              component="button"
              type="button"
              onClick={handleClickOpen}
              variant="body2"
              sx={{ alignSelf: "baseline" }}
            >
              Forgot your password?
            </Link>
          </Box>
          <TextField
            margin="normal"
            required
            fullWidth
            placeholder="••••••"
            type={showPassword ? "text" : "password"}
            id="password"
            autoComplete="current-password"
            error={!!errors.password}
            helperText={errors.password?.message}
            {...register("password")}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setShowPassword((prev) => !prev)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </FormControl>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          endIcon={loading && <Sync className="animate-spin" />}
          disabled={loading}
        >
          Sign In
        </Button>
        <Typography sx={{ textAlign: "center" }}>
          <GridLink
            size={2}
            href="/signup"
            label="Don't have an account? Sign Up"
          />
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
          Sign in with Google
        </Button>
        {/* <Button
          fullWidth
          variant="outlined"
          onClick={() => alert("Sign in with Facebook")}
          startIcon={<FacebookIcon />}
        >
          Sign in with Facebook
        </Button> */}
      </Box>
    </MuiCard>
  );
}