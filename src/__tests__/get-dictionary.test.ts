import getDictionary from '@/app/[lang]/dictionaries';
import { describe, expect, it, vi } from 'vitest';
import enDictionary from '@/app/[lang]/dictionaries/en.json';
import ruDictionary from '@/app/[lang]/dictionaries/ru.json';

const someLocale = 'ru';
const locale: () => string = vi
  .fn()
  .mockImplementationOnce(() => someLocale)
  .mockImplementationOnce(() => 'non-existing-locale');

describe('Get dictionary', () => {
  it(`get ${someLocale} dictionary, if locale is '${someLocale}'`, async () => {
    const dictionary = await getDictionary(locale());
    expect(dictionary.status).toBe(ruDictionary.status);
  });

  it('get en dictionary, if locale is incorrect', async () => {
    const dictionary = await getDictionary(locale());
    expect(dictionary.status).toBe(enDictionary.status);
  });
});
