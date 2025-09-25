"use client";

import * as z from "zod";
import { useState } from "react";
import { Alert, InputAdornment, TextField, Typography } from "@mui/material";
import { Button, Link, FormControlLabel, Checkbox } from "@mui/material";
import { Box, IconButton, FormControl, FormLabel } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { LockOutlined } from "@mui/icons-material";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { handleSigninAction } from "@/app/(auth)/actions/auth";
import { useAuthStore } from "@/state/auth/auth";
import { AppIcon } from "../general/CustomIcons";
import { FormInput, MuiCard } from "../inputs/FormInput";
import { useGroupStore } from "@/state/auth/group";
import { fetchGroups } from "@/app/(protected)/actions/group";
import { PageStatus } from "@/state/status";
import { Loader } from "../general/Loader";

const schema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
});

type FormData = z.infer<typeof schema>;

interface SignInCardProps {
  onAuthSuccess: () => void;
}

export function SignInCard({ onAuthSuccess }: SignInCardProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [status, setStatus] = useState<PageStatus>("idle");
  const [message, setMessage] = useState("");
  const [open, setOpen] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const { setLoginState } = useAuthStore();
  const { setUserGroups } = useGroupStore();
  const handleClickOpen = () => setOpen(true);

  async function onSubmit(data: FormData) {
    setStatus("loading");
    try {
      const result = await handleSigninAction(data);

      if (result.success) {
        if (!result.user) {
          setStatus("error");
          setMessage("User data not available");
        }

        await setLoginState(
          result.user,
          result.profile || null,
          result.member || null
        );

        const groupResult = await fetchGroups(result.user.id);
        if (groupResult.length > 0) {
          await setUserGroups(groupResult, result.profile?.group || null);
        }
        onAuthSuccess();
      } else {
        setStatus("error");
        setMessage(result.error!);
      }
    } catch (error) {
      console.error("Signin submission error:", error);
      setStatus("error");
      setMessage("An unexpected error occurred during sign in");
    }
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
      {status === "loading" ? (
        <Loader
          height="30vh"
          title="Signing you in ..."
          message="Please wait while we check your credentials."
        />
      ) : (
        <>
          {status === "error" && <Alert severity="error"> {message}</Alert>}
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

            <Button type="submit" fullWidth variant="contained">
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
        </>
      )}
    </MuiCard>
  );
}
