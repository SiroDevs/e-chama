"use client";

import * as z from "zod";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { LockOutlined, Sync } from "@mui/icons-material";
import { IconButton, InputAdornment, Box } from "@mui/material";
import { Avatar, Button, Container, Grid } from "@mui/material";
import { CssBaseline, TextField, Typography } from "@mui/material";
import { Toaster } from "react-hot-toast";

import { GridLink } from "../general/GridLink";
import { handleSigninAction } from "./Actions";

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
  const [loading, startTransition] = useTransition();

  function onSubmit(data: FormData) {
    startTransition(async () => {
      await handleSigninAction(data);
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
        <Toaster position="top-center" reverseOrder={false} />
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
            endIcon={loading && <Sync className="animate-spin" />}
            disabled={loading}
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
