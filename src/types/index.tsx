export type Locale = 'en' | 'ru';

export interface fieldsFormData {
  title: string;
  buttonText: string;
  note: string;
  linkText: string;
  href: string;
}

export interface SearchParams {
  [key: string]: string;
}
