'use client';

import { CssBaseline, PaletteMode } from '@mui/material';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import * as React from 'react';

import AppAppBar from '@/components/landing-page/AppAppBar';
import FAQ from '@/components/landing-page/FAQ';
import Features from '@/components/landing-page/Features';
import Footer from '@/components/landing-page/Footer';
import Hero from '@/components/landing-page/Hero';
import Highlights from '@/components/landing-page/Highlights';
import LogoCollection from '@/components/landing-page/LogoCollection';
import Pricing from '@/components/landing-page/Pricing';
import Testimonials from '@/components/landing-page/Testimonials';

export default function LandingPage() {
  const [mode, setMode] = React.useState<PaletteMode>('light');

  const defaultTheme = createTheme({ palette: { mode } });

  const toggleColorMode = () => {
    setMode((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <AppAppBar mode={mode} toggleColorMode={toggleColorMode} />
      <Hero />
      <Box sx={{ bgcolor: 'background.default' }}>
        <LogoCollection />
        <Features />
        <Divider />
        <Testimonials />
        <Divider />
        <Highlights />
        <Divider />
        <Pricing />
        <Divider />
        <FAQ />
        <Divider />
        <Footer />
      </Box>
    </ThemeProvider>
  );
}
