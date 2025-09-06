"use client";

import * as z from "zod";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { LockOutlined, Sync } from "@mui/icons-material";
import { IconButton, InputAdornment } from "@mui/material";
import { Avatar, Box, Button, Container } from "@mui/material";
import { CssBaseline, Grid, TextField, Typography } from "@mui/material";
import toast from "react-hot-toast";

import { signInMeNow } from "@/app/(auth)/actions";
import { GridLink } from "../general/GridLink";
import { handleAuthResult } from "./Actions";

const schema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
});

type FormData = z.infer<typeof schema>;
export default function SignInForm() {
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });
  const [isPending, startTransition] = useTransition();

  function onSubmit(data: FormData) {
    startTransition(async () => {
      try {
        const result = await signInMeNow(data);
        handleAuthResult(result);
      } catch (err) {
        const message =
          err instanceof Error ? err.message : "Something went wrong.";
        toast.error(message);
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
          Sign in
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          sx={{ mt: 1 }}
        >
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            autoComplete="email"
            autoFocus
            error={!!errors.email}
            helperText={errors.email?.message}
            {...register("email")}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Password"
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
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            endIcon={isPending && <Sync className="animate-spin" />}
            disabled={isPending}
          >
            Sign In
          </Button>
          <Grid justifyContent="flex-end">
            <GridLink
              size={2}
              href="/signup"
              label="Don't have an account? Sign Up"
            />
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
