import { cookies } from 'next/headers';
import { adminAuth } from '../../firebaseAdminConfig';

const SESSION_COOKIE_MAX_AGE = 15 * 60 * 1000;

export async function createSession(idToken: string) {
  const expiresIn = SESSION_COOKIE_MAX_AGE;

  if (!idToken) return;
  const session = await adminAuth.createSessionCookie(idToken, { expiresIn });

  cookies().set('session', session, {
    httpOnly: true,
    secure: true,
    maxAge: expiresIn / 1000,
    sameSite: 'lax',
  });
}

export async function verifySession() {
  try {
    const session = cookies().get('session')?.value;
    if (!session) {
      return null;
    }

    const decodedClaims = await adminAuth.verifySessionCookie(session, true);
    return { isAuth: true, userId: decodedClaims.uid };
  } catch (error) {
    console.error('Session verification failed:', error);
    return null;
  }
}

export function deleteSession() {
  cookies().delete('session');
}
