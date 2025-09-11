"use client";

import * as React from "react";

import { Box, Card, CardContent, Grid, Typography } from "@mui/material";
import { Header, NavbarBreadcrumbs } from "@/components/navigation";
import { Copyright } from "@/components/general";
import { useAuthStore } from "@/state/auth/auth";
import InfoMobile from "./InfoMobile";
import Review from "./Review";
import MemberProfile from "./MemberProfile";

const steps = ["Shipping address", "Payment details", "Review your order"];

export default function Dashboard() {
  const { isAuthenticated } = useAuthStore();

  if (!isAuthenticated) {
    window.location.href = "/";
  }

  return (
    <Box sx={{ width: "100%", maxWidth: { sm: "100%", md: "1700px" } }}>
      <Header />
      <NavbarBreadcrumbs
        items={[{ label: "My Chama Profile", href: "/my-chama-profile" }]}
      />
      <Grid
        container
        sx={{
          height: {
            xs: "100%",
            sm: "calc(100dvh - var(--template-frame-height, 0px))",
          },
          mt: { xs: 4, sm: 0 },
        }}
      >
        <Grid
          size={{ xs: 12, sm: 5, lg: 4 }}
          sx={{
            display: { xs: "none", md: "flex" },
            flexDirection: "column",
            borderRight: { sm: "none", md: "1px solid" },
            borderColor: { sm: "none", md: "divider" },
            alignItems: "start",
            pt: 2,
          }}
        >
          {/* <MemberProfile /> */}
        </Grid>

        {/* <Grid
          size={{ sm: 12, md: 7, lg: 8 }}
          sx={{
            display: "flex",
            flexDirection: "column",
            maxWidth: "100%",
            width: "100%",
            backgroundColor: { xs: "transparent", sm: "background.default" },
            alignItems: "start",
            pt: 2,
            px: 2,
            gap: { xs: 4, md: 8 },
          }}
        >
          <Card sx={{ display: { xs: "flex", md: "none" }, width: "100%" }}>
            <CardContent
              sx={{
                display: "flex",
                width: "100%",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <div>
                <Typography variant="subtitle2" gutterBottom>
                  Selected products
                </Typography>
                <Typography variant="body1">$134.98</Typography>
              </div>
              <InfoMobile totalPrice="$134.98" />
            </CardContent>
          </Card>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              flexGrow: 1,
              width: "100%",
              maxWidth: { sm: "100%", md: 600 },
              maxHeight: "720px",
              gap: { xs: 5, md: "none" },
            }}
          >
            <React.Fragment>
              <Review />
            </React.Fragment>
          </Box>
        </Grid> */}
      </Grid>
      <Copyright sx={{ flex: 1, my: 4 }} />
    </Box>
  );
}
