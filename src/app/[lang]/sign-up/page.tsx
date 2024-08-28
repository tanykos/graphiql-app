'use client';

import { DictionaryContext } from '@/providers/dictionary-provider';
import { Grid } from '@mui/material';
import { useContext } from 'react';
import { FormContainer } from '@/components/AuthForm/FormContainer/FormContainer';
import { InputField } from '@/components/InputField/InputField';
import { signUpFields } from '@/constants/form-fields-const';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, Controller } from 'react-hook-form';
import { validationSignUpSchema } from '@/utils/validation';
import { SignUpFormInputs } from '@/types/auth';

export default function SignUp() {
  const {
    control,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm<SignUpFormInputs>({
    resolver: yupResolver(validationSignUpSchema),
    mode: 'onChange',
    defaultValues: {
      user: '',
      email: '',
      password: '',
    },
  });

  const dictionary = useContext(DictionaryContext);
  if (!dictionary) return;

  const formData = {
    title: dictionary.signup.title,
    buttonText: dictionary.signup.button,
    disabled: !isValid || isSubmitting,
    note: dictionary.signup.note,
    linkText: dictionary.signup.link,
    href: 'sign-in',
  };

  const onSubmit = (data: SignUpFormInputs) => {
    //TODO
    console.log('Sign-up submit: ', data);
  };

  return (
    <FormContainer
      data={formData}
      onSubmit={(event) => {
        void handleSubmit(onSubmit)(event);
      }}
    >
      {signUpFields(dictionary).map(({ id, label, type }) => (
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
