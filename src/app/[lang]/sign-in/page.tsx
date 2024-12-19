import AuthForm from '@/components/AuthForm/AuthForm';
import { AuthFormNames } from '@/constants/form-fields-const';

export default function SignIn() {
  return <AuthForm dictionaryKey={AuthFormNames.SIGNIN} />;
}
