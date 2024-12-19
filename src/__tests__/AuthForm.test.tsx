import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import dictionary from '@/app/[lang]/dictionaries/en.json';
import { DictionaryContext } from '@/providers/dictionary-provider';
import { UserContext } from '@/providers/user-provider';
import AuthForm from '@/components/AuthForm/AuthForm';
import { AuthFormNames } from '@/constants/form-fields-const';

vi.mock('firebase/auth', () => ({
  getAuth: vi.fn().mockImplementation(() => ({
    currentUser: null,
  })),
}));

vi.mock('next/navigation', async (importOriginal) => {
  const actual: object = await importOriginal();
  return {
    ...actual,
    usePathname: () => '/en',
    useRouter: () => ({
      push: vi.fn(),
    }),
  };
});

vi.mock('react', async (importOriginal) => {
  const actual: object = await importOriginal();
  return {
    ...actual,
    useContext: (context: typeof DictionaryContext | typeof UserContext) => {
      if (typeof context === typeof DictionaryContext) {
        return dictionary;
      }
      if (typeof context === typeof UserContext) {
        return mockUserContext;
      } else {
        return null;
      }
    },
  };
});

const mockUserContext = {
  fetchAuthStatus: vi.fn(),
};

describe('AuthForm', () => {
  it('renders and sets input values correctly', () => {
    render(<AuthForm dictionaryKey={AuthFormNames.SIGNUP} />);

    expect(screen.getByRole('heading', { name: 'Sign Up' })).toBeDefined();

    const userInput: HTMLButtonElement = screen.getByLabelText(/Username/i);
    const emailInput: HTMLButtonElement = screen.getByLabelText(/Email/i);
    const passwordInput: HTMLButtonElement = screen.getByLabelText(/Password/i);

    fireEvent.change(userInput, { target: { value: 'Testuser' } });
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'Test!12345' } });

    expect(userInput.value).toBe('Testuser');
    expect(emailInput.value).toBe('test@example.com');
    expect(passwordInput.value).toBe('Test!12345');
  });
});
