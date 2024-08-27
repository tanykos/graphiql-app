import { Dictionary } from '@/app/[lang]/dictionaries';

interface FormField {
  id: string;
  label: string;
  type: 'text' | 'email' | 'password';
}

export const signUpFields = (dictionary: Dictionary): FormField[] => [
  { id: 'user', label: dictionary.signup.username, type: 'text' },
  { id: 'email', label: dictionary.email, type: 'email' },
  { id: 'password', label: dictionary.password, type: 'password' },
];

export const signInFields = (dictionary: Dictionary): FormField[] => [
  { id: 'email', label: dictionary.email, type: 'email' },
  { id: 'password', label: dictionary.password, type: 'password' },
];
