export interface fieldsFormData {
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

export interface FormField {
  label: string;
  type: 'text' | 'email' | 'password';
}

export interface SignInField extends FormField {
  id: SignInFieldIds;
}

export interface SignUpField extends FormField {
  id: SignUpFieldIds;
}
