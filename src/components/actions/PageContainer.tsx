"use client";
import * as React from "react";
import { styled } from "@mui/material/styles";
import { Stack, Typography } from "@mui/material";
import Breadcrumbs, { breadcrumbsClasses } from "@mui/material/Breadcrumbs";
import { ContainerProps } from "@mui/material/Container";
import MuiLink from "@mui/material/Link";
import NavigateNextRoundedIcon from "@mui/icons-material/NavigateNextRounded";
import { Link } from "react-router";

const PageContentHeader = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  gap: theme.spacing(2),
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

export interface Breadcrumb {
  title: string;
  path?: string;
}
export interface PageContainerProps extends ContainerProps {
  title?: string;
  breadcrumbs?: Breadcrumb[];
  actions?: React.ReactNode;
}

export default function PageContainer(props: PageContainerProps) {
  const { breadcrumbs, title, actions = null } = props;

  return (
    <Stack spacing={2}>
      <Stack
        sx={{
          borderBottom: { sm: "none", md: "1px solid" },
          borderColor: { sm: "none", md: "divider" },
          pb: 1,
        }}
      >
        <PageHeaderBreadcrumbs
          aria-label="breadcrumb"
          separator={<NavigateNextRoundedIcon fontSize="small" />}
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
        <PageContentHeader>
          {title ? <Typography variant="h4">{title}</Typography> : null}
          <PageHeaderToolbar>{actions}</PageHeaderToolbar>
        </PageContentHeader>
      </Stack>
    </Stack>
  );
}
