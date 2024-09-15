import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { DictionaryContext } from '@/providers/dictionary-provider';
import { UserContext } from '@/providers/user-provider';
import dictionary from '@/app/[lang]/dictionaries/en.json';
import Header from '@/components/header/header';

vi.mock('firebase/auth', () => ({
  getAuth: vi.fn().mockImplementation(() => ({
    currentUser: null,
  })),
}));

vi.mock('next/navigation', () => ({
  usePathname: vi.fn(() => '/en'),
  useRouter: vi.fn(),
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

describe('Header', () => {
  const mockUserContext = {
    user: null,
    logout: vi.fn(),
    fetchAuthStatus: vi.fn(),
  };

  const notAuthUser = {
    isLogged: false,
    displayName: '',
  };

  const authUser = {
    isLogged: true,
    displayName: 'TestName',
  };

  const renderHeader = (user = notAuthUser) => {
    render(
      <DictionaryContext.Provider value={dictionary}>
        <UserContext.Provider value={{ ...mockUserContext, user }}>
          <Header />
        </UserContext.Provider>
      </DictionaryContext.Provider>,
    );
  };

  it('renders logo and language selector', () => {
    renderHeader();

    expect(screen.getByRole('link', { name: /logo/i })).toBeDefined();
    expect(screen.getByRole('combobox')).toBeDefined();
  });

  it('shows sign-in and sign-up buttons if user is not authenticated', () => {
    renderHeader();

    expect(screen.getByRole('button', { name: /sign in/i })).toBeDefined();
    expect(screen.getByRole('button', { name: /sign up/i })).toBeDefined();
  });

  it('shows sign out button if user is authenticated', () => {
    renderHeader(authUser);
    expect(screen.getByRole('button', { name: /sign out/i })).toBeDefined();
  });

  it('calls logout and redirects to home when sign out is clicked', async () => {
    const mockLogout = vi.fn();
    const mockFetchAuthStatus = vi.fn();

    render(
      <DictionaryContext.Provider value={dictionary}>
        <UserContext.Provider value={{ user: authUser, logout: mockLogout, fetchAuthStatus: mockFetchAuthStatus }}>
          <Header />
        </UserContext.Provider>
      </DictionaryContext.Provider>,
    );

    fireEvent.click(screen.getByRole('button', { name: /sign out/i }));

    await waitFor(() => {
      expect(mockLogout).toHaveBeenCalled();
      expect(mockFetchAuthStatus).toHaveBeenCalled();
    });
  });
});
