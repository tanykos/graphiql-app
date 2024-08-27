'use client';

import { DictionaryContext } from '@/providers/dictionary-provider';
import { Grid } from '@mui/material';
import { useContext } from 'react';
import { FormContainer } from '@/components/FormContainer/FormContainer';
import { InputField } from '@/components/InputField/InputField';
import { signInFields } from '@/utils/form-fields-const';

export default function SignIn() {
  const dictionary = useContext(DictionaryContext);
  if (!dictionary) return;

  const formData = {
    title: dictionary.signin.title,
    buttonText: dictionary.signin.button,
    note: dictionary.signin.note,
    linkText: dictionary.signin.link,
    href: 'sign-up',
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    //TODO
    console.log('Sign-in submit');
  };

  return (
    <FormContainer data={formData} onSubmit={handleSubmit}>
      {signInFields(dictionary).map(({ id, label, type }) => (
        <Grid item xs={12} key={id}>
          <InputField id={id} label={label} type={type} />
        </Grid>
      ))}
    </FormContainer>
  );
}
