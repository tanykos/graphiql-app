import * as yup from 'yup';

const basePasswordSchema = yup
  .string()
  .required('Password is required')
  .min(8, 'Password must be at least 8 characters long')
  .matches(/[A-Z]/, 'Password must contain at least one uppercase Latin letter')
  .matches(/[a-z]/, 'Password must contain at least one lowercase Latin letter')
  .matches(/\d/, 'Password must contain at least one digit')
  .matches(/[@$!%*?&#]/, 'Password must contain at least one special character');

const baseEmailSchema = yup
  .string()
  .required('Email is required')
  .matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Invalid email');

const baseUserSchema = yup
  .string()
  .required('Name is required')
  .matches(/^[A-Z][a-z]*$/, 'Name must start with an uppercase Latin letter');

export const validationSignUpSchema = yup.object({
  user: baseUserSchema,
  email: baseEmailSchema,
  password: basePasswordSchema,
});

export const validationSignInSchema = yup.object({
  email: baseEmailSchema,
  password: basePasswordSchema,
});
