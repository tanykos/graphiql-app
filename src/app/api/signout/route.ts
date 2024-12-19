import { deleteSession } from '@/utils/auth-session';
import { signOut } from 'firebase/auth';
import { NextResponse } from 'next/server';
import { auth } from '../../../../firebaseConfig';

const signOutUser = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error('Error signing out:', error);
  }
};

export async function POST() {
  await signOutUser();

  deleteSession();
  return NextResponse.json({}, { status: 200 });
}
