'use client';

import { DictionaryContext } from '@/providers/dictionary-provider';
import { Grid } from '@mui/material';
import { useContext } from 'react';
import { FormContainer } from '@/components/AuthForm/FormContainer/FormContainer';
import { InputField } from '@/components/InputField/InputField';
import { signInFields } from '@/constants/form-fields-const';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, Controller } from 'react-hook-form';
import { SignInFormInputs } from '@/types/auth';
import { validationSignInSchema } from '@/utils/validation';

export default function SignIn() {
  const {
    control,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm<SignInFormInputs>({
    resolver: yupResolver(validationSignInSchema),
    mode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const dictionary = useContext(DictionaryContext);
  if (!dictionary) return;

  const formData = {
    title: dictionary.signin.title,
    buttonText: dictionary.signin.button,
    disabled: !isValid || isSubmitting,
    note: dictionary.signin.note,
    linkText: dictionary.signin.link,
    href: 'sign-up',
  };

  const onSubmit = (data: SignInFormInputs) => {
    //TODO
    console.log('Sign-in submit: ', data);
  };

  return (
    <FormContainer
      data={formData}
      onSubmit={(event) => {
        void handleSubmit(onSubmit)(event);
      }}
    >
      {signInFields(dictionary).map(({ id, label, type }) => (
        <Grid item xs={12} key={id}>
          <Controller
            name={id}
            control={control}
            render={({ field }) => (
              <InputField
                id={id}
                label={label}
                type={type}
                {...field}
                error={!!errors[id]}
                helperText={errors[id]?.message}
              />
            )}
          />
        </Grid>
      ))}
    </FormContainer>
  );
}
