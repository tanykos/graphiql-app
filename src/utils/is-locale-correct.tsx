import { LOCALES } from '@/const';
import { Locale } from '@/types';

export default function isLocaleCorrect(value: string): boolean {
  return LOCALES.includes(value as Locale);
}
