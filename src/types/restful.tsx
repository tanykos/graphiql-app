import { METHODS } from '@/const';

export type MethodType = (typeof METHODS)[number];

export interface RestfulFormFields {
  method: MethodType;
  url: string;
}

export interface RestfulParams {
  lang: string;
  method: MethodType;
  base64Url: string;
}
