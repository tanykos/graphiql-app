import 'server-only';

import { Locale } from '@/types';
import { DEFAULT_LOCALE } from '@/const';
import isLocaleCorrect from '@/utils/is-locale-correct';

const dictionaries = {
  en: () => import('./dictionaries/en.json').then((module) => module.default),
  ru: () => import('./dictionaries/ru.json').then((module) => module.default),
};

export default async function getDictionary(locale: string) {
  const correctLocale = isLocaleCorrect(locale) ? (locale as Locale) : DEFAULT_LOCALE;
  return dictionaries[correctLocale]();
}

export type Dictionary = Awaited<ReturnType<typeof getDictionary>>;
