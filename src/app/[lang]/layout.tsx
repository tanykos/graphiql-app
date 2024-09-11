import './globals.scss';
import type { Metadata } from 'next';
import { ReactNode } from 'react';
import Header from '@/components/header/header';
import Footer from '@/components/footer/footer';
import Main from '@/components/main/main';
import getDictionary from './dictionaries';
import DictionaryProvider from '@/providers/dictionary-provider';
import { DEFAULT_LOCALE } from '@/const';
import { Locale } from '@/types';
import isLocaleCorrect from '@/utils/is-locale-correct';
import { CssBaseline, ThemeProvider } from '@mui/material';
import theme from '@/providers/theme-provider';
import { UserProvider } from '@/providers/user-provider';

export const metadata: Metadata = {
  title: 'REST & GraphQL clients',
  description: '',
};

export default async function RootLayout({
  params,
  children,
}: Readonly<{ params: { lang: string }; children: ReactNode }>) {
  const locale = isLocaleCorrect(params.lang) ? (params.lang as Locale) : DEFAULT_LOCALE;
  const dictionary = await getDictionary(locale);

  return (
    <html lang={locale}>
      <body>
        <DictionaryProvider dictionary={dictionary}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <UserProvider>
              <Header />
              <Main>{isLocaleCorrect(params.lang) ? children : <p>Page is not found</p>}</Main>
            </UserProvider>
            <Footer locale={locale} />
          </ThemeProvider>
        </DictionaryProvider>
      </body>
    </html>
  );
}
