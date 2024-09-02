import AuthForm from '@/components/AuthForm/AuthForm';
import { DictionaryKeys } from '@/constants/form-fields-const';

export default function SignUp() {
  return <AuthForm dictionaryKey={DictionaryKeys.SIGNUP} />;
}
