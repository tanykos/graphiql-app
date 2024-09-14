import LangSelector from '@/components/header/LangSelector/LangSelector';
import { LOCALES } from '@/const';
import { fireEvent, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import dictionary from '@/app/[lang]/dictionaries/en.json';
import { Locale } from '@/types';
import { TEST_ID } from './test-ids';

vi.mock('react', async (importOriginal) => {
  const actual: object = await importOriginal();
  return {
    ...actual,
    useContext: () => dictionary,
  };
});

const getRandomLocale = () => {
  const index = Math.floor(Math.random() * LOCALES.length);
  return LOCALES[index];
};
const randomLocale = getRandomLocale();

const mockPathname: () => string = vi
  .fn()
  .mockImplementationOnce(() => '/')
  .mockImplementationOnce(() => '/non-existing-locale')
  .mockImplementationOnce(() => `/${randomLocale}`)
  .mockImplementationOnce(() => '/en');

const mockRouter = { push: vi.fn() };

vi.mock('next/navigation', async (importOriginal) => {
  const actual: object = await importOriginal();
  return {
    ...actual,
    usePathname: () => mockPathname(),
    useSearchParams: () => '',
    useRouter: () => mockRouter,
  };
});

describe('Language Selector', () => {
  let langSelector: HTMLSelectElement;
  beforeEach(() => {
    render(<LangSelector />);
    langSelector = screen.getByTestId(TEST_ID.langSelector);
  });

  it('Renders all language options', () => {
    const options: HTMLOptionElement[] = screen.getAllByRole('option');
    const langs: string[] = options.map((option) => option.value).filter((lang) => lang);
    expect(langs.every((lang) => LOCALES.includes(lang as Locale))).toBeTruthy();
  });

  it(`Language is not selected if locale in the URL is incorrect`, () => {
    expect(langSelector.value).toBe('');
  });

  it(`Selected language is the same as the locale in the URL when rendered`, () => {
    expect(langSelector.value).toBe(randomLocale);
  });

  it('Language selection changes locale in the url', () => {
    const ruOption: HTMLOptionElement = screen.getByRole('option', { name: 'RU' });

    fireEvent.change(langSelector, { target: { value: ruOption.value } });
    expect(mockRouter.push).toBeCalledWith(`/${ruOption.value}?`, { scroll: true });
  });
});
