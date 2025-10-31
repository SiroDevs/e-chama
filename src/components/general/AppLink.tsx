import { Typography, Link, TypographyProps, SxProps, Theme } from '@mui/material';

interface AppLinkProps {
  href: string;
  text: string;
  linkText: string;
  variant?: TypographyProps['variant'];
  align?: 'left' | 'center' | 'right';
  sx?: SxProps<Theme>;
}

export function AppLink({
  href,
  text,
  linkText,
  variant = 'body2',
  align = 'center',
  sx = {}
}: AppLinkProps) {
  return (
    <Typography variant={variant} align={align} sx={{ mt: 2, ...sx }}>
      {text}{' '}
      <Link href={href} underline="hover" component={Link}>
        {linkText}
      </Link>
    </Typography>
  );
}