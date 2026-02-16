"use client";
import * as React from "react";
import { styled } from "@mui/material/styles";
import {
  Stack,
  Typography,
  Button,
  IconButton,
  Divider,
  Box,
} from "@mui/material";
import Breadcrumbs, { breadcrumbsClasses } from "@mui/material/Breadcrumbs";
import { ContainerProps } from "@mui/material/Container";
import MuiLink from "@mui/material/Link";
import { ArrowBack, NavigateNextRounded } from "@mui/icons-material";
import { Link } from "react-router";
import { useRouter } from "next/navigation";

const PageContentHeader = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  gap: theme.spacing(2),
  alignItems: "center",
}));

const PageHeaderBreadcrumbs = styled(Breadcrumbs)(({ theme }) => ({
  margin: theme.spacing(1, 0),
  [`& .${breadcrumbsClasses.separator}`]: {
    color: (theme.vars || theme).palette.action.disabled,
    margin: 1,
  },
  [`& .${breadcrumbsClasses.ol}`]: {
    alignItems: "center",
  },
}));

const PageHeaderToolbar = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  gap: theme.spacing(1),
  marginLeft: "auto",
}));

const TitleContainer = styled("div")({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  gap: 2,
});

export interface Breadcrumb {
  title: string;
  path?: string;
}
export interface PageContainerProps extends ContainerProps {
  title?: string;
  titleExtra?: React.ReactNode;
  breadcrumbs?: Breadcrumb[];
  actions?: React.ReactNode;
}

export default function PageContainer(props: PageContainerProps) {
  const { title, titleExtra, breadcrumbs, actions = null } = props;

  const router = useRouter();
  const handleBack = () => {
    router.back();
  };
  const showBackButton = breadcrumbs && breadcrumbs.length > 0;

  return (
    <Stack spacing={2}>
      <Stack
        sx={{
          borderBottom: { sm: "none", md: "1px solid" },
          borderColor: { sm: "none", md: "divider" },
          pb: 1,
        }}
      >
        <Stack sx={{ justifyContent: "space-between" }}>
          <Stack direction="row" sx={{ justifyContent: "space-between" }}>
            {showBackButton && (
              <IconButton
                onClick={handleBack}
                size="small"
                sx={{
                  flexShrink: 0,
                  mr: 1,
                  p: { xs: 0.3, sm: 0.5 },
                }}
              >
                <ArrowBack fontSize="small" />
              </IconButton>
            )}
            <Box
              sx={{
                display: "flex",
                overflow: "hidden",
                flexDirection: { xs: "column", sm: "row" },
                justifyContent: "space-between",
                alignItems: "flex-start",
              }}
            >
              {title ? (
                <Typography
                  variant="h4"
                  sx={{
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    flex: "1 1 auto",
                    minWidth: 0,
                    mr: 1,
                    maxWidth: "100%",
                    fontSize: { xs: "1.25rem", sm: "2rem" },
                    lineHeight: { xs: 1.4, sm: 1.2 },
                  }}
                >
                  {title}
                </Typography>
              ) : null}
              {titleExtra}
            </Box>

            <PageHeaderToolbar>{actions}</PageHeaderToolbar>
          </Stack>
        </Stack>

        <Divider sx={{ flex: 1, mt: 1 }} />

        <PageHeaderBreadcrumbs
          aria-label="breadcrumb"
          separator={<NavigateNextRounded fontSize="small" />}
        >
          <Typography variant="body1">Dashboard</Typography>
          {breadcrumbs
            ? breadcrumbs.map((breadcrumb, index) => {
                return breadcrumb.path ? (
                  <MuiLink
                    key={index}
                    component={Link}
                    underline="hover"
                    color="inherit"
                    to={breadcrumb.path}
                  >
                    {breadcrumb.title}
                  </MuiLink>
                ) : (
                  <Typography
                    key={index}
                    sx={{ color: "text.primary", fontWeight: 600 }}
                  >
                    {breadcrumb.title}
                  </Typography>
                );
              })
            : null}
        </PageHeaderBreadcrumbs>
      </Stack>
    </Stack>
  );
}
