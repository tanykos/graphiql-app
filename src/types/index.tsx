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

// TODO specify data type to replace 'unknown'
export type ApiResponse = {
  data: unknown;
  status: {
    code: number | undefined;
    text: string | undefined;
  };
};
