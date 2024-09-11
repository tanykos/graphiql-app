import { NextRequest, NextResponse } from 'next/server';
import { createSession } from '@/utils/auth-session';
import { auth } from '../../../../firebaseConfig';
import { createUserWithEmailAndPassword, updateProfile, User } from 'firebase/auth';

type RegisterRequestBody = {
  email: string;
  password: string;
  user: string;
};

export async function registerUser(email: string, password: string, displayName: string) {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user: User = userCredential.user;

    await updateProfile(user, { displayName });

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
    const body = (await request.json()) as RegisterRequestBody;
    const { email, password, user } = body;

    const registrationResult = await registerUser(email, password, user);

    if (registrationResult.success) {
      return NextResponse.json({
        message: 'Registration successful.',
        user: registrationResult.user,
      });
    } else {
      return NextResponse.json({ error: registrationResult.error }, { status: 500 });
    }
  } catch (error) {
    console.error('Error during registration 2:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
