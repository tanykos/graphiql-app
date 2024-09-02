import AuthForm from '@/components/AuthForm/AuthForm';
import { DictionaryKeys } from '@/constants/form-fields-const';

export default function SignIn() {
  return <AuthForm dictionaryKey={DictionaryKeys.SIGNIN} />;
}
