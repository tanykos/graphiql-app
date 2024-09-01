export type Locale = 'en' | 'ru';

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
