import { Dictionary } from '@/app/[lang]/dictionaries';
import { FormField, SignInFormInputs, SignUpFormInputs } from '@/types/auth';

export const signUpFields = (dictionary: Dictionary): Array<FormField<SignUpFormInputs>> => [
  { id: 'user', label: dictionary.signup.username, type: 'text' },
  { id: 'email', label: dictionary.email, type: 'email' },
  { id: 'password', label: dictionary.password, type: 'password' },
];

export const signInFields = (dictionary: Dictionary): Array<FormField<SignInFormInputs>> => [
  { id: 'email', label: dictionary.email, type: 'email' },
  { id: 'password', label: dictionary.password, type: 'password' },
];

export const getFieldsData = (dictionary: Dictionary, dictionaryKey: 'signup' | 'signin') => {
  if (dictionaryKey === 'signup') return signUpFields(dictionary);
  return signInFields(dictionary);
};
