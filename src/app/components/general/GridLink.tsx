import React from "react";
import { Grid } from "@mui/material";
import Link from "next/link";

type GridLinkProps = {
  label: string;
  href?: string;
  size?: number;
};

export function GridLink({ label, href = "/", size = 12 }: GridLinkProps) {
  return (
    <Grid size={size}>
      <Link href={href}>
        {label}
      </Link>
    </Grid>
  );
}
