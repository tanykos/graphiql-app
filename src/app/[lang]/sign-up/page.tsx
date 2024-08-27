'use client';

import { DictionaryContext } from '@/providers/dictionary-provider';
import { Grid } from '@mui/material';
import { useContext } from 'react';
import { FormContainer } from '@/components/FormContainer/FormContainer';
import { InputField } from '@/components/InputField/InputField';
import { signUpFields } from '@/utils/form-fields-const';

export default function SignUp() {
  const dictionary = useContext(DictionaryContext);
  if (!dictionary) return;

  const formData = {
    title: dictionary.signup.title,
    buttonText: dictionary.signup.button,
    note: dictionary.signup.note,
    linkText: dictionary.signup.link,
    href: 'sign-in',
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    //TODO
    console.log('Sign-up submit');
  };

  return (
    <FormContainer data={formData} onSubmit={handleSubmit}>
      {signUpFields(dictionary).map(({ id, label, type }) => (
        <Grid item xs={12} key={id}>
          <InputField id={id} label={label} type={type} />
        </Grid>
      ))}
    </FormContainer>
  );
}
