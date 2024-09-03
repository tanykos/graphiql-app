import AuthForm from '@/components/AuthForm/AuthForm';
import { AuthFormNames } from '@/constants/form-fields-const';

export default function SignUp() {
  return <AuthForm dictionaryKey={AuthFormNames.SIGNUP} />;
}
