import { Dictionary } from '@/app/[lang]/dictionaries';
import { signInFields, signUpFields } from '@/constants/form-fields-const';
import { AuthKeys } from '@/types/auth';

export const getFieldsData = (dictionary: Dictionary, dictionaryKey: AuthKeys) => {
  if (dictionaryKey === 'signup') return signUpFields(dictionary);
  return signInFields(dictionary);
};
