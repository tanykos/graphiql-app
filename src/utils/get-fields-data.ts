import { Dictionary } from '@/app/[lang]/dictionaries';
import { AuthFormNames, signInFields, signUpFields } from '@/constants/form-fields-const';
import { AuthKeys } from '@/types/auth';

export const getFieldsData = (dictionary: Dictionary, dictionaryKey: AuthKeys) => {
  if (dictionaryKey === AuthFormNames.SIGNUP) return signUpFields(dictionary);
  return signInFields(dictionary);
};
