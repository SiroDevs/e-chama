import { CssBaseline } from '@mui/material';
import GlobalStyles from '@mui/material/GlobalStyles';
import { Metadata } from 'next';
import * as React from 'react';
import { Toaster } from 'react-hot-toast';

import '../styles/globals.css';

import { SITE_CONFIG } from '@/constants/config';
import { GLOBAL_STYLES } from '@/styles';

// !STARTERCONF Change these default meta
// !STARTERCONF Look at @/constant/config to change them
export const metadata: Metadata = {
  title: {
    default: SITE_CONFIG.title,
    template: `%s | ${SITE_CONFIG.title}`,
  },
  description: SITE_CONFIG.description,
  robots: { index: true, follow: true },
  metadataBase: new URL(SITE_CONFIG.url),
  icons: {
    icon: '/favicon/favicon.ico',
    shortcut: '/favicon/favicon-16x16.png',
    apple: '/favicon/apple-touch-icon.png',
  },
  manifest: `/favicon/site.webmanifest`,
  openGraph: {
    url: SITE_CONFIG.url,
    title: SITE_CONFIG.title,
    description: SITE_CONFIG.description,
    siteName: SITE_CONFIG.title,
    images: [`${SITE_CONFIG.url}/images/og.jpg`],
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_CONFIG.title,
    description: SITE_CONFIG.description,
    images: [`${SITE_CONFIG.url}/images/og.jpg`],
  },
  authors: [
    {
      name: "Dzaky Purnomo Rifa'i",
      url: 'https://dzakyrifai.vercel.app/',
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en' suppressHydrationWarning>
      <GlobalStyles styles={GLOBAL_STYLES} />
      <CssBaseline />
      <body>
        {/* <Container sx={{ pl: 0, pr: 0 }}> */}
        {children}

        {/* </Container> */}
        <Toaster position='top-center' reverseOrder={false} />
      </body>
    </html>
  );
}
