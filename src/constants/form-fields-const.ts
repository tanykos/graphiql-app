import { Dictionary } from '@/app/[lang]/dictionaries';
import { SignInField, SignUpField } from '@/types/auth';

export const signUpFields = (dictionary: Dictionary): Array<SignUpField> => [
  { id: 'user', label: dictionary.signup.username, type: 'text' },
  { id: 'email', label: dictionary.email, type: 'email' },
  { id: 'password', label: dictionary.password, type: 'password' },
];

export const signInFields = (dictionary: Dictionary): Array<SignInField> => [
  { id: 'email', label: dictionary.email, type: 'email' },
  { id: 'password', label: dictionary.password, type: 'password' },
];
