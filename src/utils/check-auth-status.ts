import { IsLoggedResponse } from '@/types/auth';

export async function checkAuthStatus() {
  try {
    const response = await fetch('/api/login', { method: 'GET' });
    if (response.ok) {
      const data = (await response.json()) as IsLoggedResponse;
      return data;
    }
    return null;
  } catch {
    return null;
  }
}
