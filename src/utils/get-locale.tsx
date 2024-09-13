import { DEFAULT_LOCALE, LOCALES } from '@/const';
import { Locale } from '@/types';

export default function getLocale(pathname: string): Locale {
  const localeUrl = pathname.split('/')[1];
  const locale = LOCALES.includes(localeUrl as Locale) ? (localeUrl as Locale) : DEFAULT_LOCALE;
  return locale;
}
