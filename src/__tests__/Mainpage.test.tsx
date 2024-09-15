import { render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import dictionary from '@/app/[lang]/dictionaries/en.json';
import MainPage from '@/app/[lang]/page';

vi.mock('react', async (importOriginal) => {
  const actual: object = await importOriginal();
  return {
    ...actual,
    useContext: vi
      .fn()
      .mockImplementationOnce(() => dictionary)
      .mockImplementationOnce(() => ({
        user: {},
      })),

    useState: () => ['', vi.fn()],
    useRef: vi.fn(),
  };
});

vi.mock('next/navigation', async (importOriginal) => {
  const actual: object = await importOriginal();
  return {
    ...actual,
    useRouter: vi.fn(),
    usePathname: () => '',
  };
});

vi.mock('firebase/auth', () => ({
  getAuth: vi.fn().mockImplementation(() => ({
    currentUser: null,
  })),
}));

describe('Main page', () => {
  it('Renders Main page', async () => {
    render(MainPage());

    await waitFor(() => {
      const aboutText = screen.getByText(dictionary.main.aboutCourse);
      expect(aboutText).toBeTruthy();
    });
  });
});
