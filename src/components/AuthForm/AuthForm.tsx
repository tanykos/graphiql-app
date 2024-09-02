'use client';

import { DictionaryContext } from '@/providers/dictionary-provider';
import { Grid } from '@mui/material';
import { useContext } from 'react';
import { FormContainer } from '@/components/AuthForm/FormContainer/FormContainer';
import { InputField } from '@/components/InputField/InputField';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, Controller } from 'react-hook-form';
import { AuthKeys, FormInputs } from '@/types/auth';
import { validationSignInSchema, validationSignUpSchema } from '@/utils/validation';
import { getFieldsData } from '@/utils/get-fields-data';

interface AuthFormProps {
  dictionaryKey: AuthKeys;
}

export default function AuthForm({ dictionaryKey }: AuthFormProps) {
  const isSignUp = dictionaryKey === 'signup';
  const validationSchema = isSignUp ? validationSignUpSchema : validationSignInSchema;

  const defaultValues: FormInputs = isSignUp ? { email: '', password: '', user: '' } : { email: '', password: '' };

  const {
    control,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm<FormInputs>({
    resolver: yupResolver(validationSchema),
    mode: 'onChange',
    defaultValues,
  });

  const dictionary = useContext(DictionaryContext);
  if (!dictionary) return;

  const formData = {
    title: dictionary[dictionaryKey].title,
    buttonText: dictionary[dictionaryKey].button,
    disabled: !isValid || isSubmitting,
    note: dictionary[dictionaryKey].note,
    linkText: dictionary[dictionaryKey].link,
    href: dictionaryKey === 'signup' ? 'sign-in' : 'sign-up',
  };

  const onSubmit = (data: FormInputs) => {
    //TODO
    console.log(dictionaryKey, 'Form submit: ', data);
  };

  const fields = getFieldsData(dictionary, dictionaryKey);

  return (
    <FormContainer
      data={formData}
      onSubmit={(event) => {
        void handleSubmit(onSubmit)(event);
      }}
    >
      {fields.map(({ id, label, type }) => (
        <Grid item xs={12} key={id}>
          <Controller
            name={id}
            control={control}
            render={({ field }) => {
              const errorText = errors[id as keyof FormInputs]?.message;
              return (
                <InputField
                  id={id}
                  label={label}
                  type={type}
                  {...field}
                  error={!!errors[id as keyof FormInputs]}
                  helperText={errorText}
                />
              );
            }}
          />
        </Grid>
      ))}
    </FormContainer>
  );
}
