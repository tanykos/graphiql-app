import { NextRequest, NextResponse } from 'next/server';
import { createSession } from '@/utils/auth-session';
import { auth } from '../../../../firebaseConfig';
import { createUserWithEmailAndPassword, updateProfile, User } from 'firebase/auth';
import getDictionary from '@/app/[lang]/dictionaries';
import { FirebaseError } from 'firebase/app';

type RegisterRequestBody = {
  email: string;
  password: string;
  user: string;
};

async function registerUser(email: string, password: string, displayName: string) {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user: User = userCredential.user;

    await updateProfile(user, { displayName });

    const authIdToken = await user.getIdToken();

    await createSession(authIdToken);
    return { success: true, user };
  } catch (error) {
    if (error instanceof FirebaseError) {
      return { success: false, error: { code: error.code } };
    }

    return { success: false, error: { code: 'unknown-error' } };
  }
}

export async function POST(request: NextRequest) {
  const locale = request.headers.get('Accept-Language') || '';
  const dictionary = await getDictionary(locale);

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
      let errorMessage: string;
      if (registrationResult.error?.code === 'auth/email-already-in-use') {
        errorMessage = dictionary.regFailed;
      } else {
        errorMessage = dictionary.unknownError;
      }

      return NextResponse.json({ error: errorMessage }, { status: 200 });
    }
  } catch (error) {
    console.error('Error during registration:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
