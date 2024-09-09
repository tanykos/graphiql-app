import { IsLoggedResponse } from '@/types/auth';

export async function checkAuthStatus() {
  try {
    const response = await fetch('/api/login', { method: 'GET' });
    if (response.ok) {
      const data = (await response.json()) as IsLoggedResponse;
      console.log('INNNN checkAuthStatus: ', data);
      return data;
    } else {
      return null;
    }
  } catch {
    return null;
  }
}
