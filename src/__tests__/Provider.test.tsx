import { render, waitFor } from '@testing-library/react';
import { checkAuthStatus } from '@/utils/check-auth-status';
import { afterEach, beforeAll, describe, expect, it, Mock, vi } from 'vitest';
import { UserContext, UserProvider } from '@/providers/user-provider';

vi.mock('firebase/auth', async (importOriginal) => {
  const actual: object = await importOriginal();
  return {
    ...actual,
    getAuth: vi.fn().mockImplementation(() => ({
      currentUser: null,
    })),
    signOut: vi.fn(),
  };
});

vi.mock('@/utils/check-auth-status', () => ({
  checkAuthStatus: vi.fn(),
}));

describe('UserProvider', () => {
  const mockFetch = vi.fn();

  beforeAll(() => {
    global.fetch = mockFetch;
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('initializes user status on mount', async () => {
    (checkAuthStatus as Mock).mockResolvedValue({
      isLogged: true,
      displayName: 'Test User',
    });

    const { getByText } = render(
      <UserProvider>
        <UserContext.Consumer>
          {(value) => (value?.user?.isLogged ? <span>User: {value.user.displayName}</span> : <span>No user</span>)}
        </UserContext.Consumer>
      </UserProvider>,
    );

    await waitFor(() => {
      expect(getByText('User: Test User')).toBeDefined();
    });
  });

  it('handles fetchAuthStatus correctly when user is not logged in', async () => {
    (checkAuthStatus as Mock).mockResolvedValue(null);

    const { getByText } = render(
      <UserProvider>
        <UserContext.Consumer>
          {(value) => (value?.user?.isLogged ? <span>User: {value.user.displayName}</span> : <span>No user</span>)}
        </UserContext.Consumer>
      </UserProvider>,
    );

    await waitFor(() => {
      expect(getByText('No user')).toBeDefined();
    });
  });
});
