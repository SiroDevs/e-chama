"use client";

import * as React from "react";
import Stack from "@mui/material/Stack";
import { Box, CssBaseline } from "@mui/material";
import { AppIcon, AuthContent } from ".";

import ColorModeSelect from "../shared/ColorModeSelect";
import AppTheme from "../shared/AppTheme";

interface AuthWrapperProps {
  children: React.ReactNode;
}

export function AuthWrapper(props: AuthWrapperProps) {
  const { children } = props;
  return (
    <AppTheme>
      <CssBaseline enableColorScheme />
      <Stack
        direction="column"
        component="main"
        sx={[
          {
            justifyContent: "center",
            height: "calc((1 - var(--template-frame-height, 0)) * 100%)",
            minHeight: "100%",
          },
          (theme) => ({
            "&::before": {
              content: '""',
              display: "block",
              position: "absolute",
              zIndex: -1,
              inset: 0,
              backgroundImage:
                "radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))",
              backgroundRepeat: "no-repeat",
              ...theme.applyStyles("dark", {
                backgroundImage:
                  "radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))",
              }),
            },
          }),
        ]}
      >
        <Stack
          direction={{ xs: "column-reverse", md: "row" }}
          sx={{
            justifyContent: "center",
            gap: { xs: 6, sm: 12 },
            p: 2,
            mx: "auto",
          }}
        >
          <Stack
            direction={{ xs: "column-reverse", md: "row" }}
            sx={{
              justifyContent: "center",
              gap: { xs: 6, sm: 12 },
              p: { xs: 2, sm: 4 },
              m: "auto",
            }}
          >
            <Box sx={{ display: { xs: "none", md: "flex" } }}>
              <AuthContent />
            </Box>
            {children}
          </Stack>
        </Stack>
      </Stack>
    </AppTheme>
  );
}
