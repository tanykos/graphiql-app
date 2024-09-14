export type Locale = 'en' | 'ru';

export interface SearchParams {
  [key: string]: string;
}

export type ApiResponse = {
  data: object | undefined;
  status: {
    code: number | undefined;
    text: string | undefined;
  };
};
