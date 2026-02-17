import * as React from 'react';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Breadcrumbs, { breadcrumbsClasses } from '@mui/material/Breadcrumbs';
import NavigateNextRoundedIcon from '@mui/icons-material/NavigateNextRounded';
import Link from '@mui/material/Link';

const StyledBreadcrumbs = styled(Breadcrumbs)(({ theme }) => ({
  margin: theme.spacing(1, 0),
  [`& .${breadcrumbsClasses.separator}`]: {
    color: (theme.vars || theme).palette.action.disabled,
    margin: 1,
  },
  [`& .${breadcrumbsClasses.ol}`]: {
    alignItems: 'center',
  },
}));

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface NavbarBreadcrumbsProps {
  items?: BreadcrumbItem[];
}

export function NavbarBreadcrumbs({ items = [] }: NavbarBreadcrumbsProps) {
  const displayItems = items.slice(0, 2);

  return (
    <StyledBreadcrumbs
      aria-label="breadcrumb"
      separator={<NavigateNextRoundedIcon fontSize="small" />}
    >
      {items.length > 0 ? (
        <Link
          href="/"
          variant="body1"
          sx={{
            color: 'text.secondary',
            textDecoration: 'none',
            '&:hover': {
              color: 'primary.main',
              textDecoration: 'underline',
            },
          }}
        >
          Dashboard
        </Link>
      ) : (
        <Typography variant="body1">Dashboard</Typography>
      )}

      {displayItems.map((item, index) => {
        const isLastItem = index === displayItems.length - 1;
        
        return isLastItem ? (
          <Typography
            key={index}
            variant="body1"
            sx={{ color: 'text.primary', fontWeight: 600 }}
          >
            {item.label}
          </Typography>
        ) : (
          <Link
            key={index}
            href={item.href || '#'}
            variant="body1"
            sx={{
              color: 'text.secondary',
              textDecoration: 'none',
              '&:hover': {
                color: 'primary.main',
                textDecoration: 'underline',
              },
            }}
          >
            {item.label}
          </Link>
        );
      })}
    </StyledBreadcrumbs>
  );
}