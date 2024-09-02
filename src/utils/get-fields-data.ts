import { Dictionary } from '@/app/[lang]/dictionaries';
import { DictionaryKeys, signInFields, signUpFields } from '@/constants/form-fields-const';
import { AuthKeys } from '@/types/auth';

export const getFieldsData = (dictionary: Dictionary, dictionaryKey: AuthKeys) => {
  if (dictionaryKey === DictionaryKeys.SIGNUP) return signUpFields(dictionary);
  return signInFields(dictionary);
};
