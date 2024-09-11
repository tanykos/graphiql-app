'use client';

import { ThemeOptions, createTheme } from '@mui/material';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'], weight: ['300', '400', '500', '700'] });

export const themeOptions: ThemeOptions = {
  typography: {
    fontFamily: inter.style.fontFamily,
  },
  palette: {
    primary: {
      main: '#4f6e61',
    },
    secondary: {
      main: '#636363',
    },
    background: {
      default: '#fff',
      paper: '#f9fbf9',
    },
  },
};

const theme = createTheme(themeOptions);

export default theme;
