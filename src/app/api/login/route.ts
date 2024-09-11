import { NextRequest, NextResponse } from 'next/server';
import { signInWithEmailAndPassword, User } from 'firebase/auth';
import { auth } from '../../../../firebaseConfig';
import { createSession, verifySession } from '@/utils/auth-session';
import { IsLoggedResponse } from '@/types/auth';
import { adminAuth } from '../../../../firebaseAdminConfig';

type LoginRequestBody = {
  email: string;
  password: string;
};

async function loginUser(email: string, password: string) {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);

    const user: User = userCredential.user;
    const authIdToken = await user.getIdToken();

    await createSession(authIdToken);
    return { success: true, user };
  } catch (error) {
    console.error('Error during registration:', error);
    return { success: false, error: error };
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as LoginRequestBody;
    const { email, password } = body;

    const loginResult = await loginUser(email, password);

    if (loginResult.success) {
      return NextResponse.json({
        message: 'Login successful.',
        user: loginResult.user,
      });
    } else {
      const errorMessage = 'Authentication failed';

      return NextResponse.json({ error: errorMessage }, { status: 200 });
    }
  } catch (error) {
    console.error('Error during login 2:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function GET(): Promise<NextResponse<IsLoggedResponse>> {
  const isSession = await verifySession();

  if (!isSession) {
    return NextResponse.json({ isLogged: false, displayName: '' }, { status: 200 });
  }

  const user = await adminAuth.getUser(isSession.userId);

  return NextResponse.json({ isLogged: true, displayName: user.displayName || '' }, { status: 200 });
}
