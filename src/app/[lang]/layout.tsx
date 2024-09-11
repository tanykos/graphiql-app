import './globals.scss';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ReactNode } from 'react';
import Header from '@/components/header/header';
import Footer from '@/components/footer/footer';
import Main from '@/components/main/main';
import getDictionary from './dictionaries';
import DictionaryProvider from '@/providers/dictionary-provider';
import { DEFAULT_LOCALE } from '@/const';
import { Locale } from '@/types';
import isLocaleCorrect from '@/utils/is-locale-correct';
import { UserProvider } from '@/providers/user-provider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: '',
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
      <body className={inter.className}>
        <DictionaryProvider dictionary={dictionary}>
          <UserProvider>
            <Header />
            <Main>{isLocaleCorrect(params.lang) ? children : <p>Page is not found</p>}</Main>
          </UserProvider>
          <Footer locale={locale} />
        </DictionaryProvider>
      </body>
    </html>
  );
}
