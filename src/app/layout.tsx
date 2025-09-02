import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { CssBaseline } from '@mui/material';
import GlobalStyles from '@mui/material/GlobalStyles';
import { Toaster } from 'react-hot-toast';
import { SITE_CONFIG } from '@/constants/config';
import { GLOBAL_STYLES } from '@/styles';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

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
}: Readonly<{
  children: React.ReactNode;
}>) {
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
