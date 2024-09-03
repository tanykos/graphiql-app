import { Dictionary } from '@/app/[lang]/dictionaries';
import * as yup from 'yup';

const getBasePasswordSchema = (dictionary: Dictionary) =>
  yup
    .string()
    .required(dictionary.validation.password.required)
    .matches(/.*\p{Lu}.*/u, dictionary.validation.password.uppercase)
    .matches(/.*\p{Ll}.*/u, dictionary.validation.password.lowercase)
    .matches(/\d/, dictionary.validation.password.digit)
    .matches(/[\p{P}\p{S}]/u, dictionary.validation.password.special)
    .min(8, dictionary.validation.password.minLength);

const getBaseEmailSchema = (dictionary: Dictionary) =>
  yup
    .string()
    .required(dictionary.validation.email.required)
    .matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, dictionary.validation.email.invalid);

const getBaseUserSchema = (dictionary: Dictionary) =>
  yup
    .string()
    .required(dictionary.validation.user.required)
    .matches(/^[A-Za-z]+$/, dictionary.validation.user.onlyLatin)
    .matches(/^[A-Z][A-Za-z]*$/, dictionary.validation.user.startUppercase);

export const validationSignUpSchema = (dictionary: Dictionary) =>
  yup.object({
    user: getBaseUserSchema(dictionary),
    email: getBaseEmailSchema(dictionary),
    password: getBasePasswordSchema(dictionary),
  });

export const validationSignInSchema = (dictionary: Dictionary) =>
  yup.object({
    email: getBaseEmailSchema(dictionary),
    password: getBasePasswordSchema(dictionary),
  });

export const getValidationSchemas = (dictionary: Dictionary, isSignUp: boolean) => {
  if (isSignUp) return validationSignUpSchema(dictionary);
  return validationSignInSchema(dictionary);
};
