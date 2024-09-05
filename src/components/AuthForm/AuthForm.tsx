'use client';

import { DictionaryContext } from '@/providers/dictionary-provider';
import { Alert, Grid, Snackbar } from '@mui/material';
import { useContext, useState } from 'react';
import { FormContainer } from '@/components/AuthForm/FormContainer/FormContainer';
import { InputField } from '@/components/InputField/InputField';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, Controller } from 'react-hook-form';
import { AuthKeys, FormInputs, SignUpFormInputs } from '@/types/auth';
import { getValidationSchemas } from '@/utils/validation';
import { getFieldsData } from '@/utils/get-fields-data';
import { AuthFormNames } from '@/constants/form-fields-const';
import { usePathname, useRouter } from 'next/navigation';
import { auth } from '../../../firebaseConfig';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import getLocale from '@/utils/get-locale';
import { Routes } from '@/constants/routes';

interface AuthFormProps {
  dictionaryKey: AuthKeys;
}

export default function AuthForm({ dictionaryKey }: AuthFormProps) {
  const dictionary = useContext(DictionaryContext);
  const router = useRouter();
  const pathname = usePathname();

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success');

  const isSignUp = dictionaryKey === AuthFormNames.SIGNUP;
  const validationSchema = getValidationSchemas(dictionary!, isSignUp);
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

  if (!dictionary) return;

  const formData = {
    title: dictionary[dictionaryKey].title,
    buttonText: dictionary[dictionaryKey].button,
    disabled: !isValid || isSubmitting,
    note: dictionary[dictionaryKey].note,
    linkText: dictionary[dictionaryKey].link,
    href: dictionaryKey === AuthFormNames.SIGNUP ? Routes.SIGN_IN : Routes.SIGN_UP,
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const onSubmit = async (data: FormInputs) => {
    const locale = getLocale(pathname);

    try {
      if (isSignUp) {
        await createUserWithEmailAndPassword(auth, data.email, data.password);
        if (auth.currentUser) {
          await updateProfile(auth.currentUser, {
            displayName: (data as SignUpFormInputs).user,
          });
        } else {
          console.error('No user is logged in.');
        }
      } else {
        await signInWithEmailAndPassword(auth, data.email, data.password);
      }

      router.push(`/${locale}`);
    } catch (error) {
      console.error('Authentication Error: ', error);

      setSnackbarMessage(dictionary.authFailed);
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  };

  const fields = getFieldsData(dictionary, dictionaryKey);

  return (
    <>
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

      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
}
