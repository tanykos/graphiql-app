import { AuthFormNames } from '@/constants/form-fields-const';
import { User } from 'firebase/auth';

export interface authPageData {
  title: string;
  buttonText: string;
  disabled: boolean;
  note: string;
  linkText: string;
  href: string;
}

export interface SignInFormInputs {
  email: string;
  password: string;
}

export interface SignUpFormInputs extends SignInFormInputs {
  user: string;
}

export type SignInFieldIds = keyof SignInFormInputs;

export type SignUpFieldIds = keyof SignUpFormInputs;

export interface FormField<T extends SignInFormInputs | SignUpFormInputs> {
  label: string;
  type: 'text' | 'email' | 'password';
  id: keyof T;
}

export type FormInputs = SignInFormInputs | SignUpFormInputs;

export type AuthKeys = AuthFormNames.SIGNUP | AuthFormNames.SIGNIN;

export interface AuthResponse {
  message?: string;
  user?: User;
  error?: string;
}

export interface IsLoggedResponse {
  isLogged: boolean;
  displayName: string;
}
