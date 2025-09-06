import React from "react";
import { Grid, Link } from "@mui/material";

type GridLinkProps = {
  label: string;
  href?: string;
  size?: number;
};

export function GridLink({ label, href = "/", size = 12 }: GridLinkProps) {
  return (
    <Grid size={size}>
      <Link href={href} variant="body2">
        {label}
      </Link>
    </Grid>
  );
}
