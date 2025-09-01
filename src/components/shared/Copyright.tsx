import { Typography } from '@mui/material';
import Link from 'next/link';

export default function Copyright(
  props: React.ComponentProps<typeof Typography>
) {
  return (
    <Typography
      variant='body2'
      color='text.secondary'
      align='center'
      {...props}
    >
      {'Copyright © '}
      <Link color='inherit' href='https://dzakyrifai.vercel.app/'>
        Buku Online
      </Link>{' '}
      {new Date().getFullYear()}.
    </Typography>
  );
}
