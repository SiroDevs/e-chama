"use client";

import * as z from "zod";
import { useState, useTransition } from "react";
import { InputAdornment, TextField, Typography } from "@mui/material";
import { Button, Link, FormControlLabel, Checkbox } from "@mui/material";
import { Box, IconButton, FormControl, FormLabel } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { LockOutlined, Sync } from "@mui/icons-material";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { handleSigninAction } from "@/app/(auth)/actions/AuthAction";
import { useAuthStore } from "@/state/auth/auth";
import { AppIcon } from "../general/CustomIcons";
import { FormInput, MuiCard } from "../inputs/FormInput";

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

  const { loginUser, setUserGroups } = useAuthStore();
  const handleClickOpen = () => setOpen(true);

  function onSubmit(data: FormData) {
    startTransition(async () => {
      const result = await handleSigninAction(data);
      if (result.success) {
        await loginUser(result.user!, result.profile!);
        if (result.groups && result.groups.length > 0) {
          await setUserGroups(result.groups, result.profile?.group || null);
        } else {
          await setUserGroups([], null);
        }

        window.location.reload();
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
        <LockOutlined /> Sign In
      </Typography>

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
            placeholder="******"
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
        <FormControlLabel
          control={<Checkbox value="remember" color="primary" />}
          label="Remember me"
        />
        {/* <ForgotPassword open={open} handleClose={handleClose} /> */}

        <Button
          type="submit"
          fullWidth
          variant="contained"
          endIcon={loading && <Sync className="animate-spin" />}
          disabled={loading}
        >
          Sign In
        </Button>
        <Typography sx={{ textAlign: "center" }}>
          <Link href="/signup">Don&apos;t have an account? Sign Up</Link>
        </Typography>
      </Box>
      {/* <Divider>or</Divider>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <Button
          fullWidth
          variant="outlined"
          onClick={() => alert("Sign in with Google")}
          startIcon={<GoogleIcon />}
        >
          Sign in with Google
        </Button>
        <Button
          fullWidth
          variant="outlined"
          onClick={() => alert('Sign in with Facebook')}
          startIcon={<FacebookIcon />}
        >
          Sign in with Facebook
        </Button>
      </Box> */}
    </MuiCard>
  );
}
